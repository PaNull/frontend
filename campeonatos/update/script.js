var values = { };
const id_campeonato = location.search.slice(1);

const getTournament = () => {
    const request = {
        type:'GET',
        url:'../../php_action/user/getById.php',
        data: { id_campeonato },
        success: function(data) {
            values = JSON.parse(data);
        }
    };
    $.ajax(request);
}

const updateTournament = () => {
    const formValues = document.forms.updateTournament
    const payload = {
        id_campeonato,
        nome: formValues.nome.value,
        modalidade: formValues.modalidade.value,
        premiacao: formValues.premiacao.value,
        dataCampeonato: formValues.dataCampeonato.value,
        qtdTimes: formValues.qtdTimes.value,
    }
    const request = {
        type:'POST',
        url:'../../php_action/user/update.php',
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

getTournament()

// FRONT PEGAR OS CAMPOS DE VALUES PARA PREENCHER O FORMULARIO HTML