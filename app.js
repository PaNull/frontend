const express = require('express'); //utilizaremos o módulo express 
const session = require('express-session'); //utilizaremos o express-session para manipular as sessões
var request = require('request');

const port = 3000;
var path = require('path'); //utilizaremos o path para manipular e setar os diretórios das views
const app = express(); //chamando o express dentro da variável app

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

//app.use('/public', express.static(path.join(__dirname + '../public')));
//app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, '/pages'));
app.use(express.static('public')) //setando a pasta estática


//Chamando nossas rotas definidas no arquivo 'route.js'
let userRoute = require('./route'); 
app.use('/', userRoute);

//Criando o server
app.listen(port, () => {
    console.log('servidor rodando!');
})