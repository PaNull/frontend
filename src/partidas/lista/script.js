var list = [];

var list2= [];

const createRowsEspecific = () => {
    document.getElementById("table_especific").style.display = 'table';
    list2.forEach(data => {
        row = `
            <tr>
                <td> ${ data.partidaId } </td>
                <td> ${ data.resultado } </td>
                <td> ${ data.dataPartida } </td>
                <td> ${ data.ganhadorId } </td>
                <td> ${ data.teamA.idTime } </td>
                <td> ${ data.teamA.ganhadorId } </td>
                <td> ${ data.teamB.idTime } </td>
                <td> ${ data.teamB.ganhadorId } </td>
                <td> <input type="button" onclick="location.href='/times/update?id=${data.partidaId}'" value="Editar" class="btnEditar"></td>
                <td> <input type="button" onclick="confirmar(${data.partidaId})" value="Excluir" class="btnExcluir"></td>   
            </tr> 
        `
        $("#table_especific tbody").append(row);
    })
}

const createRows = () => {
    list.forEach(data => {
        row = `
            <tr>
            <td> ${ data.partidaId } </td>
            <td> ${ data.resultado } </td>
            <td> ${ data.dataPartida } </td>
            <td> ${ data.ganhadorId } </td>
            <td> ${ data.teamA.idTime } </td>
            <td> ${ data.teamA.ganhadorId } </td>
            <td> ${ data.teamB.idTime } </td>
            <td> ${ data.teamB.ganhadorId } </td>
            <td> <input type="button" onclick="location.href='/times/update?id=${data.partidaId}'" value="Editar" class="btnEditar"></td>
            <td> <input type="button" onclick="confirmar(${data.partidaId})" value="Excluir" class="btnExcluir"></td> 
            </tr>
        `
        $("#table_body tr:last").after(row) ;
    })
}


const getMatch = () => {
    const request = {
        type:'GET',
        url: `${URL_API}matches`,
        success: function(response) {
            list = response.data;
            createRows()
        }
    };
    $.ajax(request);
}

const deleteMatch = (id) => {
    const request = {
        type:'DELETE',
        url: `${URL_API}matches/${id}`,
        success: (response) => {
            getMatch();
            alert(response.message);
        },
        error: (response, status, error) => {
            alert(response.message);
        }
    };
    
    $.ajax(request);
}

const getEspecificMatch = (id) => {
    const request = {
        type:'GET',
        url: `${URL_API}matches/${id}`,
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

getMatch()

function matchEspecific(){
    var input = document.getElementById("idMatch").value;

    clearScreen();
    getEspecificMatch(input);
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
    var r=confirm("Tem certeza que deseja excluir esta partida?");

    if (r==true){
        excluirMatch(id)
    }
    else{
        x="Você pressionou Cancelar!";
    }
}


function excluirMatch(id){

     //FETCH PUT
     const options = {
        method: 'DELETE'
    };

    fetch(`${URL_API}match/${id}`, options)
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
      
        alert("Partida Deletada com Sucesso!")
        window.location.href = '/match/lista'
}