import { GoogleGenerativeAI } from '@google/generative-ai'
import { googleApiKey } from '../utils/env.js'
import logger from '../utils/logger.js'
import * as configStorage from '../storage/config.storage.js'
import { gerarRespostaJSON, MENSAGENS_RESPOSTA_JSON } from '../utils/resposta.js'

/**
 * Obtém uma instância do modelo generativo do Google com as configurações atuais.
 * @returns {import('@google/generative-ai').GenerativeModel} Modelo configurado
 * @throws {Error} Em caso de falha ao inicializar o modelo
 */
const getModelo = () => {
    try {
        return new GoogleGenerativeAI(googleApiKey).getGenerativeModel({
            model: configStorage.getConfig().modelo,
            generationConfig: configStorage.getConfig().generationConfig,
        })
    } catch (erro) {
        logger.error(MENSAGENS_RESPOSTA_JSON.erro.processamento + ' - ' + erro)
        throw new Error(MENSAGENS_RESPOSTA_JSON.erro.processamento)
    }
}

/**
 * Analisa uma imagem enviada e gera uma descrição com base no modelo de IA.
 * Espera um arquivo de imagem no campo `req.file`.
 * 
 * @param {import('express').Request} req Requisição HTTP
 * @param {import('express').Response} res Resposta HTTP
 */
export const describeImage = async (req, res) => {
    const file = req.file
    if (!file) return res.status(400).json(gerarRespostaJSON(MENSAGENS_RESPOSTA_JSON.erro.semImagem))

    try {
        const modelo = getModelo()

        // Prepara os dados da imagem para envio ao modelo (base64)
        const imageData = {
            inlineData: {
                data: file.buffer.toString("base64"),
                mimeType: file.mimetype
            }
        }

        // Envia imagem e prompt ao modelo
        const result = await modelo.generateContent([
            imageData,
            { text: configStorage.getConfig().prompt }
        ])

        const text = (await result.response).text()
        return res.status(200).json(gerarRespostaJSON(text))

    } catch (erro) {
        logger.error(MENSAGENS_RESPOSTA_JSON.erro.processamento + ' - ' + erro)
        return res.status(500).json(gerarRespostaJSON(MENSAGENS_RESPOSTA_JSON.erro.processamento))
    }
}

/**
 * Atualiza as configurações utilizadas pelo modelo, como prompt, modelo e limite de tokens.
 * 
 * @param {import('express').Request} req Requisição HTTP
 * @param {import('express').Response} res Resposta HTTP
 */
export const atualizarConfig = (req, res) => {
    try {
        const { prompt, modelo, maxOutputTokens } = req.body

        // Verifica se todos os campos obrigatórios foram fornecidos
        if (prompt && modelo && maxOutputTokens) {
            let novaConfig = configStorage.getConfig()
            novaConfig.prompt = prompt
            novaConfig.modelo = modelo
            novaConfig.generationConfig.maxOutputTokens = maxOutputTokens

            configStorage.salvarConfig(novaConfig)

            res.json(gerarRespostaJSON(MENSAGENS_RESPOSTA_JSON.sucesso.atualizarConfiguracao))
        } else {
            res.status(400).json(gerarRespostaJSON(MENSAGENS_RESPOSTA_JSON.erro.camposInvalidos))
        }

    } catch (erro) {
        logger.error(erro)
        res.status(500).json(gerarRespostaJSON(MENSAGENS_RESPOSTA_JSON.erro.atualizarConfiguracao))
    }
}
