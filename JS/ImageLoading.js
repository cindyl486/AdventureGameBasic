var backgroundPic = document.createElement("img");
var warriorPic = document.createElement("img");
var otherWarriorPic = document.createElement("img");
var worldPics = [];

var picsToLoad = 0; // set automatically based on imageList in loadImages()

function countLoadedImagesAndLaunchIfReady() {
    picsToLoad--;
    // console.log(picsToLoad);
    if (picsToLoad == 0) {
        imageLoadingDoneSoStartGame();
    } // wait for images to finish loading
} // end of function

function beginLoadingImage(imgVar, fileName) {
    imgVar.onload = countLoadedImagesAndLaunchIfReady;
    imgVar.src = "Images/"+fileName;
}

// next 3 functions were commented out since helper function (above) was created to shorten the script

/*function warriorImageLoad() {
    beginLoadingImage(warriorPic.src, "turtle.png");
}

function worldLoadImages() {
    beginLoadingImage(wallPic.src, "coralwall.png")
}

function backgroundLoadImage() {
    beginLoadingImage(backgroundPic, "waves.png");
    canvasContext.drawImage(backgroundPic, 0, 0);
}*/

function loadImageForWorldCode(worldCode, fileName) {
    worldPics[worldCode] = document.createElement("img");
    beginLoadingImage(worldPics[worldCode], fileName);
}

function loadImages() {      
    var imageList = [
        { varName: backgroundPic, theFile: "ocean.png" },   
        { varName: warriorPic, theFile: "turtle.png" },
        // { varName: otherWarriorPic, theFile: "jellyfish.png" },

        { worldType: WORLD_WALL, theFile: "coralwall.png" },
        { worldType: WORLD_ANEMONE, theFile: "Anemone.png" },
        { worldType: WORLD_FLAG, theFile: "flag.png" },
        { worldType: WORLD_GOAL, theFile: "finishline.png" }
    ];  

    picsToLoad = imageList.length;
    
    for (var i = 0; i < imageList.length; i++) {
        if (imageList[i].varName != undefined) {
            beginLoadingImage(imageList[i].varName, imageList[i].theFile);
        } else {
            loadImageForWorldCode(imageList[i].worldType, imageList[i].theFile);
        }
    } // don't have to manually count how many images there are
} // shortcut created 