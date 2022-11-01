
// ------------------- Phone Mask ---------------------------
[].forEach.call(document.querySelectorAll('.md-input'), function (input) {
  let keyCode;
  function mask(event) {
      event.keyCode && (keyCode = event.keyCode);
      let pos = this.selectionStart;
      if (pos < 3) event.preventDefault();
      let matrix = "+996 (___) ___-___",
          i = 0,
          def = matrix.replace(/\D/g, ""),
          val = this.value.replace(/\D/g, ""),
          newValue = matrix.replace(/[_\d]/g, function (a) {
              return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
          });
      i = newValue.indexOf("_");
      if (i != -1) {
          i < 5 && (i = 3);
          newValue = newValue.slice(0, i);
      }
      let reg = matrix.substr(0, this.value.length).replace(/_+/g,
          function (a) {
              return "\\d{1," + a.length + "}";
          }).replace(/[+()]/g, "\\$&");
      reg = new RegExp("^" + reg + "$");
      if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = newValue;
      if (event.type == "blur" && this.value.length < 5) this.value = "";
  }

  input.addEventListener("input", mask, false);
  input.addEventListener("focus", mask, false);
  input.addEventListener("blur", mask, false);
  input.addEventListener("keydown", mask, false);
});

//----------- Form Validation --------------------
const formValidation = document.getElementById('form-api');
const username = document.getElementById('md-name');
const phone = document.getElementById('md-phone');

//Show input error messages
function showError(input, message) {
  const formControl = input.parentElement.closest('#wr-input');
  console.log(formControl)
  let inputForm = formControl.querySelector('.modal_input');
  inputForm.classList.add('input-error');
  const small = formControl.querySelector('.message');
  if(message !== '') {
      small.innerText = message
      small.classList.add('ms-error');
  }
  small.classList.add('ms-error');
}

//show success colour
function showSucces(input) {
  const formControl = input.parentElement.closest('#wr-input');
  let inputForm = formControl.querySelector('.modal_input');
  inputForm.classList.add('input-succes');
  const small = formControl.querySelector('.message');
  small.classList.remove('ms-error');
}



//checkRequired fields
function checkRequired(inputArr) {
  inputArr.forEach(function(input){
      if(input.value.trim() === ''){
          showError(input, '')
      }else {
          showSucces(input);
      }
  });
}




//get FieldName
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}


//check input Length
function checkLength(input, length) {
  if(input.getAttribute('id').includes('phone') && input.value.length < length) {
      showError(input, 'Номер телефона короткое')
  } else {
      showSucces(input);
  }
}


//Event Listeners
formValidation.addEventListener('submit',function(e) {
  e.preventDefault();

  checkRequired([username, phone]);
  checkLength(phone, 18)
});


//------------- Send Data ----------------------------------



const form = document.getElementById("form-api");
console.log(form);


(function () {
  form.addEventListener("submit", function (e) {
    // Prevent default behavior
    e.preventDefault();
    // Create new FormData object
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    
    // get name of car
    const modalInfo = document.querySelector('.modal_info ');
    let carName = modalInfo.querySelector('.modal_form h5').innerText;

  
    let payloadForm = {
      product_model: carName,
      username: formProps.username,
      phone: formProps.phone
  };

  console.log(payloadForm.phone.length)

  // Convert formData object to URL-encoded string:
  const payload = JSON.stringify(payloadForm);
  
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-CSRFToken": formProps.csrfmiddlewaretoken,
  };
    if(formProps.username !== '' && formProps.phone !== '' && formProps.phone.length >= 18) {
      // Post the payload using Fetch:
    fetch('http://127.0.0.1:8000/modal/', {
      method: 'POST',
      headers: headers,
      body: payload,
      })
      .then(res => res.json())
      .then(data => console.log(data))
    }
  });

  document.getElementById('modal_name_input').value = '';
  document.getElementById('modal_phone_input').value = '';
  
})();
