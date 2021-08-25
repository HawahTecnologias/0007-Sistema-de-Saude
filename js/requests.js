// const { html } = require("d3-request");

// -------------------------------------------- CONTROLE DE CONEXÃO/VARIÁVEIS -----------------------------------------------------------
let url = "http://www.portomassa.com/";
let cid10 = "https://cid.api.mokasoft.org/cid10";
//let url = "http://127.0.0.1:3333/";  URL para teste local
let auth = localStorage.getItem('Acess');

//Function for show info of user connected
function userDados(){
    let user_dados = JSON.parse(atob(auth.split('.')[1]));
    let user_dado = user_dados.user
    localStorage.setItem('user_id', user_dado.id)
    localStorage.setItem('user_name', user_dado.name)
    localStorage.setItem('user_role', user_dado.role)
    localStorage.setItem('user_espec', user_dado.specialty)
    localStorage.setItem('user_admin', user_dado.isAdmin)
};

//Function for verify if user it is connected
function conect() {
    if(auth == null ){
        window.location.replace("pages/login.html"); 
    }
};

//Function for verify if user it is connected
function conect2() {
    if(auth == null ){
        window.location.replace("login.html"); 
    }
};

//Function for close session of user 
function desconect() {
    clearStorage()
    localStorage.removeItem('Acess');
};

//Function for close session of user all
function clearStorage() {
    localStorage.clear();
};

let msg = {
    400 : '<div class="alert bg-danger alert-danger text-white" role="alert"> <b> Algo está errado(a)!!</b> confira os dados inseridos e tente novamente! </div>',
    401 : '<div class="alert bg-danger alert-danger text-white" role="alert"> <b> Alerta(a)!!</b> Você não tem autorização para fazer isso! </div>',
    404 : '<div class="alert bg-danger alert-danger text-white" role="alert"> <b> Algo está errado(a)!!</b> confira os dados inseridos e tente novamente! </div>',
    500 : '<div class="alert bg-danger alert-danger text-white" role="alert"> <b> Erro no servidor(a)!!</b> Aguarde ou contate o suporte! </div>',
    200 : '<div class="alert bg-success alert-success text-white" role="alert"> <b> Seja bem vindo(a)!!</b> Estamos lhe direcionando... </div>',
    201 : '<div class="alert bg-success alert-success text-white" role="alert"> <b> Cadastrado(a)!!</b> Cadastro efetuado com sucesso! </div>'
}

// ------------------------------------------------------ FUNCTIONS -----------------------------------------------------------

//function for clean the fields of Appointment
function cleanFieldsAppointment(){
    $("#agd_info_id").html("");
    $("#agd_info_nome").html("");
    $("#agd_info_gene").html("");
    $("#agd_info_nasc").html("");
    $("#agd_info_tel1").html("");
    $("#agd_info_tel2").html("");
    $("#agd_info_email").html("");
    $("#agd_info_plano").html("");
}
//Block code functions for apen modal and close modal Update
$(document).ready(function(){
    function onCloseModalRegisterAppointment(){
        $('#register_appointment').on('hide.bs.modal', function (event) {
            cleanFieldsAppointment();
            agendsDayUpdate()
        })
    }
    onCloseModalRegisterAppointment()  
    
    function onCloseModalRegisterPatient(){
        $('#cad_pacit').on('hide.bs.modal', function (event) {
            $('#form_cad_pacit')[0].reset();
            agendsDayUpdate()  
        })    
    }
    onCloseModalRegisterPatient()

    function onCloseModalRegisterRecordMedical(){
        $('#prontuario').on('hide.bs.modal', function (event) {
            localStorage.removeItem('id_record');
            localStorage.removeItem('id_patient_agd');
            localStorage.removeItem('id_agd');
            localStorage.removeItem('id_stage');
            localStorage.removeItem('id_pacit_agd');
            agendsDayUpdate()  
        })    
    }
    onCloseModalRegisterRecordMedical()

    function onOpenModalRegisterRecordMedical(){
        $('#prontuario').on('show.bs.modal', function (event) {
            agendsDayUpdate()  
        })    
    }
    onOpenModalRegisterRecordMedical()
})
//Function for alter status of appointment
function alterStatusAppointment(appo_id_patient,appo_id,status_alter,appo_stage, appo_record){
    $.ajax({
        type: "PUT",
        url: url+"appointment/"+appo_id,
            headers: { 'Authorization': 'Bearer ' + auth },
            xhrFields: { withCredentials: true },
            data: {
                patient_id: appo_id_patient,
                stage: appo_stage,
                user_id: localStorage.getItem('user_id'),
                record_id: appo_record,
                status: status_alter
            },
            cache: false,
        success: function(response){
            console.log("Foi alterado o Status da agenda"+status_alter)
        },
        error: function(xhr, ajaxOptions, thrownError) {
            console.log(xhr, ajaxOptions, thrownError);
        }
    });
}
//Function for start a attendance
function startAttendance(){
    $(document).on('click', '.atender', function(e) {
        e.preventDefault;
            let id_pacit = $(this).closest('tr').find('td[data-id_pacit]').data('id_pacit');
            let id_agd = $(this).closest('tr').find('td[data-id_agd]').data('id_agd');
            let id_record = $(this).closest('tr').find('td[data-id_record]').data('id_record');
            let id_stage = $(this).closest('tr').find('td[data-id_stage]').data('id_stage');
            localStorage.setItem('id_pacit_agd', id_pacit)
            localStorage.setItem('id_agd', id_agd)
            localStorage.setItem('id_record', id_record)
            localStorage.setItem('id_stage', id_stage)
            console.log("Inicio da consulta")
            
            $("#short_list_term").html("")
            $("#long_list_term").html("")
            $("#problem_list_term").html("")
            todoGet(id_pacit, 'open', 'shortTerm', 'short_list_term')
            todoGet(id_pacit, 'open', 'longTerm', 'long_list_term')
            todoGet(id_pacit, 'open', 'problem', 'problem_list_term')
            createHistoricTodo(id_pacit) 
        $.ajax({
            type: "GET",
            url: url+"patient/"+id_pacit,
            headers: { 'Authorization': 'Bearer ' + auth },
            xhrFields: { withCredentials: true },
            data: {},
            cache: false,
            success: function(response){
                alterStatusAppointment(id_pacit, id_agd,'inProgress', id_stage, id_record)
                $("#fullwindowModalLabel").html(response.first_name+" "+response.last_name)
                $("#pront_pacit_nome").html(response.first_name+" "+response.last_name)
                $("#pront_pacit_genero").html(response.gender)
                $("#pront_pacit_etnia").html(response.ethnicity)  
                $("#pront_pacit_nasc").html(response.birthdate)
                $("#pront_pacit_plano").html(response.health_insurance)
                $("#pront_pacit_natural").html(response.city)
                $("#pront_pacit_renda").html(response.income)
                $("#pront_pacit_prof").html(response.occupation)
                $("#pront_pacit_tel").html(response.cellphone+"<br>"+response.phone+"<br>"+response.second_phone)
                $("#pront_pacit_email").html(response.email)
                $("#pront_pacit_grau").html(response.schooling)
                $("#pront_pacit_conheceu").html(response.how_met)
                $("#pront_pacit_endereco").html(response.city+"/"+response.state+", "+response.street_address+" | "+response.complement)
            },
            error: function(xhr, ajaxOptions, thrownError) {      
                console.log(xhr, ajaxOptions, thrownError);
            }
        });
    });
}
//Function for create list historic todo
function createHistoricTodo(patient_id){    
   $.ajax({
        type: "GET",
        url: url+"patient/"+patient_id+"/todo",
        headers: { 'Authorization': 'Bearer ' + auth },
        xhrFields: { withCredentials: true },
        data: {
            page: 1,
            perPage: 100
            // status: status, //open || success || fail || maybe
	        // type: type //shortTerm || longTerm || problem
        },
        cache: false,
        success: function(response){
            console.log(response);
            $("#list_short_term_historic").html('')
            $("#list_long_term_historic").html('')
            $("#list_problem_historic").html('')
            response.data.forEach(function(value, index){
                if(value.status != 'open'){
                    let li = document.createElement('li')
                    let div = document.createElement('div')
                    let div2 = document.createElement('div')
                    let div3 = document.createElement('div')
                    let h4 = document.createElement('h4')
                    
                    let class_status;
                    let element;
                    
                    switch (value.type){
                        case 'shortTerm':
                            element = "list_short_term_historic";
                            break;
                        case 'longTerm':
                            element = "list_long_term_historic";
                            break;
                        case 'problem':
                            element = "list_problem_historic";
                            break;
                        default:
                            break;
                    }
                    switch (value.status){
                        case 'success':
                            class_status = "bg-green";
                            break;
                        case 'maybe':
                            class_status = "bg-yellow";
                            break;
                        case 'fail':
                            class_status = "bg-red";
                            break;
                        default:
                            break;
                    }
                    div.classList.add('bullet', class_status)
                    div2.classList.add('time')
                    div3.classList.add('desc')

                    div2.innerHTML = value.updated_at
                    h4.innerHTML = value.description
                
                    $("#"+element).append(li)
                    li.append(div, div2, div3)
                    div3.append(h4)
                }
            })
            
        },
        error: function(xhr, ajaxOptions, thrownError) {    
            console.log(xhr, ajaxOptions, thrownError);
        }   
    });
}
//Function for create list todo
function createTodo(text, element, id_todo, id_patient){
    
    let div = document.createElement('div');
    let div2 = document.createElement('div');
    let div3 = document.createElement('div');
    let div4 = document.createElement('div');
    let label = document.createElement('label');
    let label2 = document.createElement('label');
    let label3 = document.createElement('label');
    let input = document.createElement('input');
    let input2 = document.createElement('input');
    let input3 = document.createElement('input');
    let i = document.createElement('i');
    let i2 = document.createElement('i');
    let i3 = document.createElement('i');
    let p = document.createElement("p");

    div.classList.add("form-radio", "border_top")
    div2.classList.add("radio", "radiofill", "radio-inline", "radio-success")
    div3.classList.add("radio", "radiofill", "radio-inline", "radio-warning")
    div4.classList.add("radio", "radiofill", "radio-inline", "radio-danger")
    input.classList.add("todo")
    input2.classList.add("todo")
    input3.classList.add("todo")
    i.classList.add("helper")
    i2.classList.add("helper")
    i3.classList.add("helper")
    
    input.setAttribute("type", "radio")
    input2.setAttribute("type", "radio")
    input3.setAttribute("type", "radio")
    input.setAttribute("value", "success")
    input2.setAttribute("value", "maybe")
    input3.setAttribute("value", "fail")
    input.setAttribute("name", "todo"+id_todo)
    input2.setAttribute("name", "todo"+id_todo)
    input3.setAttribute("name", "todo"+id_todo)
    input.setAttribute("data-id_patient", id_patient)
    input2.setAttribute("data-id_patient", id_patient)
    input3.setAttribute("data-id_patient", id_patient)
    input.setAttribute("id", id_todo)
    input2.setAttribute("id", id_todo)
    input3.setAttribute("id", id_todo)

    p.innerHTML = text;
    label.innerHTML = "Sucesso"
    label2.innerHTML = "Parcial"
    label3.innerHTML = "Falha"

    $("#"+element).append(div)
    div.append(div2, div3, div4, p)
    div2.append(label)
    div3.append(label2)
    div4.append(label3)

    label.append(input, i)
    label2.append(input2, i2)
    label3.append(input3, i3)
  } 
