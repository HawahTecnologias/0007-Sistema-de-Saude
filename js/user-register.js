$(document).ready(function(){
    
    const html = {
        get(element){
            return document.querySelector(element);
        },
        getAll(element){
            return document.querySelectorAll(element);
        }
    }
    
   
    let element = html.getAll('.doctor')
    element.forEach(element => {
        element.classList.add('invisible')
    });
    html.get('#user_func').addEventListener('change', () =>{
       let occupation = $("#user_func").val()
       if(occupation == "doctor"){
        let element = html.getAll('.doctor')
        element.forEach(element => {
            element.classList.remove('invisible')
        });
       }else{
            element.forEach(element => {
                element.classList.add('invisible')
            });
       }
    })
})