linkStyle();
confirmEmail();
x=getCurrentDate();
getCurrentTime(x);
groupPeopleInput();

function linkStyle()
{
  const anc=document.getElementById("ticket-book");
  console.log(anc.href,window.location.href);
    if(window.location.href===anc.href)
    {
      anc.classList.remove("clr");
      anc.classList.add("change-color");
    
  
    }
    
    else if(window.location.href!==anc.href){
      anc.classList.add("clr");
    }
}

function confirmEmail()
{
let email=document.getElementById("Email-id");
let confEmail=document.getElementById("Confirm-email");
let al=document.getElementById("alertbox-id");

console.log(email);
console.log(confEmail);

confEmail.addEventListener("input" ,function()
{
  if (!email.value || !confEmail.value) {
    al.classList.remove("alertboxShow");
    al.classList.add("alertbox");
    
  }
  else if (email.value !== confEmail.value) {
    al.classList.remove("alertbox");
    al.classList.add("alertboxShow");
  } else {
    al.classList.remove("alertboxShow");
    al.classList.add("alertbox");
  }
})
 
email.addEventListener("input" ,function()
{
  if (!email.value || !confEmail.value) {
    al.classList.remove("alertboxShow");
    al.classList.add("alertbox");
    
  }
  else if (email.value !== confEmail.value) {
    al.classList.remove("alertbox");
    al.classList.add("alertboxShow");
  } else {
    al.classList.remove("alertboxShow");
    al.classList.add("alertbox");
  }
})
 
}



  


function getCurrentDate()
{
  let cDate=document.getElementById("dateId")
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0'); 
  let yyyy = today.getFullYear();

  today = yyyy + '-' + mm + '-' + dd;

  cDate.value=String(today);
  cDate.min=String(today);

  return today

}


function getCurrentTime(dateToday)
{
  const today = new Date();
  for(let i=0; i<29; i++)
  {
    let cTime=document.querySelector("#time" +String(i));
    let time = today.getHours() + ":" + today.getMinutes();
    let cDate=document.getElementById("dateId");
    let time1=new Date('2020-01-01 ' + cTime.value);
    let time2=new Date('2020-01-01 '+ time);
    window.addEventListener("load",function()
    {
      if(time1.getTime()<time2.getTime() && cDate.value===dateToday)
      {
        cTime.setAttribute("disabled","");
      }
      else if(cDate.value!==dateToday)
      {
        cTime.removeAttribute("disabled","");
        cTime.setAttribute("enabled","");
      }
      
    })
    cDate.addEventListener("change",function()
    {
      selectedDate=cDate.value
      if(time1.getTime()<time2.getTime() && selectedDate===dateToday)
      {
        cTime.setAttribute("disabled","");
      }
      else if(selectedDate!==dateToday)
      {
        cTime.removeAttribute("disabled","");
        cTime.setAttribute("enabled","");
      }
    })
     
  }
  

}

function groupPeopleInput()
{
  const form=document.getElementById("ticket-form");
  let peopleNumber=document.getElementById("people-group-id");
  let fName=document.getElementById("First-name");
  let lName=document.getElementById("surname-id");
  let emailName=document.getElementById("Email-id");
  let confEmailName=document.getElementById("Confirm-email");
  let cityName=document.getElementById("city-id");
  let checkbox=document.getElementById("defaultCheck1");
 
  peopleNumber.addEventListener("input",function()
  {
   
    let count=1;
   

    form.addEventListener('submit', function(event) {
     

      if(count!==parseInt(peopleNumber.value))
      {
        event.preventDefault();
        const nameContainer=document.getElementById("name-info");
        const newName=document.createElement("div");
        newName.innerHTML=count +"x"+" " +fName.value+" "+lName.value;
        newName.classList.add("i");
        
        nameContainer.append(newName);
        fName.value="";
        lName.value="";
        emailName.value="";
        confEmailName.value="";
        cityName.value="";
        checkbox.checked=false;
       
        
        

       
        
        count++;
       
      }

      else if(count===parseInt(peopleNumber.value))
      {
        const nameContainer=document.getElementById("name-info");
        const newName=document.createElement("div");
        newName.innerHTML=count +"x"+" " +fName.value+" "+lName.value;
  
        newName.classList.add("i");
        nameContainer.append(newName);
      }

      
      
    

    })
  
    
    
 
  
  
    })
  }
  

 