//Function for update term and send historic
$(document).on('click', '.todo', function(){
    let status_radio = $(this).val()
    let id_todo = $(this).attr('id')
    let id_patient = $(this).data('id_patient')

    todoPut(id_patient, status_radio, id_todo)
    createHistoricTodo(id_patient)
    todoGet(id_patient, 'open', 'shortTerm', 'short_list_term')
    todoGet(id_patient, 'open', 'longTerm', 'long_list_term')
    todoGet(id_patient, 'open', 'problem', 'problem_list_term')
})
//Function for Get all appointment of day
function agendsDay() {
    let request = $.ajax({
        type: "GET",
        url: url+"appointment",
        headers: { 'Authorization': 'Bearer ' + auth },
        xhrFields: { withCredentials: true },
        data: {
            page: 1,
            perPage: 200
        },    
        cache: false,
        dataType:"json",
        success: function (response) {
            let dados = JSON.parse(request.responseText)
            let dado = dados.data
            let body = document.getElementById('agends_day');
            body.innerHTML = "";
            dado.forEach(agendamento => {
                let data_agd = new Date(agendamento.start_date.substring(0,10)).getTime();
                let data_hoje = new Date(moment().format("YYYY-MM-DD")).getTime();

                if( (data_agd == data_hoje) && (agendamento.status === "waiting" || agendamento.status === "scheduled")){
                    let tr = body.insertRow();
                    let td_id = tr.insertCell();
                    let td_agd_id = tr.insertCell();
                    let td_agd_record = tr.insertCell();
                    let td_agd_stage = tr.insertCell();
                    let td_foto = tr.insertCell();
                    let td_nome = tr.insertCell();
                    let td_tel = tr.insertCell();
                    let td_inicio = tr.insertCell();
                    let td_fim = tr.insertCell();
                    let td_consulta = tr.insertCell();
                    let td_status = tr.insertCell();
                    let td_teste = tr.insertCell(); 
                    let td_actions = tr.insertCell();
                    let div = document.createElement("div");
                    let div2 = document.createElement("div");
                    let a = document.createElement("a");
                    let aa = document.createElement("a");
                    let aaa = document.createElement("a");
                    let i = document.createElement("i");
                
                    td_teste.appendChild(div2);
                    td_actions.appendChild(div);
                    div.appendChild(a);
                    div2.appendChild(aa);
                    div2.appendChild(aaa);
                    a.appendChild(i);

                    aa.innerHTML = "Atender"
                    aaa.innerHTML = "Reagendar"

                    div.classList.add('table-actions');
                    i.classList.add('ik', 'ik-user');
                    div2.classList.add('text-center')
                    a.classList.add('btn', 'btn-icon', 'btn-outline-dark')
                    aa.classList.add('btn', 'btn-outline-success', 'btn-rounded', 'mb-1', 'mr-1', 'atender');
                    aaa.classList.add('btn', 'btn-light', 'btn-rounded'); 
                
                    td_id.setAttribute("data-id_pacit", agendamento.patient_id)
                    td_agd_id.setAttribute("data-id_agd", agendamento.id)
                    td_agd_record.setAttribute("data-id_record", agendamento.record_id)
                    td_agd_stage.setAttribute("data-id_stage", agendamento.stage)
                    td_id.setAttribute("style", "display:none;")
                    td_agd_id.setAttribute("style", "display:none;")
                    td_agd_record.setAttribute("style", "display:none;")
                    td_agd_stage.setAttribute("style", "display:none;")
                    a.setAttribute("id","go_profile")       
                    aa.setAttribute("id","pacitAgd_id_"+agendamento.id+"_"+agendamento.record_id)
                    aa.setAttribute("data-toggle","modal")
                    aa.setAttribute("data-target","#prontuario")
                    aa.setAttribute("href","")
                    aaa.setAttribute("href","")
                    tr.setAttribute("rule", "row");
                    tr.classList.add("odd");
                    //-------
                
                    switch(agendamento.type) {
                        case 'teleconsultation':
                            var type = "Tele Consulta"
                        break;
                        case 'presential':
                            type = "Presencial"
                        break;
                    }
                    switch(agendamento.status) {
                        case 'scheduled':
                            var status = "Agendado"
                        break;
                        case 'waiting':
                            status = "Aguardando"
                        break;
                        case 'inProgress':
                            status = "Em atendimento"
                        break;
                        case 'canceled':
                            status = "Cancelado"
                        break;
                        case 'done':
                            status = "Finalizado"
                        break;
                        case 'confirmed':
                            status = "Confirmado"
                        break;
                        case 'missed':
                            status = "Faltou"
                        break;
                    }

                    let req = $.ajax({
                        type: "GET",
                        url: url+"patient/"+agendamento.patient_id,
                        headers: { 'Authorization': 'Bearer ' + auth },
                        xhrFields: { withCredentials: true },
                        data: {
                            
                        },
                        cache: false,
                        success: function(res){
                            let dia = agendamento.start_date.substring(0,10)
                            let data1 = new Date(dia);
                            let dataFormatada = data1.toLocaleDateString('pt-BR', {timeZone: 'UTC'});
                            let hora = agendamento.start_date.substring(11,16)
                            let hora_fim = agendamento.end_date.substring(11,16)
                            let cell = res.cellphone.substring(3)
                            td_id.innerText = agendamento.id
                            td_foto.innerText = "foto"
                            td_nome.innerText = res.first_name+" "+res.last_name
                            td_tel.innerText = cell
                            td_inicio.innerText = hora
                            td_fim.innerText = hora_fim
                            td_consulta.innerText = type
                            td_status.innerText = status
                        
                        },
                        error: function(xhr, ajaxOptions, thrownError) {
                            console.log(xhr, ajaxOptions, thrownError);
                        }   
                    })
                }
            
        });
        $(document).on('click', '.atender', function(e) {
            e.preventDefault;
                let id_pacit = $(this).closest('tr').find('td[data-id_pacit]').data('id_pacit');
                let id_agd = $(this).closest('tr').find('td[data-id_agd]').data('id_agd');
                let id_record = $(this).closest('tr').find('td[data-id_record]').data('id_record');
                let id_stage = $(this).closest('tr').find('td[data-id_stage]').data('id_stage');
                localStorage.setItem('id_pacit_agd', id_pacit)
                localStorage.setItem('id_agd', id_agd)
                localStorage.setItem('id_record', id_record)
                localStorage.setItem('id_stage', id_stage)
                console.log("Inicio da consulta")
                
                $("#short_list_term").html("")
                $("#long_list_term").html("")
                $("#problem_list_term").html("")
                todoGet(id_pacit, 'open', 'shortTerm', 'short_list_term')
                todoGet(id_pacit, 'open', 'longTerm', 'long_list_term')
                todoGet(id_pacit, 'open', 'problem', 'problem_list_term')
                createHistoricTodo(id_pacit) 
            $.ajax({
                type: "GET",
                url: url+"patient/"+id_pacit,
                headers: { 'Authorization': 'Bearer ' + auth },
                xhrFields: { withCredentials: true },
                data: {},
                cache: false,
                success: function(response){
                    alterStatusAppointment(id_pacit, id_agd,'inProgress', id_stage, id_record)
                    $("#fullwindowModalLabel").html(response.first_name+" "+response.last_name)
                    $("#pront_pacit_nome").html(response.first_name+" "+response.last_name)
                    $("#pront_pacit_genero").html(response.gender)
                    $("#pront_pacit_etnia").html(response.ethnicity)  
                    $("#pront_pacit_nasc").html(response.birthdate)
                    $("#pront_pacit_plano").html(response.health_insurance)
                    $("#pront_pacit_natural").html(response.city)
                    $("#pront_pacit_renda").html(response.income)
                    $("#pront_pacit_prof").html(response.occupation)
                    $("#pront_pacit_tel").html(response.cellphone+"<br>"+response.phone+"<br>"+response.second_phone)
                    $("#pront_pacit_email").html(response.email)
                    $("#pront_pacit_grau").html(response.schooling)
                    $("#pront_pacit_conheceu").html(response.how_met)
                    $("#pront_pacit_endereco").html(response.city+"/"+response.state+", "+response.street_address+" | "+response.complement)
                },
                error: function(xhr, ajaxOptions, thrownError) {      
                    console.log(xhr, ajaxOptions, thrownError);
                }
            });
        });
    
    },
    error: function (xhr, ajaxOptions, thrownError) {
        console.log(xhr, ajaxOptions, thrownError)
        //Aqui vai o corpo da função caso obtenha erro na requisição
    }
    })


};
function agendsDayUpdate() {
    let request = $.ajax({
        type: "GET",
        url: url+"appointment",
        headers: { 'Authorization': 'Bearer ' + auth },
        xhrFields: { withCredentials: true },
        data: {
            page: 1,
            perPage: 200
        },    
        cache: false,
        dataType:"json",
        success: function (response) {
            let dados = JSON.parse(request.responseText)
            let dado = dados.data
            let body = document.getElementById('agends_day');
            body.innerHTML = "";
            dado.forEach(agendamento => {
                let data_agd = new Date(agendamento.start_date.substring(0,10)).getTime();
                let data_hoje = new Date(moment().format("YYYY-MM-DD")).getTime();

                if( (data_agd == data_hoje) && (agendamento.status === "waiting" || agendamento.status === "scheduled")){
                    let tr = body.insertRow();
                    let td_id = tr.insertCell();
                    let td_agd_id = tr.insertCell();
                    let td_agd_record = tr.insertCell();
                    let td_agd_stage = tr.insertCell();
                    let td_foto = tr.insertCell();
                    let td_nome = tr.insertCell();
                    let td_tel = tr.insertCell();
                    let td_inicio = tr.insertCell();
                    let td_fim = tr.insertCell();
                    let td_consulta = tr.insertCell();
                    let td_status = tr.insertCell();
                    let td_teste = tr.insertCell(); 
                    let td_actions = tr.insertCell();
                    let div = document.createElement("div");
                    let div2 = document.createElement("div");
                    let a = document.createElement("a");
                    let aa = document.createElement("a");
                    let aaa = document.createElement("a");
                    let i = document.createElement("i");
                
                    td_teste.appendChild(div2);
                    td_actions.appendChild(div);
                    div.appendChild(a);
                    div2.appendChild(aa);
                    div2.appendChild(aaa);
                    a.appendChild(i);

                    aa.innerHTML = "Atender"
                    aaa.innerHTML = "Reagendar"

                    div.classList.add('table-actions');
                    i.classList.add('ik', 'ik-user');
                    div2.classList.add('text-center')
                    a.classList.add('btn', 'btn-icon', 'btn-outline-dark')
                    aa.classList.add('btn', 'btn-outline-success', 'btn-rounded', 'mb-1', 'mr-1', 'atender');
                    aaa.classList.add('btn', 'btn-light', 'btn-rounded'); 
                
                    td_id.setAttribute("data-id_pacit", agendamento.patient_id)
                    td_agd_id.setAttribute("data-id_agd", agendamento.id)
                    td_agd_record.setAttribute("data-id_record", agendamento.record_id)
                    td_agd_stage.setAttribute("data-id_stage", agendamento.stage)
                    td_id.setAttribute("style", "display:none;")
                    td_agd_id.setAttribute("style", "display:none;")
                    td_agd_record.setAttribute("style", "display:none;")
                    td_agd_stage.setAttribute("style", "display:none;")
                    a.setAttribute("href","#")       
                    aa.setAttribute("id","pacitAgd_id_"+agendamento.id+"_"+agendamento.record_id)
                    aa.setAttribute("data-toggle","modal")
                    aa.setAttribute("data-target","#prontuario")
                    aa.setAttribute("href","")
                    aaa.setAttribute("href","")
                    tr.setAttribute("rule", "row");
                    tr.classList.add("odd");
                    //-------
                
                    switch(agendamento.type) {
                        case 'teleconsultation':
                            var type = "Tele Consulta"
                        break;
                        case 'presential':
                            type = "Presencial"
                        break;
                    }
                    switch(agendamento.status) {
                        case 'scheduled':
                            var status = "Agendado"
                        break;
                        case 'waiting':
                            status = "Aguardando"
                        break;
                        case 'inProgress':
                            status = "Em atendimento"
                        break;
                        case 'canceled':
                            status = "Cancelado"
                        break;
                        case 'done':
                            status = "Finalizado"
                        break;
                        case 'confirmed':
                            status = "Confirmado"
                        break;
                        case 'missed':
                            status = "Faltou"
                        break;
                    }

                    let req = $.ajax({
                        type: "GET",
                        url: url+"patient/"+agendamento.patient_id,
                        headers: { 'Authorization': 'Bearer ' + auth },
                        xhrFields: { withCredentials: true },
                        data: {
                            
                        },
                        cache: false,
                        success: function(res){
                            let dia = agendamento.start_date.substring(0,10)
                            let data1 = new Date(dia);
                            let dataFormatada = data1.toLocaleDateString('pt-BR', {timeZone: 'UTC'});
                            let hora = agendamento.start_date.substring(11,16)
                            let hora_fim = agendamento.end_date.substring(11,16)
                            let cell = res.cellphone.substring(3)
                            td_id.innerText = agendamento.id
                            td_foto.innerText = "foto"
                            td_nome.innerText = res.first_name+" "+res.last_name
                            td_tel.innerText = cell
                            td_inicio.innerText = hora
                            td_fim.innerText = hora_fim
                            td_consulta.innerText = type
                            td_status.innerText = status
                        
                        },
                        error: function(xhr, ajaxOptions, thrownError) {
                            console.log(xhr, ajaxOptions, thrownError);
                        }   
                    })
                }
        });
    
    },
    error: function (xhr, ajaxOptions, thrownError) {
        console.log(xhr, ajaxOptions, thrownError)
        //Aqui vai o corpo da função caso obtenha erro na requisição
    }
    })
}; 

