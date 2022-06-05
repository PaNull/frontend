function cadastrarTeam() {

    let nome = document.getElementsByName("nome")[0].value
    let modalidade = document.getElementsByName("modalidade")[0].value
    let capitao = document.getElementsByName("capitao")[0].value
    
    let elementos = [nome, modalidade, capitao];
    
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

    const payload = {
        nome: nome,
        modalidade: modalidade,
        //capitao: capitao
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
            alert("ERRO ao Cadastrar Time!")
        });

        alert("Time Cadastrado com Sucesso!")
        window.location.href = '/'

}

console.log("script loaded")