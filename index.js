const allJojos = document.getElementById("allJojos");
const startTitle = document.getElementById("startTitle");
const startButton = document.getElementById("startButton");
const container = document.getElementById("container");

const gear = document.getElementById("gear");
const settings = document.getElementById("settings");
const time = document.getElementById("time");
const secondsSetting = document.getElementById("secondsSetting");
const totalObjects = document.getElementById("totalObjects");
const objectsSetting = document.getElementById("objectsSetting");

const buttonContainer = document.getElementById("buttonContainer");
const imageContainer = document.getElementById("imageContainer");

const resultContainer = document.getElementById("resultContainer");
const correctPoints = document.getElementById("goeiePunten");
const wrongPoints = document.getElementById("foutePunten");
const matchPogingen = document.getElementById("matchPogingen");

const showHistory = document.getElementById("showHistory");
const goeieHistory = document.getElementById("goeieHistory");
const fouteHistory = document.getElementById("fouteHistory");
const history = document.getElementById("history");

const button0 = document.getElementById("button0");
const button1 = document.getElementById("button1");
const button2 = document.getElementById("button2");
const skipBtn = document.getElementById("skip");

const img0 = document.getElementById("img0");
const img1 = document.getElementById("img1");
const img2 = document.getElementById("img2");

const countdownBar = document.getElementById("countdownBar");
const timeLeft = document.getElementById("timeLeft");

const sortDiv = document.getElementById("sortDiv");
const sortSubmit = document.getElementById("sort");

var timerTime = localStorage.getItem("time");
var dataId;
var savedOptions = [];

var tries = 0;
var correctAnswers = 0;
var wrongAnswers = 0;
var session = 3;
var savedMatch = 0;

var rounds = 0;

var savedButton = [];
var savedImage = [];

var totalObj = 3;

class RoundScore {
	matchAttempts;
	correct;
	wrong;
	dateTime;

	constructor(new_matchAttempts, new_correct, new_wrong, new_dateTime) {
		this.matchAttempts = new_matchAttempts;
		this.correct = new_correct;
		this.wrong = new_wrong;
		this.dateTime = new_dateTime;
	}
}

function makeArray(total) {
	var score = [];
	for (var i = 0; i <= total; ++i) {
		score[i] = new RoundScore(0, 0, 0, 0);
	}
	return score;
}

var score = makeArray(totalObj - 1);

window.onload = localBackgroundSetting();

//show element
function show(element) {
	element.classList.remove("hidden");
}

//hide element
function hide(element) {
	element.classList.add("hidden");
}

hide(container);
hide(resultContainer);
hide(countdownBar);
hide(showHistory);

sortSubmit.onclick = function () {
	sort();
};

showHistory.onclick = function () {
	show(history);
	showTheHistoryAscending();
};

secondsSetting.onclick = function () {
	var timeChange = time.value;
	timeChange = timeChange * 2;

	timerTime = parseInt(timeChange);
	localStorage.setItem("time", timerTime);
	console.log(timerTime);
};

objectsSetting.onclick = function () {
	score.splice(0, totalObj);
	totalObj = totalObjects.value;
	score = makeArray(totalObj - 1);
};

gear.onclick = function () {
	if (settings.classList == "hidden") {
		show(settings);
	} else {
		hide(settings);
	}
};

startButton.onclick = function () {
	correctAnswers = 0;
	wrongAnswers = 0;
	tries = 0;
	hide(sortDiv);
	hide(gear);
	hide(showHistory);
	hide(settings);
	hide(resultContainer);
	hide(allJojos);
	hide(startTitle);
	hide(startButton);
	show(container);
	insertImage();
	insertName();
	initBarCount();
	deleteHistory();
};

skipBtn.onclick = function () {
	const btn = document.querySelector(".rememberBtnCol");
	if (btn) {
		btn.classList.remove("rememberBtnCol");
	}
	const img = document.querySelector(".rememberImgCol");

	if (img) {
		img.classList.remove("rememberImgCol");
	}
	savedButton.splice(0, 1);
	savedImage.splice(0, 1);
	insertImage();
	insertName();
};
//functions when images are pressed

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
		"Josuke higashikata(2)",
	];
	var numsArray = [0, 1, 2, 3, 4, 5, 6, 7];

	for (var i = 0; i <= 2; i++) {
		const variableB = [button0, button1, button2];

		var randomNumber = Math.floor(Math.random() * numsArray.length);
		var datasetBtnName = nameArray[randomNumber];

		variableB[i].innerHTML = datasetBtnName;
		variableB[i].dataset.id = names.indexOf(datasetBtnName);

		variableB[i].onclick = function () {
			dataId = this.dataset.id;
			colorBtn();
			savedButton.push(dataId);
			buttonOnclick();
		};

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
		"img/Josuke8.png",
	];

	var numsArray = [0, 1, 2, 3, 4, 5, 6, 7];

	for (var i = 0; i <= 2; i++) {
		const variableI = [img0, img1, img2];

		var randomNumber = Math.floor(Math.random() * numsArray.length);
		var datasetImgName = imageArray[randomNumber];

		// edit image in html document
		variableI[i].src = datasetImgName;
		variableI[i].dataset.id = images.indexOf(datasetImgName);
		variableI[i].onclick = function () {
			dataId = this.dataset.id;
			colorImg();
			savedImage.push(dataId);
			buttonOnclick();
		};

		imageArray.splice(randomNumber, 1);
		numsArray.splice(randomNumber, 1);
	}
	imageArray = images;
	numsArray = nums;
}

