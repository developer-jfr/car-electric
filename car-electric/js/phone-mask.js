//add this class="md-input" for input phone and need to be type='text'

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
const form = document.getElementById('form-api');
const username = document.getElementById('md-name');
const phone = document.getElementById('md-phone');

//Show input error messages
function showError(input, message) {
    const formControl = input.parentElement.closest('#wr-input');
    console.log(formControl)
    let inputForm = formControl.querySelector('.modal_input');
    inputForm.classList.add('input-error');
    const small = formControl.querySelector('.message');
    small.classList.add('ms-error');
}

//show success colour
function showSucces(input) {
    const formControl = input.parentElement.closest('.modal_input');
    formControl.classList.add('input-succes');
    const small = formControl.querySelector('small');
    small.classList.add('message');
}



//checkRequired fields
function checkRequired(inputArr) {
    inputArr.forEach(function(input){
        if(input.value.trim() === ''){
            showError(input,`${getFieldName(input)} is required`)
        }else {
            showSucces(input);
        }
    });
}




//get FieldName
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}



//Event Listeners
form.addEventListener('submit',function(e) {
    e.preventDefault();

    checkRequired([username, phone]);
});