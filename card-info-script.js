linkStyle();
getCurrentDate();
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
   
  today = yyyy + '-' + mm;

  cDateV.value=today;
  cDateV.min=String(today);
    console.log(cDateV);
  return today

}

function regexForCardValidation(){
    const mastercardCheck=/^(?:5[1-5][0-9]{14})$/;
    const visaCheck=/^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
    const amexCheck=/^(?:3[47][0-9]{13})$/;
    const dinersClubCheck=/^(?:3(?:0[0-5]|[68][0-9])[0-9]{11})$/;
    const cardNo= document.getElementById("card-no");
    const newCardNo=cardNo;
    console.log(cardNo.value);
    newCardNo.value=cardNo.value.replace(/[^0-9]/g,"");
    console.log(newCardNo.value);


    
      if(newCardNo.value.match(mastercardCheck)|newCardNo.value.match(amexCheck)|newCardNo.value.match(visaCheck)|newCardNo.value.match(dinersClubCheck) )
      {
        return true;
      }
    
    else{
        alert("This dosen't match to a card number");
        cardNo.value=""
    }
}