// make sure only 1 image is selected (deselect other selected images)
// make sure only 1 button is selected (deselect other selected buttons)
// if 1 button and 1 image is selected, compare
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

var matchRonde = 0;
var checkIfComparisonRunned = 0;

function comparison() {
	if (savedImage[0] == savedButton[0]) {
		correctFunction();
	} else {
		wrongFunction();
	}

	if (tries != session) {
		insertImage();
		insertName();
	} else {
		if (savedMatch == 1) {
			matchRonde++;
			savedMatch == 0;
		}

		score[matchRonde].correct = correctAnswers;
		score[matchRonde].wrong = wrongAnswers;
		console.log(`matchronde =  ${matchRonde}`);
		score[matchRonde].matchAttempts = matchRonde + 1;
		score[matchRonde].dateTime = new Date();

		savedMatch = 1;
		checkIfComparisonRunned = 1;
		if (score.length != score[matchRonde].matchAttempts) {
			nextRound();
		} else {
			skipToEnd();
		}
	}
}

function correctFunction() {
	alert("goed :D");
	const btn = document.querySelector(".rememberBtnCol");
	btn.classList.remove("rememberBtnCol");

	const img = document.querySelector(".rememberImgCol");
	img.classList.remove("rememberImgCol");
	savedImage.splice(0, 1);
	savedButton.splice(0, 1);
	tries++;
	correctAnswers++;
}

function wrongFunction() {
	alert("WRONG");
	const btn = document.querySelector(".rememberBtnCol");
	btn.classList.remove("rememberBtnCol");

	const img = document.querySelector(".rememberImgCol");
	img.classList.remove("rememberImgCol");

	savedImage.splice(0, 1);
	savedButton.splice(0, 1);
	tries++;
	wrongAnswers++;
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
			id.classList.add("rememberBtnCol");
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
		id.classList.remove("rememberImgCol");
	} else {
		if (id) {
			img0.classList.remove("rememberImgCol");
			img1.classList.remove("rememberImgCol");
			img2.classList.remove("rememberImgCol");
			id.classList.add("rememberImgCol");
		} else {
			img0.classList.remove("rememberImgCol");
			img1.classList.remove("rememberImgCol");
			img2.classList.remove("rememberImgCol");
		}
	}
}

function initBarCount() {
	show(countdownBar);
	var startTimer = setInterval(barCount, timerTime);
	function barCount() {
		if (timeLeft.clientWidth == countdownBar.clientWidth + "px") {
			countdownBar.width = timeLeft.clientWidth + "px";
		}
		if (timeLeft.clientWidth < countdownBar.clientWidth) {
			timeLeft.style.width = timeLeft.clientWidth + 1 + "px";
		} else {
			if (checkIfComparisonRunned == 0) {
				if (savedMatch == 1) {
					matchRonde++;
					savedMatch == 0;
				}
				score[matchRonde].correct = correctAnswers;
				score[matchRonde].wrong = wrongAnswers;
				console.log(`matchronde =  ${matchRonde}`);
				score[matchRonde].matchAttempts = matchRonde + 1;
				score[matchRonde].dateTime = new Date();
				savedMatch = 1;
			}
			timeLeft.style.width = 0;
			countdownBar.style.width = 500 + "px";
			clearInterval(startTimer);
			if (score.length != score[matchRonde].matchAttempts) {
				nextRound();
			} else {
				skipToEnd();
			}
		}
	}
}

function nextRound() {
	hide(countdownBar);
	hide(container);
	show(startButton);
	show(resultContainer);
	showResults();
	startButton.value = "Go to next round";
}

function skipToEnd() {
	hide(countdownBar);
	hide(container);
	hide(settings);
	show(startButton);
	show(gear);
	show(showHistory);
	show(sortDiv);
	startButton.value = "Herstart de trainer";
	startButton.onclick = function () {
		location.reload();
	};
	show(resultContainer);
	showResults();
}

