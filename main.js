const dadosPrincipal = {
    nome: ''
}

let txt = document.querySelector('.texto').innerHTML
const textoLoading = [
    'Conectando ao servidor...',
    'Validando suas informações',
    'Testando Filtros',
    'Sua esposa sabe que você esta aqui?',
    'Não vai carregar com essa sua internet...'
]

function entrar() {
    dadosPrincipal.nome = document.querySelector('section input').value

    if (dadosPrincipal.nome != '') {
        document.querySelector('.invisivel').classList.remove('invisivel')
        document.querySelector('.login').classList.add('invisivel')
    } else {
        alert('Por favor preencha seu nome!')
    }

    teste()

    // setInterval(() => {
    //     for (let i = 0; i < textoLoading.length; i++) {

    //         txt.innerHTML = textoLoading[i]
    //     }
    // }, 1000)

}

function teste() {
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
