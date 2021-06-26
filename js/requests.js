
// -------------------------------------------- CONTROLE DE CONEXÃO/VARIÁVEIS -----------------------------------------------------------
let url = "http://localhost:3333/";
let auth = localStorage.getItem('Acess');
function userDados(){
    let user_dados = JSON.parse(atob(auth.split('.')[1]));
    let user_dado = user_dados.user
    localStorage.setItem('user_id', user_dado.id)
    localStorage.setItem('user_name', user_dado.name)
    localStorage.setItem('user_role', user_dado.role)
    localStorage.setItem('user_espec', user_dado.specialty)
    localStorage.setItem('user_admin', user_dado.isAdmin)
 
};
function conect() {
    if(auth == null ){
        window.location.replace("0007-Sistema-de-Saude/../pages/login.html"); 
    }
};
function conect2() {
    if(auth == null ){
        window.location.replace("login.html"); 
    }
};
function desconect() {
    clearStorage()
    localStorage.removeItem('Acess');
};
function clearStorage() {
    localStorage.clear();
};

let msg = {
    400 : '<div class="alert bg-danger alert-danger text-white" role="alert"> <b> Algo está errado(a)!!</b> confira os dados inseridos e tente novamente! </div>',
    401 : '<div class="alert bg-danger alert-danger text-white" role="alert"> <b> Alerta(a)!!</b> Você não tem autorização para fazer isso! </div>',
    404 : '<div class="alert bg-danger alert-danger text-white" role="alert"> <b> Algo está errado(a)!!</b> confira os dados inseridos e tente novamente! </div>',
    500 : '<div class="alert bg-danger alert-danger text-white" role="alert"> <b> Erro no servidor(a)!!</b> Aguarde ou contate o suporte! </div>',
    200 : '<div class="alert bg-success alert-success text-white" role="alert"> <b> Seja bem vindo(a)!!</b> Estamos lhe direcionando... </div>'
}

//---------------------------------------------- REQUISIÇÔES MÉTODO > POST ----------------------------------------------------
// REQUEST PARA LOGIN NO SISTEMA (Jquery>Ajax). [Teste OK]
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
        // beforeSend: function(){
        // },
            success: function(xhr, ajaxOptions, thrownError){
                $("#login_msg").html(msg[200]);
                // setTimeout(function(){ window.location.href = '../index.html'; }, 2000);
                let token = request.responseText;
                localStorage.setItem('Acess', token);
                setTimeout(function(){ window.location.replace("../index.html"); }, 2000);
            },
            error: function(xhr, ajaxOptions, thrownError) {
                if(request.status == 400 ){
                    $("#login_msg").html(msg[400]);
                    setInterval(function(){ $("#login_msg").html(''); }, 5000); 
                }else if(request.status == 500 ){
                    $("#login_msg").html(msg[500]);
                    setInterval(function(){ $("#login_msg").html(''); }, 5000); 
                }else if(request.status == 404 ){
                    $("#login_msg").html(msg[404]);
                    setInterval(function(){ $("#login_msg").html(''); }, 5000); 
                }
            
            console.log(xhr, ajaxOptions, thrownError);
            }
        });
    });
};//_________________________________________________________________________________________________________________________________ 
       
// REQUEST PARA CADASTRAR PACIENTE (Jquery>Ajax)  [O Status response para erro de preenchimento ta como 401 e não 400 | Está cadastrando usuários com 
// campos especificos iguais]
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
         
        // let form_cad_pacit = document.getElementById("form_cad_pacit");
        //  form_cad_pacit.addEventListener("submit", function(event){
        //         event.preventDefault();

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
                    show201Toast()
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
            });
    //  });
};//_________________________________________________________________________________________________________________________________

// REQUEST PARA AGENDAR PACIENTE (Jquery>Ajax)  [Teste OK]
function agend_pacit () {
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
            console.log(response);
            showCadAgendaToast()
                  
        },
        error: function(xhr, ajaxOptions, thrownError) {
            console.log(request.data) 
            
            if (request.status = 401){
                showErrorToast();
            }else if(request.status = 400){
                showAlertaToast();
            }
            console.log(xhr, ajaxOptions, thrownError);
            }
    });      
};//_________________________________________________________________________________________________________________________________

