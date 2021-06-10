
// REQUEST PARA LOGIN NO SISTEMA (Jquery>Ajax).
$("#logar").click(function () { 
    let email = $("#email").val();
    let pass = $("#senha").val();
    let form_login = document.querySelector("#form_login");

    form_login.addEventListener("submit", function(event){
            event.preventDefault();
        let request = $.ajax({
            type: "POST",
            url: "http://127.0.0.1:3333/auth/login",
            xhrFields: { withCredentials: true },
            data: {
                email: email,
                password: pass,
            },    
            // cache: false,
        beforeSend: function(){
          $('#preloader .inner').fadeOut();
          $('#preloader').delay(350).fadeOut('slow'); 
          $('body').delay(350).css({'overflow': 'visible'});
           
        },
        success: function(xhr, ajaxOptions, thrownError){
            $("#login_msg").html('<div class="alert bg-success alert-success text-white" role="alert"> <b> Seja bem vindo(a)!!</b> Estamos lhe direcionando... </div>');
            // setTimeout(function(){ window.location.href = '../index.html'; }, 2000);
            setTimeout(function(){ window.location.replace("../index.html"); }, 20000);
            console.log(xhr, ajaxOptions, thrownError);  
        },
        error: function(xhr, ajaxOptions, thrownError) {
            if(request.status == 400 ){
               $("#login_msg").html('<div class="alert bg-danger alert-danger text-white" role="alert"> <b> Algo está errado(a)!!</b> confira os dados inseridos e tente novamente! </div>');
                setInterval(function(){ $("#login_msg").html(''); }, 5000); 
            }else if(request.status == 500 ){
                $("#login_msg").html('<div class="alert bg-danger alert-danger text-white" role="alert"> <b> Erro no servidor(a)!!</b> Aguarde ou contate o suporte! </div>');
                setInterval(function(){ $("#login_msg").html(''); }, 5000); 
            }
            $("#login_msg").html('<div class="alert bg-danger alert-danger text-white" role="alert"> <b> Error!</b> Algo de errado está occorendo! </div>');
            setInterval(function(){ $("#login_msg").html(''); }, 5000); 
        console.log(xhr, ajaxOptions, thrownError);
        }
        });
    });
}); 
       
// REQUEST PARA LOGIN NO SISTEMA (Fetch) (ERRO AO TENTAR PASSAR AS CREDENCIAS PARA OUTRAS PAGINAS).
// $("#logar").click(function () {
//     let email = document.querySelector("#email");
//     let senha = document.querySelector("#senha");
//     let form_login = document.querySelector("#form_login")

//     form_login.addEventListener("submit", function(event){
//         event.preventDefault();

//         let user = {
//                     email: email.value,
//                     password: senha.value
//                     }
                     
//         fetch('http://localhost:3333/auth/login', {
//             method: 'POST',
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             mode: 'cors',
//             credentials: 'include',
//             body: JSON.stringify(user)
//         })
                    
//         .then(function(response){
//             return response
//         })
//         .then(function(response){
            
//             if (response.status == 200){
//                 $("#login_msg").html('<div class="alert bg-success alert-success text-white" role="alert"> <b> Seja bem vindo(a)!!</b> Estamos lhe direcionando... </div>');
//                 setTimeout(function(){ window.location.href = '../index.html'; }, 20000); 
//             }else{
//                 setInterval(function(){ $("#login_msg").html('<div class="alert bg-danger alert-danger text-white" role="alert"> <b> Algo está errado(a)!!</b> confira os dados inseridos e tente novamente! </div>'); }, 5000); 
//             }
//             console.log(response);
//         })
//         .catch(function(response){
           
//             console.log(response);
//         })      
//     });
// });

// REQUEST PARA CADASTRAR PACIENTE (Jquery>Ajax)  
$("#cad_pacit").click(function () { 
    
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
                url: "http://127.0.0.1:3333/patient",
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
                // cache: false,
                success: function(response){
                    console.log(response);
                },
                error: function(xhr, ajaxOptions, thrownError) {
                    if (request.status = 401){
                        showErrorToast();
                    }else if(request.status = 400){
                        showAlertaToast();
                    }      
                    console.log(xhr, ajaxOptions, thrownError);
                }   
            })
       
});



