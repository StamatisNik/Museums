linkStyle();
confirmEmail();
x=getCurrentDate();
getCurrentTime(x);
groupPeopleInput();

function linkStyle()
{
  const anc=document.getElementById("info-id");
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
  let checkbox=document.getElementById("defaultCheck1");
  let ticketType=document.getElementById("ticket-type-Id");
 
  peopleNumber.addEventListener("input",function()
  {
   
    let count=1;
   
    let storedRadioValue=localStorage.getItem("radioValue");
    let standardPrice=20;
    let earlyAccesPrice=35;
    let turnTheLightsPrice=45;
    let skipTheLinePrice=60;
    
    form.addEventListener('submit', function(event) {
     
      //Standard Ticket
      if(storedRadioValue==="Standard Ticket")
      {
        if(count!==parseInt(peopleNumber.value) && ticketType.value==="Adult Ticket")
      {
        event.preventDefault();
        const nameContainer=document.getElementById("name-info");
        const newName=document.createElement("div");
        newName.innerHTML=count +"."+" " +fName.value+" "+lName.value+" "+standardPrice+"€";
        newName.classList.add("i");
        total+=standardPrice;
        
        nameContainer.append(newName);
        fName.value="";
        lName.value="";
        emailName.value="";
        confEmailName.value="";
        checkbox.checked=false;
       
        
        

       
        
        count++;
       
      }

      if(count!==parseInt(peopleNumber.value) && ticketType.value==="Student Ticket")
      {
        event.preventDefault();
        const nameContainer=document.getElementById("name-info");
        const newName=document.createElement("div");
        newName.innerHTML=count +"."+" " +fName.value+" "+lName.value+" "+(standardPrice-0.5*standardPrice)+"€";
        newName.classList.add("i");
        total+=(standardPrice-0.5*standardPrice);
        
        nameContainer.append(newName);
        fName.value="";
        lName.value="";
        emailName.value="";
        confEmailName.value="";
        Name.value="";
        checkbox.checked=false;
       
        
        

       
        
        count++;
       
      }

      if(count!==parseInt(peopleNumber.value) && ticketType.value==="Under 15")
      {
        event.preventDefault();
        const nameContainer=document.getElementById("name-info");
        const newName=document.createElement("div");
        newName.innerHTML=count +"."+" " +fName.value+" "+lName.value+" "+(standardPrice-0.4*standardPrice)+"€";
        newName.classList.add("i");
        
        nameContainer.append(newName);
        total+=(standardPrice-0.4*standardPrice);
        fName.value="";
        lName.value="";
        emailName.value="";
        confEmailName.value="";
       
        checkbox.checked=false;
       
        
        

       
        
        count++;
       
      }

      else if(count===parseInt(peopleNumber.value) && ticketType.value==="Adult Ticket")
      {
        const nameContainer=document.getElementById("name-info");
        const newName=document.createElement("div");
        newName.innerHTML=count +"."+" " +fName.value+" "+lName.value+" "+ticketType.value+""+standardPrice+"€";
  
        newName.classList.add("i");
        nameContainer.append(newName);
      }

      else if(count===parseInt(peopleNumber.value) && ticketType.value==="Student Ticket")
      {
        const nameContainer=document.getElementById("name-info");
        const newName=document.createElement("div");
        newName.innerHTML=count +"."+" " +fName.value+" "+lName.value+" "+(standardPrice-0.5*standardPrice)+"€";
  
        newName.classList.add("i");
        nameContainer.append(newName);
      }

      else if(count===parseInt(peopleNumber.value) && ticketType.value==="Under 15")
      {
        const nameContainer=document.getElementById("name-info");
        const newName=document.createElement("div");
        newName.innerHTML=count +"."+" " +fName.value+" "+lName.value+"" + (standardPrice-0.4*standardPrice)+"€";
  
        newName.classList.add("i");
        nameContainer.append(newName);
      }

        
      }

      

      //Early Access Ticket

      if(storedRadioValue==="Early Access Ticket")
      {
        if(count!==parseInt(peopleNumber.value) && ticketType.value==="Adult Ticket")
      {
        event.preventDefault();
        const nameContainer=document.getElementById("name-info");
        const newName=document.createElement("div");
        newName.innerHTML=count +"."+" " +fName.value+" "+lName.value+" "+earlyAccesPrice+"€";
        newName.classList.add("i");
        
        nameContainer.append(newName);
        fName.value="";
        lName.value="";
        emailName.value="";
        confEmailName.value="";
        checkbox.checked=false;
       
        
        

       
        
        count++;
       
      }

      if(count!==parseInt(peopleNumber.value) && ticketType.value==="Student Ticket")
      {
        event.preventDefault();
        const nameContainer=document.getElementById("name-info");
        const newName=document.createElement("div");
        newName.innerHTML=count +"."+" " +fName.value+" "+lName.value+" "+(earlyAccesPrice-0.5*earlyAccesPrice)+"€";
        newName.classList.add("i");
        
        nameContainer.append(newName);
        fName.value="";
        lName.value="";
        emailName.value="";
        confEmailName.value="";
       
        checkbox.checked=false;
       
        
        

       
        
        count++;
       
      }

      if(count!==parseInt(peopleNumber.value) && ticketType.value==="Under 15")
      {
        event.preventDefault();
        const nameContainer=document.getElementById("name-info");
        const newName=document.createElement("div");
        newName.innerHTML=count +"."+" " +fName.value+" "+lName.value+" "+(earlyAccesPrice-0.4*earlyAccesPrice)+"€";
        newName.classList.add("i");
        
        nameContainer.append(newName);
        fName.value="";
        lName.value="";
        emailName.value="";
        confEmailName.value="";
       
        checkbox.checked=false;
       
        
        

       
        
        count++;
       
      }

      else if(count===parseInt(peopleNumber.value) && ticketType.value==="Adult Ticket")
      {
        const nameContainer=document.getElementById("name-info");
        const newName=document.createElement("div");
        newName.innerHTML=count +"."+" " +fName.value+" "+lName.value+" "+ticketType.value+""+earlyAccesPrice+"€";
  
        newName.classList.add("i");
        nameContainer.append(newName);
      }

      else if(count===parseInt(peopleNumber.value) && ticketType.value==="Student Ticket")
      {
        const nameContainer=document.getElementById("name-info");
        const newName=document.createElement("div");
        newName.innerHTML=count +"."+" " +fName.value+" "+lName.value+" "+(earlyAccesPrice-0.5*earlyAccesPrice)+"€";
  
        newName.classList.add("i");
        nameContainer.append(newName);
      }

      else if(count===parseInt(peopleNumber.value) && ticketType.value==="Under 15")
      {
        const nameContainer=document.getElementById("name-info");
        const newName=document.createElement("div");
        newName.innerHTML=count +"."+" " +fName.value+" "+lName.value+"" + (earlyAccesPrice-0.4*earlyAccesPrice)+"€";
  
        newName.classList.add("i");
        nameContainer.append(newName);
      }

        
      }


      //Turn The light On
      if(storedRadioValue==="Turn The lights On")
      {
        if(count!==parseInt(peopleNumber.value) && ticketType.value==="Adult Ticket")
      {
        event.preventDefault();
        const nameContainer=document.getElementById("name-info");
        const newName=document.createElement("div");
        newName.innerHTML=count +"."+" " +fName.value+" "+lName.value+" "+turnTheLightsPrice+"€";
        newName.classList.add("i");
        
        nameContainer.append(newName);
        fName.value="";
        lName.value="";
        emailName.value="";
        confEmailName.value="";
        checkbox.checked=false;
       
        
        

       
        
        count++;
       
      }

      if(count!==parseInt(peopleNumber.value) && ticketType.value==="Student Ticket")
      {
        event.preventDefault();
        const nameContainer=document.getElementById("name-info");
        const newName=document.createElement("div");
        newName.innerHTML=count +"."+" " +fName.value+" "+lName.value+" "+(turnTheLightsPrice-0.5*turnTheLightsPrice)+"€";
        newName.classList.add("i");
        
        nameContainer.append(newName);
        fName.value="";
        lName.value="";
        emailName.value="";
        confEmailName.value="";
       
        checkbox.checked=false;
       
        
        

       
        
        count++;
       
      }

      if(count!==parseInt(peopleNumber.value) && ticketType.value==="Under 15")
      {
        event.preventDefault();
        const nameContainer=document.getElementById("name-info");
        const newName=document.createElement("div");
        newName.innerHTML=count +"."+" " +fName.value+" "+lName.value+" "+(turnTheLightsPrice-0.4*turnTheLightsPrice)+"€";
        newName.classList.add("i");
        
        nameContainer.append(newName);
        fName.value="";
        lName.value="";
        emailName.value="";
        confEmailName.value="";
       
        checkbox.checked=false;
       
        
        

       
        
        count++;
       
      }

      else if(count===parseInt(peopleNumber.value) && ticketType.value==="Adult Ticket")
      {
        const nameContainer=document.getElementById("name-info");
        const newName=document.createElement("div");
        newName.innerHTML=count +"."+" " +fName.value+" "+lName.value+" "+ticketType.value+""+turnTheLightsPrice+"€";
  
        newName.classList.add("i");
        nameContainer.append(newName);
      }

      else if(count===parseInt(peopleNumber.value) && ticketType.value==="Student Ticket")
      {
        const nameContainer=document.getElementById("name-info");
        const newName=document.createElement("div");
        newName.innerHTML=count +"."+" " +fName.value+" "+lName.value+" "+(turnTheLightsPrice-0.5*turnTheLightsPrice)+"€";
  
        newName.classList.add("i");
        nameContainer.append(newName);
      }

      else if(count===parseInt(peopleNumber.value) && ticketType.value==="Under 15")
      {
        const nameContainer=document.getElementById("name-info");
        const newName=document.createElement("div");
        newName.innerHTML=count +"."+" " +fName.value+" "+lName.value+"" + (turnTheLightsPrice-0.4*turnTheLightsPrice)+"€";
  
        newName.classList.add("i");
        nameContainer.append(newName);
      }

        
      }
      
      //Skip-The-Ticket-Line-Tour

      if(storedRadioValue==="Skip-The-Ticket-Line-Tour")
      {
        if(count!==parseInt(peopleNumber.value) && ticketType.value==="Adult Ticket")
      {
        event.preventDefault();
        const nameContainer=document.getElementById("name-info");
        const newName=document.createElement("div");
        newName.innerHTML=count +"."+" " +fName.value+" "+lName.value+" "+skipTheLinePrice+"€";
        newName.classList.add("i");
        
        nameContainer.append(newName);
        fName.value="";
        lName.value="";
        emailName.value="";
        confEmailName.value="";
        checkbox.checked=false;
       
        
        

       
        
        count++;
       
      }

      if(count!==parseInt(peopleNumber.value) && ticketType.value==="Student Ticket")
      {
        event.preventDefault();
        const nameContainer=document.getElementById("name-info");
        const newName=document.createElement("div");
        newName.innerHTML=count +"."+" " +fName.value+" "+lName.value+" "+(skipTheLinePrice-0.5*skipTheLinePrice)+"€";
        newName.classList.add("i");
        
        nameContainer.append(newName);
        fName.value="";
        lName.value="";
        emailName.value="";
        confEmailName.value="";
       
        checkbox.checked=false;
       
        
        

       
        
        count++;
       
      }

      if(count!==parseInt(peopleNumber.value) && ticketType.value==="Under 15")
      {
        event.preventDefault();
        const nameContainer=document.getElementById("name-info");
        const newName=document.createElement("div");
        newName.innerHTML=count +"."+" " +fName.value+" "+lName.value+" "+(skipTheLinePrice-0.4*skipTheLinePrice)+"€";
        newName.classList.add("i");
        
        nameContainer.append(newName);
        fName.value="";
        lName.value="";
        emailName.value="";
        confEmailName.value="";
       
        checkbox.checked=false;
       
        
        

       
        
        count++;
       
      }

      else if(count===parseInt(peopleNumber.value) && ticketType.value==="Adult Ticket")
      {
        const nameContainer=document.getElementById("name-info");
        const newName=document.createElement("div");
        newName.innerHTML=count +"."+" " +fName.value+" "+lName.value+" "+ticketType.value+""+skipTheLinePrice+"€";
  
        newName.classList.add("i");
        nameContainer.append(newName);
      }

      else if(count===parseInt(peopleNumber.value) && ticketType.value==="Student Ticket")
      {
        const nameContainer=document.getElementById("name-info");
        const newName=document.createElement("div");
        newName.innerHTML=count +"."+" " +fName.value+" "+lName.value+" "+(skipTheLinePrice-0.5*skipTheLinePrice)+"€";
  
        newName.classList.add("i");
        nameContainer.append(newName);
      }

      else if(count===parseInt(peopleNumber.value) && ticketType.value==="Under 15")
      {
        const nameContainer=document.getElementById("name-info");
        const newName=document.createElement("div");
        newName.innerHTML=count +"."+" " +fName.value+" "+lName.value+"" + (skipTheLinePrice-0.4*skipTheLinePrice)+"€";
  
        newName.classList.add("i");
        nameContainer.append(newName);
      }

        
      }
    

    })
  
    
  
    })
  }
  

 


