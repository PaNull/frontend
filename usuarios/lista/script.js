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
        url:'../../php_action/user/getAll.php',
        success: function(data) {
            list = JSON.parse(data);
            console.log(list)
            createRows()
        }
    };
    $.ajax(request);
}

const deleteUser = (id_usuario) => {
    const request = {
        type:'POST',
        url:'../../php_action/user/delete.php',
        data:{ id_usuario },
        success: function(data) {
            console.log(data)

            if(data=="YES"){
                location.reload();
            } else{
                alert("can't delete the row")
            }
        }
    };
    
    $.ajax(request);
}

getUsers()