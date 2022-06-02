const express = require('express');
const router = express.Router();

const session = require('express-session'); //utilizaremos o express-session para manipular as sessões
var request = require('request');
const bodyParser = require('body-parser');

var path = require('path'); //utilizaremos o path para manipular e setar os diretórios das views
router.use('/public', express.static(path.join(__dirname + '../public')));

const pageLogin = 'usuarios/login/index'
const pagePerfil = 'usuarios/perfil/index'

router.get("/", function(req, res){
    res.render('index.html')
})

router.get("/pages/campeonatos/cadastrar", function(req, res){
    res.render('./campeonatos/cadastrar/index')
})

router.get("/pages/campeonatos/lista", function(req, res){
    res.render('./campeonatos/lista/index')
})

router.get("/pages/campeonatos/update", function(req, res){
    res.render('./campeonatos/update/index')
})

router.get("/pages/usuarios/cadastrar", function(req, res){
    res.render('./usuarios/cadastrar/index')
})

router.get("/pages/usuarios/lista", function(req, res){
    res.render('./usuarios/lista/index')
})

router.get("/pages/usuarios/perfil", function(req, res){
    res.render('./usuarios/perfil/index')
})

router.get("/pages/usuarios/update", function(req, res){
    res.render('./usuarios/update/index')
})


/*Rota de Login -> Post -> Recebendo os dados do formulário*/
router.post('/pages/usuarios/login', (req, res) => {


    req.body.login //recebendo o conteúdo/input do formuario

    res.send('Texto: '+ req.body.login + " <br> Conteudo: " + req.body.senha) //exibindo o conteudo


  /*   var options = {
        uri : 'https://fho-project-application.herokuapp.com/api/user/login',
        method : 'POST',
        json:true,
        body : {
            "id": req.body.login, 
            "password": req.body.password
        }
    }
    
    console.log("Chegou 1");

    request(options, function (error, response, body) {
    
        console.log("Chegou 2", body);
        
        if (body?.data) {
            
            console.log("Entrou");
            //logado com sucesso
            //criando a sessão
            req.session.login = body.data.nome;
    
            sessaoUsuario = body.data.nome

            //vai para a pag meu perfil passando login, nome, email, dataNasc {...} como parâmetro
            res.render(pagePerfil, {
                login: body.data.nome,
                nome: body.data.nome,
                email: body.data.email,
                dataNasc: body.data.dataNascimento,
                cpf: body.data.cpf,
                nacionalidade: body.data.nacionalidade,
                cargo: body.data.cargo                
            }); 

            console.log('O meu usuário logado é: ', body.data.nome);
            
        } else {
            res.render(pageLogin);
        }

    });   */
})


//Rota de Login -> Get -> (Acessou a pág login -> Verificando se já está logado -> Redireciona caso Sim)
router.get('/pages/usuarios/login', (req, res) => {

    res.render(pageLogin)

    //console.log(req.session.login)


 /* 
    //Verificando se está logado -> só acessa essa pág se estiver logado
    if (req.session.login) {

         res.render(pagePerfil, {
            login: req.session.login
        }) //vai para a pag meu perfil 

        //passando login como parâmetro
    } else {
        res.render(pageLogin) //não está logado -> não pode acessar a pág. Fica na pág de login
    }
*/

})


module.exports = router;