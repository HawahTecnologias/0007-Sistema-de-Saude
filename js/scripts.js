//Documento para scrpts gerais das páginas FUNÇÕES...
//* Deve ser utilizado o Jquery antes do arquivo de scripts.js
$(document).ready(function(){

  //Script in Index.html for form register patient (andress)
  //Inserting autocomplete andress for cep
  $("#register_patient").on("click", function(){
    $("#cad_vizinhos").on("focusout", function(){
      let cep = $("#cad_vizinhos").val()
      $.ajax({
        type: "GET",
        url: `http://viacep.com.br/ws/${cep}/json/`, 
        cache: false,
        success: function(response){
            $("#cad_rua").val(response.bairro+", "+response.logradouro)
            $("#cad_cidade").val(response.localidade)
            $("#cad_estado").val(response.uf)
          if(response.erro){
            showErrorCep()
            $("#cad_rua").val("")
            $("#cad_cidade").val("")
            $("#cad_estado").val("")
          }

        },
        error: function(xhr, ajaxOptions, thrownError) {
        console.log(xhr, ajaxOptions, thrownError);
          showErrorCep()
        }
      });
    })

    //Script in Index.html for form register patient (field tel)
    //Inserting a plugin for DDI 
    function inputTel(element_id){    
      var phoneInputID = "#"+element_id;
      var input = document.querySelector(phoneInputID);
      var iti = window.intlTelInput(input, {
        nationalMode: true,
        formatOnDisplay: true,
        geoIpLookup: function(callback) {
          $.get("http://ipinfo.io", function() {}, "jsonp").always(function(resp) {
            var countryCode = (resp && resp.country) ? resp.country : "";
            callback(countryCode);
          });
        },
        hiddenInput: "full_number",
        preferredCountries: ['br'],
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/11.0.14/js/utils.js"
      });
        $("#"+element_id).on("focusout", function(){
          var text = (iti.isValidNumber()) ? iti.getNumber() +this.classList.remove("field_error") : showErrorNumber() + this.classList.add("field_error");
        })
        
        $(phoneInputID).on("countrychange", function(event) {
          // Get the selected country data to know which country is selected.
          var selectedCountryData = iti.getSelectedCountryData();
          // Get an example number for the selected country to use as placeholder.
          newPlaceholder = intlTelInputUtils.getExampleNumber(selectedCountryData.iso2, true, intlTelInputUtils.numberFormat.INTERNATIONAL),
            // Reset the phone number input.
            iti.setNumber("");
            // Convert placeholder as exploitable mask by replacing all 1-9 numbers with 0s
            mask = newPlaceholder.replace(/[1-9]/g, "0");
            // Apply the new mask for the input
            $(this).mask(mask);
        });
    
        // When the plugin loads for the first time, we have to trigger the "countrychange" event manually, 
        // but after making sure that the plugin is fully loaded by associating handler to the promise of the 
        // plugin instance.
        iti.promise.then(function() {
          $(phoneInputID).trigger("countrychange");
        });
    }

    let cad_tel_1 = "cad_tel_1";
    let cad_tel_2 = "cad_tel_2";
    let cad_cel = "cad_cel";
    inputTel(cad_tel_1)
    inputTel(cad_tel_2)
    inputTel(cad_cel)

    //Script in Index.html for form register patient (field medicine's)
    //Inserting a list of medicine's
    let medicine_list = []
    $("#btn_patient_medicine").on("click", function(){
        let medicine = $("#field_patient_medicine").val()
        if(medicine != ""){
            let li = document.createElement('li');
            let div = document.createElement('div');
            let div2 = document.createElement('div');
            let div3 = document.createElement('div');
            let h4 = document.createElement('h4');
            let btn = document.createElement('button');
            let i = document.createElement('i');

            btn.setAttribute("type", "button");
            i.classList.add('ik', 'ik-trash-2');
            btn.classList.add('btn', 'btn-icon', 'btn-outline-danger', 'delete_med');
            div.classList.add('bullet', 'bg-orange');
            div2.classList.add('time');
            div3.classList.add('desc');
            $("#medicine_list").prepend(li);
                li.append(div);
                li.append(div2);
                li.append(div3);
                div3.append(h4);
                h4.innerHTML = medicine;
                div2.innerHTML = "Remédio";
                li.append(btn)
                btn.append(i)

            medicine_list.push(medicine)

            $("#field_patient_medicine").val("");

        }else{
            alert("O campo está vazio!")
        }
        
    })
    $(document).on('click', '.delete_med', function(e) {
        let del_medicine = $(this).siblings('.desc').find('h4').html();
        if(medicine_list.indexOf(del_medicine) > -1){
           medicine_list.splice(medicine_list.indexOf(del_medicine), 1);
           $(this).parent().remove() 
        }        
    })
  })


 //click in button profile
  $(document).on('click', '#go_profile', function(){
    let id_patient = $(this).closest('tr').find('td[data-id_pacit]').data('id_pacit');
    let id_appointment = $(this).closest('tr').find('td[data-id_agd]').data('id_agd');
    window.location.href = "pages/perfil.html?patient="+id_patient+"&appointment="+id_appointment
  })
  // const inputElement = document.getElementById("input_file");
  // inputElement.addEventListener("change", handleFiles, false);
  $(document).on('change', 'input[type=file]', function(){
    const fileList = $(this)[0].files; /* now you can work with the file list */
    showFiles(fileList)
  })
  function showFiles(files) {
    for(let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file.type.startsWith('image/')){ continue }
        const img = document.createElement("img");
        img.classList.add("obj");
        img.file = file;
        const preview = document.getElementById("preview");
        preview.appendChild(img); // Assuming that "preview" is the div output where the content will be displayed.
    
        const reader = new FileReader();
        reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
        reader.readAsDataURL(file);
    }
  };
});
