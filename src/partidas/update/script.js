function atualizarMatch() {

    let resultado = document.getElementsByName("resultado")[0].value
    let idCampeao = document.getElementsByName("idCampeao")[0].value

    
    let elementos = [resultado, idCampeao];
    
    console.log(elementos)

    var campos = document.getElementsByTagName("input");
   
    for(var i = 0; i < elementos.length; i++){
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
    console.log(id)
    
    const payload = {
        id: id,
        resultado: resultado,
        ganhadorId: idCampeao
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
            alert("ERRO ao Atualizar Partida!")
            return
        });

        window.location.href = '/partidas/lista'
        alert("Partida Atualizada com sucesso!")
}

console.log("script loaded")