const express = require('express'); //utilizaremos o módulo express 
const session = require('express-session'); //utilizaremos o express-session para manipular as sessões
var request = require('request');
const bodyParser = require('body-parser')

const port = 3000;
var path = require('path'); //utilizaremos o path para manipular e setar os diretórios das views
const app = express(); //chamando o express dentro da variável app

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use('/public', express.static(path.join(__dirname + '../public')));
app.set('views', path.join(__dirname, '/pages'));

app.get("/", function(req, res){
    res.render('index.html')
})

app.get("/pages/campeonatos/cadastrar", function(req, res){
    res.render('./campeonatos/cadastrar/index')
})

app.get("/pages/campeonatos/lista", function(req, res){
    res.render('./campeonatos/lista/index')
})

app.get("/pages/campeonatos/update", function(req, res){
    res.render('./campeonatos/update/index')
})

app.get("/pages/usuarios/cadastrar", function(req, res){
    res.render('./usuarios/cadastrar/index')
})

app.get("/pages/usuarios/lista", function(req, res){
    res.render('./usuarios/lista/index')
})

app.get("/pages/usuarios/login", function(req, res){
    res.render('./usuarios/login/index')
})

app.get("/pages/usuarios/perfil", function(req, res){
    res.render('./usuarios/perfil/index')
})

app.get("/pages/usuarios/update", function(req, res){
    res.render('./usuarios/update/index')
})


//Criando o server
app.listen(port, () => {
    console.log('servidor rodando!');
})