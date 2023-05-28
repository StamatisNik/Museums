readMore();
linkStyle();
radioValue();


// a read more button that displays more data when clicking on it 
function readMore()
{
    const tap=document.getElementById("read-more");
    const moreBlock=document.getElementById("more");
    moreBlock.style.display="none";

    tap.addEventListener("click",function()
    {
        if(moreBlock.style.display==="none")
        {
        
            console.log(moreBlock);
            moreBlock.style.display="block"
            tap.innerText="tap here for less information.";
            
        }

        else if(moreBlock.style.display==="block")
        {
            moreBlock.style.display="none"
            tap.innerText="tap here for more information.";

        }
    
    })
        
    
}

//change the style of the anchor accordingly to the route
function linkStyle()
{
  const anc=document.getElementById("ticket-book");
  console.log(anc.href,window.location.href);
    if(window.location.href===anc.href || window.location.href===anc.href+"#ticket-forms" || window.location.href===anc.href+"#more" )
    {
      anc.classList.remove("clr");
      anc.classList.add("change-color");
    
  
    }
    
    else if(window.location.href!==anc.href){
      anc.classList.add("clr");
    }
}


//store radio values in local storage to use them in other js files 
function radioValue() {
    let radioInputs = document.getElementsByTagName("input");
    for (let i = 0; i < radioInputs.length; i++) {
        radioInputs[i].addEventListener("change", function() {
             let selectedRadio = document.querySelector('input[name="Ticket"]:checked');
           localStorage.setItem("radioValue",selectedRadio.value);
           console.log(selectedRadio.value);
           
      })
    }
   
  }