function uploadFile(file, type, patient_id){
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function() {
      let base64 = reader.result.replace("data:", "").replace(/^.+,/, "");
      console.log(type)
      filePost(patient_id, type , file.name, base64)
    };

    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
}
$(document).on('click', 'button[data-upload=true]', function(){
  let inputFile = $(this).prev().prev().find('input[type=file]')[0]
  let typeName = inputFile.getAttribute('name');
  let id_patient = localStorage.getItem('id_pacit_agd');
  let fileList = inputFile.files
  for(let i = 0; i < fileList.length; i++){
    const file = fileList[i]
    uploadFile(file, typeName, id_patient)
  }
  if(fileList.length < 1){
    showUploadError()
  }
})


//---------------------------------------------- REQUISIÇÔES MÉTODO > POST ----------------------------------------------------
// REQUEST PARA LOGIN NO SISTEMA (Jquery>Ajax). [Tudo ok!]
$(document).ready(function(){
let form_login = document.getElementById("form_login");
form_login.addEventListener("submit", function(event){
    event.preventDefault();
    let email = $("#email").val();
    let pass = $("#senha").val();

    let request = $.ajax({
            type: "POST",
            url: url+"auth/login",
            xhrFields: { withCredentials: true },
            data: {
                email: email,
                password: pass,
            },  
            cache: false,
        // beforeSend: function(){
        // },
            success: function(xhr, ajaxOptions, thrownError){
                $("#login_msg").html('');
                $("#login_msg").html(msg[200]);
                // setTimeout(function(){ window.location.href = '../index.html'; }, 2000);
                let token = request.responseText;
                localStorage.setItem('Acess', token);
                setTimeout(function(){ window.location.replace("../index.html"); }, 2000);
            },
            error: function(xhr, ajaxOptions, thrownError) {
                if(request.status == 400 ){
                    $("#login_msg").html(msg[400]);
                    // setInterval(function(){ $("#login_msg").html(''); }, 5000); 
                }else if(request.status == 500 ){
                    $("#login_msg").html(msg[500]);
                    // setInterval(function(){ $("#login_msg").html(''); }, 5000); 
                }else if(request.status == 404 ){
                    $("#login_msg").html(msg[404]);
                    // setInterval(function(){ $("#login_msg").html(''); }, 5000); 
                }else if(request.status == 401 ){
                    $("#login_msg").html(msg[401]);
                    // setInterval(function(){ $("#login_msg").html(''); }, 5000); 
                }
            
            console.log(xhr, ajaxOptions, thrownError);
            }
        });
});
});//_________________________________________________________________________________________________________________________________ 
       
