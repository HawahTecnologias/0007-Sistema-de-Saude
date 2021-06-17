
// -------------------------------------------- CONTROLE DE CONEXÃO/VARIÁVEIS -----------------------------------------------------------
let url = "http://localhost:3333/";
let auth = localStorage.getItem('Acess');
function conect() {
    if(auth == null ){
        window.location.replace("0007-Sistema-de-Saude/../pages/login.html"); 
    }
}
function conect2() {
    if(auth == null ){
        window.location.replace("login.html"); 
    }
}
function desconect() {
    localStorage.removeItem('Acess');
}
function clearStorage() {
    localStorage.clear();
}

let msg = {
    400 : '<div class="alert bg-danger alert-danger text-white" role="alert"> <b> Algo está errado(a)!!</b> confira os dados inseridos e tente novamente! </div>',
    401 : '<div class="alert bg-danger alert-danger text-white" role="alert"> <b> Alerta(a)!!</b> Você não tem autorização para fazer isso! </div>',
    404 : '<div class="alert bg-danger alert-danger text-white" role="alert"> <b> Algo está errado(a)!!</b> confira os dados inseridos e tente novamente! </div>',
    500 : '<div class="alert bg-danger alert-danger text-white" role="alert"> <b> Erro no servidor(a)!!</b> Aguarde ou contate o suporte! </div>',
    200 : '<div class="alert bg-success alert-success text-white" role="alert"> <b> Seja bem vindo(a)!!</b> Estamos lhe direcionando... </div>'
}

//---------------------------------------------- REQUISIÇÔES MÉTODO > POST ----------------------------------------------------
// REQUEST PARA LOGIN NO SISTEMA (Jquery>Ajax).
function login() { 
    let email = $("#email").val();
    let pass = $("#senha").val();
    let form_login = document.querySelector("#form_login");

    form_login.addEventListener("submit", function(event){
            event.preventDefault();
        let request = $.ajax({
            type: "POST",
            url: url+"auth/login",
            xhrFields: { withCredentials: true },
            data: {
                email: email,
                password: pass,
            },  
            cache: false,
        beforeSend: function(){
          $('#preloader .inner').fadeOut();
          $('#preloader').delay(350).fadeOut('slow'); 
          $('body').delay(350).css({'overflow': 'visible'});
        },
        success: function(xhr, ajaxOptions, thrownError){
            $("#login_msg").html(msg[200]);
            // setTimeout(function(){ window.location.href = '../index.html'; }, 2000);
            let token = request.responseText;
            localStorage.setItem('Acess', token);
            setTimeout(function(){ window.location.replace("../index.html"); }, 2000);
            console.log(token);  
        },
        error: function(xhr, ajaxOptions, thrownError) {
            if(request.status == 400 ){
               $("#login_msg").html(msg[400]);
                setInterval(function(){ $("#login_msg").html(''); }, 5000); 
            }else if(request.status == 500 ){
                $("#login_msg").html(msg[500]);
                setInterval(function(){ $("#login_msg").html(''); }, 5000); 
            }
            else if(request.status == 404 ){
                $("#login_msg").html(msg[404]);
                setInterval(function(){ $("#login_msg").html(''); }, 5000); 
            }
            
        console.log(xhr, ajaxOptions, thrownError);
        }
        });
    });
}
//_________________________________________________________________________________________________________________________________ 
       

