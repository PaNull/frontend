function atualizarUser() {

    let nome = document.getElementsByName("nome")[0].value
    let email = document.getElementsByName("email")[0].value
    let aniversario = document.getElementsByName("dataNascimento")[0].value
    let cpf = document.getElementsByName("cpf")[0].value
    let nacionalidade = document.getElementsByName("nacionalidade")[0].value
    let cargo = document.getElementsByName("cargo")[0].value

    let elementos = [nome, email, aniversario, cpf, nacionalidade, cargo];
    
    var url = window.location.href;
    url = url.split('?id=');
    url = url[1];
    console.log(url);

    const id = url;
    
    var campos = document.getElementsByTagName("input");
    
    for(var i = 0; i < elementos.length; i++){
        if(i==5){
            if(cargo == "disabled"){
                alert("Escolha um cargo!");
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
        id: id,
        nome: nome,
        email: email,
        dataNascimento: aniversario,
        cpf: cpf,
        nacionalidade: nacionalidade,
        cargo: cargo
    }

    console.log("chegou no create")

    //FETCH PUT
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    };

    fetch(`${URL_API}user`, options)
        .then(data => {
            if (!data.ok) {
                throw Error(data.status);
            }
            return data.json();

        }).then(payload => {
            console.log(payload);
        }).catch(e => {
            console.log(e);
            alert("ERRO ao Atualizar Usuário!")
        });

        alert("Usuario Atualizado com Sucesso!")
        window.location.href = '/pages/usuarios/lista'

}

console.log("script loaded")