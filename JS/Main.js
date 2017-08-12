var canvas, canvasContext;

// var blueWarrior = new warriorClass();
var greenWarrior = new warriorClass();


window.onload = function () {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    
    colorRect(0, 0, canvas.wdith, canvas.height, 'black');
    colorText("LOADING IMAGES", canvas.width/2, canvas.height/2, 'white');

    loadImages();
}

function imageLoadingDoneSoStartGame() {
    var framesPerSecond = 30
    setInterval(updateAll, 1000 / framesPerSecond);

    setupInput();  

    loadLevel(levelOne);
}

function loadLevel(whichLevel) {
    worldGrid = whichLevel.slice();
    greenWarrior.reset(warriorPic, "Squirt");
    // blueWarrior.reset(otherWarriorPic, "Squishy");

    // levelOne[30] = 5;
    // can setup various types of levels with code above
}

function updateAll() {
    moveAll();
	drawAll();
}

function moveAll() {
    greenWarrior.move();
    // blueWarrior.move();
}

/*function clearScreen() {
    colorRect(0, 0, canvas.width, canvas.height, 'white');
}*/

function drawAll() {
    // clearScreen();

    canvasContext.drawImage(backgroundPic, 0, 0);
    drawGoal();
    greenWarrior.draw();
    // blueWarrior.draw();
    drawWorlds();
}