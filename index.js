const allJojos = document.getElementById("allJojos");
const startTitle = document.getElementById("startTitle");
const startButton = document.getElementById("startButton");
const container = document.getElementById("container");

const gear = document.getElementById("gear")
const settings = document.getElementById("settings")

const buttonContainer = document.getElementById("buttonContainer");
const imageContainer = document.getElementById("imageContainer");

const resultContainer = document.getElementById("resultContainer");
const correctPoints = document.getElementById("goeiePunten");
const wrongPoints = document.getElementById("foutePunten");
const matchPogingen = document.getElementById("matchPogingen")

const showHistory = document.getElementById("showHistory")
const goeieHistory = document.getElementById("goeieHistory");
const fouteHistory = document.getElementById("fouteHistory")
const history = document.getElementById("history")

const button0 = document.getElementById("button0");
const button1 = document.getElementById("button1");
const button2 = document.getElementById("button2");
const skipBtn = document.getElementById("skip");

const img0 = document.getElementById("img0");
const img1 = document.getElementById("img1");
const img2 = document.getElementById("img2");

const countdownBar = document.getElementById("countdownBar");
const timeLeft = document.getElementById("timeLeft");


var timerTime = 10;
var dataId;
var savedOptions = []

var tries = 0;
var correctAnswers = 0
var wrongAnswers = 0
var correct = [];
var wrong = [];
var session = 3;

var count = 0
var rounds = 0;
var matchAttemps = []

var savedButton = []
var savedImage = []

window.onload = localBackgroundSetting();

function localBackgroundSetting() {
    const savedColor = localStorage.getItem("color")
    var red = document.getElementById("red")
    var green = document.getElementById("green")
    var blue = document.getElementById("blue")

    console.log(savedColor)
    if (savedColor) {
        if (savedColor == "red") {
            document.body.style.backgroundColor = "red"
            red.selected = true;
        }
        if (savedColor == "green") {
            document.body.style.backgroundColor = "green"
            green.selected = true;
        }
        if (savedColor == "blue") {
            document.body.style.backgroundColor = "blue"
            blue.selected = true;
        }
    }
}

function changeBackgroundColor() {
    var backgroundColorSettings = document.getElementById("backgroundColor").value

    localStorage.setItem("color", backgroundColorSettings)

    const savedColor = localStorage.getItem("color")

        backgroundColorSettings.selected = "true"
    if (backgroundColorSettings == savedColor) {
    }


    if (savedColor) {
        if (savedColor == "red") {
            document.body.style.backgroundColor = "red"
        }
        if (savedColor == "green") {
            document.body.style.backgroundColor = "green"
        }
        if (savedColor == "blue") {
        }
            document.body.style.backgroundColor = "lightblue"
    }


}





//show element
function show(element) {
    element.classList.remove("hidden")
}

//hide element
function hide(element) {
    element.classList.add("hidden")
}

hide(container);
hide(resultContainer);
hide(countdownBar)
hide(history)
hide(showHistory)

showHistory.onclick = function () {
    show(history);
    showGoeieHistory()

    
    
}
    if (settings.classList == "hidden") {
gear.onclick = function () {
        show(settings)
    } else {
        hide(settings)
    }
}

startButton.onclick = function () {
    correctAnswers = 0;
    tries = 0;
    wrongAnswers = 0;
    hide(history)
    hide(gear)
    hide(resultContainer)
    hide(settings)
    hide(allJojos);
    hide(startTitle);
    hide(startButton);
    hide(showHistory)
    show(container);
    insertImage();
    insertName();
    initBarCount()
    deleteHistory()
}

skipBtn.onclick = function () {
    const btn = document.querySelector(".rememberBtnCol");
        btn.classList.remove("rememberBtnCol")
    if (btn) {
    }
    const img = document.querySelector(".rememberImgCol");

        img.classList.remove("rememberImgCol")
    }
    savedButton.splice(0, 1)
    savedImage.splice(0, 1)
    if (img) {
    insertImage()
    insertName()
}
//functions when images are pressed
img0.onclick = function () {
    dataId = this.dataset.id;
    colorImg()
    savedImage.push(dataId);
    buttonOnclick()
}

