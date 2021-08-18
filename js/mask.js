$(document).ready(function(){
//Mask for form of register patient
    $("#register_patient").on("click", function(){
        $("#cad_renda").mask("#.##0,00", {reverse: true})
        $("#cad_tel_1").mask("(00) 0000-0000");
        $("#cad_tel_2").mask("(00) 0000-0000");
        // $("#cad_cel").mask("(00) 00000-0000");
        $("#cad_vizinhos").mask('00000-000');
    })
})

