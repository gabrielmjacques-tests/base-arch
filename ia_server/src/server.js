import express from 'express'
import cors from 'cors'
import path from 'path'
import colors from 'colors'
import { fileURLToPath } from 'url'

import { temNginx } from './utils/nginx.js'
import ipGuard from './middlewares/ipGuard.js'
import { apenasDev } from './middlewares/modes.js'
import geminiRoutes from './routes/gemini.routes.js'
import { getConfig } from './storage/config.storage.js'
import { port, mode, corsOrigin, testEndpoint } from './utils/env.js'

console.clear()

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()

// ========== Configurações ==========
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// =========== Middlewares ===========
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: corsOrigin, methods: ['GET', 'POST', 'PUT', 'DELETE'] }))
app.use(ipGuard)

// ============== Rotas ==============
app.use(geminiRoutes)

// Rota de para testes e configuração
app.get(`/${testEndpoint}`,
    apenasDev,
    (req, res) => {
        const config = getConfig();
        res.render('index', { config: config });
    }
);

app.listen(port, () => {
    console.log(colors.green(`> Servidor Iniciado...`))

    temNginx().then((instalado) => {

        if (mode === 'dev') {
            if (instalado) {
                console.log(colors.yellow("> AVISO: Modo de desenvolvimento habilitado com Nginx instalado. Certifique-se de desativar o modo de desenvolvimento caso esteja em produção."))
                console.log(`   - Interface Web de Configuração: http://localhost:${port}/api/${testEndpoint}`)
            } else {
                console.log(colors.yellow("> Modo de desenvolvimento"))
                console.log(`   - Interface Web de Configuração: http://localhost:${port}/${testEndpoint}`)
            }
        }

    })
})
