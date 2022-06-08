var list = [];

var list2= [];

const createRowsEspecific = () => {
    document.getElementById("table_especific").style.display = 'table';
    list2.forEach(data => {
        /* console.log(data)
        console.log(data.teamA.idTime) */
        row = `
            <tr>
                <td> ${ data.partidaId } </td>
                <td> ${ data.resultado } </td>
                <td> ${ data.dataPartida } </td>
                <td> ${ data.ganhadorId } </td>
                <td> ${ data.teamA.idTime} </td>
                <td> ${ data.teamA.nome } </td>
                <td> ${ data.teamB.idTime } </td>
                <td> ${ data.teamB.nome } </td>
                <td> <input type="button" onclick="location.href='/partidas/update?id=${data.partidaId}'" value="Editar" class="btnEditar"></td>
                <td> <input type="button" onclick="confirmar(${data.partidaId})" value="Excluir" class="btnExcluir"></td>   
            </tr> 
        `
        $("#table_especific tbody").append(row);
    })
}

const createRows = () => {
    list.forEach(data => {
        /* console.log(data)
        console.log(data.teamA.idTime) */
        row = `
            <tr>
            <td> ${ data.partidaId } </td>
            <td> ${ data.resultado } </td>
            <td> ${ data.dataPartida } </td>
            <td> ${ data.ganhadorId } </td>
            <td> ${ data.teamA.idTime} </td>
            <td> ${ data.teamA.nome } </td>
            <td> ${ data.teamB.idTime } </td>
            <td> ${ data.teamB.nome } </td>
            <td> <input type="button" onclick="location.href='/partidas/update?id=${data.partidaId}'" value="Editar" class="btnEditar"></td>
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
        url: `${URL_API}match/${id}`,
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
        url: `${URL_API}match/${id}`,
        success: function({ data }) {
            console.log(data.partidaId)
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