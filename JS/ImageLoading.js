var backgroundPic = document.createElement("img");
var carPic = document.createElement("img");
var otherCarPic = document.createElement("img");
var trackPics = [];

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

/*function carImageLoad() {
    beginLoadingImage(carPic.src, "turtle.png");
}

function trackLoadImages() {
    beginLoadingImage(wallPic.src, "coralwall.png")
}

function backgroundLoadImage() {
    beginLoadingImage(backgroundPic, "waves.png");
    canvasContext.drawImage(backgroundPic, 0, 0);
}*/

function loadImageForTrackCode(trackCode, fileName) {
    trackPics[trackCode] = document.createElement("img");
    beginLoadingImage(trackPics[trackCode], fileName);
}

function loadImages() {      
    var imageList = [
        { varName: backgroundPic, theFile: "ocean.png" },   
        { varName: carPic, theFile: "turtle.png" },
        // { varName: otherCarPic, theFile: "jellyfish.png" },

        { trackType: TRACK_WALL, theFile: "coralwall.png" },
        { trackType: TRACK_ANEMONE, theFile: "Anemone.png" },
        { trackType: TRACK_FLAG, theFile: "flag.png" },
        { trackType: TRACK_GOAL, theFile: "finishline.png" }
    ];  

    picsToLoad = imageList.length;
    
    for (var i = 0; i < imageList.length; i++) {
        if (imageList[i].varName != undefined) {
            beginLoadingImage(imageList[i].varName, imageList[i].theFile);
        } else {
            loadImageForTrackCode(imageList[i].trackType, imageList[i].theFile);
        }
    } // don't have to manually count how many images there are
} // shortcut created 