// REQUEST PARA CADASTRAR PACIENTE (Jquery>Ajax)  [O Status response para erro de preenchimento ta como 401 e não 400 | Está cadastrando usuários com 
// campos especificos iguais]
$(document).ready(function(){
    $("#btn_register_patient").on("click", function(){
        let nome = $("#cad_nome").val(); 
        let sobrenome = $("#cad_sobrenome").val(); 
        let genero = $("#cad_genero option:selected").val(); 
        let etnia = $("#cad_etnia option:selected").val(); 
        let niver = $("#cad_nasci").val(); 
        let plano = $("#cad_plano").val(); 
        let natural = $("#cad_natural").val(); 
        let renda = $("#cad_renda").val().replace(/\./g,"").replace("\,", ".");
        let ocupacao = $("#cad_profi").val();  
        let tel_1 = $("#cad_tel_1").val().replace("","+55").replace(/[ \-()]/g,'');
        let tel_2 = $("#cad_tel_2").val().replace("","+55").replace(/[ \-()]/g,'');
        let cel = $("#cad_cel").val().replace("","+55").replace(/[ \-()]/g,'');
        let email = $("#cad_email").val();
        let escolar = $("#cad_escolar").val();
        let conheceu = $("#cad_conheceu").val();
        let rua = $("#cad_rua").val();
        let pais = $("#cad_cidade").val();
        let estado = $("#cad_estado").val();
        let cidade = $("#cad_pais").val();
        let complemento = $("#cad_complemento").val();
        let cep = $("#cad_vizinhos").val().replace(/\./g, "");
         
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
                    cep: cep,
                    complement: complemento,
                    how_met: conheceu
                },
                cache: false,
                success: function(response){
                    show201Toast()
                    $('#cad_pacit').modal('hide');
                    $('#form_cad_pacit')[0].reset();  
                },
                error: function(xhr, ajaxOptions, thrownError) {
                    if (request.statusText == "Unauthorized"){
                        showErrorToast();
                    }else if(request.statusText == "Bad Request"){
                        showAlertaToast();
                    }else if(request.status == 500){
                        showError500Toast();
                    }
                    console.log(xhr, ajaxOptions, thrownError);
                }   
            });
    //  });
    })
}); //_________________________________________________________________________________________________________________________________

// REQUEST PARA AGENDAR PACIENTE (Jquery>Ajax)  [Tudo ok!]
$(document).ready(function(){
   $("#btn_register_appointment").on("click",function(){
    let id_user = localStorage.getItem('user_id');
    let id_pacit = localStorage.getItem('id_patient_agd');

        let data_init = $("#agd_data").val(); 
        let data_fim = $("#agd_data_fim").val(); 
        let etapa = 0; 
        let consulta_tipo = $("#agd_tipo option:selected").val();
        let agd_status = $("#agd_status  option:selected").val();
        let pacit_id = id_pacit;  
        let user_id = id_user; 
        let record_id = 1; 
   
    let request = $.ajax({
            type: "POST",
            url: url+"appointment",
                headers: { 'Authorization': 'Bearer ' + auth },
                xhrFields: { withCredentials: true },
                data: {
                    patient_id: pacit_id,
                    start_date: data_init,
                    end_date: data_fim,
                    stage: etapa,
                    type: consulta_tipo,
                    user_id: user_id,
                    record_id: record_id,
                    status: agd_status
                },
                cache: false,
            success: function(response){
                $('#register_appointment').modal('hide');
                $('#register_appointment_form')[0].reset();
                $(document).ready(function(){
                    showCadAgendaToast()
                    cleanFieldsAppointment()
                    agendsDayUpdate()  
                })
                 
            },
            error: function(xhr, ajaxOptions, thrownError) {
                
                if (request.statusText == "401"){
                    showErrorToast();
                }else if(request.statusText == "Bad Request"){
                    showErrorAgendaToast();
                }
                console.log(xhr, ajaxOptions, thrownError);
                $('#register_appointment').modal('hide');
                $('#register_appointment_form')[0].reset();
                
                
            }
                
        });      
    }) 
});//_________________________________________________________________________________________________________________________________


