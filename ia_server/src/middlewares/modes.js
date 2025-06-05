import { mode } from "../utils/env.js";

/**
 * Middleware para permitir acesso apenas no modo de desenvolvimento
 * @param {Express.Request} req - Objeto de requisição do Express
 * @param {Express.Response} res - Objeto de resposta do Express
 * @param {import("express").NextFunction} next - Função para passar para o próximo middleware
 */
export function apenasDev(req, res, next) {
    if (mode.toLocaleLowerCase() !== 'dev') {
        return res.status(403).json({});
    }
    next();
}
