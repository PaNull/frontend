const pagePerfil = '/usuarios/perfil'


async function logando(email, password){
    const URL_API = 'https://fho-project-application.herokuapp.com/api/'
    const fetch = require("node-fetch");

   /*  let email = document.getElementsByName("login")[0].value
    let password = document.getElementsByName("password")[0].value

    var info = new Boolean(false) */

    //console.log('entrou no logando!')

    const payload = {
        email: email,
        password: password
    }

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    };
    
/*     //FETCH POST
    teste = (async () => {
        const rawResponse = await fetch(`${URL_API}user/login`, options)
        respostaID = await rawResponse.json(); 
        //return await rawResponse.json();      
        //console.log(content.data.id_usuario);
    })();

    //console.log(Promise.resolve(teste))
     */
    let conteudo

    await fetch(`${URL_API}user/login`, options)
    .then(response => {
        return response.json()
      })
      .then(data => {
        // Work with JSON data here
        conteudo = data
        //return(data)
      })
      .catch(err => {
        // Do something for an error here
      })
      return(conteudo.data)
}

/* function cria_cookie(nome, valor) {
    // Cria uma data 01/01/2020
    var data = new Date(2020,0,01);
    // Converte a data para GMT
    data = data.toGMTString();
    // Codifica o valor do cookie para evitar problemas
    valor = encodeURI(valor);
    // Cria o novo cookie
    document.cookie = nome + '=' + valor + '; expires=' + data + '; path=/';
}


// Obtém o valor de um cookie
// Envie o nome do cookie como parâmetro
function valor_cookie(nome_cookie) {
    // Adiciona o sinal de = na frente do nome do cookie
    var cname = ' ' + nome_cookie + '=';
    
    // Obtém todos os cookies do documento
    var cookies = document.cookie;
    
    // Verifica se seu cookie existe
    if (cookies.indexOf(cname) == -1) {
        return false;
    }
    
    // Remove a parte que não interessa dos cookies
    cookies = cookies.substr(cookies.indexOf(cname), cookies.length);

    // Obtém o valor do cookie até o ;
    if (cookies.indexOf(';') != -1) {
        cookies = cookies.substr(0, cookies.indexOf(';'));
    }
    
    // Remove o nome do cookie e o sinal de =
    cookies = cookies.split('=')[1];
    
    // Retorna apenas o valor do cookie
    return decodeURI(cookies);
}
module.exports = valor_cookie;

module.exports = cria_cookie;
 */
module.exports = logando;