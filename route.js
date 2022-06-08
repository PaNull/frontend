const express = require('express');
const router = express.Router();
var request = require('request');
const bodyParsers = require('body-parser')

let usuarioLogado = null

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
const { response } = require('express');
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
 
router.post("/login/teste", async function(req, res){
    
    const pagePerfil = '/usuarios/perfil'

    let email = req.body.login; //pega a informação do campo enviado por POST
    let password = req.body.password;
    
    //FETCH POST
    const response = await logar(email, password);
    usuarioLogado = response

    //CRIAR A SESSAO
    req.session.email = email
    req.session.password = password
    req.session.id = response.id_usuario

    if(req.session.email){
        console.log('entrou no req session')
        console.log(response)
        res.render('./usuarios/perfil/index', {user: JSON.stringify(response)})
    }
    else{
        res.render('/login')
    }
    
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
})

module.exports = router;