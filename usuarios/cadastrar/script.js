const createUser = () => {
    const formValues = document.forms.cadastrarUsuario
    const payload = {
        nome: formValues.nome.value,
        dataNascimento: formValues.dataNascimento.value,
        cpf: formValues.cpf.value,
        nacionalidade: formValues.nacionalidade.value,
        senha: formValues.senha.value
    }
    const request = {
        type:'POST',
        url:'https://cors-anywhere.herokuapp.com/https://fho-project-application.herokuapp.com/php_action/user/create.php',
        data: payload,
        success: function(data) {
            console.log(data)

            if(data=="YES"){
                alert("Usuario Criado")
            } else{
                alert("can't create user")
            }
        }
    };
    $.ajax(request);
}