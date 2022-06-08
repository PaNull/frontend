const express = require('express');
const router = express.Router();
var request = require('request');
const bodyParsers = require('body-parser')

var logar = require("./src/usuarios/login/script");

var cria_cookie = require("./src/usuarios/login/script");

var valor_cookie = require("./src/usuarios/login/script");


// Importing express-session module
const session = require("express-session")
  
// Importing file-store module
const filestore = require("session-file-store")(session)
  
// Setting up the server
var app = express()





/* Body Parser */

var path = require('path'); //utilizaremos o path para manipular e setar os diretórios das views
router.use('/public', express.static(path.join(__dirname + '../public')));

const hasSession = (req, res, renderPage) => {
    console.log('passou aqui')
    if (req.session.success) {
        console.log('usuario com session')
        res.render(renderPage)
    } else {
        console.log('usuario sem session')
        res.render('./usuarios/login/index')
    }
}

router.get("/", function(req, res){
    res.render('index.html')
})

router.get("/campeonatos/cadastrar", function(req, res){
    hasSession(req, res, './campeonatos/cadastrar/index')
})

router.get("/campeonatos/lista", function(req, res){
    hasSession(req, res, './campeonatos/lista/index')
})

router.get("/campeonatos/update", function(req, res){
    hasSession(req, res, './campeonatos/update/index')
})

router.get("/campeonatosView/lista", function(req, res){
    res.render('./campeonatosView/lista/index')
})

router.get("/usuarios/cadastrar", function(req, res){
    hasSession(req, res, './usuarios/cadastrar/index')
})

router.get("/usuarios/lista", function(req, res){
    hasSession(req, res, './usuarios/lista/index')
})

router.get("/usuarios/perfil", function(req, res){
    hasSession(req, res, './usuarios/perfil/index')
})

router.get("/usuarios/update", function(req, res){
    hasSession(req, res, './usuarios/update/index')
})

router.get("/login", function(req, res){
    res.render('./usuarios/login/index')
})
 
router.post("/login/teste", function(req, res){
    
    const pagePerfil = '/usuarios/perfil'

    let email = req.body.login; //pega a informação do campo enviado por POST
    let password = req.body.password;

    console.log(email, password)
    
    //FETCH POST
    logar(email, password);

    //CRIAR A SESSAO
    req.session.email = email
    req.session.password = password

    console.log(req.session.email)

    if(req.session.email){
        console.log('entrou no req session')
        res.render('./usuarios/perfil/index')
    }
    else{
        res.render('/login', )
    }
    //teste com cookie
    //document.cookie = "campanha=Promo50; expires=Mon, 29 Oct 2018 12:00:00 UTC; path=/";

    /* cria_cookie(email, password);

    valor_cookie(email); */
    
}) 

router.get("/times/cadastrar", function(req, res){
    res.render('./times/cadastrar/index')
})

router.get("/times/lista", function(req, res){
    res.render('./times/lista/index')
})

router.get("/times/listaView", function(req, res){
    res.render('./times/update/index')
})

router.get("/times/update", function(req, res){
    res.render('./times/update/index')
})

router.get("/partidas/cadastrar", function(req, res){
    res.render('./partidas/cadastrar/index')
})

router.get("/partidas/lista", function(req, res){
    res.render('./partidas/lista/index')
})

router.get("/partidas/update", function(req, res){
    res.render('./partidas/update/index')
})

router.get("/sobreProjeto", function(req, res){
    res.render('./sobreProjeto/index')
})

router.get('/session', async (req, res) => {
    res.send('funcionou')
   /*  const payload = {...req.body };
    console.log({payload})
    await request.post('https://fho-project-application.herokuapp.com/api/user/login', {form:payload}, function (error, response, body) {
        console.log({body})
        if (body?.data) {
            req.session.user = body.data;
    
            res.render('/usuarios/perfil', {
                login: body.data.nome,
                nome: body.data.nome,
                email: body.data.email,
                dataNasc: body.data.dataNascimento,
                cpf: body.data.cpf,
                nacionalidade: body.data.nacionalidade,
                cargo: body.data.cargo                
            }); 
        } else {
            res.render('./usuarios/login/index')
        }
    });   */
})

module.exports = router;