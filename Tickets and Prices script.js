readMore();
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
            tap.innerText="tap here for less information";
            
        }

        else if(moreBlock.style.display==="block")
        {
            moreBlock.style.display="none"
            tap.innerText="tap here for more information";

        }
    
    })

       


   
        
    
}