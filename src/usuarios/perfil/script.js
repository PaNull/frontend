usuarioLogado = JSON.parse(user.replace(/&#34;/g,'"'));
console.log(usuarioLogado)


var list = [];

list = usuarioLogado;

const createRows = () => {
   
        row = `
            <tr>
                <td class="infos_users"> ${ usuarioLogado.id_usuario } </td>
                <td class="infos_users"> ${ usuarioLogado.nome } </td>
                <td class="infos_users"> ${ usuarioLogado.cargo } </td>
                <td class="infos_users"> ${ usuarioLogado.cpf } </td>
                <td class="infos_users"> ${ usuarioLogado.dataNascimento } </td>
                <td class="infos_users"> ${ usuarioLogado.nacionalidade } </td>     
            </tr>
        `
        $("#table_body tr:last").after(row) ;
        console.log(usuarioLogado.id_usuario)
}


createRows()

function logout(){
    
    usuarioLogado = null
    window.location.href = '/'
}