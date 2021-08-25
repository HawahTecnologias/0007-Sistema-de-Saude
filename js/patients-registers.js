
// Scripts for list registered patients 
$(document).ready(function(){
    function list_registered_patient( name, birthdate, contato, email, status1, status2) {
    let list = $(".list_patients")
    
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
    let a5 = document.createElement('a')

    let i = document.createElement('i')
    let i2 = document.createElement('i')
    let i3 = document.createElement('i')

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

    // let br = document.createElement('br')
    // let br2 = document.createElement('br')

    div.classList.add('col-12', 'list-item')
    div2.classList.add('card','d-flex', 'flex-row', 'mb-3')
    div3.classList.add('d-flex', 'flex-grow-1', 'min-width-zero', 'card-content')
    div4.classList.add('card-body', 'align-self-center', 'd-flex', 'flex-column', 'flex-md-row', 'justify-content-between', 'min-width-zero', 'align-items-md-center')
    div5.classList.add('list-actions')
    div6.classList.add('w-15', 'w-xs-100')

    a.classList.add('d-flex', 'card-img')
    a2.classList.add('list-item-heading', 'mb-1', 'truncate', 'text-center', 'w-30', 'w-xs-100')
    a3.classList.add('eye')
    a4.classList.add('edit')
    a5.classList.add('list-delete')

    i.classList.add('ik', 'ik-eye')
    i2.classList.add('ik', 'ik-edit-2')
    i3.classList.add('ik', 'ik-trash-2')

    img.classList.add('list-thumbnail', 'responsive', 'border-0')

    span.classList.add('badge', 'badge-pill', 'badge-success', 'position-absolute', 'badge-top-left')
    span6.classList.add('badge', 'badge-pill', 'badge-success')

    p.classList.add('mb-1', 'text-muted', 'text-small', 'category', 'text-center', 'w-15', 'w-xs-100')
    p2.classList.add('mb-1', 'text-muted', 'text-small', 'date', 'text-center', 'w-15', 'w-xs-100')
    p3.classList.add('mb-1', 'text-muted', 'text-small', 'date', 'text-center', 'w-25', 'w-xs-100')
    p4.classList.add('mb-1', 'text-muted', 'text-small', 'date', 'text-center', 'w-1', 'w-xs-100')

    span.innerHTML = status1;
    a2.innerHTML = name;
    // span2.innerHTML = ' ';
    p.innerHTML = birthdate;
    span3.innerHTML = contato;
    // span4.innerHTML = phone2;
    // span5.innerHTML = phone3;

    p3.innerHTML = email;
    p4.innerHTML = "&nbsp;"

    span6.innerHTML = status2;


    list.append(div)
    div.append(div2)
        div2.append(a, div3)
            a.append(img, span)
            div3.append(div4, div5)
                div4.append(a2, p, p2, p3, p4, div6)
                    // p.append(span2)
                    p2.append(span3)
                    div6.append(span6)
                div5.append(a3, a4, a5)
                a3.append(i)
                a4.append(i2)
                a5.append(i3)
    }
    function regexNumber(number){
       return number.slice(3,14).replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3");
    }
    const html = {
        get(element){
            return document.querySelector(element);
        }
    }
    
    getPatientRegister('1', '10')
    function getPatientRegister(page, perpage){
       let request = $.ajax({
            type: "GET",
            url: url+"patient",
            headers: { 'Authorization': 'Bearer ' + auth },
            data: {
                page : page,
                perPage: perpage,
            },    
            cache: false,
            dataType:"json",
            success: function (response) {
                $("#layout-wrap").html("")
                let dados = request.responseText
                let dado = JSON.parse(dados)
                localStorage.setItem("navCurrentPage", dado.currentPage);
                localStorage.setItem("navlastPage", dado.lastPage);
                localStorage.setItem("navfirstPage", dado.firstPage);
                $("#displaying_list_patient").html(`Mostrando ${dado.currentPage*dado.perPage-dado.perPage}-${dado.currentPage*dado.perPage} de ${dado.total} Pacientes`)
                console.log(dado)
                function myAge(birthdate, newdate){ return Math.floor(Math.ceil(Math.abs(birthdate.getTime() - newdate.getTime()) / (1000 * 3600 * 24)) / 365.25);} 
                    
                dado.data.forEach(patient => {
                    let name = patient.first_name +" "+ patient.last_name;
                    let birthdate = patient.birthdate.slice(0,10)
                    let date_new =  new Date();
                    let date_birthdate = new Date(patient.birthdate)
                    let age = myAge(date_birthdate, date_new)
                    list_registered_patient(name, `(${age} anos) / ${birthdate}`, `${regexNumber(patient.cellphone)} </br> ${regexNumber(patient.phone)} </br> ${regexNumber(patient.second_phone)}`, patient.email, "Teste1", "Teste")
                    
                });
            },
            error: function (xhr, ajaxOptions, thrownError) {
                //Aqui vai o corpo da função caso obtenha erro na requisição
                console.log(xhr, ajaxOptions, thrownError);
            }
            
        })
       
    }

html.get('')

var pag = localStorage.getItem("navcurrentPage")
let lastPage = localStorage.getItem("navlastPage")
let firstPage = localStorage.getItem("navfirstPage")

    html.get('.first').addEventListener('click', () =>{
        getPatientRegister(firstPage, '1')
    })
    html.get('.last').addEventListener('click', () =>{
        getPatientRegister(lastPage, '1')
    })
    html.get('.next').addEventListener('click', () =>{
       pag++
        if(pag > lastPage){
            pag = lastPage
        }
        getPatientRegister(pag, '1')
    })
    html.get('.prev').addEventListener('click', () =>{
        console.log(pag)
        pag--
        if(pag < firstPage){
            pag = firstPage
        }
        getPatientRegister(pag, '1')
    })
    // html.get('#view-perpage').addEventListener('change', () =>{
    //     let perpage = $('#view-perpage').val()
       
    // })
    
})