// REQUEST PARA CADASTRAR PACIENTE (Fetch).
// $("#cad_pacit").click(function () {
//     let nome = document.querySelector("#cad_nome"); 
//     let sobrenome = document.querySelector("#cad_sobrenome"); 
//     let genero = document.querySelector("#cad_genero option:selected"); 
//     let etnia = document.querySelector("#cad_etnia option:selected"); 
//     let niver = document.querySelector("#cad_nasci"); 
//     let plano = document.querySelector("#cad_plano"); 
//     let natural = document.querySelector("#cad_natural"); 
//     let renda = document.querySelector("#cad_renda");
//     let ocupacao = document.querySelector("#cad_profi");  
//     let tel_1 = document.querySelector("#cad_tel_1");
//     let tel_2 = document.querySelector("#cad_tel_2");
//     let cel = document.querySelector("#cad_cel");
//     let email = document.querySelector("#cad_email");
//     let escolar = document.querySelector("#cad_escolar");
//     let conheceu = document.querySelector("#cad_conheceu");
//     let rua = document.querySelector("#cad_rua");
//     let pais = document.querySelector("#cad_cidade");
//     let estado = document.querySelector("#cad_estado");
//     let cidade = document.querySelector("#cad_pais");
//     let vizinhos = document.querySelector("#cad_complemento");
//     let complemento = document.querySelector("#cad_vizinhos");
    
// form_cad_pacit.addEventListener("submit", function(event){
//     event.preventDefault();

//     let cad_pacit = {
//                 first_name: nome,
//                 last_name: sobrenome,
//                 gender: genero,
//                 ethnicity: etnia,
//                 birthdate: niver,
//                 health_insurance: plano,
//                 nationality: natural,
//                 income: renda,
//                 occupation: ocupacao,
//                 phone: tel_1,
//                 second_phone: tel_2,
//                 cellphone: cel,
//                 email: email,
//                 schooling: escolar,
//                 street_address: rua,
//                 country: pais,
//                 state: estado,
//                 city: cidade,
//                 neighborhood: vizinhos,
//                 complement: complemento,
//                 how_met: conheceu
//         }
                
//     fetch('"http://127.0.0.1:3333/patient', {
//         method: 'POST',
//         headers: {
//             "Content-Type": "application/json"
//         },
//         mode: 'cors',
//         credentials: 'include',
//         body: JSON.stringify(cad_pacit)
//     })

//     .then(function(response){
//         return response
//     })
//     .then(function(response){
//         console,log(response);
//         showInfoToast();
//     })

//     })
// })


// REQUEST PARA AGENDAR PACIENTE (Jquery>Ajax)  
$("#agend_pacit").click(function () {
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
           
});

// REQUEST PARA AGENDAR PACIENTE (XMLhttp)  
// $("#agendar_pacit").click(function () {
//     var data_init = $("#agd_data").val(); 
//     var data_fim = $("#agd_data_fim").val(); 
//     var etapa = 1; // Não lembro pra que serve
//     var consulta_tipo = $("#agd_tipo option:selected").val();
//     var agd_status = $("#agd_status  option:selected").val();
//     var pacit_id = 1; //Tem que fazer a busca pra pegar ID 
//     var user_id = 1; //Tem que fazer a busca pra pegar ID 
//     var record_id = 1; // Oq é isso?
    

//     var login_user = {
//                         patientId: pacit_id,
//                         startDate: data_init,
//                         endDate: data_fim,
//                         stage: etapa,
//                         type: consulta_tipo,
//                         userId: user_id,
//                         recordId: record_id,
//                         status: agd_status
//                     }
//     var request = new XMLHttpRequest();
//     request.open("POST", "http://127.0.0.1:3333/appointment", true);
//     request.setRequestHeader("Content-Type", "application/json");
//     request.responseType = "json";

//     request.onreadystatechange = function() { // Chama a função quando o estado mudar.
//         if (this.readyState === this.DONE && this.status == 201) {
//             alert("Usuário agendado com sucesso!!");
//             console.log(request.response);
//         }else if (this.readyState === this.DONE){
//             showInfoToast();
//             console.log(request.response);
//         }
//     }
//     request.send(JSON.stringify(login_user));
// });

// REQUEST PARA BUSCAR PACIENTE (Jquery>Ajax)
$("#agd_nome").autocomplete({
    soruce: function (request, response) {
        let request = $.ajax({
            type: "GET",
            url: "http://127.0.0.1:3333/patient",
            xhrFields: { withCredentials: true },
            data: {
                'termo': request.term
            },    
            cache: false,
            dataType:"json",
            success: function (data) {
                response(data);
            }
        });
    },
    minLength: 3,
    autoFocus: true,
});  


// PADRÃO REQUEST
// $("#id_elemento").click(function (){
//     form_name.addEventListener("submit", function(event){
//         event.preventDefault();
//         let request = $.ajax({
//             type: "POST",
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
//         error: function () {
//             //Aqui vai o corpo da função caso obtenha erro na requisição
//         }
//         })
//     });
// })