const newPasswordInput = document.getElementById('new');
const passwordRegex = /^(?=.*[A-Z0-9])(?=.*[!@#$%^&*]).{8,}$/;
const passwordMessage = document.getElementById('password-message');

newPasswordInput.addEventListener('input', () => {
  const passwordValue = newPasswordInput.value;
  const isValidPassword = passwordRegex.test(passwordValue);

  if (isValidPassword) {
    newPasswordInput.style.color = 'green';
    passwordMessage.textContent = '';
  } else {
    newPasswordInput.style.color = 'red';
    passwordMessage.textContent = 'Password should be at least 8 characters with one capital and one special character';
  }
});

  function validateForm() {
    let newPassword = document.getElementById('new').value;
    let confirmPassword = document.getElementById('confirm').value;
    let passwordMessage = document.getElementById('password-message2');

    if (newPassword !== confirmPassword) {
      passwordMessage.innerHTML = "Passwords do not match.";
      passwordMessage.style.color = "red";
      return false; 
    } else {
      passwordMessage.innerHTML = ""; 
      return true; 
    }

  }

  

  
  let submitButton = document.getElementById('submit-button');
  submitButton.addEventListener('click', function(event) {
    event.preventDefault(); 
    validateForm();
  });