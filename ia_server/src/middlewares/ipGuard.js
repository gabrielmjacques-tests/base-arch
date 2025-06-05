/**
 * Middleware para proteger as rotas de acesso não autorizado
 * Apenas permite acesso local (localhost) e IPs específicos, definidos na lista allowedIps
 * @param {Express.Request} req - Objeto de requisição do Express
 * @param {Express.Response} res - Objeto de resposta do Express
 * @param {import("express").NextFunction} next - Função para passar para o próximo middleware
 */
export default function ipGuard(req, res, next) {
    const ip = req.ip || req.socket.remoteAddress
    const allowedIps = ['::1', '127.0.0.1', '::ffff:127.0.0.1']
    if (!allowedIps.includes(ip)) {
        return res.status(403)
    }
    next()
}
