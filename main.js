const dadosPrincipal = {
    nome: ''
}

let txt = document.querySelector('.texto').innerHTML
const textoLoading = [
    'Conectando ao servidor...',
    'Validando suas informações...',
    'Testando Filtros...',
    'Sua esposa sabe que você esta aqui?',
    'Não vai carregar com essa sua internet...'
]

function entrar(el, classe1, classe2) {
    dadosPrincipal.nome = document.querySelector('section input').value

    if (dadosPrincipal.nome != '') {
        document.querySelector(`.${classe2}`).classList.remove(`${classe2}`)
        document.querySelector(`.${classe1}`).classList.add(`${classe2}`)
    } else {
        alert('Por favor preencha seu nome!')
    }

    msgLoading()

    setTimeout(carregarChat, 100)

}

function msgLoading() {
    setInterval(() => {
        if(txt == '' || txt == textoLoading[4]) {
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

msg.addEventListener('keyup', function(event) {
    if (event.keyCode == 13) {
        event.preventDefault()
        enviarMsg()

        return false
    }
})

function enviarMsg() {
    
    console.log(msg.value)
    msg.value = null
}