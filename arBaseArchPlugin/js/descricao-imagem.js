/**
 * Envia a elementoImagem para a API e retorna a descrição.
 * @param {HTMLImageElement} elementoImagem - Imagem a ser descrita.
 * @returns {Promise<string>} - Descrição gerada pela IA.
 */
async function obterDescricaoIA(elementoImagem) {
    const formData = new FormData()

    // Captura a elementoImagem a partir da URL (evita CORS em imagens externas)
    const response = await fetch(elementoImagem.src)
    const blob = await response.blob()
    formData.append('imagem', blob, 'image.jpg')

    // Requisição à API interna
    const describeResponse = await fetch('/api/descrever/imagem', {
        method: 'POST',
        body: formData,
    })

    if (!describeResponse.ok) throw new Error('Erro ao obter resposta')

    const data = await describeResponse.json()
    return data.text // Texto descritivo gerado pela IA
}

/**
 * Exibe a descrição com animações e manipula os estados da UI.
 * @param {HTMLElement} elementoTexto - Elemento onde o texto será exibido.
 * @param {HTMLImageElement} elementoImagem - Imagem a ser descrita.
 * @returns {Promise<boolean>} - Sucesso ou falha da operação.
 */
async function exibirDescricaoComAnimacao(elementoTexto, elementoImagem, exibirMarcaIA = false) {
    // Estado inicial: carregando
    elementoTexto.classList.add('animar-sair')
    await new Promise(r => setTimeout(r, 400))
    elementoTexto.textContent = 'Gerando descrição...'
    elementoTexto.className = 'descricao-ia-carregando'
    elementoTexto.classList.add('animar-aparecer')

    try {
        const descricao = await obterDescricaoIA(elementoImagem)

        // Estado de sucesso
        elementoTexto.classList.add('animar-sair')
        await new Promise(r => setTimeout(r, 400))
        elementoTexto.innerHTML = `${exibirMarcaIA ? '<strong>Gerado por IA: </strong>' : ''}${descricao}`
        elementoTexto.className = 'descricao-ia-sucesso'
        elementoTexto.classList.add('animar-aparecer')

        return true
    } catch {
        // Estado de erro
        elementoTexto.classList.add('animar-sair')
        await new Promise(r => setTimeout(r, 400))
        elementoTexto.textContent = 'Não foi possível gerar uma descrição no momento'
        elementoTexto.className = 'descricao-ia-erro'
        elementoTexto.classList.add('animar-aparecer')

        return false
    }
}
