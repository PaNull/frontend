var values = { };
const id = location.search.slice(1);

const getTournament = () => {
    const request = {
        type:'GET',
        url:`${URL_API}tournament/${id}`,
        success: function(response) {
            values = response.data;
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
        type:'PUT',
        url:`${URL_API}tournament`,
        dataType: "json",
        data: payload,
        success: function(response) {
            alert(response.message)
        }
    };
    $.ajax(request);
}


getTournament()

// FRONT PEGAR OS CAMPOS DE VALUES PARA PREENCHER O FORMULARIO HTML