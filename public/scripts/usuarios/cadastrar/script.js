function cadastrar(){

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
    console.log("chegou no create")

    /* const request = {
        type:'POST',
        url:`${URL_API}user`,
        dataType: 'json',
        contentType: 'application/json',
        success: function(response) {
            alert(response.message)
        },
        data: payload,
    };
    
    $.ajax(request); */

    $.post(`${URL_API}user`,{...payload} ,function({ data }){
        alert("Data: " + data );
    });
}

console.log("carregou")