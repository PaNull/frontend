const express = require('express'); //utilizaremos o módulo express 
const session = require('express-session'); //utilizaremos o express-session para manipular as sessões
var request = require('request');
const bodyParser = require('body-parser')

const port = 3000;
var path = require('path'); //utilizaremos o path para manipular e setar os diretórios das views
const app = express(); //chamando o express dentro da variável app

const pageLogin = 'usuarios/login/index'
const pagePerfil = 'usuarios/perfil/index'

//var login = "admin"
//var password = "123"

//fazendo com o que o express utilize as sessions
app.use(session({
    secret: 'dsaghf721365dgyb87d12giuby'
    //definindo o segredo da sessão (token)
})); 


//fazendo com que meu app tbm use o body-parser
app.use(bodyParser.urlencoded({
    extended: true
})); //usado para recuperar os dados do formulário

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use('/public', express.static(path.join(__dirname + '../public')));
app.set('views', path.join(__dirname, '/pages'));

//Public
app.use(express.static(path.join(__dirname, "public")))

/*
app.use('/pages', express.static(path.join(__dirname + 'pages')));
app.set('views', path.join(__dirname, 'pages'));
*/



//Definindo meu post
app.post('/', (req, res) => {

    var options = {
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

    });  
})


//Definindo minha rota - Página inicial
app.get('/', (req, res) => {
    //Verificando se está logado -> só acessa essa pág se estiver logado
    if (req.session.login) {

        window.location(pagePerfil)
         res.render(pagePerfil, {
            login: body.data.nome
        }) //vai para a pag meu perfil 

        //passando login como parâmetro
    } else {
        res.render(pageLogin) //não está logado -> não pode acessar a pág. Fica na pág de login
    }
})


//Definindo minha rota - Logout
app.delete('/logout', (req, res) => {
    if (req.session) {
      req.session.destroy(err => {
        if (err) {
          res.status(400).send('Unable to log out')
        } else {
          res.send('Logout successful')
        }
      });
    } else {
      res.end()
    }
})

//Criando o server
app.listen(port, () => {
    console.log('servidor rodando!');
})