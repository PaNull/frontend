const express = require('express');
const router = express.Router();
var request = require('request');

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

router.get("/campeonatos/listaadm", function(req, res){
    hasSession(req, res, './campeonatos/listaAdm/index')
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

router.post('/set-session', async (req, res) => {
    const payload = {...req.body };
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
    });  
})

module.exports = router;