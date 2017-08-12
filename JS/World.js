const TRACK_W = 40;
const TRACK_H = 40;
const TRACK_GAP = 2;
const TRACK_COLS = 20;
const TRACK_ROWS = 15;
var levelOne =
           [4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4,
            4, 4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
            4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
            1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1,
            1, 0, 0, 0, 1, 1, 1, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 0, 0, 1,
            1, 0, 0, 1, 1, 0, 0, 1, 4, 4, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1,
            1, 0, 0, 1, 0, 0, 0, 0, 1, 4, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
            1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 5, 0, 0, 1, 0, 0, 1,
            1, 0, 0, 1, 0, 0, 5, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
            1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 5, 0, 0, 1, 0, 0, 1, 0, 0, 1,
            1, 2, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 5, 0, 0, 1,
            1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
            0, 0, 3, 0, 0, 0, 1, 4, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1,
            0, 0, 3, 0, 0, 0, 1, 4, 4, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 4];
var trackGrid = [];

const TRACK_ROAD = 0;
const TRACK_WALL = 1;
const TRACK_PLAYERSTART = 2;
const TRACK_GOAL = 3;
const TRACK_ANEMONE = 4;
const TRACK_FLAG = 5;

function returnTileTypeAtColRow(col, row) {
    if (col >= 0 && col < TRACK_COLS &&
        row >= 0 && row < TRACK_ROWS) {
        var trackIndexUnderCoord = rowColToArrayIndex(col, row);
        return (trackGrid[trackIndexUnderCoord]); // (trackGrid[trackIndexUnderCoord != TRACK_ROAD])
    } else {
        return TRACK_WALL;
    }
}

function carTrackHandling(whichCar) {
    var carTrackCol = Math.floor(whichCar.x / TRACK_W);
    var carTrackRow = Math.floor(whichCar.y / TRACK_H);
    var trackIndexUnderCar = rowColToArrayIndex (carTrackCol, carTrackRow);

    if (carTrackCol >= 0 && carTrackCol < TRACK_COLS &&
        carTrackRow >= 0 && carTrackRow < TRACK_ROWS) {
        var tileHere = returnTileTypeAtColRow(carTrackCol, carTrackRow);
        
        if (tileHere == TRACK_GOAL) {
            console.log(whichCar.name + " WINS!");
            loadLevel(levelOne);
        } else if (tileHere != TRACK_ROAD) {
            // next 2 lines added to fix a bug
            // undoes the car movement which burrows it into the wall
            whichCar.x -= Math.cos(whichCar.ang) * whichCar.speed;
            whichCar.y -= Math.sin(whichCar.ang) * whichCar.speed;

            whichCar.speed *= -0.5;
        } //end of track found
    } // end of valid col and rol
} // end of carTrackHandling function

function rowColToArrayIndex(col, row) {
    return col + TRACK_COLS * row;
}

function drawGoal() {

    var arrayIndex = 0;
    var drawTileX = 0;
    var drawTileY = 0;

    for (var eachRow = 0; eachRow < TRACK_ROWS; eachRow++) {
        for (var eachCol = 0; eachCol < TRACK_COLS; eachCol++) {
            var tileKindHere = trackGrid[arrayIndex];

            if (tileKindHere == TRACK_GOAL) {
                var useImg = trackPics[tileKindHere];
                canvasContext.drawImage(useImg, drawTileX, drawTileY);
            } // if tile does not equal TRACK_ROAD, then use the array index 

            drawTileX += TRACK_W;
            arrayIndex++;

        } // end of for each each col
        drawTileY += TRACK_H;
        drawTileX = 0;
    }
}

function drawTracks() {
     
    var arrayIndex = 0;
    var drawTileX = 0;
    var drawTileY = 0;
   
    for (var eachRow = 0; eachRow < TRACK_ROWS; eachRow++) {
        for (var eachCol = 0; eachCol < TRACK_COLS; eachCol++) {
            var tileKindHere = trackGrid[arrayIndex];

            if (tileKindHere != TRACK_ROAD && tileKindHere != TRACK_GOAL) {
                var useImg = trackPics[tileKindHere];
                canvasContext.drawImage(useImg, drawTileX, drawTileY);
            } // if tile does not equal TRACK_ROAD, then use the array index 

            drawTileX += TRACK_W;
            arrayIndex++;      
           
        } // end of for each each col
        drawTileY += TRACK_H;
        drawTileX = 0;
    } // end of for each row      
} // end of drawTracks function
