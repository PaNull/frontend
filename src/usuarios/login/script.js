const login = () => {
    const email = document.forms.formularioLogin.login.value;
    const password = document.forms.formularioLogin.password.value;

    const request = {
        type:'POST',
        url: `http://localhost:3000/set-session`,
        data: { email, password },
        success: function(response) {
            list = response.data;
        },
        error: () => {
            console.log("ERRO");
        }
    };

    $.ajax(request);
}  
console.log('carregou')


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
