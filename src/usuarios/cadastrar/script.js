function cadastrar() {

    let nome = document.getElementsByName("nome")[0].value
    let email = document.getElementsByName("email")[0].value
    let aniversario = document.getElementsByName("dataNascimento")[0].value
    let cpf = document.getElementsByName("cpf")[0].value
    let nacionalidade = document.getElementsByName("nacionalidade")[0].value
    let cargo = document.getElementsByName("cargo")[0].value
    let senha = document.getElementsByName("senha")[0].value

    let elementos = [nome, email, aniversario, cpf, nacionalidade, cargo, senha];
    
    var campos = document.getElementsByTagName("input");
    
    for(var i = 0; i < elementos.length; i++){
        if(campos[i].value == ""){
            alert("Preencha o campo " + campos[i].name + "!" );
            campos[i].focus();
            return;
        }
    }

    const payload = {
        nome: nome,
        email: email,
        dataNascimento: aniversario,
        cpf: cpf,
        nacionalidade: nacionalidade,
        cargo: cargo,
        senha: senha
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
            alert("ERRO ao Cadastrar usuário!")
        })
        .then(a => {
            alert("Usuario Cadastrado com sucesso!")
            window.location.href = '/'
        });


    /* FETCH GET
    async function getContent(){
        try {
            const response = await fetch(`${URL_API}users`)
            //console.log(response)
            const data = await response.json() //esperando o response transformar em json; colocando em data
            console.log(data)
        } catch (error) {
            console.error(error)
        }
    }
    getContent() */
}

console.log("script loaded")