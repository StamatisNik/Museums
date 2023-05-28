const newPasswordInput = document.getElementById('new');
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&+=_])[A-Za-z\d@$!%*#?&+=_]{8,}$/
const passwordMessage = document.getElementById('password-message');

const Passform=document.querySelector("#passForm");
newPasswordInput.addEventListener('input', () => {
  const passwordValue = newPasswordInput.value;
  const isValidPassword = passwordRegex.test(passwordValue);

  if (isValidPassword) {
    newPasswordInput.style.color = 'green';
    passwordMessage.textContent = '';
  } else {
    newPasswordInput.style.color = 'red';
    passwordMessage.textContent = "Password must contain at least one number, letter, symbol, and have at least 8 characters!";
  }
});


validateForm();

  function validateForm() {

    let newPassword = document.getElementById('new');
    let confirmPassword = document.getElementById('confirm');
    let passwordMessage = document.getElementById('password-message2');

  
    confirmPassword.addEventListener("blur",function(){
      {
        if (newPassword.value !== confirmPassword.value) {
  
          passwordMessage.innerHTML = "Passwords do not match.";
          passwordMessage.style.color = "red";
          return false; 
    
        } else {
    
          passwordMessage.innerHTML = ""; 
          return true; 
        }
  
      }


    })
   
     

  }

  