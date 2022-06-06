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
                <td> <input type="button" onclick="location.href='/pages/campeonatos/update?id=${data.id_campeonato}'" value="Editar" class="btnPesquisar"></td>
                <td> <input type="button" onclick="confirmar(${data.id_campeonato})" value="Excluir" class="btnExcluir"></td>   
            </tr> 
        `
        $("#table_especific tbody").append(row);
    })
}

const createRows = () => {
    list.forEach(data => {
        row = `
            <tr>
                <td class="infos_camp"> ${ data.id_campeonato } </td>
                <td class="infos_camp"> ${ data.nome } </td>
                <td class="infos_camp"> ${ data.premiacao } </td>
                <td class="infos_camp"> ${ data.modalidade } </td>
                <td class="infos_camp"> ${ data.qntdTimes } </td>
                <td class="infos_camp"> ${ data.dataStartCampeonato } </td>
                <td class="infos_camp"> ${ data.dataEndCampeonato } </td>
                <td class="infos_camp"> ${ data.etapa } </td>
                <td> <input type="button" onclick="location.href='/pages/campeonatos/update?id=${data.id_campeonato}'" value="Editar" class="btnEditar"></td>
                <td> <input type="button" onclick="confirmar(${data.id_campeonato})" value="Excluir" class="btnExcluir"></td>   
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


function confirmar(id){

    var id = id;
    var x;
    var r=confirm("Tem certeza que deseja excluir este usuário?");

    if (r==true){
        excluirCamp(id)
        //x="você pressionou OK!";
    }
    else{
        x="Você pressionou Cancelar!";
    }
    document.getElementById("demo").innerHTML=x;

}


function excluirCamp(id){

     //FETCH PUT
     const options = {
        method: 'DELETE'
    };

    fetch(`${URL_API}tournament/${id}`, options)
        .then(data => {
            if (!data.ok) {
                throw Error(data.status);
            }
            return data.json();

        }).then(id => {
            console.log(id);
        }).catch(e => {
            console.log(e);
            alert("ERRO ao Deletar Campeonato!")
            return
        });
      
        alert("Campeonato Deletado com Sucesso!")
        window.location.href = '/pages/campeonatos/lista'
       
}