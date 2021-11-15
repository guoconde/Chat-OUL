const dadosPrincipal = {
    name: '',
    to: 'Todos',
    text: '',
    tipo: 'message',
}

const contatosRecebidos = []

const montaChat = document.querySelector('div.chat main')

let txt = document.querySelector('.texto').innerHTML
const textoLoading = [
    'Conectando ao servidor...',
    'Validando suas informações...',
    'Testando Filtros...',
    'Sua esposa sabe que você esta aqui?',
    'Não vai carregar com essa sua internet...'
]

function entrar(el, classe1, classe2) {

    dadosPrincipal.name = document.querySelector('section input').value

    if (dadosPrincipal.name != '') {
        document.querySelector(`.${classe2}`).classList.remove(`${classe2}`)
        document.querySelector(`.${classe1}`).classList.add(`${classe2}`)
    } else {
        alert('Por favor preencha seu nome!')
        window.location.reload()
    }

    msgLoading()

    setTimeout(carregarChat, 100)

    axios.post('https://mock-api.driven.com.br/api/v4/uol/participants', {
        name: dadosPrincipal.name
    })
        .then(pegarChat)
        .catch(tratarErro)

    verificaStatus()
    pegarUsuarios()
}

function msgLoading() {
    setInterval(() => {
        if (txt == '' || txt == textoLoading[4]) {
            document.querySelector('.texto').innerHTML = textoLoading[0]
            txt = textoLoading[0]
        } else if (txt == textoLoading[0]) {
            document.querySelector('.texto').innerHTML = textoLoading[1]
            txt = textoLoading[1]
        } else if (txt == textoLoading[1]) {
            document.querySelector('.texto').innerHTML = textoLoading[2]
            txt = textoLoading[2]
        } else if (txt == textoLoading[2]) {
            document.querySelector('.texto').innerHTML = textoLoading[3]
            txt = textoLoading[3]
        } else {
            document.querySelector('.texto').innerHTML = textoLoading[4]
            txt = textoLoading[4]
        }
    }, 1500)
}

function carregarChat() {
    document.querySelector('section').classList.add('invisivel')
    document.querySelector('div.chat').classList.remove('invisivel')
}

const msg = document.querySelector('div.chat input')

msg.addEventListener('keyup', function (event) {
    if (event.keyCode == 13) {
        event.preventDefault()
        enviarMsg()

        return false
    }
})

function enviarMsg() {

    if (msg.value !== '') {
        dadosPrincipal.text = msg.value
    }

    axios.post('https://mock-api.driven.com.br/api/v4/uol/messages', {
        from: dadosPrincipal.name,
        to: dadosPrincipal.to,
        text: msg.value,
        type: dadosPrincipal.tipo,
    })
        .then(pegarChat)

    msg.value = null
}

function pegarChat() {
    axios.get('https://mock-api.driven.com.br/api/v4/uol/messages')
        .then(verificaNome)
}

function verificaNome(resposta) {

    montaChat.innerHTML == ''

    for (let i = 0; i < resposta.data.length; i++) {

        if (resposta.data[i].type == 'status') {
            montaChat.innerHTML += `
                    <div class='status'>
                        <span>(${resposta.data[i].time})</span>
                        <strong>${resposta.data[i].from}</strong>
                        ${resposta.data[i].text}
                    </div>`
        } else if (resposta.data[i].type == 'private_message') {
            montaChat.innerHTML += `
                    <div class='reservada'>
                        <span>(${resposta.data[i].time})</span>
                        <strong>${resposta.data[i].from} </strong>para 
                        <strong>${resposta.data[i].to}:</strong>
                        ${resposta.data[i].text}
                    </div>`
        } else {
            montaChat.innerHTML += `
                    <div class='mensagem'>
                        <span>(${resposta.data[i].time})</span>
                        <strong>${resposta.data[i].from} </strong>para 
                        <strong>${resposta.data[i].to}:</strong>
                        ${resposta.data[i].text}
                    </div>`
        }
    }

    montaChat.scrollIntoView(false)
}

function tratarErro(er) {

    alert('Este nome já foi registrado por outra pessoa')
    window.location.reload()
}

function verificaStatus() {
    setInterval(() => {
        axios.post('https://mock-api.driven.com.br/api/v4/uol/status', dadosPrincipal)
    }, 5000)
}

const montaContatos = document.querySelector('.contatos')

function pegarUsuarios() {

    pegarContatos()

    setInterval(() => {
        axios.get('https://mock-api.driven.com.br/api/v4/uol/participants').then(el => {
            montaContatos.innerHTML = ''

            pegarContatos()
        })
    }, 10000)

}

function pegarContatos() {

    axios.get('https://mock-api.driven.com.br/api/v4/uol/participants').then(el => {
        montaContatos.innerHTML = `
                <li class="nome visivel" onclick='selecionarContato(this)'>
                    <div>
                        <ion-icon name="people"></ion-icon>
                        <p>Todos</p>
                    </div>
                    <ion-icon class="check" name="checkmark-sharp"></ion-icon>
                </li>
        `

        for (let i = 0; i < el.data.length; i++) {
            if (el.data[i].name != dadosPrincipal.name) {
                contatosRecebidos.push(el.data[i].name)
            }

            montaContatos.innerHTML += `
                <li class="nome" onclick='selecionarContato(this)'>
                    <div>
                    <ion-icon name="person-circle"></ion-icon>
                        <p>${contatosRecebidos[i]}</p>
                    </div>
                    <ion-icon class="check" name="checkmark-sharp"></ion-icon>
                </li>
            `
        }

    })
        .catch(tratarErro)
}

function selecionaPrivacidade(elemento) {
    const check = document.querySelector('li.privacidade.visivel')

    if (check !== null) {
        check.classList.remove('visivel')
    }

    elemento.classList.add('visivel')

    dadosPrincipal.tipo = elemento.children[1].classList[1]
}

function selecionarContato(elemento) {
    const check = document.querySelector('li.nome.visivel')

    if (check !== null) {
        check.classList.remove('visivel')
    }

    elemento.classList.add('visivel')

    dadosPrincipal.to = elemento.children[0].children[1].innerHTML
}

