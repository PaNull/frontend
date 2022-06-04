var list = [];

var list2= [];

const createRowsEspecific = () => {
    document.getElementById("table_especific").style.display = 'table';
    list2.forEach(data => {
        row = `
            <tr>
                <td> ${ data.nome } </td>
                <td> ${ data.premiacao } </td>
                <td> ${ data.modalidade } </td>
                <td> ${ data.qntdTimes } </td>
                <td> ${ data.dataStartCampeonato } </td>
                <td> ${ data.dataEndCampeonato } </td>
                <td> ${ data.etapa } </td>
                <td> <button onclick="deleteUser(${ data.id_usuario })" class="btnExcluir">Excluir Usuario</button></td>
                <td><a href="${data.link}" class="edtUser">Editar Usuario</a></td>
            </tr> 
        `
        $("#table_especific tbody").append(row);
    })
}

const createRows = () => {
    list.forEach(data => {
        row = `
            <tr>
                <td> ${ data.id_campeonato } </td>
                <td> ${ data.nome } </td>
                <td> ${ data.premiacao } </td>
                <td> ${ data.modalidade } </td>
                <td> ${ data.qntdTimes } </td>
                <td> ${ data.dataStartCampeonato } </td>
                <td> ${ data.dataEndCampeonato } </td>
                <td> ${ data.etapa } </td>
                <td> <button class="btnDeletar" onclick="deleteTournament(${ data.id_campeonato })">Excluir Campeonato</button></td>
                <td><a href="${data.link}" class="editarCamp">Editar Campeonato</a></td>
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

const getEspecificTournament = (id) => {
    const request = {
        type:'GET',
        url: `${URL_API}tournament/${id}`,
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

getTournaments()

function tournamentEspecific(){
    var input = document.getElementById("idTournament").value;

    clearScreen();
    getEspecificTournament(input);
}

function clearScreen(){
    if (list2.length) {
        document.querySelector("#table_especific tbody").deleteRow(0);
        list2 = []
    }
}