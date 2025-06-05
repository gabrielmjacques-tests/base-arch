// Elementos do DOM
const elements = {
    output: document.querySelector('#output'),
    descricaoForm: document.querySelector('#descricaoForm'),
    imagePlaceholder: document.querySelector('#imagePreviewContainer p'),
    imageInput: document.querySelector('#imageInput'),
    imagePreview: document.querySelector('#imagePreviewContainer img'),
    configForm: document.querySelector('#configForm'),
    modelo: document.querySelector('#modelo'),
    maxOutputTokens: document.querySelector('#maxOutputTokens'),
    prompt: document.querySelector('#prompt'),
    descriptionButton: document.querySelector('#descriptionButton'),
    saveConfigButton: document.querySelector('#saveConfigButton'),
    linkModelo: document.querySelector('#linkModelo'),
    descricaoModelo: document.querySelector('#descricaoModelo')
}

async function updateConfig(config) {
    try {
        const response = await fetch('config', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(config)
        })
        const data = await response.json()

        if (response.status == 200)
            return console.log('Configurações atualizadas:', data)
        else
            return console.error('Erro ao atualizar configurações')

    } catch (erro) {
        console.error('Erro ao atualizar configurações:', erro)
    }
}

async function describeImage(formData) {
    try {
        const response = await fetch('descrever/imagem', {
            method: 'POST',
            body: formData
        })
        const data = await response.json()

        if (response.status != 200) {
            console.error('Erro ao descrever imagem:', data)
            return
        }

        elements.output.innerHTML = data.text
        console.log('Descrição gerada:', data)

    } catch (erro) {
        console.error('Erro ao descrever imagem:', erro)
    }
}

// Manipuladores de eventos
elements.imageInput.addEventListener('change', () => {
    if (elements.imageInput.files.length > 0) {
        elements.imagePreview.src = URL.createObjectURL(elements.imageInput.files[0])
    } else {
        elements.imagePlaceholder.innerHTML = "Clique aqui para selecionar a imagem"
        elements.imagePreview.src = ""
    }
})

elements.descricaoForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    if (!elements.imageInput.files[0]) {
        elements.output.innerHTML = "Selecione uma imagem para gerar a descrição."
        return
    }

    elements.descriptionButton.disabled = true
    elements.descriptionButton.innerHTML = "Gerando..."

    const formData = new FormData()
    formData.append('imagem', elements.imageInput.files[0])
    await describeImage(formData)

    elements.descriptionButton.disabled = false
    elements.descriptionButton.innerHTML = "Gerar Descrição"
})

elements.configForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    elements.saveConfigButton.disabled = true
    elements.saveConfigButton.innerHTML = "Salvando..."

    await updateConfig({
        modelo: elements.modelo.value,
        maxOutputTokens: elements.maxOutputTokens.value,
        prompt: elements.prompt.value
    })

    elements.saveConfigButton.disabled = false
    elements.saveConfigButton.innerHTML = "Salvar"
})