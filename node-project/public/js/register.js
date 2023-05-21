let emailInp=document.getElementById("email-id");
let confEmailInp=document.getElementById("confirm-email");
let al=document.getElementById("alertbox-id");
let passwordInp=document.getElementById("password");
let passwordConfInp=document.getElementById("passwordConfirm");
let dateInp=document.getElementById("DOB-id");
let submitBtn=document.getElementById("submitButton");
let success=document.getElementById("successMessage");
let error=document.getElementById("errorMessage");

const emailContainer=document.querySelector("#email-container");
const confEmailContainer=document.querySelector("#confemail-container");
const passwordContainer=document.querySelector("#pass-container");
const confPassContainer=document.querySelector("#passconf-container");
const dobContainer=document.querySelector("#dob-container");
const correctIcon=document.querySelector("#correctSvgContainer");
const falseIcon=document.querySelector("#falseSvgContainer");
const passError=document.querySelector("#passerrorMessage");

const falseIconCloneDob=falseIcon.cloneNode(true);
const falseIconCloneConfEmail=falseIcon.cloneNode(true);
const falseIconClonePass=falseIcon.cloneNode(true);
const falseIconCloneConfPass=falseIcon.cloneNode(true);

const correctIconCloneDob=correctIcon.cloneNode(true);
const correctIconCloneConfEmail=correctIcon.cloneNode(true);
const correctIconClonePass=correctIcon.cloneNode(true);
const correctIconCloneConfPass=correctIcon.cloneNode(true);

