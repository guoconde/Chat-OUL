const dadosPrincipal = {
    nome: ''
}


function entrar() {
    dadosPrincipal.nome = document.querySelector('section input').value

    console.log(dadosPrincipal.nome)

}
