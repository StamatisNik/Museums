let emailInp=document.getElementById("email-id");
let confEmailInp=document.getElementById("confirm-email");
let al=document.getElementById("alertbox-id");
let passwordInp=document.getElementById("password");
let passwordConfInp=document.getElementById("passwordConfirm");
let dateInp=document.getElementById("DOB-id");
let submitBtn=document.getElementById("submitButton");
const emailContainer=document.querySelector("#email-container");
const confEmailContainer=document.querySelector("#confemail-container");
const passwordContainer=document.querySelector("#pass-container");
const confPassContainer=document.querySelector("#passconf-container");
const dobContainer=document.querySelector("#dob-container");
const correctIcon=document.querySelector("#correctSvgContainer");
const falseIcon=document.querySelector("#falseSvgContainer");
let success=document.getElementById("successMessage");
    let error=document.getElementById("errorMessage");


isEmail(emailInp,confEmailInp,dateInp,passwordInp,passwordConfInp,submitBtn);


function isEmail(email,confEmail,date,password,passwordConfirm,submit) {
  let success=document.getElementById("successMessage");
    let error=document.getElementById("errorMessage");
    const emailRegex=/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    const passwordRegex=/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&+=_])[A-Za-z\d@$!%*#?&+=_]{8,}$/
    

   
  //αν το πεδίο email, έχει μορφή email
  
    email.addEventListener("input",function()
    {
        if(email.value.match(emailRegex))
  { 
    email.setAttribute("id","successMessage");
    email.style.display="block";
    /*success.style.display="block";
    error.style.display = "none";
    success.innerHTML="Έγκυρο email";*/
    falseIcon.style.display = "none";
    emailContainer.append(correctIcon);
    correctIcon.style.display = "block";
    
  }

  else
  {
    email.setAttribute("id","errorMessage");
    /*success.style.display="none";
    error.style.display = "block";
    error.innerHTML="Μή έγκυρο email!";*/
    correctIcon.style.display = "none";
    emailContainer.append(falseIcon);
    falseIcon.style.display = "block";
    
    submit.disabled=true;
    
  }
        
    })

    
   
 



  // αν στο τηλέφωνο υπάρχουν μόνο αριθμοί,


    date.addEventListener("input",function()
    {
        if(date.value.match(dateRegex))
  {
    date.setAttribute("id","successMessage");
    date.style.display="block";
    /*error.style.display = "none";
    success.style.display="block";
    success.innerHTML="Έγκυρο τηλέφωνο";*/
    dobContainer.append(correctIcon);
    correctIcon.style.display = "block";
    falseIcon.style.display = "none";
    submit.disabled="false";
    
  }

  else
  {
    date.setAttribute("id","errorMessage");
    /*success.style.display="none";
    error.style.display = "block";
    error.innerHTML="Μή έγκυρο τηλέφωνο!";*/
    submit.disabled=true;
    correctIcon.style.display = "none";
    dobContainer.append(falseIcon);
    falseIcon.style.display = "block";
    
  }
        
    })


  // αν ο κωδικός και επιβεβαίωση να είναι ίδιοι
  

  password.addEventListener("input",function()
    {
        if(password.value.match(passwordRegex))
        
        
        
  {
    success.style.display="block";
    error.style.display = "none";
   

   
        if(password.value!==passwordConfirm.value)
        {
            
           /* success.style.display="block";
            success.innerHTML="Έγκυρος κωδικός";
            error.style.display = "block";
            
            error.innerHTML="Οι κωδικοί δεν ταιριάζουν!";*/
            passwordContainer.append(correctIcon);
            correctIcon.style.display = "block";
            falseIcon.style.display = "none";
            submit.disabled=true;
            passwordConfirm.disabled=false;

        }
  
  }

  else
  {
    success.style.display="none";
    error.style.display = "block";
    error.innerHTML="Ο κωδικός πρέπει να περιλαμβάνει τουλάχιστον ένα γράμμα, χαρακτήρα, σύμβολο και να έχει τουλάχιστον 8 χαρακτήρες!";
    correctIcon.style.display = "none";
    passwordContainer.append(falseIcon);
    falseIcon.style.display = "block";
    passwordConfirm.disabled=true;
    submit.disabled=true;
  }
        
    })




    passwordConfirm.addEventListener("input",function()
    {
        if(passwordConfirm.value!==password.value)
  {
    success.style.display="none";
    //error.style.display = "block";
    correctIcon.style.display = "none";
    confPassContainer.append(falseIcon);
    falseIcon.style.display = "block";
    //error.innerHTML="Οι κωδικοί δεν ταιριάζουν!";
    submit.disabled=true;
    
 
  }

  else 
  {
    error.style.display = "none";
   // success.style.display="block";
    confPassContainer.append(correctIcon);
    correctIcon.style.display = "block";
    falseIcon.style.display = "none";
    //success.innerHTML="Οι κωδικοί ταιριάζουν"; 
    submit.disabled=false;
    
    
  }
        
    })

   /* email.addEventListener("input",function()
    {
        if(email.value!==confEmail.value)
  {
    confEmail.setAttribute("id","errorMessage");
    email.style.display="block";
    success.style.display="none";
    //error.style.display = "block";
    correctIcon.style.display = "none";
    emailContainer.append(falseIcon);
    falseIcon.style.display = "block";
    //error.innerHTML="Οι κωδικοί δεν ταιριάζουν!";
    submit.disabled=true;
    
 
  }

  else 
  {
    email.setAttribute("id","successMessage");
    error.style.display = "none";
   // success.style.display="block";
    emailContainer.append(correctIcon);
    correctIcon.style.display = "block";
    falseIcon.style.display = "none";
    //success.innerHTML="Οι κωδικοί ταιριάζουν"; 
    submit.disabled=false;
    
    
  }
        
    })*/


 /* confEmail.addEventListener("input",function()
    {
        if(confEmail.value!==email.value)
  {
    confEmail.setAttribute("id","errorMessage");
    confEmail.style.display="block";
    success.style.display="none";
    //error.style.display = "block";
    correctIcon.style.display = "none";
    confEmailContainer.append(falseIcon);
    falseIcon.style.display = "block";
    //error.innerHTML="Οι κωδικοί δεν ταιριάζουν!";
    submit.disabled=true;
    
 
  }

  else 
  {
    confEmail.setAttribute("id","successMessage");
    error.style.display = "none";
   // success.style.display="block";
    confEmailContainer.append(correctIcon);
    correctIcon.style.display = "block";
    falseIcon.style.display = "none";
    //success.innerHTML="Οι κωδικοί ταιριάζουν"; 
    submit.disabled=false;
    
    
  }
        
    })*/


    
  
  // να δώσετε κατάλληλο μήνυμα στην αρχή της σελίδας
  

 



};


