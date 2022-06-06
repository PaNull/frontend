var list = [];

var list2= [];

const createRowsEspecific = () => {
    document.getElementById("table_especific").style.display = 'table';
    list2.forEach(data => {
        row = `
            <tr>
                <td> ${ data.id_time } </td>
                <td> ${ data.nome } </td>
                <td> ${ data.modalidade } </td>
                <td> ${ data.capitao } </td>
                <td> <input type="button" onclick="location.href='/times/update?id=${data.id_time}'" value="Editar" class="btnEditar"></td>
                <td> <input type="button" onclick="confirmar(${data.id_time})" value="Excluir" class="btnExcluir"></td>   
            </tr> 
        `
        $("#table_especific tbody").append(row);
    })
}

const createRows = () => {
    list.forEach(data => {
        row = `
            <tr>
                <td> ${ data.id_time } </td>
                <td> ${ data.nome } </td>
                <td> ${ data.modalidade } </td>
                <td> ${ data.capitao } </td>
                <td> <input type="button" onclick="location.href='/times/update?id=${data.id_time}'" value="Editar"></td>
                <td> <input type="button" onclick="confirmar(${data.id_time})" value="Excluir"></td>   
            </tr>
        `
        $("#table_body tr:last").after(row) ;
    })
}


const getTeams = () => {
    const request = {
        type:'GET',
        url: `${URL_API}teams`,
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
        url: `${URL_API}teams/${id}`,
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

const getEspecificTeam = (id) => {
    const request = {
        type:'GET',
        url: `${URL_API}teams/${id}`,
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

getTeams()

function teamEspecific(){
    var input = document.getElementById("idTeam").value;

    clearScreen();
    getEspecificTeam(input);
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
    var r=confirm("Tem certeza que deseja excluir este time?");

    if (r==true){
        excluirTeam(id)
    }
    else{
        x="Você pressionou Cancelar!";
    }
}


function excluirTeam(id){

     //FETCH PUT
     const options = {
        method: 'DELETE'
    };

    fetch(`${URL_API}team/${id}`, options)
        .then(data => {
            if (!data.ok) {
                throw Error(data.status);
            }
            return data.json();

        }).then(id => {
            console.log(id);
        }).catch(e => {
            console.log(e);
            alert("ERRO ao Deletar Time!")
            return
        });
      
        alert("Time Deletado com Sucesso!")
        window.location.href = '/times/lista'
}