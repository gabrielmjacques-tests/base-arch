import { existsSync, readFileSync, writeFileSync } from 'fs'
import colors from 'colors'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/**
 * Lê o arquivo de configuração config.json e retorna o objeto de configuração.
 * @returns {Object} Retorna o objeto de configuração
 */
export function getConfig() {
    try {
        if (existsSync(path.join(__dirname, 'config.json'))) {
            const arquivoConfig = readFileSync(path.join(__dirname, 'config.json'), 'utf-8')
            return JSON.parse(arquivoConfig)
        }
        else {

        }
    }
    catch (err) {
        console.log(colors.red('========= Ocorreu um erro ao ler o arquivo de configuração ========='))
        console.error('Erro ao verificar o arquivo de configuração:', err)
    }
}

/**
 * Salva o objeto de configuração no arquivo config.json.
 * @param {Object} config - Objeto de configuração a ser salvo.
 */
export function salvarConfig(config) {
    try {
        writeFileSync(path.join(__dirname, 'config.json'), JSON.stringify(config), 'utf-8')
    } catch (err) {
        console.log(colors.red('========= Ocorreu um erro ao salvar o arquivo de configuração ========='))
        console.error(err)
    }
}