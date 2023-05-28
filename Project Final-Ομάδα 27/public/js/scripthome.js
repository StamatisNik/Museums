// Get the current date and time
let now = new Date();

// Get the current hour from the date object
let hour = now.getHours();

// Check if the current hour is between 9 AM and 6 PM
if (hour >= 9 && hour < 18) {

    // Change the background colors of the element with ID
    document.querySelector("#coloring").style.backgroundColor = "darkgreen";
} else {
    document.querySelector("#coloring").style.backgroundColor = "darkred";
}

// Get a list of all elements with the data-toggle attribute set to "popover"
let popoverTriggerList = [].slice.call(document.querySelectorAll('[data-toggle="popover"]'));

// Create an array of Popover instances for each popover trigger element
let popoverList = popoverTriggerList.map(function (popoverTrigger) {
    return new bootstrap.Popover(popoverTrigger);
});

// Add a click event listener to the document
document.addEventListener('click', function (e) {

// Check if the clicked element is not a popover trigger and there is a popover shown
    
    if (!e.target.closest('[data-toggle="popover"]') && document.querySelector('.popover.show')) {
        
// Hide all the popovers in the popoverList array
        popoverList.forEach(function (popover) {
            popover.hide();
        });
    }
});