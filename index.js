const allJojos = document.getElementById("allJojos");
const startTitle = document.getElementById("startTitle");
const startButton = document.getElementById("startButton");
const container = document.getElementById("container");
const buttonContainer = document.getElementById("buttonContainer");
const imageContainer = document.getElementById("imageContainer");
const img0 = document.getElementById("img0");
const img1 = document.getElementById("img1");
const img2 = document.getElementById("img2");

var imageArray = images
var nameArray = names;
var nums = [0, 1, 2, 3, 4, 5, 6, 7]


//show element
function show(element) {
    element.classList.remove("hidden")
}

//hide element
function hide(element) {
    element.classList.add("hidden")
}

hide(container);




startButton.onclick = function() {
    hide(allJojos);
    hide(startTitle);
    show(container);
    makeImages();
    makeButton();
    
}


function makeButton() {//maakt de knop met random naam 
    for(var i = 0; i <= 2; i++) {
        var btn = document.createElement("BUTTON")
        var randomNumber = Math.floor(Math.random() * nums.length);
        btn.innerHTML = nameArray[randomNumber];
        nameArray.splice(randomNumber, 1);
        btn.id = "button"
        buttonContainer.appendChild(btn);
    }
}

function makeImages() {//maakt images
        for(var i = 0; i <= 2; i++) {
        var img = document.createElement("IMG")
        var randomNumber = Math.floor(Math.random() * nums.length);
        img.src = imageArray[randomNumber]
        imageArray.splice(randomNumber, 1);
        nums.splice(randomNumber, 1);
        img.classList.add("jojo");
        img.id = "img" + i;
        imageContainer.appendChild(img);
    }
}

console.log(nums)