var list = [];

var list2 = [];

const createRowsEspecific = () => {
    document.getElementById("table_especific").style.display = 'table';
    list2.forEach(data => {
        row = `
            <tr>
                <td> ${ data.nome } </td>
                <td> ${ data.email } </td>
                <td> ${ data.cargo } </td>
                <td> ${ data.cpf } </td>
                <td> ${ data.dataNascimento } </td>
                <td> ${ data.nacionalidade } </td>
                <td> <button onclick="deleteUser(${ data.id_usuario })" class="btnExcluir">Excluir Usuario</button></td>
                <td><a href="${data.link}" class="editarUsuario">Editar Usuario</a></td>
            </tr> 
        `
        $("#table_especific tbody").append(row);
    })
}

const createRows = () => {
    list.forEach(data => {
        row = `
            <tr>
                <td> ${ data.id_usuario } </td>
                <td> ${ data.nome } </td>
                <td> ${ data.cargo } </td>
                <td> ${ data.cpf } </td>
                <td> ${ data.dataNascimento } </td>
                <td> ${ data.nacionalidade } </td>
                <td> <button onclick="deleteUser(${ data.id_usuario })">Excluir Usuario</button></td>
                <td><a href="${data.link}">Editar Usuario</a></td>
            </tr>
        `
        $("#table_body tr:last").after(row) ;
    })
}

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
            alert('Se ferrou babaca')
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