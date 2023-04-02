readMore();
linkStyle();
radioValue();

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



function radioValue() {
    let selectedValue;
    let radioInputs = document.getElementsByTagName("input");
    for (let i = 0; i < radioInputs.length; i++) {
        radioInputs[i].addEventListener("change", function() {
             let selectedRadio = document.querySelector('input[name="Ticket"]:checked');
           localStorage.setItem("radioValue",selectedRadio.value);
           console.log(selectedRadio.value);
           
      })
    }
   
  }
