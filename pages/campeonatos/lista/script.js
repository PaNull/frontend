var list = [];

const createRows = () => {
    list.forEach(data => {
        row = `
            <tr>
                <td> ${ data.nome } </td>
                <td> ${ data.modalidade } </td>
                <td> ${ data.premiacao } </td>
                <td> ${ data.dataCampeonato } </td>
                <td> ${ data.qtdTimes } </td>
                <td> <button onclick="deleteTournament(${ data.id_campeonato })">Excluir Campeonato</button></td>
                <td><a href="${data.link}">Editar Campeonato</a></td>
            </tr>
        `
        $("#table_body tr:last").after(row) ;
    })
}

const getTournaments = () => {
    const request = {
        type:'GET',
        url: `${URL_API}tournaments`,
        success: function(response) {
            list = response.data;
            createRows()
        }
    };
    $.ajax(request);
}

const deleteTournament = (id) => {
    const request = {
        type:'DELETE',
        url: `${URL_API}tournament/${id}`,
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


getTournaments()