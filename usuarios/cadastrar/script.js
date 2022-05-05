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
        url:`${URL_API}user`,
        dataType: "json",
        data: payload,
        success: function(response) {
            alert(response.message)
        }
    };
    $.ajax(request);
}