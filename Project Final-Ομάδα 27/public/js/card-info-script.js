linkStyle();
regexForCardValidation();
//declare regexes for card validation
const mastercardCheck=/^(?:5[1-5][0-9]{14})$/;
const visaCheck=/^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
const amexCheck=/^(?:3[47][0-9]{13})$/;
const dinersClubCheck=/^(?:3(?:0[0-5]|[68][0-9])[0-9]{11})$/;
const today = new Date();
const currentYear = today.getFullYear().toString().slice(-2);
const currentMonth = (today.getMonth() + 1).toString()
console.log(currentMonth);
const dateRegex =new RegExp(`^(?:(?:0[${currentMonth}-9]|1[0-2])\/[${currentYear}-9]{2})$`);


//change the style of the anchor accordingly to the route
function linkStyle()
{
  const anc=document.getElementById("pay-id");
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


//card validation function
function regexForCardValidation(){
    const expDate=document.querySelector("#date-id");
    const dateAlert=document.getElementById("dateAlert-id");
    const cardNo= document.getElementById("card-no");
    const submitBtn=document.querySelector("#submit");
    const cardholderName=document.querySelector("#name-on-card");
    const cardAlert=document.getElementById("cardAlert-id");

    cardholderName.addEventListener("blur",()=>
    {
      //replace every letter in card number value with blank
      cardholderName.value = cardholderName.value.replace(/[0-9]/g, "");
    })

    //add space after the user inserts  4 numbers in card number input 
    cardNo.addEventListener("input", function () {
      cardNo.value = cardNo.value.replace(/[^0-9]/g, ""); 
  let formattedValue = '';
  for (let i = 0; i < cardNo.value.length; i++) {
    if (i > 0 && i % 4 === 0) {
      formattedValue += ' ';
    }
    formattedValue += cardNo.value[i];
  }

  cardNo.value = formattedValue;
});
    
  //check card number regex validation and add classes with css
    cardNo.addEventListener("blur",function()
    {
      cardNo.value=cardNo.value.replace(/[^0-9]/g,"");
     
      if(cardNo.value==='')
      {
        submitBtn.disabled=true;
        cardAlert.classList.remove("alertboxShow");
        cardAlert.classList.add("alertbox");
        

      }
      else if(cardNo.value.match(mastercardCheck)||cardNo.value.match(amexCheck)||cardNo.value.match(visaCheck)||cardNo.value.match(dinersClubCheck) )
      {
       
        cardAlert.classList.remove("alertboxShow");
        cardAlert.classList.add("alertbox");
       
        
      }
    
    else{
      
      cardAlert.classList.remove("alertbox");
        cardAlert.classList.add("alertboxShow");
    }

    })



    expDate.addEventListener("blur",()=>
  {
   
    if(expDate.value==='')
    {
  
      dateAlert.classList.remove("alertboxShow");
      dateAlert.classList.add("alertbox");
    
      

    }
    else if(expDate.value.match(dateRegex))
    {
    
      dateAlert.classList.remove("alertboxShow");
      dateAlert.classList.add("alertbox");
     
      
    }
  
  else{
    
    dateAlert.classList.remove("alertbox");
    dateAlert.classList.add("alertboxShow");
  }

  })

  checkValidation(cardNo,expDate,submitBtn);
}


//disable submit button if the inputs don't satisfy the regexes and enable it if they do 
function checkValidation(card_no,date,submit) {
  let list=[card_no,date];
  list.forEach(item=>{
    item.addEventListener("blur",function()
    {
      if (card_no.value.match(mastercardCheck)||card_no.value.match(amexCheck)||card_no.value.match(visaCheck)||card_no.value.match(dinersClubCheck)&& date.match(dateRegex)) {
        submit.disabled = false;
      
      } else {
    
        submit.disabled = true;
      }

    })
    
  })

}



  
 

