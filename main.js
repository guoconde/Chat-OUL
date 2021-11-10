const dadosPrincipal = {
    nome: ''
}

let txt = ''
const textoLoading = [
    'Conectando ao servidor.',
    'Validando suas informações',
    'Testando Filtros',
    'Sua esposa sabe que você esta aqui?'
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
        document.querySelector('.texto').innerHTML = textoLoading[0]
    }, 1000)
    setInterval(() => {
        document.querySelector('.texto').innerHTML = textoLoading[1]
    }, 2000)
    setInterval(() => {
        document.querySelector('.texto').innerHTML = textoLoading[2]
    }, 3000)
    setInterval(() => {
        document.querySelector('.texto').innerHTML = textoLoading[3]
    }, 4000)
}