// REQUEST PARA CADASTRAR USUÀRIO (Jquery>Ajax)  [O Status response para erro de preenchimento ta como 401 e não 400 ]
// function cadUser(){ 
$(document).ready(function(){
    let form_cad_user = document.getElementById("form_cad_user");
    form_cad_user.addEventListener("submit", function(event){
        event.preventDefault();
        let nome = $("#user_nome").val(); 
        let func = $("#user_func option:selected").val(); 
        let espec = $("#user_espec").val(); 
        let cel = $("#user_cel").val(); 
        let fone = $("#user_tel").val(); 
        let email = $("#user_email").val(); 
        let cpf = $("#user_cpf").val(); 
        let registro = $("#user_registro").val();
        let pass = $("#user_senha").val();  
        let pass_confirm = $("#user_senha_confirm").val();
        let admin = localStorage.getItem('user_admin');
            if(func == "doctor"){
                let date_nasc = $("#user_nasc").val();
                let genero = $("#user_gender option:selected").val();
                let uf = $("#uf_crm").val().substring(0, frase.indexOf(' '));
                let nome1 = nome.substring(0, frase.indexOf(' '))
                let sobrenome = nome.substring(frase.indexOf(' '))
                $.ajax({
                    type: "POST",
                    url: 'https://sandbox.api.memed.com.br/v1/sinapse-prescricao/usuarios?api-key=iJGiB4kjDGOLeDFPWMG3no9VnN7Abpqe3w1jEFm6olkhkZD6oSfSmYCm&secret-key=Xe8M5GvBGCr4FStKfxXKisRo3SfYKI7KrTMkJpCAstzu2yXVN4av5nmL',
                    headers: { 'Authorization': 'Bearer ' + auth },
                    xhrFields: { withCredentials: true },
                    Accept: 'application/vnd.api+json',
                    ContentType: 'application/json',
                    data: {
                            data: {
                            type: "usuarios",
                            attributes: {
                                //ID para vincularmos o médico ao parceiro (obrigatório)
                                // Pode ser um documento criptografado por exemplo.
                                external_id: registro+cpf,
                                // Nome do Médico (obrigatório)
                                nome: nome1,
                                // Sobrenome do Médico (Obrigatório)
                                sobrenome: sobrenome,
                                // Data de nascimento (recomendado, não obrigatório)
                                data_nascimento: date_nasc,
                                // CPF do Médico (recomendado, não obrigatório)
                                cpf: cpf,
                                // Email do Médico (recomendado, não obrigatório)
                                email: email,
                                // Estado onde o CRM está cadastrado (obrigatório se informado o CRM)
                                uf: uf,
                                // Sexo (recomendado, não obrigatório)
                                sexo: genero,
                                // CRM (recomendado, não obrigatório)
                                crm: registro
                            },
                            //   relationships: {
                            //   // Cidade do profissional (recomendado, não obrigatório)
                            //    cidade: {
                            //       data: { type: "cidades", "id": "5213" }
                            //     },
                            //     // Especialidade do profissional: Clínica médica, Oftalmologia, etc. (recomendado para otimizarmos nossa busca)
                            //    especialidade: {
                            //       data: { type: "especialidades", "id": "50" }
                            //     }
                            //   }
                            }
                    },
                    cache: false,
                    success: function(response){
                        show201Toast();
                    },
                    error: function(xhr, ajaxOptions, thrownError) {
                        if (request.statusText == "401"){
                            showErrorToast();
                        }else if(request.statusText == "Bad Request"){
                            showAlertaToast();
                        }else if(request.status == 500){
                            showError500Toast();
                        }      
                        console.log(xhr, ajaxOptions, thrownError);
                    }   
                })
            }
            let request = $.ajax({
                    type: "POST",
                    url: url+"user",
                    headers: { 'Authorization': 'Bearer ' + auth },
                    xhrFields: { withCredentials: true },
                    data: {
                        email: email,
                        password: pass,
                        password_confirmation: pass_confirm,
                        specialty: espec,
                        cellphone: cel,
                        phone: fone,
                        cpf: cpf,
                        name: nome,
                        registry: registro,
                        role: func,
                        isAdmin: admin
                    },
                    cache: false,
                    success: function(response){
                        show201Toast();
                    },
                    error: function(xhr, ajaxOptions, thrownError) {
                        if (request.statusText == "401"){
                            showErrorToast();
                        }else if(request.statusText == "Bad Request"){
                            showAlertaToast();
                        }else if(request.status == 500){
                            showError500Toast();
                        }      
                        console.log(xhr, ajaxOptions, thrownError);
                    }   
            })
    });
    });
//};_________________________________________________________________________________________________________________________________