// REQUEST PARA CADASTRAR PACIENTE (Jquery>Ajax)  
function cad_pacit() { 
            let nome = $("#cad_nome").val(); 
            let sobrenome = $("#cad_sobrenome").val(); 
            let genero = $("#cad_genero option:selected").val(); 
            let etnia = $("#cad_etnia option:selected").val(); 
            let niver = $("#cad_nasci").val(); 
            let plano = $("#cad_plano").val(); 
            let natural = $("#cad_natural").val(); 
            let renda = $("#cad_renda").val();
            let ocupacao = $("#cad_profi").val();  
            let tel_1 = $("#cad_tel_1").val();
            let tel_2 = $("#cad_tel_2").val();
            let cel = $("#cad_cel").val();
            let email = $("#cad_email").val();
            let escolar = $("#cad_escolar").val();
            let conheceu = $("#cad_conheceu").val();
            let rua = $("#cad_rua").val();
            let pais = $("#cad_cidade").val();
            let estado = $("#cad_estado").val();
            let cidade = $("#cad_pais").val();
            let vizinhos = $("#cad_complemento").val();
            let complemento = $("#cad_vizinhos").val();

            let form_cad_pacit = document.querySelector("#form_cad_pacit");
            let request = $.ajax({
                type: "POST",
                url: url+"patient",
                headers: { 'Authorization': 'Bearer ' + auth },
                xhrFields: { withCredentials: true },
                data: {
                    first_name: nome,
                    last_name: sobrenome,
                    gender: genero,
                    ethnicity: etnia,
                    birthdate: niver,
                    health_insurance: plano,
                    nationality: natural,
                    income: renda,
                    occupation: ocupacao,
                    phone: tel_1,
                    second_phone: tel_2,
                    cellphone: cel,
                    email: email,
                    schooling: escolar,
                    street_address: rua,
                    country: pais,
                    state: estado,
                    city: cidade,
                    neighborhood: vizinhos,
                    complement: complemento,
                    how_met: conheceu
                },
                cache: false,
                success: function(response){
                    console.log(response);
                },
                error: function(xhr, ajaxOptions, thrownError) {
                    if (request.status = 401){
                        showErrorToast();
                    }else if(request.status = 400){
                        showAlertaToast();
                    }else if(request.status = 500){
                        showError500Toast();
                    }      
                    console.log(xhr, ajaxOptions, thrownError);
                }   
            })
}
//_________________________________________________________________________________________________________________________________

// REQUEST PARA AGENDAR PACIENTE (Jquery>Ajax)  
function agend_pacit () {
    let data_init = $("#agd_data").val(); 
    let data_fim = $("#agd_data_fim").val(); 
    let etapa = 1; // Não lembro pra que serve
    let consulta_tipo = $("#agd_tipo option:selected").val();
    let agd_status = $("#agd_status  option:selected").val();
    let pacit_id = 1; //Tem que fazer a busca pra pegar ID 
    let user_id = 1; //Tem que fazer a busca pra pegar ID 
    let record_id = 1; // Oq é isso?

    let request = $.ajax({
        type: "POST",
        url: "http://127.0.0.1:3333/appointment",
            xhrFields: { withCredentials: true },
            data: {
                patientId: pacit_id,
                startDate: data_init,
                endDate: data_fim,
                stage: etapa,
                type: consulta_tipo,
                userId: user_id,
                recordId: record_id,
                status: agd_status
            },
            cache: false,
        success: function(response){
            console.log(response);
            showCadAgendaToast()
                    
        },
        error: function(xhr, ajaxOptions, thrownError) {
            if (request.status = 401){
                showCadAgendaToast()
                // showErrorToast();
            }else if(request.status = 400){
                showAlertaToast();
            }
            console.log(xhr, ajaxOptions, thrownError);
            }
    });      
}
//_________________________________________________________________________________________________________________________________



