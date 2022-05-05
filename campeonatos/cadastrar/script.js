const createTournament = () => {
    const formValues = document.forms.cadastrarCampeonato
    const payload = {
        nome: formValues.nome.value,
        modalidade: formValues.modalidade.value,
        premiacao: formValues.premiacao.value,
        dataCampeonato: formValues.dataCampeonato.value,
        qtdTimes: formValues.qtdTimes.value,
    }
    const request = {
        type:'POST',
        url:`${URL_API}tournament`,
        dataType: "json",
        data: payload,
        success: function(response) {
            alert(response.message)
        }
    };
    $.ajax(request);
}
