import dotenv from 'dotenv'
dotenv.config()

/**
 * Variável que define o endpoint de teste da interface web.
 * 
 * Se não estiver definida, o valor padrão será `interface-web`.
 */
export const testEndpoint = process.env.TEST_ENDPOINT || 'interface-web'

/**
 * Variável que define o modo de operação do servidor.
 *
 * Valores: `dev (padrão) | prod`
 */
export const mode = process.env.MODE || 'prod'

/**
 * Variável que define a porta do servidor.
 * 
 * Se não estiver definida, o valor padrão será `3000`.
 */
export const port = process.env.SERVER_PORT || 3000

/**
 * Variável que define o endereço permitido para CORS. Qualquer endereço que não for o definido será bloqueado.
 */
export const corsOrigin = `${process.env.CORS_ORIGIN}:${process.env.SERVER_PORT}` || 'http://localhost:3000'

/**
 * Variável que define a chave da API do Google.
 * 
 * A aplicação depende totalmente da chave da API do Google, que pode ser obtida em https://aistudio.google.com/
 */
export const googleApiKey = process.env.GOOGLE_API_KEY