//REQUEST PARA CADASTRAR ANAMNESE DO PRONTUÁRIO 
function anamnesePost(agd_id, record_id) {
    let pront_qp = $("#anam_qp").val(); 
    let pront_hpp = $("#anam_hpp").val(); 
    let pront_hda = $("#anam_hda").val();
    let pront_hps = $("#anam_hps").val(); 
    let pront_hs = $("#anam_hf").val(); 
    // let form_cad_pacit = document.getElementById("form_cad_pacit");
    //  form_cad_pacit.addEventListener("submit", function(event){
    //         event.preventDefault();
     let request = $.ajax({
            type: "POST",
            url: url+"record/"+record_id+"/basic-anamnesis",
            headers: { 'Authorization': 'Bearer ' + auth },
            xhrFields: { withCredentials: true },
            data: {
                appointment_id: agd_id,
                qp: pront_qp,
                hda: pront_hda,
                hpp: pront_hpp,
                hps: pront_hps,
                hs: pront_hs
            },
            cache: false,
            success: function(response){
                show201Toast()
                console.log(response);
            },
            error: function(xhr, ajaxOptions, thrownError) {
                if (request.statusText == "Unatourizado"){ //Corrigir a msg que está errada"!
                    showErrorToast();
                }else if(request.statusText == "Bad Request"){
                    showAlertaToast();
                }else if(request.status == 500){
                    showError500Toast();
                }      
                console.log(xhr, ajaxOptions, thrownError);
            }   
        });  
}
//REQUEST PARA CADASTRAR EXAME FÍSICO DO PRONTUÁRIO
function exameFisPost(agd_id, record_id) {
    let geral =     $('input[name="pront_ef_geral"]:checked').val()+" "+$("#pront_ef_geral").val()
    let pele_fan =  $('input[name="pront_ef_pele"]:checked').val()+" "+$("#pront_ef_pele").val()
    let cab_pes =   $('input[name="pront_ef_cab-pesc"]:checked').val()+" "+$("#pront_ef_cab-pesc").val()
    let ap_res =    $('input[name="pront_ef_ap-resp"]:checked').val()+" "+$("#pront_ef_ap-resp").val()        
    let ap_card =   $('input[name="pront_ef_ap-cardio"]:checked').val()+" "+$("#pront_ef_ap-cardio").val()
    let ap_abd =    $('input[name="pront_ef_ap-abdom"]:checked').val()+" "+$("#pront_ef_ap-abdom").val()
    let ap_uri =    $('input[name="pront_ef_ap-uri"]:checked').val()+" "+$("#pront_ef_ap-uri").val()
    let extremid =  $('input[name="pront_ef_extre"]:checked').val()+" "+$("#pront_ef_extre").val()
    let sis_neu =   $('input[name="pront_ef_sis-neuro"]:checked').val()+" "+$("#pront_ef_sis-neuro").val()
    let osteo =     $('input[name="pront_ef_osteo"]:checked').val()+" "+$("#pront_ef_osteo").val()
    let est_men =   $('input[name="pront_ef_est-mental"]:checked').val()+" "+$("#pront_ef_est-mental").val()
    let func_cort_sup = $('input[name="pront_ef_func-cort-sup"]:checked').val()+" "+$("#pront_ef_func-cort-sup").val()        
    let nerv_cran = $('input[name="pront_ef_nerv-cran"]:checked').val()+" "+$("#pront_ef_nerv-cran").val()
    let motric =    $('input[name="pront_ef_motric"]:checked').val()+" "+$("#pront_ef_motric").val()
    let senso =     $('input[name="pront_ef_sensor"]:checked').val()+" "+$("#pront_ef_sensor").val()
    let reflex =    $('input[name="pront_ef_reflex"]:checked').val()+" "+$("#pront_ef_reflex").val()
    let cerebel =   $('input[name="pront_ef_cerebel"]:checked').val()+" "+$("#pront_ef_cerebel").val()
    let marcha =    $('input[name="pront_ef_marcha"]:checked').val()+" "+$("#pront_ef_marcha").val()
    let outros =    $('input[name="pront_ef_outros"]:checked').val()+" "+$("#pront_ef_outros").val()
    
    // let form_cad_pacit = document.getElementById("form_cad_pacit");
    //  form_cad_pacit.addEventListener("submit", function(event){
    //         event.preventDefault();
     let request = $.ajax({
            type: "POST",
            url: url+"record/"+record_id+"/physical-exam",
            headers: { 'Authorization': 'Bearer ' + auth },
            xhrFields: { withCredentials: true },
            data: {
                appointment_id: agd_id,
                general: geral,
                neurological: sis_neu, //ver se é isso msm
                skin_and_faneros: pele_fan,
                head_and_neck: cab_pes,
                breathing_system: ap_res,
                cardiovascular_system: ap_card,
                abdominal_system: ap_abd,
                urinary_system: ap_uri,
                extremities: extremid,
                neurological_system: sis_neu,
                osteoarticular: osteo,
                mental_state: est_men,
                cortical_functions: func_cort_sup,
                cranial_nercus: nerv_cran,
                motricity: motric,
                sensory: senso,
                reflections: reflex,
                cerebellar: cerebel,
                gait: marcha,
                others: outros
                
            },
            cache: false,
            success: function(response){
                show201Toast()
                console.log(response);
            },
            error: function(xhr, ajaxOptions, thrownError) {
                if (request.statusText == "Unatourizado"){ //Corrigir a msg que está errada"!
                    showErrorToast();
                }else if(request.statusText == "Bad Request"){
                    showAlertaToast();
                }else if(request.status == 500){
                    showError500Toast();
                }      
                console.log(xhr, ajaxOptions, thrownError);
            }   
        });  
}
//REQUEST PARA CADASTRAR HIPÓTESE DIAGNÓSTICA
function hipDiagnostPost(record_id, arr){
    let code = arr; 
    // let form_cad_pacit = document.getElementById("form_cad_pacit");
    //  form_cad_pacit.addEventListener("submit", function(event){
    //         event.preventDefault();
     let request = $.ajax({
            type: "POST",
            url: url+"record/"+record_id+"/diagnosticHypothesis",
            headers: { 'Authorization': 'Bearer ' + auth },
            xhrFields: { withCredentials: true },
            data: {
                code: code
            },
            cache: false,
            success: function(response){
                show201Toast()
                console.log(response);
            },
            error: function(xhr, ajaxOptions, thrownError) {
                if (request.statusText == "Unatourizado"){ //Corrigir a msg que está errada"!
                    showErrorToast();
                }else if(request.statusText == "Bad Request"){
                    showAlertaToast();
                }else if(request.status == 500){
                    showError500Toast();
                }      
                console.log(xhr, ajaxOptions, thrownError);
            }   
        });
}
//REQUEST PARA CADASTRAR CONDUTA
function condutaPost(record_id, arr){
    let conduta = arr; 
    // let form_cad_pacit = document.getElementById("form_cad_pacit");
    //  form_cad_pacit.addEventListener("submit", function(event){
    //         event.preventDefault();
     let request = $.ajax({
            type: "POST",
            url: url+"record/"+record_id+"/conduct",
            headers: { 'Authorization': 'Bearer ' + auth },
            xhrFields: { withCredentials: true },
            data: {
                description: conduta
            },
            cache: false,
            success: function(response){
                show201Toast()
                console.log(response);
            },
            error: function(xhr, ajaxOptions, thrownError) {
                if (request.statusText == "Unatourizado"){ //Corrigir a msg que está errada"!
                    showErrorToast();
                }else if(request.statusText == "Bad Request"){
                    showAlertaToast();
                }else if(request.status == 500){
                    showError500Toast();
                }      
                console.log(xhr, ajaxOptions, thrownError);
            }   
        });
}
//REQUEST PARA CADASTRAR ARQUIVO DO PACIENTE
function filePost(patient_id, type, file_name, base64){
    $.ajax({
        type: "POST",
        url: url+"patient/"+patient_id+"/file",
        headers: { 'Authorization': 'Bearer ' + auth },
        xhrFields: { withCredentials: true },
        data: {
            name: file_name, // exemplo: "imagem.jpg" 
            type: type, //document || photo || exam,
            file: base64//base64 do arquivo    
        },
        cache: false,
        success: function(response){
            console.log(response);
        },
        error: function(xhr, ajaxOptions, thrownError) {    
            console.log(xhr, ajaxOptions, thrownError);
        }   
    });
}
//REQUEST PARA CADASTRAR PLANO DE TRATAMENTO
function todoPost(patient_id, type, todo){
    let request = $.ajax({
        type: "POST",
        url: url+"patient/"+patient_id+"/todo",
        headers: { 'Authorization': 'Bearer ' + auth },
        xhrFields: { withCredentials: true },
        data: {
            type: type, //shortTerm || longTerm || problem
	        description: todo
            
        },
        cache: false,
        success: function(response){
            console.log(response);
        },
        error: function(xhr, ajaxOptions, thrownError) {    
            console.log(xhr, ajaxOptions, thrownError);
        }   
    });
}
//REQUEST PARA MODIFICAR PLANO DE TRATAMENTO
function todoPut(patient_id, status, todo_id){
    let request = $.ajax({
        type: "PUT",
        url: url+"patient/"+patient_id+"/todo/"+todo_id,
        headers: { 'Authorization': 'Bearer ' + auth },
        xhrFields: { withCredentials: true },
        data: {
            status: status, //open || success || fail || maybe            
        },
        cache: false,
        success: function(response){
            console.log(response);
        },
        error: function(xhr, ajaxOptions, thrownError) {    
            console.log(xhr, ajaxOptions, thrownError);
        }   
    });
}
//REQUEST PARA CADASTRAR PLANO DE TRATAMENTO
function todoGet(patient_id, status, type, element_create){
    
    $.ajax({
        type: "GET",
        url: url+"patient/"+patient_id+"/todo",
        headers: { 'Authorization': 'Bearer ' + auth },
        xhrFields: { withCredentials: true },
        data: {
            page: 1,
            perPage: 100,
            status: status, //open || success || fail || maybe
	        type: type //shortTerm || longTerm || problem
            
        },
        cache: false,
        success: function(response){
            console.log(response);
            $("#"+element_create).html('');
            response.data.forEach(function(value, index ){
                createTodo(value.description, element_create, value.id, value.patient_id)
            })
        },
        error: function(xhr, ajaxOptions, thrownError) {    
            console.log(xhr, ajaxOptions, thrownError);
        }   
    });
}
$(document).ready(function(){
    $("#btn_adc_trat_curto").on("click", function(){
        let id_pacit = localStorage.getItem('id_pacit_agd');
        let short_todo = $("#pront_plano_curto").val()
        if(short_todo != ''){
            todoPost(id_pacit, 'shortTerm', short_todo)
            $("#short_list_term").html("")
            todoGet(id_pacit, 'open', 'shortTerm', 'short_list_term')
            
        }else{
            alert("Não deixa esse campo vazio não, pelo amor de Deus")
        }
    })
    $("#btn_adc_trat_longo").on("click", function(){
        let id_pacit = localStorage.getItem('id_pacit_agd');
        let long_todo = $("#pront_plano_longo").val()
        if(long_todo != ''){
            todoPost(id_pacit, 'longTerm', long_todo)
            $("#long_list_term").html("")
            todoGet(id_pacit, 'open', 'longTerm', 'long_list_term')
            
        }else{
            alert("Não deixa esse campo vazio não, pelo amor de Deus")
        }
    })
    $("#btn_adc_problem").on("click", function(){
        let id_pacit = localStorage.getItem('id_pacit_agd');
        let problem_todo = $("#pront_problem").val()
        console.log(problem_todo)
        if(problem_todo != ''){
            todoPost(id_pacit, 'problem', problem_todo)
            $("#problem_list_term").html("")
            todoGet(id_pacit, 'open', 'problem', 'problem_list_term')
            
        }else{
            alert("Não deixa esse campo vazio não, pelo amor de Deus")
        }
    }) 
       
})

