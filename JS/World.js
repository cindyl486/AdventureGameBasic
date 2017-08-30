const WORLD_W = 50;
const WORLD_H = 50;
// const WORLD_GAP = 2;
const WORLD_COLS = 16;
const WORLD_ROWS = 12;
var levelOne =
           [4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            4, 4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
            4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
            1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 
            1, 0, 0, 0, 1, 1, 1, 4, 4, 4, 4, 1, 1, 1, 0, 1, 
            1, 0, 0, 1, 1, 0, 0, 1, 4, 4, 1, 1, 0, 0, 0, 1,
            1, 0, 0, 1, 0, 0, 0, 0, 1, 4, 1, 0, 0, 0, 0, 1, 
            1, 0, 0, 1, 0, 0, 5, 0, 0, 1, 1, 0, 0, 5, 0, 1, 
            1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 5, 0, 0, 1, 0, 1, 
            1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 
            1, 0, 2, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
var worldGrid = [];

const WORLD_ROAD = 0;
const WORLD_WALL = 1;
const WORLD_PLAYERSTART = 2;
const WORLD_GOAL = 3;
const WORLD_ANEMONE = 4;
const WORLD_FLAG = 5;
const WORLD_DOOR = 6;
const WORLD_KEY = 7;

function returnTileTypeAtColRow(col, row) {
    if (col >= 0 && col < WORLD_COLS &&
        row >= 0 && row < WORLD_ROWS) {
        var worldIndexUnderCoord = rowColToArrayIndex(col, row);
        return (worldGrid[worldIndexUnderCoord]); // (worldGrid[worldIndexUnderCoord != WORLD_ROAD])
    } else {
        return WORLD_WALL;
    }
}

// returns true if a valid move and false if blocked

function warriorWorldHandling(whichWarrior, testX, testY) {
    var warriorWorldCol = Math.floor(testX / WORLD_W);
    var warriorWorldRow = Math.floor(testY / WORLD_H);
    var worldIndexUnderWarrior = rowColToArrayIndex (warriorWorldCol, warriorWorldRow);

    if (warriorWorldCol >= 0 && warriorWorldCol < WORLD_COLS &&
        warriorWorldRow >= 0 && warriorWorldRow < WORLD_ROWS) {
        var tileHere = returnTileTypeAtColRow(warriorWorldCol, warriorWorldRow);
        
        if (tileHere == WORLD_GOAL) {
            console.log(whichWarrior.name + " WINS!");
            loadLevel(levelOne);
            return true;
        } else if (tileHere == WORLD_ROAD) {
            return true;
            // next 2 lines added to fix a bug
            // undoes the warrior movement which burrows it into the wall
            /* whichWarrior.x -= Math.cos(whichWarrior.ang) * whichWarrior.speed;
            whichWarrior.y -= Math.sin(whichWarrior.ang) * whichWarrior.speed;*/

            // whichWarrior.speed *= -0.5;
        } //end of world found
        else {
            return false;
        }
    } // end of valid col and rol
    return false;
} // end of warriorWorldHandling function

function rowColToArrayIndex(col, row) {
    return col + WORLD_COLS * row;
}

function drawGoal() {

    var arrayIndex = 0;
    var drawTileX = 0;
    var drawTileY = 0;

    for (var eachRow = 0; eachRow < WORLD_ROWS; eachRow++) {
        for (var eachCol = 0; eachCol < WORLD_COLS; eachCol++) {
            var tileKindHere = worldGrid[arrayIndex];

            if (tileKindHere == WORLD_GOAL) {
                var useImg = worldPics[tileKindHere];
                canvasContext.drawImage(useImg, drawTileX, drawTileY);
            } // if tile does not equal WORLD_ROAD, then use the array index 

            drawTileX += WORLD_W;
            arrayIndex++;

        } // end of for each each col
        drawTileY += WORLD_H;
        drawTileX = 0;
    }
}

function drawWorlds() {
     
    var arrayIndex = 0;
    var drawTileX = 0;
    var drawTileY = 0;
   
    for (var eachRow = 0; eachRow < WORLD_ROWS; eachRow++) {
        for (var eachCol = 0; eachCol < WORLD_COLS; eachCol++) {
            var tileKindHere = worldGrid[arrayIndex];

            if (tileKindHere != WORLD_ROAD && tileKindHere != WORLD_GOAL) {
                var useImg = worldPics[tileKindHere];
                canvasContext.drawImage(useImg, drawTileX, drawTileY);
            } // if tile does not equal WORLD_ROAD, then use the array index 

            drawTileX += WORLD_W;
            arrayIndex++;      
           
        } // end of for each each col
        drawTileY += WORLD_H;
        drawTileX = 0;
    } // end of for each row      
} // end of drawWorlds function
