let popoverTriggerList = [].slice.call(document.querySelectorAll('[data-toggle="popover"]'))
let popoverList = popoverTriggerList.map( function(popoverTrigger){ return new bootstrap.Popover(popoverTrigger);});

document.addEventListener('click', function (e) {
    if (!e.target.closest('[data-toggle="popover"]') && document.querySelector('.popover.show')) {
        popoverList.forEach(function (popover) {
            popover.hide();
        });
    }
});