$(document).ready(function(){
    let hip_list = []
    $("#btn_adc_hip").on("click", function(){
        let value_hip = $("#pront_busc_hip-diag").val()
        if(value_hip != ""){
            let code = value_hip.substring(0, value_hip.indexOf(' '));
            let nome = value_hip.substring(value_hip.indexOf(' '));
            let li = document.createElement('li');
            let div = document.createElement('div');
            let div2 = document.createElement('div');
            let div3 = document.createElement('div');
            let h4 = document.createElement('h4');
            let btn = document.createElement('button');
            let i = document.createElement('i');

            btn.setAttribute("type", "button");
            i.classList.add('ik', 'ik-trash-2');
            btn.classList.add('btn', 'btn-icon', 'btn-outline-danger', 'delete_hip');
            div.classList.add('bullet', 'bg-red');
            div2.classList.add('time');
            div3.classList.add('desc');
            $("#hip_list").prepend(li);
                li.append(div);
                li.append(div2);
                li.append(div3);
                div3.append(h4);
                h4.innerHTML = nome;
                div2.innerHTML = code;
                li.append(btn)
                btn.append(i)
                
                hip_list.push(code)
        }else{
            alert("O campo está vazio!")
        }
    })
    $(document).on('click', '.delete_hip', function(e) {
        let del_hip = $(this).siblings('.time').html();
        if(hip_list.indexOf(del_hip) > -1){
            hip_list.splice(hip_list.indexOf(del_hip), 1);
           $(this).parent().remove() 
        }        
    })
//---------------------------------------------------------------------------
    let conduta_list = []
    $("#btn_adc_conduta").on("click", function(){
        let conduta = $("#pront_conduta").val()
        if(conduta != ""){
            let li = document.createElement('li');
            let div = document.createElement('div');
            let div2 = document.createElement('div');
            let div3 = document.createElement('div');
            let h4 = document.createElement('h4');
            let btn = document.createElement('button');
            let i = document.createElement('i');

            btn.setAttribute("type", "button");
            i.classList.add('ik', 'ik-trash-2');
            btn.classList.add('btn', 'btn-icon', 'btn-outline-danger', 'delete_cdt');
            div.classList.add('bullet', 'bg-orange');
            div2.classList.add('time');
            div3.classList.add('desc');
            $("#conduta_list").prepend(li);
                li.append(div);
                li.append(div2);
                li.append(div3);
                div3.append(h4);
                h4.innerHTML = conduta;
                div2.innerHTML = "Conduta";
                li.append(btn)
                btn.append(i)

            conduta_list.push(conduta)


        }else{
            alert("O campo está vazio!")
        }
        
    })
    $(document).on('click', '.delete_cdt', function(e) {
        let del_conduta = $(this).siblings('.desc').find('h4').html();
        if(conduta_list.indexOf(del_conduta) > -1){
           conduta_list.splice(conduta_list.indexOf(del_conduta), 1);
           $(this).parent().remove() 
        }        
    })
    

//Register medical record of patient
$(document).on('click', '#pront_aizar', function(e) {
    e.preventDefault;
    let id_agd = localStorage.getItem('id_agd');
    let id_record = localStorage.getItem('id_record');
    let id_stage = localStorage.getItem('id_stage');
    let id_pacit = localStorage.getItem('id_pacit_agd');

    anamnesePost(id_agd, id_record)
    exameFisPost(id_agd, id_record)
    hipDiagnostPost(id_record)
    for(let i = 0; conduta_list.length > i; i++){
      condutaPost(id_record, conduta_list[i])  
    }
    for(let i = 0; hip_list.length > i; i++ ){
       hipDiagnostPost(id_record, hip_list[i]) 
    }
    alterStatusAppointment(id_pacit, id_agd,'done', id_stage, id_record)
});
})
//--------------------------------------------------------------- REQUISIÇÕES MÉTODO > PUT ---------------------------------------------------------------

    //REQUEST PARA ALTERAR STATUS DO AGENDAMENTO
    // $(document).ready(function(){
    //     function statusAgd(id, id_pct, stage, user_id ){
    //         let request = $.ajax({
    //             type: "PUT",
    //             url: url+"appointment/"+id,
    //                 headers: { 'Authorization': 'Bearer ' + auth },
    //                 xhrFields: { withCredentials: true },
    //                 data: {
    //                     patient_id: id_pct,
    //                     start_date: data_init,
    //                     end_date: data_fim,
    //                     stage: etapa,
    //                     type: consulta_tipo,
    //                     user_id: user_id,
    //                     record_id: record_id,
    //                     status: agd_status
    //                 },
    //                 cache: false,
    //             success: function(response){
    //                 console.log(response);
    //                 showCadAgendaToast()
                        
    //             },
    //             error: function(xhr, ajaxOptions, thrownError) {
                    
    //                 if (request.statusText == "401"){
    //                     showErrorToast();
    //                 }else if(request.statusText == "Bad Request"){
    //                     showErrorAgendaToast();
    //                 }
    //                 console.log(xhr, ajaxOptions, thrownError);
    //                 }
    //         });
    //     }
    // })

//--------------------------------------------------------------- REQUISIÇÕES MÉTODO > GET ---------------------------------------------------------------

// REQUEST PARA BUSCAR DE TODOS OS PACIENTES E SEUS DADOS(Jquery>Ajax)
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
        // let body = document.getElementById('pacits');
        function calculaadeId(birthdate, newdate){ return Math.floor(Math.ceil(Math.abs(birthdate.getTime() - newdate.getTime()) / (1000 * 3600 * 24)) / 365.25);}
        dado.data.forEach(patient => {
            let name = patient.first_name + patient.last_name;
            
            
            // let tr = body.insertRow();

            // let td_id = tr.insertCell();
            // let td_foto = tr.insertCell();
            // let td_nome = tr.insertCell();
            // let td_idade = tr.insertCell();
            // let td_email = tr.insertCell();
            // let td_tel = tr.insertCell();
            // let td_cad = tr.insertCell();
            // let td_actions = tr.insertCell();
            // let div = document.createElement("div");
            // let a = document.createElement("a");
            // let aa = document.createElement("a");
            // let aaa = document.createElement("a");
            // let i = document.createElement("i");
            // let ii = document.createElement("i");
            // let iii = document.createElement("i");

            // td_actions.appendChild(div);
            // div.appendChild(a);
            // div.appendChild(aa);
            // div.appendChild(aaa);
            // a.appendChild(i);
            // aa.appendChild(ii);
            // aaa.appendChild(iii);

            // td_id.innerText = paciente.id
            // td_foto.innerText = "foto"
            // td_nome.innerText = paciente.first_name +" "+ paciente.last_name
            // td_idade.innerText = paciente.birthdate
            // td_email.innerText = paciente.email
            // td_tel.innerText = paciente.cellphone
            // td_cad.innerText = paciente.updated_at
            
            // div.classList.add('table-actions');
            // i.classList.add('ik', 'ik-eye');
            // ii.classList.add('ik', 'ik-edit-2'); 
            // iii.classList.add('ik', 'ik-trash-2');
            // a.setAttribute("href","#")
            // aa.setAttribute("href","#")
            // aaa.setAttribute("href","#")
            // tr.setAttribute("rule", "row");
        });
        
        
    },
    error: function (xhr, ajaxOptions, thrownError) {
        //Aqui vai o corpo da função caso obtenha erro na requisição
        console.log(xhr, ajaxOptions, thrownError);
    }
    })

}
//____________________________________________________________________________________________________________________________

    
//____________________________________________________________________________________________________________________________
//REQUEST PARA BUSCA AUTOCOMPLETE AGENDA PACIENTE(Jquery>Ajax)
function agdAutocomplete(){
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
                let agd_pacits = []
                dado.data.forEach(paciente => {
                    agd_pacits.push(paciente.first_name +" "+ paciente.last_name)
                    agd_pacits.push(paciente.email)
                    agd_pacits.push(paciente.cellphone)
                    agd_pacits.push(paciente.phone)
                });
            $("#agd_nome").autocomplete({source: agd_pacits})
                
            },
            error: function (xhr, ajaxOptions, thrownError){
                console.log(xhr, ajaxOptions, thrownError);
            }
        });
    
}//____________________________________________________________________________________________________________________________
function log(){
    let request = $.ajax({
            type: "GET",
            url: url+"log",
            headers: { 'Authorization': 'Bearer ' + auth },
            xhrFields: { withCredentials: true },
            data: {
                page: 1,
                perPage: 100
            },
            cache: false,
            success: function(response){
                console.log(response)  
                
            },
            error: function(xhr, ajaxOptions, thrownError) {
                console.log(xhr, ajaxOptions, thrownError);
            }   
    })
}
//REQUEST PARA BUSCA PACIENTE AGENDA (Jquery>Ajax)
function GetPacit(){    
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
                let pacits = JSON.parse(dados)
                let dado = pacits.data

            let agd_busca = $("#agd_nome").val();
            function agendPacit(array, key, value) {
                for (var i = 0; i < array.length; i++) {
                if (array[i][key] == value) {
                    return i;
                    }
                }
                return null;
            }
            let index = agendPacit(dado, "cellphone", agd_busca);
            let pacit = dado[index];

            if (index == null){
                alert("Paciente não encontrado!")
                cleanFieldsAppointment()
            }
            let id = pacit.id
            let nome = pacit.first_name +" "+pacit.last_name;
            let genero = pacit.gender;
            let nasc = pacit.birthdate;
            let cel = pacit.phone;
            let cel2 = pacit.second_phone;
            let email = pacit.email;
            let plano = pacit.health_insurance;
            
            localStorage.setItem('id_patient_agd', id);
            $("#agd_info_id").html(id);
            $("#agd_info_nome").html(nome);
            $("#agd_info_gene").html(genero);
            $("#agd_info_nasc").html(nasc);
            $("#agd_info_tel1").html(cel);
            $("#agd_info_tel2").html(cel2);
            $("#agd_info_email").html(email);
            $("#agd_info_plano").html(plano);
            
                
            },
            error: function (xhr, ajaxOptions, thrownError){
                console.log(xhr, ajaxOptions, thrownError);
                alert("Request deu erro!")
            }
        });
    
}//_____________________________________________________________________________________________________________________________
function getPacitId(id){
    let request = $.ajax({
            type: "GET",
            url: url+"patient/"+id,
            headers: { 'Authorization': 'Bearer ' + auth },
            xhrFields: { withCredentials: true },
            data: {
                
            },
            cache: false,
            success: function(response){
                let pacit_dados = response
                let pacit_nome = pacit_dados.first_name +" "+ pacit_dados.last_name
                localStorage.setItem('agd_pacit_nome', pacit_nome )
                localStorage.setItem('agd_pacit_tel', pacit_dados.cellphone)

                return pacit_nome;
                
                
            },
            error: function(xhr, ajaxOptions, thrownError) {
                console.log(xhr, ajaxOptions, thrownError);
            }   
    })
}
//Buscar paciente por ID
function pacienteGet(id){
    let request = $.ajax({
        type: "GET",
        url: url+"patient/"+id,
        headers: { 'Authorization': 'Bearer ' + auth },
        xhrFields: { withCredentials: true },
        data: {
            
        },
        cache: false,
        success: function(response){
           return response 
        },
        error: function(xhr, ajaxOptions, thrownError) {
              
            console.log(xhr, ajaxOptions, thrownError);
        }   
})
}

