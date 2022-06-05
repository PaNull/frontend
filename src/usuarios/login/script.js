function testeDoLogin(){
    const email = document.forms.formularioLogin.login.value;
    const password = document.forms.formularioLogin.password.value;
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    };

    fetch(`http://localhost:3000/set-session`, options)
        .then(data => {
            if (!data.ok) {
                throw Error(data.status);
            }
            return data.json();

        }).then(payload => {
            console.log(payload);
        }).catch(e => {
            console.log(e);
            alert("Essa conta não existe!")
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
        }

    });  */
