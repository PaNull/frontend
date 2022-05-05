var list = [];

const createRows = () => {
    list.forEach(data => {
        row = `
            <tr>
                <td> ${ data.id_usuario } </td>
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

getUsers()