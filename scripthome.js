let popoverTriggerList = [].slice.call(document.querySelectorAll('[data-toggle="popover"]'))
let popoverList = popoverTriggerList.map( function(popoverTrigger){ return new bootstrap.Popover(popoverTrigger);});

let now = new Date();
let hour = now.getHours();
if (hour >= 9 && hour < 18) {
    document.querySelector("#coloring").style.backgroundColor = "darkgreen";
} else {
    document.querySelector("#coloring").style.backgroundColor = "darkred";
}
