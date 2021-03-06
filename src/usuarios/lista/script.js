var list = [];

var list2 = [];

const createRowsEspecific = () => {
    document.getElementById("table_especific").style.display = 'table';
    list2.forEach(data => {
        row = `
            <tr>
                <td class="infos_users"> ${ data.nome } </td>
                <td class="infos_users"> ${ data.email } </td>
                <td class="infos_users"> ${ data.cargo } </td>
                <td class="infos_users"> ${ data.cpf } </td>
                <td class="infos_users"> ${ data.dataNascimento } </td>
                <td class="infos_users"> ${ data.nacionalidade } </td>
                <td class="infos_users"> <input type="button" onclick="location.href='/usuarios/update?id=${data.id_usuario}'" value="Editar"></td>
                <td class="infos_users"> <input type="button" onclick="confirmar(${data.id_usuario})" value="Excluir"></td>    
            </tr> 
        `
        $("#table_especific tbody").append(row);
    })
}


const createRows = () => {
    list.forEach(data => {
        row = `
            <tr>
                <td class="infos_users"> ${ data.id_usuario } </td>
                <td class="infos_users"> ${ data.nome } </td>
                <td class="infos_users"> ${ data.cargo } </td>
                <td class="infos_users"> ${ data.cpf } </td>
                <td class="infos_users"> ${ data.dataNascimento } </td>
                <td class="infos_users"> ${ data.nacionalidade } </td>
                <td class="infos_users"> <input type="button" onclick="location.href='/usuarios/update?id=${data.id_usuario}'" value="Editar"></td>
                <td class="infos_users"> <input type="button" onclick="confirmar(${data.id_usuario})" value="Excluir"></td>               
            </tr>
        `
        $("#table_body tr:last").after(row) ;
        console.log(data.id_usuario)
    })
}
/* <td><a href="/usuarios/update?id=${data.id_usuario}">Editar Usuario</a></td> */

const getUsers = () => {
    const request = {
        type:'GET',
        url: `${URL_API}users`,
        success: function(response) {
            list = response.data;
            createRows()
        }
    };
    $.ajax(request);
}

const deleteUser = (id) => {
    const request = {
        type:'DELETE',
        url: `${URL_API}user/${id}`,
        success: (response) => {
            getUsers();
            alert(response.message);
        },
        error: (response, status, error) => {
            alert(response.message);
        }
    };
    
    $.ajax(request);
}

const getEspecificUser = (id) => {
    const request = {
        type:'GET',
        url: `${URL_API}user/${id}`,
        success: function({ data }) {
            list2 = [data];
            createRowsEspecific()
        },
        error: () => {
            document.getElementById("table_especific").style.display = 'none';
            alert('Erro')
        }
    };

    $.ajax(request);
}


getUsers();

function teste(){
    var input = document.getElementById("idUser").value;

    clearScreen();
    getEspecificUser(input);
}

function clearScreen(){
    if (list2.length) {
        document.querySelector("#table_especific tbody").deleteRow(0);
        list2 = []
    }
}

function confirmar(id){

    var id = id;
    var x;
    var r=confirm("Tem certeza que deseja excluir este usu??rio?");

    if (r==true){
        excluirUser(id)
        //x="voc?? pressionou OK!";
    }
    else{
        x="Voc?? pressionou Cancelar!";
    }
}


function excluirUser(id){

     //FETCH PUT
     const options = {
        method: 'DELETE'
    };

    fetch(`${URL_API}user/${id}`, options)
        .then(data => {
            if (!data.ok) {
                throw Error(data.status);
            }
            return data.json();

        }).then(id => {
            console.log(id);
        }).catch(e => {
            console.log(e);
            alert("ERRO ao Deletar Usu??rio!")
            return
        });
      
        alert("Usuario Deletado com Sucesso!")
        window.location.href = '/usuarios/lista'
       
}