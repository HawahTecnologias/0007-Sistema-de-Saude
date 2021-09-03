// Scripts for list registered patients 
$(document).ready(function(){
    function listAppointment(ids, name, birthdate, email, appointment, type, status, cor) {
        let list = $("#list-appointments")
        
        let div = document.createElement('div')
        let div2 = document.createElement('div')
        let div3 = document.createElement('div')
        let div4 = document.createElement('div')
        let div5 = document.createElement('div')
        let div6 = document.createElement('div')
    
        let a = document.createElement('a')
        let a2 = document.createElement('a')
        let a3 = document.createElement('a')
        // let a4 = document.createElement('a')
        // let a5 = document.createElement('a')
    
        let i = document.createElement('i')
        // let i2 = document.createElement('i')
        // let i3 = document.createElement('i')
    
        let img = document.createElement('img')
    
        let span = document.createElement('span')
        // let span2 = document.createElement('span')
        let span3 = document.createElement('span')
        // let span4 = document.createElement('span')
        // let span5 = document.createElement('span')
        let span6 = document.createElement('span')
    
        let p = document.createElement('p')
        let p2 = document.createElement('p')
        let p3 = document.createElement('p')
        let p4 = document.createElement('p')
        
        let button = document.createElement('button')
        let button2 = document.createElement('button')
    
        div.classList.add('col-12', 'list-item')
        div2.classList.add('card','d-flex', 'flex-row', 'mb-3')
        div3.classList.add('d-flex', 'flex-grow-1', 'min-width-zero', 'card-content')
        div4.classList.add('card-body', 'align-self-center', 'd-flex', 'flex-column', 'flex-md-row', 'justify-content-between', 'min-width-zero', 'align-items-md-center')
        div5.classList.add('list-actions')
        div6.classList.add('w-15', 'w-xs-100', 'text-center')
    
        a.classList.add('d-flex', 'card-img')
        a2.classList.add('list-item-heading', 'mb-1', 'truncate', 'text-center', 'w-25', 'w-xs-100')
        a3.classList.add('show-profile', 'c-pointer')
        // a4.classList.add('edit-profile', 'c-pointer')
        // a5.classList.add('list-delete')
    
        i.classList.add('ik', 'ik-user')
        // i2.classList.add('ik', 'ik-edit-2')
        // i3.classList.add('ik', 'ik-trash-2')
    
        img.classList.add('list-thumbnail', 'responsive', 'border-0')
    
        span.classList.add('badge', 'badge-pill', 'badge-success', 'position-absolute', 'badge-top-left')
        span6.classList.add('badge', 'badge-pill', cor)
    
        p.classList.add('mb-1', 'text-muted', 'text-small', 'category', 'text-center', 'w-20', 'w-xs-100')
        p2.classList.add('mb-1', 'text-muted', 'text-small', 'date', 'text-center', 'w-25', 'w-xs-100')
        p3.classList.add('mb-1', 'text-muted', 'text-small', 'date', 'text-center', 'w-20', 'w-xs-100')
        {/* p4.classList.add('mb-1', 'text-muted', 'text-small', 'date', 'text-center', 'w-1', 'w-xs-100') */}

        button.classList.add('mr-5', 'btn', 'btn-outline-success', 'atender')
        button2.classList.add('btn', 'btn-outline-secondary')

        button.setAttribute('type', 'button')
        button2.setAttribute('type', 'button')

        a3.setAttribute('title', 'Ver perfil do paciente')

        let id = ids.split('-')
        a2.setAttribute("id",id[0] )
        a2.setAttribute("data-id_patient",id[1] )
        a2.setAttribute("data-id_user", id[2] )
        a2.setAttribute("data-id_record", id[3] )
        a2.setAttribute("data-id_stage", id[4] )
    
        span.innerHTML = type;
        a2.innerHTML = name;
        // span2.innerHTML = ' ';
        p.innerHTML = birthdate;
        p2.innerHTML = email;
        // span4.innerHTML = phone2;
        // span5.innerHTML = phone3;
    
        p3.innerHTML = appointment;
        {/* p4.innerHTML = "&nbsp;" */}
    
        span6.innerHTML = status;

        button.innerHTML = "Atender"
        button2.innerHTML = "Reagendar"
    
        list.append(div)
        div.append(div2)
            div2.append(a, div3)
                a.append(img, span)
                div3.append(div4, div5)
                    div4.append(a2, p, p2, p3, div6, button, button2)
                        // p.append(span2)
                        p2.append(span3)
                        div6.append(span6)
                    div5.append(a3)
                    a3.append(i)
                    // a4.append(i2)
                    // a5.append(i3)
    }
    
    const html = {
        get(element){
            return document.querySelector(element);
        }
    }

    function myAge(birthdate, newdate){ return Math.floor(Math.ceil(Math.abs(birthdate.getTime() - newdate.getTime()) / (1000 * 3600 * 24)) / 365.25);}

        getAppointment('1', '10')
//Fuction for pagination of content on the page
    function getAppointment(page, perpage) {
  
        let request = $.ajax({
                type: "GET",
                url: url+"appointment",
                headers: { 'Authorization': 'Bearer ' + auth },
                data: {
                  page: page,
                  perPage: perpage
                },    
                cache: false,
                dataType:"json",
            success: function (response) {
                $("#list-appointments").html("")
                let dados = JSON.parse(request.responseText)
                let dado = dados.data
                localStorage.setItem("navCurrentPage", dados.currentPage);
                localStorage.setItem("navlastPage", dados.lastPage);
                localStorage.setItem("navfirstPage", dados.firstPage);
                console.log(response)
                dado.forEach(appo => {
                    switch(appo.type) {
                        case 'teleconsultation':
                            var type = "Tele Consulta"
                          break;
                        case 'presential':
                             type = "Presencial"
                          break;
                    }
                    switch(appo.status) {
                        case 'scheduled':
                            var status = "Agendado"
                            var cor = "badge-info"
                          break;
                        case 'waiting':
                            status = "Aguardando"
                            cor = "badge-yellow"
                          break;
                          case 'inProgress':
                            status = "Em atendimento"
                            cor = "badge-lime"
                          break;
                        case 'canceled':
                            status = "Cancelado"
                            cor = "badge-danger"
                          break;
                          case 'done':
                            status = "Finalizado"
                            cor = "badge-success"
                          break;
                        case 'confirmed':
                            status = "Confirmado"
                            cor = "badge-green"
                          break;
                          case 'missed':
                            status = "Faltou"
                            cor = "badge-warning"
                          break;
                    }
                    
                            let dia = appo.start_date.substring(0,10)
                            let hora = appo.start_date.substring(11,16)
                            let dia_fim = appo.end_date.substring(0,10)
                            let hora_fim = appo.end_date.substring(11,16)
                            
    
                        $.ajax({
                            type: "GET",
                            url: url+"patient/"+appo.patient_id,
                            headers: { 'Authorization': 'Bearer ' + auth },
                            data: {
                                
                            },
                            cache: false,
                            success: function(res){
                                let birthdate = res.birthdate.slice(0,10)
                                let date_new =  new Date();
                                let date_birthdate = new Date(res.birthdate)
                                let age = myAge(date_birthdate, date_new)

                                let names = res.first_name+" "+res.last_name
                               
                                listAppointment(`${appo.id}-${appo.patient_id}-${appo.user_id}-${appo.record_id}-${appo.stage}`, names, `(${age} anos) / ${birthdate}`, res.email,`${dia} | ${hora}-${hora_fim}`, type, status, cor)      
                                     
                            },
                            error: function(xhr, ajaxOptions, thrownError) {
                                console.log(xhr, ajaxOptions, thrownError);
                            }   
                        })
                });
                
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr, ajaxOptions, thrownError)
                //Aqui vai o corpo da função caso obtenha erro na requisição
            }
            })
    };
// Script to forward to patient profile according to patient id and appointment id
    $(document).on('click', '.show-profile', function(e) {
        e.preventDefault;
        let id_appointment = $(this).parent().siblings('.card-body').find('a').attr('id');
        let id_patient = $(this).parent().siblings('.card-body').find('a[data-id_patient]').data('id_patient');
        
        document.location.href = `../pages/profiles.html?patient=${id_patient}&appointment=${id_appointment}`;
    });
//Script for initiating medical care with the patient
    $(document).on('click', '.atender', function(e) {
        e.preventDefault;

            let id_appo = $(this).siblings('a').attr('id');
            let id_patient = $(this).siblings('a[data-id_patient]').data('id_patient');
            let id_user = $(this).siblings('a[data-id_user]').data('id_user')
            let id_record = $(this).siblings('a[data-id_record]').data('id_record');
            let id_stage = $(this).siblings('a[data-id_stage]').data('id_stage');

            localStorage.setItem('id_patient_agd', id_patient)
            localStorage.setItem('id_agd', id_appo)
            localStorage.setItem('id_record', id_record)
            localStorage.setItem('id_stage', id_stage)
            console.log("Inicio da consulta")
            
            $("#short_list_term").html("")
            $("#long_list_term").html("")
            $("#problem_list_term").html("")
            todoGet(id_patient, 'open', 'shortTerm', 'short_list_term')
            todoGet(id_patient, 'open', 'longTerm', 'long_list_term')
            todoGet(id_patient, 'open', 'problem', 'problem_list_term')
            createHistoricTodo(id_patient) 
        $.ajax({
            type: "GET",
            url: url+"patient/"+id_patient,
            headers: { 'Authorization': 'Bearer ' + auth },
            xhrFields: { withCredentials: true },
            data: {},
            cache: false,
            success: function(response){
                alterStatusAppointment(id_patient, id_appo,'inProgress', id_stage, id_record)
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

let perPage = $('#view-perpage').val()
var pag = localStorage.getItem("navCurrentPage")
let lastPage = localStorage.getItem("navlastPage")
let firstPage = localStorage.getItem("navfirstPage")


    html.get('.first').addEventListener('click', () =>{
        perPage = $('#view-perpage').val()
        getAppointment(firstPage, perPage)
    })
    html.get('.last').addEventListener('click', () =>{
        perPage = $('#view-perpage').val()
        getAppointment(lastPage, perPage)
    })
    html.get('.next').addEventListener('click', () =>{
        perPage = $('#view-perpage').val()
        pag = localStorage.getItem("navCurrentPage")
        pag++
        if(pag > lastPage){
            alert("mais")
            pag = lastPage
        }
        getAppointment(pag, perPage)
    })
    html.get('.prev').addEventListener('click', () =>{
        perPage = $('#view-perpage').val()
        pag--
        if(pag < firstPage){
            alert("menos")
            pag = firstPage
        }
        getAppointment(pag, perPage)
    })
    html.get('#view-perpage').addEventListener('change', () =>{
        perPage = $('#view-perpage').val()
        getAppointment(pag, perPage)
    })
})