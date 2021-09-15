//Scripts for procesing datas for profile patient
let urli = "http://www.portomassa.com/";
let auth = localStorage.getItem('Acess');
// Get Id's of url
var url = new URL(window.location);
var id_patient = url.searchParams.get("patient");
var id_appointment = url.searchParams.get("appointment");

// Listing data personal of patient
$(document).ready(function(){
    $.ajax({
        type: "GET",
        url: urli+"patient/"+id_patient,
        headers: { 'Authorization': 'Bearer ' + auth },
        xhrFields: { withCredentials: true },
        data: {},
        cache: false,
        success: function(response){

            $("#profile-info-name").html(response.first_name+" "+response.last_name)
            $("#profile-info-gender").html(response.gender)
            $("#profile-info-ethnicity").html(response.ethnicity)  
            $("#profile-info-birthdate").html(response.birthdate.substring(0,10))
            $("#profile-info-health_insurance").html(response.health_insurance)
            $("#profile-info-city").html(response.city)
            $("#profile-info-income").html(response.income)
            $("#profile-info-occupation").html(response.occupation)
            $("#profile-info-phone").html(response.cellphone)
            $("#profile-info-phone2").html(response.phone)
            $("#profile-info-phone3").html(response.second_phone)
            $("#profile-info-email").html(response.email)
            $("#profile-info-schooling").html(response.schooling)
            $("#profile-info-name").html(response.how_met)
            $("#profile-info-andress").html(response.city+"/"+response.state+", "+response.street_address+" | "+response.complement)
        },
        error: function(xhr, ajaxOptions, thrownError) {      
            console.log(xhr, ajaxOptions, thrownError);
        }
    });    
})
//listing historic of medical record of patient
$(document).on('click', '#pills-profile-tab', function(){
    $.ajax({
        type: "GET",
        url: urli+"patient/"+id_patient+"/todo",
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

                    div2.innerHTML = value.updated_at.substring(0,10)
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
    $.ajax({
        type: "GET",
        url: urli+"patient/"+id_patient+"/todo",
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

                    div2.innerHTML = value.updated_at.substring(0,10)
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
})

//listing part of medical record patient
let request = $.ajax({
    type: "GET",
    url: urli+"record/1/basic-anamnesis",
    headers: { 'Authorization': 'Bearer ' + auth },
    xhrFields: { withCredentials: true },
    data: {
        page: 1,
        perPage: 30
    },
    cache: false,
    success: function(response){
        console.log(response);
    },
    error: function(xhr, ajaxOptions, thrownError) {
        if (request.statusText == "Unauthorized"){ 
            alert("nao autorizado") // showErrorToast(); 
        }else if(request.statusText == "Bad Request"){
            alert("Falha na requisição")  // showAlertaToast(); 
        }else if(request.status == 500){
            showError500Toast();
        }
        console.log(xhr, ajaxOptions, thrownError);
    }
});  
 $.ajax({
    type: "GET",
    url: urli+"record/1/physical-exam",
    headers: { 'Authorization': 'Bearer ' + auth },
    xhrFields: { withCredentials: true },
    data: {
        page: 1,
        perPage: 30
    },
    cache: false,
    success: function(response){
        console.log(response);
    },
    error: function(xhr, ajaxOptions, thrownError) {
        if (request.statusText == "Unauthorized"){ 
            alert("nao autorizado") // showErrorToast(); 
        }else if(request.statusText == "Bad Request"){
            alert("Falha na requisição")  // showAlertaToast(); 
        }else if(request.status == 500){
            showError500Toast();
        }      
        console.log(xhr, ajaxOptions, thrownError);
    }   
});
// Vai ter que existir vários creates para construir aquela página alí

//Logica da exibição dos dados em perfil

//1- Haverá um ouvidor de evento do click do botão ver perfil do paciente
//2- Ao clicar no botão com o name especifico irá ao href com o id capturado da linha do paciente
//3- Ao ser direcionado para a pagina, o script que pega o id do usuário colocado no link
//4- Ao ter o ID do usuário será carregado todos as funções de Get do paciente
//5- A cada função chamada terá uma função de create dos elementos do perfil
//6- 