const emailRegex=/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
const passwordRegex=/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&+=_])[A-Za-z\d@$!%*#?&+=_]{8,}$/



Validation(emailInp,confEmailInp,dateInp,passwordInp,passwordConfInp,submitBtn);




function Validation(email,confEmail,date,password,passwordConfirm,submit) {
    
   
  
  
  email.addEventListener("input", function() {
    if (email.value === "" ) {
      correctIcon.style.display = "none";
      falseIcon.style.display = "none";
      email.removeAttribute("id");
      confEmail.removeAttribute("id");
      return;
    }

    
  
    else if (!email.value.match(emailRegex)) {
      email.setAttribute("id", "errorMessage");
      correctIcon.style.display = "none";
      emailContainer.append(falseIcon);
      falseIcon.style.display = "block";
     
      
    }  
    else 
    {
      email.setAttribute("id", "successMessage");
      email.style.display = "block";
      falseIcon.style.display = "none";
      emailContainer.append(correctIcon);
      correctIcon.style.display = "block";
      
      
    }
  });

   email.addEventListener("input",()=>
   {
    if(email.value !== confEmail.value && confEmail.value!=="" )
    {
      confEmail.setAttribute("id", "errorMessage");
      
      confEmailContainer.append(falseIconCloneConfEmail);
      correctIconCloneConfEmail.style.display="none";
      falseIconCloneConfEmail.style.display = "block";
      
      

    }

    else if(email.value === confEmail.value && email.value.match(emailRegex) )
    {
      confEmail.setAttribute("id", "successMessage");
      confEmail.style.display="block";      
      correctIconCloneConfEmail.style.display = "block";
      confEmailContainer.append(correctIconCloneConfEmail);
      falseIconCloneConfEmail.style.display = "none";
      

    }

   })


  confEmail.addEventListener("input", function() {
    if (confEmail.value === "") {
      correctIconCloneConfEmail.style.display = "none";
      falseIconCloneConfEmail.style.display = "none";
      confEmail.removeAttribute("id","errorMessage");
      return;
    }
     else if(confEmail.value===email.value && email.value.match(emailRegex))
    {
      confEmail.setAttribute("id", "successMessage");
      confEmail.style.display="block";
      correctIconCloneConfEmail.style.display = "block";
      confEmailContainer.append(correctIconCloneConfEmail);
      falseIconCloneConfEmail.style.display = "none";
      

    }

    else if(confEmail.value!==email.value)
    {
      confEmail.setAttribute("id", "errorMessage");
      correctIconCloneConfEmail.style.display = "none";
      confEmailContainer.append(falseIconCloneConfEmail);
      falseIconCloneConfEmail.style.display = "block";
      
      

    }
  });
    

  password.addEventListener("input",function()
    {

      if (password.value === "") {
        correctIconClonePass.style.display = "none";
        falseIconClonePass.style.display = "none";
        password.removeAttribute("id","errorMessage");
        passError.classList.remove("show");
        return;
      }
      
       else if(password.value.match(passwordRegex))
  {
    success.style.display="block";
    passError.classList.remove("show");
    correctIconClonePass.style.display = "block";
    passwordContainer.append(correctIconClonePass);
    falseIconClonePass.style.display = "none";
    
  
  }

  

  else
  {
    success.style.display="none";
    passError.style.display = "block";
    passError.classList.add("show");
    passError.innerHTML="Password must contain at least one number,letter,symbol and have at least 8 characters! ";
    correctIconClonePass.style.display = "none";
    passwordContainer.append(falseIconClonePass);
    falseIconClonePass.style.display = "block";
    
    
  }
        
    })


    password.addEventListener("input",()=>
   {
    if(password.value !== passwordConfirm.value && passwordConfirm.value!=="" )
    {
      confPassContainer.append(falseIconCloneConfPass);
      correctIconCloneConfPass.style.display="none";
      falseIconCloneConfPass.style.display = "block";
      
      

    }

    else if(password.value === passwordConfirm.value && password.value.match(passwordRegex) )
    {
           
      correctIconCloneConfPass.style.display = "block";
      confPassContainer.append(correctIconCloneConfPass);
      falseIconCloneConfPass.style.display = "none";
      

    }

   })




    passwordConfirm.addEventListener("input",function()
    {

      if (passwordConfirm.value === "") {
        correctIconCloneConfPass.style.display = "none";
        falseIconCloneConfPass.style.display = "none";
        passwordConfirm.removeAttribute("id","errorMessage");
        passError.classList.remove("show");
        return;
      }
  
      else  if(passwordConfirm.value===password.value && password.value.match(passwordRegex))
  {
    success.style.display="block";
    correctIconCloneConfPass.style.display = "block";
    confPassContainer.append(correctIconCloneConfPass);
    falseIconCloneConfPass.style.display = "none";
    
    
 
  }

  else if(passwordConfirm.value!==password.value )
  {
    confPassContainer.append(falseIconCloneConfPass);
    correctIconCloneConfPass.style.display = "none";
    falseIconCloneConfPass.style.display = "block";
   
    
    
    
    
  }
        
    })


    date.addEventListener("input",function()
    {

      if (date.value === "") {
        correctIconCloneDob.style.display = "none";
        falseIconCloneDob.style.display = "none";
        date.removeAttribute("id","errorMessage");
        return;
      }
       else if(date.value.match(dateRegex))
  {
    date.setAttribute("id","successMessage");
    date.style.display="block";
    dobContainer.append(correctIconCloneDob);
    correctIconCloneDob.style.display = "block";
    falseIconCloneDob.style.display = "none";
    
    
  }

  else
  {
    date.setAttribute("id","errorMessage");
    ;
    correctIconCloneDob.style.display = "none";
    dobContainer.append(falseIconCloneDob);
    falseIconCloneDob.style.display = "block";
    
  }
        
    })

    checkValidation(email,confEmail,date,password,passwordConfirm,submit);
};



function checkValidation(email,confEmail,date,password,passwordConfirm,submit) {
  let list=[email,confEmail,date,password,passwordConfirm];
  list.forEach(item=>{
    item.addEventListener("blur",function()
    {
      if (email.value.match(emailRegex) && confEmail.value === email.value && email.value.match(emailRegex) &&  password.value.match(passwordRegex) && passwordConfirm.value === password.value && password.value.match(passwordRegex) && date.value.match(dateRegex)) {
        submit.disabled = false;
        console.log("ara");
      } else {
        console.log("sayon");
        submit.disabled = true;
      }

    })
    
  })

  
}