img1.onclick = function () {
    dataId = this.dataset.id;
    colorImg()
    savedImage.push(dataId);
    buttonOnclick()
}

img2.onclick = function () {
    dataId = this.dataset.id;
    colorImg()
    savedImage.push(dataId);
    buttonOnclick()
}

//funcions when buttons are pressed
button0.onclick = function () {
    dataId = this.dataset.id;
    colorBtn();
    savedButton.push(dataId);
    buttonOnclick()
}

button1.onclick = function () {
    dataId = this.dataset.id;
    colorBtn();
    savedButton.push(dataId);
    buttonOnclick()
}

button2.onclick = function () {
    dataId = this.dataset.id;
    colorBtn();
    savedButton.push(dataId);
    buttonOnclick()
}

//insert names in button tags
function insertName() {
    var nameArray = [
        "Jonathan Joestar",
        "Joseph Joestar",
        "Jotaro Kujoh",
        "Josuke Higashikata(1)",
        "Giorno Giovanna",
        "Jolyne Kujoh",
        "Johnny Joestar",
        "Josuke higashikata(2)"
    ]
    var numsArray = [0, 1, 2, 3, 4, 5, 6, 7];

    for (var i = 0; i <= 2; i++) {
        const variableB = [button0, button1, button2];

        var randomNumber = Math.floor(Math.random() * numsArray.length);
        var datasetBtnName = nameArray[randomNumber];

        variableB[i].innerHTML = datasetBtnName;
        variableB[i].dataset.id = names.indexOf(datasetBtnName);

        nameArray.splice(randomNumber, 1);
        numsArray.splice(randomNumber, 1);
    }
    nameArray = names;
    numsArray = nums;

}


//insert image sources in image tags
function insertImage() {
    var imageArray = [
        "img/Jonathan.jpeg",
        "img/Joseph.jpeg",
        "img/Jotaro.jpeg",
        "img/Josuke.jpeg",
        "img/Giorno.jpeg",
        "img/Jolyne.jpeg",
        "img/Johnny.png",
        "img/Josuke8.png"
    ]

    var numsArray = [0, 1, 2, 3, 4, 5, 6, 7];

    for (var i = 0; i <= 2; i++) {
        const variableI = [img0, img1, img2]

        var randomNumber = Math.floor(Math.random() * numsArray.length);
        var datasetImgName = imageArray[randomNumber];

        variableI[i].src = datasetImgName;
        console.log(datasetImgName);

        console.log(images.indexOf(datasetImgName));
        variableI[i].dataset.id = images.indexOf(datasetImgName);
        imageArray.splice(randomNumber, 1);
        numsArray.splice(randomNumber, 1);
    }
    imageArray = images;
    numsArray = nums;
    console.log("end of log")
}

function buttonOnclick() {
    if (savedImage[0] == savedImage[1]) {
        savedImage.splice(0, 2);
    }
    if (savedButton[0] == savedButton[1]) {
        savedButton.splice(0, 2);
    } else {
        if (savedImage.length >= 2) {
            const poppedI = savedImage.pop();
            savedImage[0] = poppedI;
        }

        if (savedButton.length >= 2) {
            const poppedB = savedButton.pop();
            savedButton[0] = poppedB;
        }

        if (savedImage.length != 0 && savedButton.length != 0) {
            comparison();
        }
    }

}

function comparison() {

    if (savedImage[0] == savedButton[0]) {
        correctFunction();
    } else {
        wrongFunction();
    }

    if (tries != session) {
        count++
        insertImage()
        insertName()
        console.log("tries = " + tries + " and session = " + session)
        console.log(correctAnswers);
        console.log(wrongAnswers)
    } else {
        count++
        correct.push(correctAnswers);;
        wrong.push(wrongAnswers);
        rounds++
        matchAttemps.push(rounds);
        if (matchAttemps == undefined) {
            matchAttemps.push(0)
        }
        hide(container);
        hide(countdownBar)
        show(startButton);
        startButton.value = "Herstart de trainer";
        show(resultContainer);
        show(showHistory)
        showResults();
        console.log(correctAnswers);
        console.log(wrongAnswers)
    }
}

