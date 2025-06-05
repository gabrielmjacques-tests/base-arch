import { createLogger, format, transports } from 'winston'
import path from 'path'

// Configuração do logger
const logger = createLogger({
    level: 'error',
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.printf(({ timestamp, level, message }) => `${timestamp} ${message}`) // Formato da mensagem de log
    ),
    transports: [
        new transports.File({ filename: path.join('logs', 'error.log'), level: 'error' }), // Salvar erros em um arquivo
    ]
})

export default logger