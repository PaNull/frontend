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
        url:'https://cors-anywhere.herokuapp.com/https://fho-project-application.herokuapp.com/php_action/tournament/create.php',
        data: payload,
        success: function(data) {
            console.log(data)

            if(data=="YES"){
                alert("Campeonato Criado")
            } else{
                alert("can't create tournament")
            }
        }
    };
    $.ajax(request);
}