// REQUEST PARA CADASTRAR USUÀRIO (Jquery>Ajax)  [O Status response para erro de preenchimento ta como 401 e não 400 | Estamos obtendo erro 500 não ta cadastrando]
function cadUser(){ 
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
    console.log(admin)
    
    let form_cad_user = document.querySelector("#form_cad_user");
    form_cad_user.addEventListener("submit", function(event){
        event.preventDefault();
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
});
};//_________________________________________________________________________________________________________________________________


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
                console.log(agd_pacits)
                
            $("#agd_nome").autocomplete({source: agd_pacits})
                
            },
            error: function (xhr, ajaxOptions, thrownError){
                console.log(xhr, ajaxOptions, thrownError);
            }
        });
    
}
//____________________________________________________________________________________________________________________________

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
                
            console.log(dado)
            console.log(agd_busca)
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
                document.getElementById("agd_info_id").innerHTML = "";
                document.getElementById("agd_info_nome").innerHTML = "";
                document.getElementById("agd_info_gene").innerHTML = "";
                document.getElementById("agd_info_nasc").innerHTML = "";
                document.getElementById("agd_info_tel1").innerHTML = "";
                document.getElementById("agd_info_tel2").innerHTML = "";
                document.getElementById("agd_info_email").innerHTML = "";
                document.getElementById("agd_info_plano").innerHTML = "";
            }
            console.log(pacit)
            let id = pacit.id
            let nome = pacit.first_name +" "+pacit.last_name;
            let genero = pacit.gender;
            let nasc = pacit.birthdate;
            let cel = pacit.phone;
            let cel2 = pacit.second_phone;
            let email = pacit.email;
            let plano = pacit.health_insurance;
            localStorage.setItem('id_patient_agd', id);
            document.getElementById("agd_info_id").innerHTML = id;
            document.getElementById("agd_info_nome").innerHTML = nome;
            document.getElementById("agd_info_gene").innerHTML = genero;
            document.getElementById("agd_info_nasc").innerHTML = nasc;
            document.getElementById("agd_info_tel1").innerHTML = cel;
            document.getElementById("agd_info_tel2").innerHTML = cel2;
            document.getElementById("agd_info_email").innerHTML = email;
            document.getElementById("agd_info_plano").innerHTML = plano;
            
                
            },
            error: function (xhr, ajaxOptions, thrownError){
                console.log(xhr, ajaxOptions, thrownError);
                alert("Request deu erro!")
            }
        });
    
}
//_____________________________________________________________________________________________________________________________
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
                
            },
            error: function(xhr, ajaxOptions, thrownError) {
                  
                console.log(xhr, ajaxOptions, thrownError);
            }   
    })
}

function allAgend() {
  
    let request = $.ajax({
            type: "GET",
            url: url+"appointment",
            headers: { 'Authorization': 'Bearer ' + auth },
            xhrFields: { withCredentials: true },
            data: {
              page: 1,
              perPage: 10
            },    
            cache: false,
            dataType:"json",
        success: function (response) {
            let dados = JSON.parse(request.responseText)
            let dado = dados.data
            let body = document.getElementById('agends');
            console.log(dado)
            dado.forEach(paciente => {
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


                 getPacitId(paciente.patient_id)
                 
                //  const toDate = (date) => {
                //     let initializeDate = new Date(date);
                 
                //     new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short' }).format(date);
                //  }
                //  let teste = toDate()
                //  console.log(teste)
                td_id.innerText = paciente.id
                td_foto.innerText = "foto"
                td_nome.innerText = "Paciente"
                td_tel.innerText = "(71) 9 9999-9999"
                td_inicio.innerText = paciente.start_date
                td_fim.innerText = paciente.end_date
                td_consulta.innerText = paciente.type
                td_status.innerText = paciente.status
                
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