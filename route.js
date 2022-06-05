const express = require('express');
const app = express(); //chamando o express dentro da variável app

const router = express.Router();

const session = require('express-session'); //utilizaremos o express-session para manipular as sessões
var request = require('request');
const bodyParser = require('body-parser');

/* Body Parser */
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

var path = require('path'); //utilizaremos o path para manipular e setar os diretórios das views
router.use('/public', express.static(path.join(__dirname + '../public')));


router.get("/", function(req, res){
    res.render('index.html')
})

router.get("/campeonatos/cadastrar", function(req, res){
    res.render('./campeonatos/cadastrar/index')
})

router.get("/campeonatos/lista", function(req, res){
    res.render('./campeonatos/lista/index')
})

router.get("/campeonatos/update", function(req, res){
    res.render('./campeonatos/update/index')
})

router.get("/campeonatos/listaadm", function(req, res){
    res.render('./campeonatos/listaAdm/index')
})

router.get("/usuarios/cadastrar", function(req, res){
    res.render('./usuarios/cadastrar/index')
})

router.get("/usuarios/lista", function(req, res){
    res.render('./usuarios/lista/index')
})

router.get("/usuarios/perfil", function(req, res){
    res.render('./usuarios/perfil/index')
})

router.get("/usuarios/update", function(req, res){
    res.render('./usuarios/update/index')
})

router.get("/login", function(req, res){
    res.render('./usuarios/login/index')
})

router.get("/times/cadastrar", function(req, res){
    res.render('./times/cadastrar/index')
})

router.get("/times/lista", function(req, res){
    res.render('./times/lista/index')
})

router.get("/times/update", function(req, res){
    res.render('./times/update/index')
})

//Rota de Login -> Post -> Recebendo os dados do formulário

router.post('/set-session', (req, res) => {
    console.log('chegou aqui')
    // request.post('https://fho-project-application.herokuapp.com/api/user/login', { form:{ ...req.body }}, function (error, response, body) {
    //     if (body?.data) {
            
    //         //logado com sucesso
    //         //criando a sessão
    //         req.session.login = body.data;
    //         sessionUser = body.data;
    
    //         //vai para a pag meu perfil passando login, nome, email, dataNasc {...} como parâmetro
    //         res.render(pagePerfil, {
    //             login: body.data.nome,
    //             nome: body.data.nome,
    //             email: body.data.email,
    //             dataNasc: body.data.dataNascimento,
    //             cpf: body.data.cpf,
    //             nacionalidade: body.data.nacionalidade,
    //             cargo: body.data.cargo                
    //         }); 

    //     } else {
    //         res.render(pageLogin);
    //     }

    // });  
})

/* 
    
    
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

    });  
    }) */

module.exports = router;