function correctFunction() {
    alert("goed :D")
    const btn = document.querySelector(".rememberBtnCol");
    btn.classList.remove("rememberBtnCol")

    const img = document.querySelector(".rememberImgCol")
    img.classList.remove("rememberImgCol")
    savedImage.splice(0, 1);
    savedButton.splice(0, 1);
    tries++
    correctAnswers++
}

function wrongFunction() {
    alert("WRONG")
    const btn = document.querySelector(".rememberBtnCol");
    btn.classList.remove("rememberBtnCol")

    const img = document.querySelector(".rememberImgCol")
    img.classList.remove("rememberImgCol")

    savedImage.splice(0, 1)
    savedButton.splice(0, 1)
    tries++
    wrongAnswers++
}

function colorBtn() {
    const id = document.querySelector("button[data-id='" + dataId + "']");
    if (id.classList.contains("rememberBtnCol")) {
        id.classList.remove("rememberBtnCol");
    } else {
        if (id) {
            button0.classList.remove("rememberBtnCol");
            button1.classList.remove("rememberBtnCol");
            button2.classList.remove("rememberBtnCol");
            id.classList.add("rememberBtnCol")
        } else {
            button0.classList.remove("rememberBtnCol");
            button1.classList.remove("rememberBtnCol");
            button2.classList.remove("rememberBtnCol");
        }
    }

}

function colorImg() {
    const id = document.querySelector("img[data-id='" + dataId + "']");
    if (id.classList.contains("rememberImgCol")) {
        id.classList.remove("rememberImgCol")
    } else {
        if (id) {
            img0.classList.remove("rememberImgCol");
            img1.classList.remove("rememberImgCol");
            img2.classList.remove("rememberImgCol");
            id.classList.add("rememberImgCol")
        } else {
            img0.classList.remove("rememberImgCol");
            img1.classList.remove("rememberImgCol");
            img2.classList.remove("rememberImgCol");
        }
    }
}

function initBarCount() {
    show(countdownBar)
    var startTimer = setInterval(barCount, timerTime)
    console.log(startTimer);

    function barCount() {

        if (timeLeft.clientWidth == countdownBar.clientWidth + "px") {
            countdownBar.width = timeLeft.clientWidth + "px";
        if (timeLeft.clientWidth < countdownBar.clientWidth) {
        }
            timeLeft.style.width = timeLeft.clientWidth + 1 + "px";
        } else {
            timeLeft.style.width = 0;
            countdownBar.style.width = 500 + "px";
            if (timeLeft.style.width == countdownBar.style.width + "px") {
                console.log(timeLeft.style.width)
                console.log("width is hetzeflde")
                console.log(countdownBar.style.width)
            }
            skipToEnd();
            clearInterval(startTimer)
            hide(countdownBar)
        }
    }
}

function skipToEnd() {
    if(rounds == 0) {
        rounds++
        matchAttemps.push(rounds);
        correct.push(correctAnswers);;
        rounds = 0;
        wrong.push(wrongAnswers);
    // rounds++
    }
    // matchAttemps.push(rounds);
    show(startButton);
    hide(container);
    showResults();
    startButton.value = "Herstart de trainer";
    show(resultContainer);
}

function showResults() {
    correctPoints.innerHTML = "aantal goeie punten: " + correct[correct.length - 1]
    wrongPoints.innerHTML = "aantal verkeerde punten: " + wrong[wrong.length - 1];
    matchPogingen.innerHTML = "aantal matchpogingen: " + matchAttemps[matchAttemps.length - 1];
}


function showGoeieHistory() {
    for(var i = 0; i <= matchAttemps.length - 1; i++) {
        console.log(`loop = ${i}`)
        var divG = document.createElement("div");
        divG.id = "goeieHistory" + i;
        divG.innerHTML = `aantal correct: ${correct[i]}`

        var divW = document.createElement("div");
        divW.id = "wrongHistory" + i;
        divW.innerHTML = `aantal fout: ${wrong[i]}`

        var divT = document.createElement("div");
        divT.id = "match" + i;
        divT.innerHTML = `Match: ${matchAttemps[i]}`

        history.appendChild(divT)
        history.appendChild(divG)
        history.appendChild(divW)
        
    }
}

function deleteHistory() {
    while(history.firstChild) {
        history.removeChild(history.firstChild)
    }
}