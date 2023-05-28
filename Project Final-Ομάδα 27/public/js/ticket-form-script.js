linkStyle();
groupPeopleInput();
const date=getCurrentDate();
dateManage(date);

//change the style of the anchor accordingly to the route
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


//get current date
function  getCurrentDate()
{
  let cDate=document.getElementById("dateId");
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0'); 
  let yyyy = today.getFullYear();

  today = yyyy + '-' + mm + '-' + dd;
  window.addEventListener("load",function(){
    console.log(today);
    cDate.value=String(today);
  cDate.min=String(today);

  })
  

  return today

}





//choose how many people want to book ticket and display it in the screen 
//accordingly to the ticket type 
function groupPeopleInput()
{
  const form=document.getElementById("ticket-form");
  let peopleNumber=document.getElementById("people-group-id");
  let checkbox=document.getElementById("defaultCheck1");
  const ticketType=document.getElementById("ticket-type-Id");
  let count;
 

  
  peopleNumber.addEventListener("input",function()
  {
  //declare the container element 
  //and create the new element that the container will append
  const nameContainer=document.getElementById("name-info");
  const newName=document.createElement("div");
  nameContainer.innerHTML = "Tickets:";
  nameContainer.classList.add("i","namecont");
    count=1;
    
  })
    //get stored value from local storage 
  const storedRadioValue=localStorage.getItem("radioValue");
//ticket prices 
  const standardPrice=20;
  const earlyAccesPrice=35;
  const turnTheLightsPrice=45;
  const skipTheLinePrice=60;
    
    
    form.addEventListener('submit', async function(event) {
      console.log(count);
      //Standard Ticket
        if(storedRadioValue==="Standard Ticket")
       {

        if(count!==parseInt(peopleNumber.value) && ticketType.value==="Adult Ticket")
        {
          //prevent the default form submit,because we want to asynchronous fetch the data
          event.preventDefault();

         //fetch data to the server
          const formData = new URLSearchParams(new FormData(form))

          try {
            const response = await fetch('/user-info', {
              method: 'POST',
              body: formData,
            });
        
           
          } catch (error) {
           
          }
    
          //append the ticket data to the container
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
          //append the ticket data to the container
          const nameContainer=document.getElementById("name-info");
          const newName=document.createElement("div");
          newName.innerHTML=(count +"."+(standardPrice-0.5*standardPrice)+"€");
          newName.classList.add("i");
        
          
          nameContainer.append(newName);
         
          checkbox.checked=false;
          count++;
        //fetch data to the server
          const formData = new URLSearchParams(new FormData(form))
          try {
            const response = await fetch('/user-info', {
              method: 'POST',
              body: formData,
            });
        
           
          } catch (error) {
           
          }
          
         
        }
  
        else if(count!==parseInt(peopleNumber.value) && ticketType.value==="Under 15")
        {
          event.preventDefault();
          //append the ticket data to the container
          const nameContainer=document.getElementById("name-info");
          const newName=document.createElement("div");
          newName.innerHTML=(count +"."+(standardPrice-0.4*standardPrice)+"€");
          newName.classList.add("i");
          
          nameContainer.append(newName);
         
          checkbox.checked=false;
          count++;
            //fetch data to the server
          const formData = new URLSearchParams(new FormData(form))
          try {
            const response = await fetch('/user-info', {
              method: 'POST',
              body: formData,
            });
        
           
          } catch (error) {
           
          }
          
         
        }
  
        else if(count===parseInt(peopleNumber.value) && ticketType.value==="Adult Ticket")
        {
          event.preventDefault();
          //append the ticket data to the container
          const nameContainer=document.getElementById("name-info");
          const newName=document.createElement("div");
          newName.innerHTML=count +"."+standardPrice+"€";
    
          newName.classList.add("i");
          nameContainer.append(newName);
          count++;
          //submit the form after 1.5 seconds of timeout

          setTimeout(function() {
            form.submit(); 
          }, 1500);
        }
  
        else if(count===parseInt(peopleNumber.value) && ticketType.value==="Student Ticket")
        {
          event.preventDefault();
          //append the ticket data to the container
          const nameContainer=document.getElementById("name-info");
          const newName=document.createElement("div");
          newName.innerHTML=(count +"."+(standardPrice-0.5*standardPrice)+"€");
    
          newName.classList.add("i");
          nameContainer.append(newName);
          count++;
          //submit the form after 1.5 seconds of timeout
           setTimeout(function() {
            form.submit(); 
          }, 1500);
        }
  
        else if(count===parseInt(peopleNumber.value) && ticketType.value==="Under 15")
        {
          event.preventDefault();
          //append the ticket data to the container
          const nameContainer=document.getElementById("name-info");
          const newName=document.createElement("div");
          newName.innerHTML=(count +"."+(standardPrice-0.4*standardPrice)+"€");
    
          newName.classList.add("i");
          nameContainer.append(newName);
          count++;
          //submit the form after 1.5 seconds of timeout
          setTimeout(function() {
            form.submit(); 
          }, 1500);
        }
       }

        
      

      //Early Access Ticket

      else if(storedRadioValue==="Early Access Ticket")
      {
        if(count!==parseInt(peopleNumber.value) && ticketType.value==="Adult Ticket")
      {
        event.preventDefault();
        //append the ticket data to the container
        const nameContainer=document.getElementById("name-info");
        const newName=document.createElement("div");
        newName.innerHTML=(count +"."+earlyAccesPrice+"€");
        newName.classList.add("i");
        
        nameContainer.append(newName);
        checkbox.checked=false;
        count++;
      //fetch data to the server
        const formData = new URLSearchParams(new FormData(form))
         try {
            const response = await fetch('/user-info', {
              method: 'POST',
              body: formData,
            });
        
           
          } catch (error) {
           
          }
        

       
        
        
       
      }

      else if(count!==parseInt(peopleNumber.value) && ticketType.value==="Student Ticket")
      {
        event.preventDefault();
        //append the ticket data to the container
        const nameContainer=document.getElementById("name-info");
        const newName=document.createElement("div");
        newName.innerHTML=(count +"."+(earlyAccesPrice-0.5*earlyAccesPrice)+"€")
        newName.classList.add("i");
        
        nameContainer.append(newName);
       
        checkbox.checked=false;
        count++;
        //fetch data to the server
        const formData = new URLSearchParams(new FormData(form))
        try {
          const response = await fetch('/user-info', {
            method: 'POST',
            body: formData,
          });
      
         
        } catch (error) {
         
        }

       
        
        
       
      }

      else if(count!==parseInt(peopleNumber.value) && ticketType.value==="Under 15")
      {
        event.preventDefault();
        //append the ticket data to the container
        const nameContainer=document.getElementById("name-info");
        const newName=document.createElement("div");
        newName.innerHTML=(count +"."+(earlyAccesPrice-0.4*earlyAccesPrice)+"€");
        newName.classList.add("i");
        
        nameContainer.append(newName);
       
        checkbox.checked=false;
       
        count++;
        //fetch data to the server
        const formData = new URLSearchParams(new FormData(form))
        try {
          const response = await fetch('/user-info', {
            method: 'POST',
            body: formData,
          });
      
         
        } catch (error) {
         
        }

       
        
        
       
      }

      else if(count===parseInt(peopleNumber.value) && ticketType.value==="Adult Ticket")
      {
        event.preventDefault();
        //append the ticket data to the container
        const nameContainer=document.getElementById("name-info");
        const newName=document.createElement("div");
        newName.innerHTML=(count +"."+earlyAccesPrice+"€");
  
        newName.classList.add("i");
        nameContainer.append(newName);
        count++;
        //submit the form after 1.5 seconds of timeout
        setTimeout(function() {
          form.submit(); 
        }, 1500);
      }

      else if(count===parseInt(peopleNumber.value) && ticketType.value==="Student Ticket")
      {
        event.preventDefault();
        //append the ticket data to the container
        const nameContainer=document.getElementById("name-info");
        const newName=document.createElement("div");
        newName.innerHTML=(count +"."+(earlyAccesPrice-0.5*earlyAccesPrice)+"€");
  
        newName.classList.add("i");
        nameContainer.append(newName);
        count++;
        //submit the form after 1.5 seconds of timeout
        setTimeout(function() {
          form.submit(); 
        }, 1500);

      }

      else if(count===parseInt(peopleNumber.value) && ticketType.value==="Under 15")
      {
        event.preventDefault();
        //append the ticket data to the container
        const nameContainer=document.getElementById("name-info");
        const newName=document.createElement("div");
        newName.innerHTML=(count +"."+ (earlyAccesPrice-0.4*earlyAccesPrice)+"€");
  
        newName.classList.add("i");
        nameContainer.append(newName);
        count++;
        //submit the form after 1.5 seconds of timeout
        setTimeout(function() {
          form.submit(); 
        }, 1500);
      }

        
      }


      //Turn The light On
      else if(storedRadioValue==="Turn The lights On")
      {
        if(count!==parseInt(peopleNumber.value) && ticketType.value==="Adult Ticket")
      {
        event.preventDefault();
        //append the ticket data to the container
        const nameContainer=document.getElementById("name-info");
        const newName=document.createElement("div");
        newName.innerHTML=(count +"."+turnTheLightsPrice+"€");
        newName.classList.add("i");
        
        nameContainer.append(newName);
  
        checkbox.checked=false;
        count++;
        //fetch data to the server
        const formData = new URLSearchParams(new FormData(form))
        try {
          const response = await fetch('/user-info', {
            method: 'POST',
            body: formData,
          });
      
         
        } catch (error) {
         
        }
        
        

       
        
        
       
      }

      else if(count!==parseInt(peopleNumber.value) && ticketType.value==="Student Ticket")
      {
        event.preventDefault();
        //append the ticket data to the container
        const nameContainer=document.getElementById("name-info");
        const newName=document.createElement("div");
        newName.innerHTML=(count +"."+(turnTheLightsPrice-0.5*turnTheLightsPrice)+"€");
        newName.classList.add("i");
        
        nameContainer.append(newName);
        checkbox.checked=false;
       
        count++;
        //fetch data to the server
        const formData = new URLSearchParams(new FormData(form))
        try {
          const response = await fetch('/user-info', {
            method: 'POST',
            body: formData,
          });
      
         
        } catch (error) {
         
        }
       
        
        
       
      }

      else if(count!==parseInt(peopleNumber.value) && ticketType.value==="Under 15")
      {
        event.preventDefault();
        //append the ticket data to the container
        const nameContainer=document.getElementById("name-info");
        const newName=document.createElement("div");
        newName.innerHTML=(count +"."+(turnTheLightsPrice-0.4*turnTheLightsPrice)+"€");
        newName.classList.add("i");
        
        nameContainer.append(newName);
  
       
        checkbox.checked=false;
       
        count++;
        //fetch data to the server
        const formData = new URLSearchParams(new FormData(form))
        try {
          const response = await fetch('/user-info', {
            method: 'POST',
            body: formData,
          });
      
         
        } catch (error) {
         
        }

       
        
        
       
      }

      else if(count===parseInt(peopleNumber.value) && ticketType.value==="Adult Ticket")
      {
        event.preventDefault();
        //append the ticket data to the container
        const nameContainer=document.getElementById("name-info");
        const newName=document.createElement("div");
        newName.innerHTML=count +"."+turnTheLightsPrice+"€";
  
        newName.classList.add("i");
        nameContainer.append(newName);
        count++;
        //submit the form after 1.5 seconds of timeout
        setTimeout(function() {
          form.submit(); 
        }, 1500);
      }

      else if(count===parseInt(peopleNumber.value) && ticketType.value==="Student Ticket")
      {
        event.preventDefault();
        //append the ticket data to the container
        const nameContainer=document.getElementById("name-info");
        const newName=document.createElement("div");
        newName.innerHTML=(count +"."+(turnTheLightsPrice-0.5*turnTheLightsPrice)+"€");
  
        newName.classList.add("i");
        nameContainer.append(newName);
        count++;
        //submit the form after 1.5 seconds of timeout
        setTimeout(function() {
          form.submit(); 
        }, 1500);
      }

      else if(count===parseInt(peopleNumber.value) && ticketType.value==="Under 15")
      {
        event.preventDefault();
        //append the ticket data to the container
        const nameContainer=document.getElementById("name-info");
        const newName=document.createElement("div");
        newName.innerHTML=(count +"."+ (turnTheLightsPrice-0.4*turnTheLightsPrice)+"€");
  
        newName.classList.add("i");
        nameContainer.append(newName);
        count++;
        //submit the form after 1.5 seconds of timeout
        setTimeout(function() {
          form.submit(); 
        }, 1500);
      }

        
      }
      
      //Skip-The-Ticket-Line-Tour

      else if(storedRadioValue==="Skip-The-Ticket-Line-Tour")
      {
        if(count!==parseInt(peopleNumber.value) && ticketType.value==="Adult Ticket")
      {
        event.preventDefault();
        //append the ticket data to the container
        const nameContainer=document.getElementById("name-info");
        const newName=document.createElement("div");
        newName.innerHTML=(count +"."+skipTheLinePrice+"€");
        newName.classList.add("i");
        
        nameContainer.append(newName);
        checkbox.checked=false;
        count++;
        //fetch data to the server
        const formData = new URLSearchParams(new FormData(form))
        try {
          const response = await fetch('/user-info', {
            method: 'POST',
            body: formData,
          });
      
         
        } catch (error) {
         
        }
        
       
      }

      else if(count!==parseInt(peopleNumber.value) && ticketType.value==="Student Ticket")
      {
        event.preventDefault();
        //append the ticket data to the container
        const nameContainer=document.getElementById("name-info");
        const newName=document.createElement("div");
        newName.innerHTML=(count +"."+(skipTheLinePrice-0.5*skipTheLinePrice)+"€");
        newName.classList.add("i");
        
        nameContainer.append(newName);
  
       
        checkbox.checked=false;
        count++;
        //fetch data to the server
        const formData = new URLSearchParams(new FormData(form))
        try {
          const response = await fetch('/user-info', {
            method: 'POST',
            body: formData,
          });
      
         
        } catch (error) {
         
        }

       
        
        
       
      }

      else if(count!==parseInt(peopleNumber.value) && ticketType.value==="Under 15")
      {
        event.preventDefault();
        //append the ticket data to the container
        const nameContainer=document.getElementById("name-info");
        const newName=document.createElement("div");
        newName.innerHTML=(count +"."+(skipTheLinePrice-0.4*skipTheLinePrice)+"€");
        newName.classList.add("i");
        
        nameContainer.append(newName);
     
        checkbox.checked= false;
       
        count++;
        //fetch data to the server
        const formData = new URLSearchParams(new FormData(form))
        try {
          const response = await fetch('/user-info', {
            method: 'POST',
            body: formData,
          });
      
         
        } catch (error) {
         
        }

       
        
        
       
      }

      else if(count===parseInt(peopleNumber.value) && ticketType.value==="Adult Ticket")
      {
        event.preventDefault();
        //append the ticket data to the container
        const nameContainer=document.getElementById("name-info");
        const newName=document.createElement("div");
        newName.innerHTML=(count +"."+skipTheLinePrice+"€");
  
        newName.classList.add("i");
        nameContainer.append(newName);
        count++;
        //submit the form after 1.5 seconds of timeout
        setTimeout(function() {
          form.submit(); 
        }, 1500);
      }

      else if(count===parseInt(peopleNumber.value) && ticketType.value==="Student Ticket")
      {
        event.preventDefault();
        //append the ticket data to the container
        const nameContainer=document.getElementById("name-info");
        const newName=document.createElement("div");
        newName.innerHTML=(count +"."+(skipTheLinePrice-0.5*skipTheLinePrice)+"€");
  
        newName.classList.add("i");
        nameContainer.append(newName);
        count++;
        //submit the form after 1.5 seconds of timeout
        setTimeout(function() {
          form.submit(); 
        }, 1500);
      }

      else if(count===parseInt(peopleNumber.value) && ticketType.value==="Under 15")
      {
        event.preventDefault();
        //append the ticket data to the container
        const nameContainer=document.getElementById("name-info");
        const newName=document.createElement("div");
        newName.innerHTML=(count +"."+ (skipTheLinePrice-0.4*skipTheLinePrice)+"€");
  
        newName.classList.add("i");
        nameContainer.append(newName);
        count++;
        //submit the form after 1.5 seconds of timeout
        setTimeout(function() {
          form.submit(); 
        }, 1500);
      }

        
      }
    
      
    })
  }
 
//function to manage the date and time at ticket form
 function dateManage(dateToday)
 {
  for(let i=1; i<4; i++)
    {
      today=new Date();
      let inputTime=document.querySelector("#time-zone" +String(i));
      let time = today.getHours() + ":" + today.getMinutes();
      let inputDate=document.getElementById("dateId");
      let time1=new Date('2020-01-01 ' + inputTime.value);
      let time2=new Date('2020-01-01 '+ time);
      window.addEventListener("load",function()
      {
        if(time1.getTime()<time2.getTime() && inputDate.value===dateToday)
        {
          inputTime.setAttribute("disabled","");
          
          
        }
        else if(cDate.value!==dateToday)
        {
          inputTime.removeAttribute("disabled","");
          inputTime.setAttribute("enabled","");
          
        }
        
      })
  
      
      inputDate.addEventListener("change",function()
      {
        selectedDate=inputDate.value
        if(time1.getTime()<time2.getTime() && selectedDate===dateToday)
        {
          inputTime.setAttribute("disabled","");
         
        }
        else if(selectedDate!==dateToday)
        {
          inputTime.removeAttribute("disabled","");
          inputTime.setAttribute("enabled","");
          
        }
      })
       
    }

 }
 
    
  
  


 





    
  

 

    
    




