console.log(meuUser.id_usuario)

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
                <td> <input type="button" onclick="confirmar(${data.id_time})" value="Entrar" class="btnEntrar"></td>   
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
                <td> <input type="button" onclick="confirmar(${data.id_time})" value="Entrar" class="btnEntrar"></td>   
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

    funcao = funcaoNoTime()

    var id = id;
    var x;
    var r=confirm("Tem certeza que deseja entrar este time?");

    if (r==true){
        entrarTime(id, funcao)
    }
    else{
        x="Você pressionou Cancelar!";
    }
}

function funcaoNoTime(){
    
    var funcao = prompt("Qual sua posição no time? Ex: Lateral Direito");

    return funcao

}


function entrarTime(id, funcao){


    const payload = {
        userId: meuUser.id_usuario,
        teamId: id,
        funcao: funcao
    }

    console.log("chegou no create")

    //FETCH POST
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    };

    fetch(`${URL_API}team`, options)
        .then(data => {
            if (!data.ok) {
                throw Error(data.status);
            }
            return data.json();

        }).then(payload => {
            console.log(payload);
        }).catch(e => {
            console.log(e);
            alert("ERRO ao Cadastrar Time!")
        });

        alert("Você entrou no time!") 
        window.location.href = '/times/listaView'

}