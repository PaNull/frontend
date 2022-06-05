function atualizarTeam() {

    let nome = document.getElementsByName("nome")[0].value
    let modalidade = document.getElementsByName("modalidade")[0].value
    let capitao = document.getElementsByName("capitao")[0].value

    let elementos = [nome, modalidade, capitao];
    
    var campos = document.getElementsByTagName("input");
   
    for(var i = 0; i < elementos.length-1; i++){
        if(i==1){
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
        modalidade: modalidade
        //capitao: capitao
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

    fetch(`${URL_API}team`, options)
        .then(data => {
            if (!data.ok) {
                throw Error(data.status);
            }
            return data.json();

        }).then(payload => {
            console.log(payload);
        }).catch(e => {
            console.log(e);
            alert("ERRO ao Atualizar Time!")
        });

        alert("Time Atualizado com sucesso!")
        window.location.href = '/times/lista'
}

console.log("script loaded")
