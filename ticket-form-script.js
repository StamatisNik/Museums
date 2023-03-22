linkStyle();
confirmEmail();
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
  


