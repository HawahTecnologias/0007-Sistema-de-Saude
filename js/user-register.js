$(document).ready(function(){
    
    const html = {
        get(element){
            return document.querySelector(element);
        },
        getAll(element){
            return document.querySelectorAll(element);
        }
    }
    
   

    html.get('#user_func').addEventListener('change', () =>{
       let occupation = $("#user_func").val()
       if(occupation == "doctor"){
        html.getAll('.doctor').hide()
       }else{
        html.getAll('.doctor').show()
       }
    })
})