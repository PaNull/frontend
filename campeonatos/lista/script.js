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
        url:'../../php_action/tournament/getAll.php',
        success: function(data) {
            list = JSON.parse(data);
            console.log(list)
            createRows()
        }
    };
    $.ajax(request);
}

const deleteTournament = (id_campeonato) => {
    const request = {
        type:'POST',
        url:'../../php_action/tournament/delete.php',
        data:{ id_campeonato },
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

getTournaments()