//Get de todos os agendamentos, para histórico
function allAgend() {
  
    let request = $.ajax({
            type: "GET",
            url: url+"appointment",
            headers: { 'Authorization': 'Bearer ' + auth },
            xhrFields: { withCredentials: true },
            data: {
              page: 1,
              perPage: 50
            },    
            cache: false,
            dataType:"json",
        success: function (response) {
            let dados = JSON.parse(request.responseText)
            let dado = dados.data
            let body = document.getElementById('agends');
            console.log(response)
            dado.forEach(agendamento => {
                let tr = body.insertRow();
                let td_id = tr.insertCell();
                let td_foto = tr.insertCell();
                let td_nome = tr.insertCell();
                let td_tel = tr.insertCell();
                let td_inicio = tr.insertCell();
                let td_fim = tr.insertCell();
                let td_consulta = tr.insertCell();
                let td_status= tr.insertCell();
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

                switch(agendamento.type) {
                    case 'teleconsultation':
                        var type = "Tele Consulta"
                      break;
                    case 'presential':
                         type = "Presencial"
                      break;
                }
                switch(agendamento.status) {
                    case 'scheduled':
                        var status = "Agendado"
                      break;
                    case 'waiting':
                        status = "Aguardando"
                      break;
                      case 'inProgress':
                        status = "Em atendimento"
                      break;
                    case 'canceled':
                        status = "Cancelado"
                      break;
                      case 'done':
                        status = "Finalizado"
                      break;
                    case 'confirmed':
                        status = "Confirmado"
                      break;
                      case 'missed':
                        status = "Faltou"
                      break;
                }
                
                let dia = agendamento.start_date.substring(0,10)
                let hora = agendamento.start_date.substring(11,16)
                let dia_fim = agendamento.end_date.substring(0,10)
                let hora_fim = agendamento.end_date.substring(11,16)

                td_id.innerText = agendamento.id
                    let request = $.ajax({
                        type: "GET",
                        url: url+"patient/"+agendamento.patient_id,
                        headers: { 'Authorization': 'Bearer ' + auth },
                        xhrFields: { withCredentials: true },
                        data: {
                            
                        },
                        cache: false,
                        success: function(res){            
                            let cel = res.cellphone.substring(3)
                            td_foto.innerText = "foto"
                            td_nome.innerText = res.first_name+" "+res.last_name
                            td_tel.innerText = cel
                        },
                        error: function(xhr, ajaxOptions, thrownError) {
                            console.log(xhr, ajaxOptions, thrownError);
                        }   
                    })
                
                td_inicio.innerText = dia +" "+ hora
                td_fim.innerText = dia_fim +" "+ hora_fim
                td_consulta.innerText = type
                td_status.innerText = status
                
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
            console.log(xhr, ajaxOptions, thrownError)
            //Aqui vai o corpo da função caso obtenha erro na requisição
        }
        })
};

function antendimento() {
  
    let request = $.ajax({
            type: "GET",
            url: url+"appointment",
            headers: { 'Authorization': 'Bearer ' + auth },
            xhrFields: { withCredentials: true },
            data: {
              page: 1,
              perPage: 100
            },    
            cache: false,
            dataType:"json",
        success: function (response) {
            let dados = JSON.parse(request.responseText)
            let dado = dados.data
            let body = document.getElementById('atendimentos');
            dado.forEach(agendamento => {
                let tr = body.insertRow();
                let td_id = tr.insertCell();
                let td_agd_id = tr.insertCell();
                let td_agd_record = tr.insertCell();
                let td_agd_stage = tr.insertCell();
                let td_foto = tr.insertCell();
                let td_nome = tr.insertCell();
                let td_tel = tr.insertCell();
                let td_inicio = tr.insertCell();
                let td_fim = tr.insertCell();
                let td_consulta = tr.insertCell();
                let td_status= tr.insertCell();
                let td_actions = tr.insertCell();
               
                let a = document.createElement("a");
                let aa = document.createElement("a");
    
                td_actions.appendChild(a);
                td_actions.appendChild(aa);

                switch(agendamento.type) {
                    case 'teleconsultation':
                        var type = "Tele Consulta"
                      break;
                    case 'presential':
                         type = "Presencial"
                      break;
                  }
                  switch(agendamento.status) {
                    case 'scheduled':
                        var status = "Agendado"
                      break;
                    case 'waiting':
                        status = "Aguardando"
                      break;
                      case 'inProgress':
                        status = "Em atendimento"
                      break;
                    case 'canceled':
                        status = "Cancelado"
                      break;
                      case 'done':
                        status = "Finalizado"
                      break;
                    case 'confirmed':
                        status = "Confirmado"
                      break;
                      case 'missed':
                        status = "Faltou"
                      break;
                  }
                
                td_id.innerText = agendamento.patient_id
                td_agd_id.innerText = agendamento.id
                td_agd_record.innerText = agendamento.record_id
                td_agd_stage.innerText = agendamento.stage
                td_foto.innerText = "foto"
                td_nome.innerText = "agendamento"
                td_tel.innerText = "(71) 9 9999-9999"
                td_inicio.innerText = agendamento.start_date
                td_fim.innerText = agendamento.end_date
                td_consulta.innerText = type
                td_status.innerText = status
                
                a.innerHTML = "Atender"
                aa.innerHTML = "Reagendar"
                
                a.classList.add('btn', 'btn-outline-dark', 'btn-rounded', 'disabled');
                aa.classList.add('btn', 'btn-outline-warning', 'btn-rounded');
                
                if(agendamento.status == "scheduled" || agendamento.status == "confirmed"){
                
                   a.classList.remove('disabled', 'btn-outline-dark')
                   a.classList.add('atender', 'btn-outline-success')
                   aa.classList.remove('btn-outline-warning');
                   aa.classList.add('btn-outline-dark');
                }else{
                    a.remove()
                }
                td_id.setAttribute("data-id_pacit", agendamento.patient_id)
                td_agd_id.setAttribute("data-id_agd", agendamento.id)
                td_agd_record.setAttribute("data-id_record", agendamento.record_id)
                td_agd_stage.setAttribute("data-id_stage", agendamento.stage)
                td_id.setAttribute("style", "display:none;")
                td_agd_id.setAttribute("style", "display:none;")
                td_agd_record.setAttribute("style", "display:none;")
                td_agd_stage.setAttribute("style", "display:none;")

                a.setAttribute("id","pacitAgd_id_"+agendamento.id+"_"+agendamento.record_id)
                a.setAttribute("data-toggle","modal")
                a.setAttribute("data-target","#prontuario")
                a.setAttribute("href","")
                aa.setAttribute("href","")
                tr.setAttribute("rule", "row");
                tr.classList.add("odd");
            });
            console.log(response)
            
            
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr, ajaxOptions, thrownError)
            //Aqui vai o corpo da função caso obtenha erro na requisição
        }
    })

};  
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