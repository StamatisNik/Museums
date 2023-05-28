//Set constants
const nameInput = document.getElementById('name');
const lastnameInput = document.getElementById('lastname');
const emailInput = document.getElementById('email');
const submitButton = document.querySelector('#submit-button');

// Regex for name and email validation
const nameRegex = /^[A-Za-zΑ-Ωα-ωίϊΐόάέύϋΰήώΆΈΉΊΌΎΏΪΫς ]+$/;
const emailRegex =/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/


// Function to validate an input element against a regular expression
function validateInput(input, regex) {

    if (regex.test(input.value)) {

        // If the input is valid, remove the 'invalid-input' class and add the 'valid-input' class
        input.classList.remove('invalid-input');
        input.classList.add('valid-input');

    } else {
        // If the input is invalid, remove the 'valid-input' class and add the 'invalid-input' class
        input.classList.remove('valid-input');
        input.classList.add('invalid-input');
        submitButton.disabled = true;
        submitButton.classList.add('disabled');
    }
}

// Add input event listeners to the name, lastname, and email inputs
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


// Validate inputs against the regexes

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