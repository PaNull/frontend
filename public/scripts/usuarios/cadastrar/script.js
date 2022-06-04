let list = [];

function cadastrar(){

    let nome = document.getElementsByName("nome")[0].value
    let email = document.getElementsByName("email")[0].value
    let aniversario = document.getElementsByName("dataNascimento")[0].value
    let cpf = document.getElementsByName("cpf")[0].value
    let nacionalidade = document.getElementsByName("nacionalidade")[0].value
    let cargo = document.getElementsByName("cargo")[0].value
    let senha = document.getElementsByName("senha")[0].value
   
   /*      var elemento = document.getElementsByName('a');
  
        for(i=0;i<elemento.length;i++){
           var e = elemento[i];
           console.log(e.value);
        } */
 
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
    console.log(payload)

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
        });


    /* FUNCIONA USANDO FETCH
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

console.log("carregou")