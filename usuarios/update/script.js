var values = { };
const id = location.search.slice(1);

const getUser = () => {
    const request = {
        type:'GET',
        url:`${URL_API}user/${id}`,
        success: function(response) {
            values = response.data;
        }
    };
    $.ajax(request);
}

const updateUser = () => {
    const formValues = document.forms.updateUser
    const payload = {
        id,
        nome: formValues.nome.value,
        dataNascimento: formValues.dataNascimento.value,
        cpf: formValues.cpf.value,
        nacionalidade: formValues.nacionalidade.value
    }
    const request = {
        type:'PUT',
        url:`${URL_API}user`,
        dataType: "json",
        data: payload,
        success: function(response) {
            alert(response.message)
        }
    };
    $.ajax(request);
}

getUser()

// FRONT PEGAR OS CAMPOS DE VALUES PARA PREENCHER O FORMULARIO HTML