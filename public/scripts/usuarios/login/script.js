function logando(){
    console.log("asdddddddddd")

    const user = document.forms.formularioLogin.login.value;
    const password = document.forms.formularioLogin.password.value;

    var list = [];
    
    //var input = document.getElementById("idUser").value;
    
   
    const getEspecificUser = (id) => {
        const request = {
            type:'GET',
            //url: `${URL_API}user/${id}`,
            url: `${URL_API}user/login`,
            success: function(response) {
                list = response.data;
            },
            error: () => {
                console.log("ERRO");
            }
        };
    
        $.ajax(request);
    }

    getEspecificUser(user);

    console.log(list);
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