//---------------------------------------------- REQUISIÇÕES MÉTODO > GET ----------------------------------------------------
function allPacits(){
  
    let request = $.ajax({
        type: "GET",
        url: url+"patient",
        headers: { 'Authorization': 'Bearer ' + auth },
        xhrFields: { withCredentials: true },
        data: {
            page : 1,
            perPage: 10
        },    
        cache: false,
        dataType:"json",
    success: function (response) {
        let dados = request.responseText
        let dado = JSON.parse(dados)
        let body = document.getElementById('pacits');
        dado.data.forEach(paciente => {
            let tr = body.insertRow();

            let td_id = tr.insertCell();
            let td_foto = tr.insertCell();
            let td_nome = tr.insertCell();
            let td_idade = tr.insertCell();
            let td_email = tr.insertCell();
            let td_tel = tr.insertCell();
            let td_cad = tr.insertCell();
            let td_actions = tr.insertCell();
            let div = document.createElement("div");
            let a = document.createElement("a");
            let aa = document.createElement("a");
            let aaa = document.createElement("a");
            let i = document.createElement("i");
            let ii = document.createElement("i");
            let iii = document.createElement("i");

            td_actions.appendChild(div);
            div.appendChild(a);
            div.appendChild(aa);
            div.appendChild(aaa);
            a.appendChild(i);
            aa.appendChild(ii);
            aaa.appendChild(iii);

            td_id.innerText = paciente.id
            td_foto.innerText = "foto"
            td_nome.innerText = paciente.first_name +" "+ paciente.last_name
            td_idade.innerText = paciente.birthdate
            td_email.innerText = paciente.email
            td_tel.innerText = paciente.cellphone
            td_cad.innerText = paciente.updated_at
            
            div.classList.add('table-actions');
            i.classList.add('ik', 'ik-eye');
            ii.classList.add('ik', 'ik-edit-2'); 
            iii.classList.add('ik', 'ik-trash-2');
            a.setAttribute("href","#")
            aa.setAttribute("href","#")
            aaa.setAttribute("href","#")
            tr.setAttribute("rule", "row");
        });
        
        
    },
    error: function (xhr, ajaxOptions, thrownError) {
        //Aqui vai o corpo da função caso obtenha erro na requisição
        console.log(xhr, ajaxOptions, thrownError);
    }
    })

}

//____________________________________________________________________________________________________________________________
//REQUEST PARA BUSCAR PACIENTE AGENDA (Jquery>Ajax)

function focando(){
    
    let request = $.ajax({
            type: "GET",
            url: url+"patient",
            headers: { 'Authorization': 'Bearer ' + auth },
            xhrFields: { withCredentials: true },
            data: {
                page : 1,
                perPage: 10
            },    
            cache: false,
            dataType:"json",
            success: function (response, xhr, ajaxOptions, thrownError) {
                let dados = request.responseText
                let dado = JSON.parse(dados)
                console.log(dado.data[0].city)
                $("#agd_nome").autocomplete({source: dado.data[0].city})
                
            },
            error: function (xhr, ajaxOptions, thrownError){
                console.log(xhr, ajaxOptions, thrownError);
            }
        });
    
}
//_________________________________________________________________________________________________________________________________

// $(document).load(function () {
//     form_name.addEventListener("submit", function(event){
//         event.preventDefault();
//         let request = $.ajax({
//             type: "GET",
//             url: url+"/appointment",
//             xhrFields: { withCredentials: true },
//             data: {
//                 dado1: valor1,
//                 dado2: valor2,
//             },    
//             cache: false,
//             dataType:"json",
//         success: function (response) {
//             //Aqui vai o corpo da função caso obtenha sucesso na requisição.
//             console.log(response)
//         },
//         error: function () {
//             //Aqui vai o corpo da função caso obtenha erro na requisição
//         }
//         })
//     });
// });  
//_________________________________________________________________________________________________________________________________
//---------------------------------------------------------------------------------------------------------------------------------


// PADRÃO REQUEST
// $("#id_elemento").click(function (){
//     form_name.addEventListener("submit", function(event){
//         event.preventDefault();
//         let request = $.ajax({
//             type: "POST" aqui vai o tipo de requisição, pode ser GET, POST, PUT, DELETE,
//             url: "link_da_requisição(endpoint)",
//             xhrFields: { withCredentials: true },
//             data: {
//                 dado1: valor1,
//                 dado2: valor2,
//             },    
//             cache: false,
//             dataType:"json",
//         success: function () {
//             //Aqui vai o corpo da função caso obtenha sucesso na requisição.
//         },
//         error: function (xhr, ajaxOptions, thrownError) {
//             //Aqui vai o corpo da função caso obtenha erro na requisição
//         }
//         })
//     });
// })