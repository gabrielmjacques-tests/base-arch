export const MENSAGENS_RESPOSTA_JSON = {
    sucesso: {
        atualizarConfiguracao: 'Configurações atualizadas com sucesso.',
    },

    erro: {
        atualizarConfiguracao: 'Erro ao atualizar as configurações.',
        processamento: 'Erro ao processar a requisição. Tente novamente mais tarde.',
        semImagem: 'Nenhuma imagem foi enviada. Por favor, envie uma imagem para processamento.',
        formatoInvalido: 'O formato do arquivo enviado não preenche os requisitos para descrição.',
        camposInvalidos: 'Certifique-se que todos os campos estão devidamente preenchidos!',
        acessoNegado: 'Acesso negado. Esta rota não está disponível.',
    }
}

/**
 * Função para gerar uma resposta JSON padronizada com uma mensagem específica.
 * @param {Object} mensagem - A mensagem a ser incluída na resposta JSON (Utilize o object MENSAGENS_RESPOSTA_JSON).
 * @return {object} - Um objeto JSON contendo a mensagem.
 */
export const gerarRespostaJSON = (mensagem) => {
    return {
        text: mensagem,
    }
}