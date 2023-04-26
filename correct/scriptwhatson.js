let popoverTriggerList = [].slice.call(document.querySelectorAll('[data-toggle="popover"]'))
let popoverList = popoverTriggerList.map( function(popoverTrigger){ return new bootstrap.Popover(popoverTrigger);});
