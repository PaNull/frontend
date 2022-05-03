var values = { };
const id_usuario = location.search.slice(1);

const getUser = () => {
    const request = {
        type:'GET',
        url:'https://cors-anywhere.herokuapp.com/https://fho-project-application.herokuapp.com/php_action/user/getById.php',
        data: { id_usuario },
        success: function(data) {
            values = JSON.parse(data);
        }
    };
    $.ajax(request);
}

const updateUser = () => {
    const formValues = document.forms.updateUser
    const payload = {
        id_usuario,
        nome: formValues.nome.value,
        dataNascimento: formValues.dataNascimento.value,
        cpf: formValues.cpf.value,
        nacionalidade: formValues.nacionalidade.value
    }
    const request = {
        type:'POST',
        url:'https://cors-anywhere.herokuapp.com/https://fho-project-application.herokuapp.com/php_action/user/update.php',
        data: payload,
        success: function(data) {
            console.log(data)

            if(data=="YES"){
                alert("Usuario Ataulizado")
            } else{
                alert("can't update user")
            }
        }
    };
    $.ajax(request);
}

getUser()

// FRONT PEGAR OS CAMPOS DE VALUES PARA PREENCHER O FORMULARIO HTML