const createUser = () => {
    const formValues = document.forms.cadastrarUsuario
    const payload = {
        nome: formValues.nome.value,
        email: formValues.email.value,
        dataNascimento: formValues.dataNascimento.value,
        cpf: formValues.cpf.value,
        nacionalidade: formValues.nacionalidade.value,
        cargo: formValues.cargo.value,
        senha: formValues.senha.value
    }
    
    const request = {
        type:'POST',
        url:`${URL_API}user`,
        dataType: 'json',
        contentType: 'application/json',
        success: function(response) {
            alert(response.message)
        },
        data: JSON.stringify(payload),
    };
    
    $.ajax(request);
}