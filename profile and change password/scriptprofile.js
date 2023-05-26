const fileInput = document.querySelector('.file-input');
const profilePic = document.querySelector('.profpic');
const nameInput = document.getElementById('name');
const lastnameInput = document.getElementById('lastname');
const emailInput = document.getElementById('email');
const submitButton = document.querySelector('#submit-button');
const nameRegex = /^[A-Za-z ]+$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;



fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
        profilePic.src = event.target.result;
    };
});




function validateInput(input, regex) {
    if (regex.test(input.value)) {
        input.classList.remove('invalid-input');
        input.classList.add('valid-input');
    } else {
        input.classList.remove('valid-input');
        input.classList.add('invalid-input');
        submitButton.disabled = true;
        submitButton.classList.add('disabled');
    }
}


function validateForm() {
    const isValidName = nameRegex.test(nameInput.value);
    const isValidLastname = nameRegex.test(lastnameInput.value);
    const isValidEmail = emailRegex.test(emailInput.value);

    if (!isValidName || !isValidLastname || !isValidEmail) {
        submitButton.disabled = true;
        submitButton.classList.add('disabled');
    } else {
        submitButton.disabled = false;
        submitButton.classList.remove('disabled');
    }
}



nameInput.addEventListener('input', () => {
    validateInput(nameInput, nameRegex);
    validateForm();
});

lastnameInput.addEventListener('input', () => {
    validateInput(lastnameInput, nameRegex);
    validateForm();
});

emailInput.addEventListener('input', () => {
    validateInput(emailInput, emailRegex);
    validateForm();
});
