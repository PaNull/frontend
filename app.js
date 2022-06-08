const express = require('express'); //utilizaremos o módulo express 
const session = require('express-session'); //utilizaremos o express-session para manipular as sessões
const bodyParser = require('body-parser');

const port = 3000;
var path = require('path'); //utilizaremos o path para manipular e setar os diretórios das views
const app = express(); //chamando o express dentro da variável app

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.set('views', path.join(__dirname, '/src'));
app.use(express.static('src')) //setando a pasta estática

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(session({
    secret: 'sfdghsakljlojdiowaiowajdioajw',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: true }
  }));

//Chamando nossas rotas definidas no arquivo 'route.js'
let userRoute = require('./route'); 
app.use('/', userRoute);

//Criando o server
app.listen(port, () => {
    console.log('servidor rodando!');
})