function localBackgroundSetting() {
	const savedColor = localStorage.getItem("color");
	var red = document.getElementById("red");
	var green = document.getElementById("green");
	var blue = document.getElementById("blue");

	console.log(savedColor);
	if (savedColor) {
		if (savedColor == "red") {
			document.body.style.backgroundColor = "red";
			red.selected = true;
		}
		if (savedColor == "green") {
			document.body.style.backgroundColor = "green";
			green.selected = true;
		}
		if (savedColor == "blue") {
			document.body.style.backgroundColor = "blue";
			blue.selected = true;
		}
	}
}

function changeBackgroundColor() {
	var backgroundColorSettings =
		document.getElementById("backgroundColor").value;

	localStorage.setItem("color", backgroundColorSettings);

	const savedColor = localStorage.getItem("color");

	if (backgroundColorSettings == savedColor) {
		backgroundColorSettings.selected = "true";
	}

	if (savedColor) {
		if (savedColor == "red") {
			document.body.style.backgroundColor = "red";
		}
		if (savedColor == "green") {
			document.body.style.backgroundColor = "green";
		}
		if (savedColor == "blue") {
			document.body.style.backgroundColor = "blue";
		}
	}
}

function showResults() {
	console.log(matchRonde);
	correctPoints.innerHTML =
		"aantal goeie punten: " + score[matchRonde].correct;
	wrongPoints.innerHTML =
		"aantal verkeerde punten: " + score[matchRonde].wrong;
	matchPogingen.innerHTML =
		"aantal matchpogingen: " + score[matchRonde].matchAttempts;
}

function showTheHistoryAscending() {
	deleteHistory();
	for (var i = 0; i <= score.length - 1; i++) {
		if (score[matchRonde].matchAttempts > 0) {
			history.classList.add("container");
			console.log(`loop = ${i}`);
			var divG = document.createElement("div");
			divG.id = "goeieHistory" + i;
			console.log(i);
			divG.innerHTML = `aantal correct: ${score[i].correct}`;
			divG.classList.add("col-sm");

			var divW = document.createElement("div");
			divW.id = "wrongHistory" + i;
			divW.innerHTML = `aantal fout: ${score[i].wrong}`;
			divW.classList.add("col-sm");

			var divT = document.createElement("div");
			divT.id = "match" + i;
			divT.innerHTML = `Match: ${score[i].matchAttempts}`;
			divT.classList.add("col-sm");

			var br = document.createElement("br");

			history.appendChild(divT);
			history.appendChild(divG);
			history.appendChild(divW);
			history.appendChild(br);
		}
	}
}

function showTheHistoryDescending() {
	deleteHistory();
	for (var i = 0; i <= score.length - 1; i++) {
		console.log(i);
		if (score[matchRonde].matchAttempts > 0) {
			history.classList.add("container");
			console.log(`loop = ${i}`);
			var divG = document.createElement("div");
			divG.id = "goeieHistory" + i;
			console.log(score[i].correct);
			divG.innerHTML = `aantal correct: ${score[i].correct}`;
			divG.classList.add("col-sm");

			var divW = document.createElement("div");
			divW.id = "wrongHistory" + i;
			divW.innerHTML = `aantal fout: ${score[i].wrong}`;
			divW.classList.add("col-sm");

			var divT = document.createElement("div");
			divT.id = "match" + i;
			divT.innerHTML = `Match: ${score[i].matchAttempts}`;
			divT.classList.add("col-sm");

			var br = document.createElement("br");

			history.appendChild(divT);
			history.appendChild(divG);
			history.appendChild(divW);
			history.appendChild(br);
		}
	}
}

function sort() {
	const sorteerColumn = document.getElementById("sorteerColumn").value;
	const sorteerOrder = document.getElementById("sorteerOrder").value;
	deleteHistory();
	console.log(sorteerColumn);
	console.log(sorteerOrder);
	if (sorteerColumn == "Score" && sorteerOrder == "Descending") {
		score.sort(function (a, b) {
			return b.correct - a.correct;
		});
		console.log(score);
		showTheHistoryDescending();
	}

	if (sorteerColumn == "Score" && sorteerOrder == "Ascending") {
		score.sort(function (a, b) {
			return a.correct - b.correct;
		});
		console.log(score);
		showTheHistoryAscending();
	}

	if (sorteerColumn == "Time" && sorteerOrder == "Descending") {
		score.sort(function (a, b) {
			return b.dateTime - a.dateTime;
		});
		console.log(score);
		showTheHistoryDescending();
	}

	if (sorteerColumn == "Time" && sorteerOrder == "Ascending") {
		score.sort(function (a, b) {
			return a.dateTime - b.dateTime;
		});
		console.log(score);
		showTheHistoryAscending();
	}
}

function deleteHistory() {
	while (history.firstChild) {
		history.removeChild(history.firstChild);
	}
}

function compare(a, b) {
	if (a.dateTime < b.dateTime) {
		return -1;
	}
	if (a.dateTime > b.dateTime) {
		return 1;
	}
	return 0;
}
