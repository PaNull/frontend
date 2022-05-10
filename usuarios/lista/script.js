var list = [];

var list2 = [];

const createRowsEspecific = () => {
    list2.forEach(data => {
        row = `
        <thead>
            <tr>
                <th>Nome:</th>
                <th>E-mail:</th>
                <th>Cargo:</th>
                <th>CPF</th> 
                <th>Aniversario</th>
                <th>Nacionalidade</th>
                <th></th>
            </tr>
         </thead>
            <tr>
                <td> ${ data.nome } </td>
                <td> ${ data.email } </td>
                <td> ${ data.cargo } </td>
                <td> ${ data.cpf } </td>
                <td> ${ data.dataNascimento } </td>
                <td> ${ data.nacionalidade } </td>
                <td> <button onclick="deleteUser(${ data.id_usuario })">Excluir Usuario</button></td>
                <td><a href="${data.link}">Editar Usuario</a></td>
            </tr>
        `
        $("#table_especific tr:last").after(row) ;
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
        success: function(response) {
            list2 = [response.data];
            createRowsEspecific()
        }
    };

    $.ajax(request);
}


getUsers();

function teste(){

    clearScreen();

    var input = document.getElementById("idUser").value;

    alert(input);

    getEspecificUser(input);
}

function clearScreen(){
    $('#table_especific').html(""); //Limpando o resultado
}