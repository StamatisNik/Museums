linkStyle();
getCurrentDate();
regexForCardValidation();
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
  let cDateV=document.getElementById("month-id")
  let today = new Date();
  let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  let yyyy = today.getFullYear();

  today= yyyy + '-' + mm;
  cDateV.value=String(today);
  cDateV.min=String(today);
    

}

function regexForCardValidation(){
    const mastercardCheck=/^(?:5[1-5][0-9]{14})$/;
    const visaCheck=/^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
    const amexCheck=/^(?:3[47][0-9]{13})$/;
    const dinersClubCheck=/^(?:3(?:0[0-5]|[68][0-9])[0-9]{11})$/;
    const cardNo= document.getElementById("card-no");

   
    console.log(cardNo.value);
    
    const cardAlert=document.getElementById("alertbox-id")

    cardNo.addEventListener("blur",function()
    {
      cardNo.value=cardNo.value.replace(/[^0-9]/g,"");
     
      if(cardNo.value==='')
      {
        console.log(cardNo.value)
        cardAlert.classList.remove("alertboxShow");
        cardAlert.classList.add("alertbox");
        

      }
      if(cardNo.value.match(mastercardCheck)|cardNo.value.match(amexCheck)|cardNo.value.match(visaCheck)|cardNo.value.match(dinersClubCheck) )
      {
        console.log(cardNo.value)
        cardAlert.classList.remove("alertboxShow");
        cardAlert.classList.add("alertbox");
       
        
      }
    
    else{
      console.log(cardNo.value)
      cardAlert.classList.remove("alertbox");
        cardAlert.classList.add("alertboxShow");
    }

    })
     
}