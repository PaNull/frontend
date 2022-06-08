usuarioLogado = JSON.parse(user.replace(/&#34;/g,'"'));
console.log(usuarioLogado)



/* const logout = (nome) => {
const pageLogin = 'usuarios/login/index'

    const request = {
        type:'GET',
        url:'localhost:3000/logout',
        dataType: "json",
        success: function(response) {
            alert(response.message)
        }
    };
    //window.location.href="../login/index.html"
    res.render(pageLogin)
} */