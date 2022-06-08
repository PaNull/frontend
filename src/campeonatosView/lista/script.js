var list = [];

var list2= [];

const createRowsEspecific = () => {
    document.getElementById("table_especific").style.display = 'table';
    list2.forEach(data => {
        row = `
            <tr>
                <td class="infos_camp"> ${ data.nome } </td>
                <td class="infos_camp"> ${ data.premiacao } </td>
                <td class="infos_camp"> ${ data.modalidade } </td>
                <td class="infos_camp"> ${ data.qntdTimes } </td>
                <td class="infos_camp"> ${ data.dataStartCampeonato } </td>
                <td class="infos_camp"> ${ data.dataEndCampeonato } </td>
                <td class="infos_camp"> ${ data.etapa } </td>
                <td class="infos_camp"> <input type="button" onclick="Participar(${data.id_campeonato})" value="Participar" class="btnParticipar"></td>   
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
                <td class="infos_camp"> <input type="button" onclick="Participar(${data.id_campeonato})" value="Participar" class="btnParticipar"></td>   
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


/* function confirmar(id){

    var id = id;
    var x;
    var r=confirm("Tem certeza que deseja excluir este campeonato?");

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
        window.location.href = '/campeonatos/lista'
       
} */


function Participar(idCamp){

    //pegar id do usuário e ver se ele é jogador ou técnico
    //se for jogador -> desculpe vc apenas tecnicos podem inscrever o time no campeonato

    //se for tecnico->
        //o time dele pode ser inscrito no camp

    var idUser = prompt("Qual é o seu ID? (você pode consultar na página 'meu perfil')");

    //Get 
    const request = {
        type:'GET',
        url: `${URL_API}user/${idUser}`,
        success: function({ data }) {
            var infoUser = [data.cargo];
            console.log(infoUser)
            if(infoUser == "Tecnico" || infoUser == "Administrador"){
                //CADASTRA NO BANCO
                //usa (idCamp) q vem na funcao
            }
            else{
                alert("Apenas técnicos podem cadastrar o time no campeonato.")
            }
           
        },
        error: () => {
            alert('Erro ao participar do campeonato')
        }
    };

    $.ajax(request); 
    
    
}