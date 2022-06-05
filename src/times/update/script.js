function atualizarTorneio() {

    let nome = document.getElementsByName("nome")[0].value
    let modalidade = document.getElementsByName("modalidade")[0].value
    let premiacao = document.getElementsByName("premiacao")[0].value
    let dataStartCamp = document.getElementsByName("dataStartCamp")[0].value
    let dataEndCamp = document.getElementsByName("dataEndCamp")[0].value
    let qtdTimes = document.getElementsByName("qtdTimes")[0].value

    let elementos = [nome, modalidade, premiacao, dataStartCamp, dataEndCamp, qtdTimes];
    
    var campos = document.getElementsByTagName("input");
   
    for(var i = 0; i < elementos.length-1; i++){
        if(i==2){
            if(modalidade == "disabled"){
                alert("Escolha uma modalidade!");
                campos[i].focus();
                return
            }
        }
        if(campos[i].value == ""){
            alert("Preencha o campo " + campos[i].name + "!" );
            campos[i].focus();
            return;
        }
    }
    
    var url = window.location.href;
    url = url.split('?id=');
    url = url[1];
    console.log(url);

    const id = url;
    
    const payload = {
        id: id,
        nome: nome,
        modalidade: modalidade,
        dataStartCampeonato: dataStartCamp,
        dataEndCampeonato: dataEndCamp,
        premiacao: premiacao,
        qntdTimes: qtdTimes
    }

    console.log("chegou no update")

    //FETCH PUT
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    };

    fetch(`${URL_API}tournament`, options)
        .then(data => {
            if (!data.ok) {
                throw Error(data.status);
            }
            return data.json();

        }).then(payload => {
            console.log(payload);
        }).catch(e => {
            console.log(e);
            alert("ERRO ao Atualizar Campeonato!")
        });

        alert("Campeonato Atualizado com sucesso!")
        window.location.href = '/pages/campeonatos/lista'
}

console.log("script loaded")
