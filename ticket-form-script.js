linkStyle();
confirmEmail();
x=getCurrentDate();
getCurrentTime(x);
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
const email=document.getElementById("Email-id").value;
const confEmail=document.getElementById("Confirm-email").value;
if(email != confEmail) {
  alert('Email Not Matching!');
}
}
function getCurrentDate()
{
  let cDate=document.getElementById("dateId")
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
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
