function cadastrarPartida() {

    let timeA = document.getElementsByName("teamA")[0].value
    let timeB = document.getElementsByName("teamB")[0].value
    let data = document.getElementsByName("data")[0].value
    let id = document.getElementsByName("idCamp")[0].value
    
    let elementos = [timeA, timeB, data, id];
    
    var campos = document.getElementsByTagName("input");
   
    for(var i = 0; i < elementos.length; i++){
        if(campos[i].value == ""){
            alert("Preencha o campo " + campos[i].name + "!" );
            campos[i].focus();
            return;
        }
    }

    const payload = {
        idTeamA: timeA,
        idTeamB: timeB,
        dataPartida: data,
        idCampeonato: id
    }

    console.log("chegou no create")

   //FETCH POST
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    };

    fetch(`${URL_API}match`, options)
        .then(data => {
            if (!data.ok) {
                throw Error(data.status);
            }
            return data.json();

        }).then(payload => {
            console.log(payload);
        }).catch(e => {
            console.log(e);
            alert("ERRO ao Cadastrar Partida!")
        });

        alert("Partida Cadastrada com Sucesso!")
        window.location.href = '/'

}

console.log("script loaded")