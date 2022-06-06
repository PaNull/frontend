const pagePerfil = '/usuarios/perfil'

function aaaaa(){
    let email = document.getElementsByName("login")[0].value
    let password = document.getElementsByName("password")[0].value

    var info = new Boolean(false)

    const payload = {
        email: email,
        password: password
    }

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    };
    
    //FETCH POST
    fetch(`${URL_API}user/login`, options)
    .then(data => {
        if (!data.ok) {
            throw Error(data.status);
        }
        return data.json();

    }).then(payload => {

        /* console.log(payload);
        console.log('Deu certo')
        console.log(payload.data) */

        if (payload?.data) {
            //logado com sucesso

            //Criando a Sessão:
            // Salva os dados na sessionStorage
            sessionStorage.setItem('user', payload.data.nome);
            //                      'chave', 'valor'

            // Obtém os dados da sessionStorage
            //var data = sessionStorage.getItem('chave');
    
            sessaoUsuario = payload.data.nome

            //res.render(pagePerfil)
            window.location.href = pagePerfil

       /*      res.render(pagePerfil, {
                login: payload.data.nome,
                nome: payload.data.nome,
                email: payload.data.email,
                dataNasc: payload.data.dataNascimento,
                cpf: payload.data.cpf,
                nacionalidade: payload.data.nacionalidade,
                cargo: payload.data.cargo                
            }); */
        }

    }).catch(e => {
        console.log('erro e: ' + e);
        alert("ERRO ao LOGAR usuário!")
    });
}
            


  

   /*  request(options, function (error, response, body) {

        console.log("Chegou 2", body);
        
        if (body?.data) {
            
            console.log("Entrou");
            //logado com sucesso
            //criando a sessão
            req.session.login = body.data.nome;
    
            sessaoUsuario = body.data.nome

            res.render(pagePerfil, {
                login: body.data.nome,
                nome: body.data.nome,
                email: body.data.email,
                dataNasc: body.data.dataNascimento,
                cpf: body.data.cpf,
                nacionalidade: body.data.nacionalidade,
                cargo: body.data.cargo                
            }); 

            //vai para a pag meu perfil passando login, nome, email, dataNasc {...} como parâmetro

            console.log('O meu usuário logado é: ', body.data.nome);
            
        } else {
            res.render(pageLogin);
        } */