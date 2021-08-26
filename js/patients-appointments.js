// Scripts for list registered patients 
$(document).ready(function(){
    function listAppointment(id, name, birthdate, email, appointment, type, status, cor) {
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
        let a4 = document.createElement('a')
        //let a5 = document.createElement('a')
    
        let i = document.createElement('i')
        let i2 = document.createElement('i')
        //let i3 = document.createElement('i')
    
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
        a3.classList.add('eye')
        a4.classList.add('edit')
        //a5.classList.add('list-delete')
    
        i.classList.add('ik', 'ik-eye')
        i2.classList.add('ik', 'ik-edit-2')
        //i3.classList.add('ik', 'ik-trash-2')
    
        img.classList.add('list-thumbnail', 'responsive', 'border-0')
    
        span.classList.add('badge', 'badge-pill', 'badge-success', 'position-absolute', 'badge-top-left')
        span6.classList.add('badge', 'badge-pill', cor)
    
        p.classList.add('mb-1', 'text-muted', 'text-small', 'category', 'text-center', 'w-20', 'w-xs-100')
        p2.classList.add('mb-1', 'text-muted', 'text-small', 'date', 'text-center', 'w-25', 'w-xs-100')
        p3.classList.add('mb-1', 'text-muted', 'text-small', 'date', 'text-center', 'w-20', 'w-xs-100')
        {/* p4.classList.add('mb-1', 'text-muted', 'text-small', 'date', 'text-center', 'w-1', 'w-xs-100') */}

        button.classList.add('mr-5', 'btn', 'btn-outline-success')
        button2.classList.add('btn', 'btn-outline-secondary')
        
        button.setAttribute('type', 'button')
        button2.setAttribute('type', 'button')

        a2.setAttribute('id',id)
    
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
                    div5.append(a3, a4)
                    a3.append(i)
                    a4.append(i2)
                    // a5.append(i3)
    console.log(cor)
    }
    const html = {
        get(element){
            return document.querySelector(element);
        }
    }

    function myAge(birthdate, newdate){ return Math.floor(Math.ceil(Math.abs(birthdate.getTime() - newdate.getTime()) / (1000 * 3600 * 24)) / 365.25);}

    getAppointment('1', '10')
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
                dado.forEach(agendamento => {
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
                    
                            let dia = agendamento.start_date.substring(0,10)
                            let hora = agendamento.start_date.substring(11,16)
                            let dia_fim = agendamento.end_date.substring(0,10)
                            let hora_fim = agendamento.end_date.substring(11,16)

                            
    
                        $.ajax({
                            type: "GET",
                            url: url+"patient/"+agendamento.patient_id,
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
                               
                                listAppointment(res.id, names, `(${age} anos) / ${birthdate}`, res.email,`${dia} | ${hora}-${hora_fim}`, type, status, cor)      
                                     
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

let perPage = $('#view-perpage').val()
var pag = localStorage.getItem("navCurrentPage")
let lastPage = localStorage.getItem("navlastPage")
let firstPage = localStorage.getItem("navfirstPage")
console.log(pag)

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