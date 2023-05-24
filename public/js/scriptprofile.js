const fileInput = document.querySelector('.file-input');
const profilePic = document.querySelector('.profpic');

fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
        profilePic.src = event.target.result;
    };
});


const nameInput = document.getElementById('name');
const lastnameInput = document.getElementById('lastname');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const subbtn = document.querySelector('.btn');
const nameRegex = /^[A-Za-z ]+$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^.{8,}$/;


function addPasswordConfirm() {
    const confirmDiv = document.createElement('div');
    confirmDiv.classList.add('form-element');
    const confirmLabel = document.createElement('label');
    confirmLabel.textContent = 'Confirm Password:';
    const confirmInput = document.createElement('input');
    confirmInput.type = 'password';
    confirmInput.id = 'confirm-password';
    confirmDiv.appendChild(confirmLabel);
    confirmDiv.appendChild(confirmInput);

    const oldDiv = document.createElement('div');
    oldDiv.classList.add('form-element');
    const oldLabel = document.createElement('label');
    oldLabel.textContent = 'Old Password:';
    const oldInput = document.createElement('input');
    oldInput.type = 'password';
    oldInput.id = 'old-password';
    oldDiv.appendChild(oldLabel);
    oldDiv.appendChild(oldInput);

    passwordInput.parentElement.parentElement.insertBefore(oldDiv, passwordInput.parentElement.nextElementSibling);
    passwordInput.parentElement.parentElement.insertBefore(confirmDiv, passwordInput.parentElement.nextElementSibling);

    passwordInput.removeEventListener('click', addPasswordConfirm);
}

passwordInput.addEventListener('click', addPasswordConfirm);


function validateInput(input, regex){
    if (regex.test(input.value)) {
        input.classList.remove('invalid-input');
        input.classList.add('valid-input');
    } else {
        input.classList.remove('valid-input');
        input.classList.add('invalid-input');
    }
}


nameInput.addEventListener('input', () => {
    validateInput(nameInput, nameRegex);
});

lastnameInput.addEventListener('input', () =>{
  validateInput(lastnameInput, nameRegex);

})

emailInput.addEventListener('input', () => {
    validateInput(emailInput, emailRegex);
});

passwordInput.addEventListener('input', () => {
    validateInput(passwordInput, passwordRegex);
});



const popupError = document.getElementById('popupError');
const popupErrorMessage = document.getElementById('popupErrorMessage');
const popupErrorBtn = document.getElementById('popupErrorBtn');
const popupSuccess = document.getElementById('popupSuccess');
const popupSuccessMessage = document.getElementById('popupSuccessMessage');
const popupSuccessBtn = document.getElementById('popupSuccessBtn');


function displayPopupError(message) {
    popupErrorMessage.textContent = message;
    popupError.style.display = 'block';
}

function displayPopupSuccess(message) {
    popupSuccessMessage.textContent = message;
    popupSuccess.style.display = 'block';
}

function hidePopupError() {
    popupError.style.display = 'none';
}

function hidePopupSuccess() {
    popupSuccess.style.display = 'none';
}



let passwordClicked = false;

passwordInput.addEventListener('click', () => {
    passwordClicked = true;
});



subbtn.addEventListener('click', (event) => {
   

    hidePopupError();
    hidePopupSuccess();
   
    const confirmPasswordInput = document.getElementById('confirm-password');
    const oldPasswordInput = document.getElementById('old-password');

    if (!emailRegex.test(emailInput.value)) {
        displayPopupError('Please enter a valid email address');
        return;
    }
    else if (!nameRegex.test(nameInput.value)) {
        displayPopupError('Please enter a valid name');
        return;
    } 
    else if (!nameRegex.test(lastnameInput.value)) {
        displayPopupError('Please enter a valid last name');
        return;
    } 
    else if (!passwordRegex.test(passwordInput.value)) {
        displayPopupError('Your password should be at least 8 characters long'); 
        return;
    }
    else if (passwordClicked && passwordInput.value !== confirmPasswordInput.value ) {
        displayPopupError('Passwords should be the same');
        return;
    } 
    else if (passwordClicked && passwordInput.value === oldPasswordInput.value) {
        displayPopupError('New password should not be the same as the old password');
        return;
    }
    else {
        displayPopupSuccess('Form submitted successfully');
    }
});



popupErrorBtn.addEventListener('click', () => {
    hidePopupError();
});


popupSuccessBtn.addEventListener('click', () => {
    hidePopupSuccess();
  
});


