linkStyle();
groupPeopleInput();
const date=getCurrentDate();
getCurrentTime(date);


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
  for(let i=1; i<4; i++)
  {
    let cTime=document.querySelector("#time-zone" +String(i));
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
  let checkbox=document.getElementById("defaultCheck1");
  const ticketType=document.getElementById("ticket-type-Id");
  let count;
 

  
  peopleNumber.addEventListener("input",function()
  {
  const nameContainer=document.getElementById("name-info");
  const newName=document.createElement("div");
  nameContainer.innerHTML = "Tickets:";
  nameContainer.classList.add("i","namecont");
    count=1;
    
  })
    
  const storedRadioValue=localStorage.getItem("radioValue");
  console.log(storedRadioValue);
  const standardPrice=20;
  const earlyAccesPrice=35;
  const turnTheLightsPrice=45;
  const skipTheLinePrice=60;
    
    
    form.addEventListener('submit', function(event) {
      console.log(count);
      //Standard Ticket
        if(storedRadioValue==="Standard Ticket")
       {

        if(count!==parseInt(peopleNumber.value) && ticketType.value==="Adult Ticket")
        {
          event.preventDefault();
          const nameContainer=document.getElementById("name-info");
          const newName=document.createElement("div");
          newName.innerHTML=(count +"."+" "+standardPrice+"€");
          newName.classList.add("i");
          
         
          nameContainer.append(newName);
          
          checkbox.checked=false;
          count++;
         
        }
  
        else if(count!==parseInt(peopleNumber.value) && ticketType.value==="Student Ticket")
        {
          event.preventDefault();
          const nameContainer=document.getElementById("name-info");
          const newName=document.createElement("div");
          newName.innerHTML=(count +"."+(standardPrice-0.5*standardPrice)+"€");
          newName.classList.add("i");
        
          
          nameContainer.append(newName);
         
          checkbox.checked=false;
          count++;
          
         
        }
  
        else if(count!==parseInt(peopleNumber.value) && ticketType.value==="Under 15")
        {
          event.preventDefault();
          const nameContainer=document.getElementById("name-info");
          const newName=document.createElement("div");
          newName.innerHTML=(count +"."+(standardPrice-0.4*standardPrice)+"€");
          newName.classList.add("i");
          
          nameContainer.append(newName);
         
          checkbox.checked=false;
          count++;
          
         
        }
  
        else if(count===parseInt(peopleNumber.value) && ticketType.value==="Adult Ticket")
        {
          const nameContainer=document.getElementById("name-info");
          const newName=document.createElement("div");
          newName.innerHTML=count +"."+standardPrice+"€";
    
          newName.classList.add("i");
          nameContainer.append(newName);
          count++;
        }
  
        else if(count===parseInt(peopleNumber.value) && ticketType.value==="Student Ticket")
        {
          const nameContainer=document.getElementById("name-info");
          const newName=document.createElement("div");
          newName.innerHTML=(count +"."+(standardPrice-0.5*standardPrice)+"€");
    
          newName.classList.add("i");
          nameContainer.append(newName);
          count++;
        }
  
        else if(count===parseInt(peopleNumber.value) && ticketType.value==="Under 15")
        {
          const nameContainer=document.getElementById("name-info");
          const newName=document.createElement("div");
          newName.innerHTML=(count +"."+(standardPrice-0.4*standardPrice)+"€");
    
          newName.classList.add("i");
          nameContainer.append(newName);
          count++;
        }
       }

        
      

      //Early Access Ticket

      else if(storedRadioValue==="Early Access Ticket")
      {
        if(count!==parseInt(peopleNumber.value) && ticketType.value==="Adult Ticket")
      {
        event.preventDefault();
        const nameContainer=document.getElementById("name-info");
        const newName=document.createElement("div");
        newName.innerHTML=(count +"."+earlyAccesPrice+"€");
        newName.classList.add("i");
        
        nameContainer.append(newName);
        checkbox.checked=false;
        count++;
       
        
        

       
        
        
       
      }

      else if(count!==parseInt(peopleNumber.value) && ticketType.value==="Student Ticket")
      {
        event.preventDefault();
        const nameContainer=document.getElementById("name-info");
        const newName=document.createElement("div");
        newName.innerHTML=(count +"."+(earlyAccesPrice-0.5*earlyAccesPrice)+"€")
        newName.classList.add("i");
        
        nameContainer.append(newName);
       
        checkbox.checked=false;
        count++;
        
        

       
        
        
       
      }

      else if(count!==parseInt(peopleNumber.value) && ticketType.value==="Under 15")
      {
        event.preventDefault();
        const nameContainer=document.getElementById("name-info");
        const newName=document.createElement("div");
        newName.innerHTML=(count +"."+(earlyAccesPrice-0.4*earlyAccesPrice)+"€");
        newName.classList.add("i");
        
        nameContainer.append(newName);
       
        checkbox.checked=false;
       
        count++;
        

       
        
        
       
      }

      else if(count===parseInt(peopleNumber.value) && ticketType.value==="Adult Ticket")
      {
        const nameContainer=document.getElementById("name-info");
        const newName=document.createElement("div");
        newName.innerHTML=(count +"."+earlyAccesPrice+"€");
  
        newName.classList.add("i");
        nameContainer.append(newName);
        count++;
      }

      else if(count===parseInt(peopleNumber.value) && ticketType.value==="Student Ticket")
      {
        const nameContainer=document.getElementById("name-info");
        const newName=document.createElement("div");
        newName.innerHTML=(count +"."+(earlyAccesPrice-0.5*earlyAccesPrice)+"€");
  
        newName.classList.add("i");
        nameContainer.append(newName);
        count++;
      }

      else if(count===parseInt(peopleNumber.value) && ticketType.value==="Under 15")
      {
        const nameContainer=document.getElementById("name-info");
        const newName=document.createElement("div");
        newName.innerHTML=(count +"."+" " +fName.value+" "+lName.value+"" + (earlyAccesPrice-0.4*earlyAccesPrice)+"€");
  
        newName.classList.add("i");
        nameContainer.append(newName);
        count++;
      }

        
      }


      //Turn The light On
      else if(storedRadioValue==="Turn The lights On")
      {
        if(count!==parseInt(peopleNumber.value) && ticketType.value==="Adult Ticket")
      {
        event.preventDefault();
        const nameContainer=document.getElementById("name-info");
        const newName=document.createElement("div");
        newName.innerHTML=(count +"."+turnTheLightsPrice+"€");
        newName.classList.add("i");
        
        nameContainer.append(newName);
  
        checkbox.checked=false;
        count++;
       
        
        

       
        
        
       
      }

      else if(count!==parseInt(peopleNumber.value) && ticketType.value==="Student Ticket")
      {
        event.preventDefault();
        const nameContainer=document.getElementById("name-info");
        const newName=document.createElement("div");
        newName.innerHTML=(count +"."+(turnTheLightsPrice-0.5*turnTheLightsPrice)+"€");
        newName.classList.add("i");
        
        nameContainer.append(newName);
        checkbox.checked=false;
       
        count++;
        

       
        
        
       
      }

      else if(count!==parseInt(peopleNumber.value) && ticketType.value==="Under 15")
      {
        event.preventDefault();
        const nameContainer=document.getElementById("name-info");
        const newName=document.createElement("div");
        newName.innerHTML=(count +"."+(turnTheLightsPrice-0.4*turnTheLightsPrice)+"€");
        newName.classList.add("i");
        
        nameContainer.append(newName);
  
       
        checkbox.checked=false;
       
        count++;
        

       
        
        
       
      }

      else if(count===parseInt(peopleNumber.value) && ticketType.value==="Adult Ticket")
      {
        const nameContainer=document.getElementById("name-info");
        const newName=document.createElement("div");
        newName.innerHTML=count +"."+turnTheLightsPrice+"€";
  
        newName.classList.add("i");
        nameContainer.append(newName);
        count++;
      }

      else if(count===parseInt(peopleNumber.value) && ticketType.value==="Student Ticket")
      {
        const nameContainer=document.getElementById("name-info");
        const newName=document.createElement("div");
        newName.innerHTML=(count +"."+(turnTheLightsPrice-0.5*turnTheLightsPrice)+"€");
  
        newName.classList.add("i");
        nameContainer.append(newName);
        count++;
      }

      else if(count===parseInt(peopleNumber.value) && ticketType.value==="Under 15")
      {
        const nameContainer=document.getElementById("name-info");
        const newName=document.createElement("div");
        newName.innerHTML=(count +"."+" " +fName.value+" "+lName.value+"" + (turnTheLightsPrice-0.4*turnTheLightsPrice)+"€");
  
        newName.classList.add("i");
        nameContainer.append(newName);
        count++;
      }

        
      }
      
      //Skip-The-Ticket-Line-Tour

      else if(storedRadioValue==="Skip-The-Ticket-Line-Tour")
      {
        if(count!==parseInt(peopleNumber.value) && ticketType.value==="Adult Ticket")
      {
        event.preventDefault();
        const nameContainer=document.getElementById("name-info");
        const newName=document.createElement("div");
        newName.innerHTML=(count +"."+skipTheLinePrice+"€");
        newName.classList.add("i");
        
        nameContainer.append(newName);
        checkbox.checked=false;
        count++;
       
        
        

       
        
        
       
      }

      else if(count!==parseInt(peopleNumber.value) && ticketType.value==="Student Ticket")
      {
        event.preventDefault();
        const nameContainer=document.getElementById("name-info");
        const newName=document.createElement("div");
        newName.innerHTML=(count +"."+(skipTheLinePrice-0.5*skipTheLinePrice)+"€");
        newName.classList.add("i");
        
        nameContainer.append(newName);
  
       
        checkbox.checked=false;
        count++;
        
        

       
        
        
       
      }

      else if(count!==parseInt(peopleNumber.value) && ticketType.value==="Under 15")
      {
        event.preventDefault();
        const nameContainer=document.getElementById("name-info");
        const newName=document.createElement("div");
        newName.innerHTML=(count +"."+(skipTheLinePrice-0.4*skipTheLinePrice)+"€");
        newName.classList.add("i");
        
        nameContainer.append(newName);
     
        checkbox.checked= false;
       
        count++;
        

       
        
        
       
      }

      else if(count===parseInt(peopleNumber.value) && ticketType.value==="Adult Ticket")
      {
        const nameContainer=document.getElementById("name-info");
        const newName=document.createElement("div");
        newName.innerHTML=(count +"."+skipTheLinePrice+"€");
  
        newName.classList.add("i");
        nameContainer.append(newName);
        count++;
      }

      else if(count===parseInt(peopleNumber.value) && ticketType.value==="Student Ticket")
      {
        const nameContainer=document.getElementById("name-info");
        const newName=document.createElement("div");
        newName.innerHTML=(count +"."+" " +fName.value+" "+lName.value+" "+(skipTheLinePrice-0.5*skipTheLinePrice)+"€");
  
        newName.classList.add("i");
        nameContainer.append(newName);
        count++;
      }

      else if(count===parseInt(peopleNumber.value) && ticketType.value==="Under 15")
      {
        const nameContainer=document.getElementById("name-info");
        const newName=document.createElement("div");
        newName.innerHTML=(count +"."+" " +fName.value+" "+lName.value+"" + (skipTheLinePrice-0.4*skipTheLinePrice)+"€");
  
        newName.classList.add("i");
        nameContainer.append(newName);
        count++;
      }

        
      }
    
      
    })
    
    const formDataArray = [];

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
    
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
    
      formDataArray.push(data);
      form.reset();
    });
    
    // Function to submit the stored form data
    
    
    
    
}


/*async function submitFormData() {
  for (const formData of formDataArray) {
    try {
      const response = await fetch('/your-submit-url', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const responseData = await response.json();
        // Handle the successful response here
        console.log('Response:', responseData);
      } else {
        // Handle the error response here
        console.error('Error:', response.status);
      }
    } catch (error) {
      // Handle any network or other errors here
      console.error('Error:', error);
    }
  }

  // Clear the stored form data after submission
  formDataArray.length = 0;
}*/


