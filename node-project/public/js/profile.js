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

subbtn.addEventListener('click', (event) => {
    
    event.preventDefault();
    
    if (!nameRegex.test(nameInput.value)) {
        alert('Please enter a valid name');
        return;
    }

    if (!emailRegex.test(emailInput.value)) {
        alert('Please enter a valid email address');
        return;
    }

    if (!passwordRegex.test(passwordInput.value)) {
        alert('Please enter a password that is at least 8 characters long');
        return;
    }
    const confirmPasswordInput = document.getElementById('confirm-password');
    const oldPasswordInput = document.getElementById('old-password');
    if (passwordInput.value !== confirmPasswordInput.value) {
        alert('Passwords do not match');
        return;
    }


    if (passwordInput.value === oldPasswordInput.value) {
        alert('Old password cannot be the same as new password');
        return;
    }

   
    this.submit();   
    alert('Form submitted successfully!');
});

