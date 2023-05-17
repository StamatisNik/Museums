let submitBtn = document.getElementById("submit-btn");
let popup = document.getElementById("popup");
let closeBtn = document.getElementById("close-btn");

submitBtn.addEventListener("click", function() {
    popup.classList.add("open-popup");
});

closeBtn.addEventListener("click", function() {
    popup.classList.remove("open-popup");
});