/* GROUNDSPEED_DECAY_MULT = 0.94;
const MOVE_POWER = 1;
const SOUTH_POWER = 1;
const TURN_RATE = 0.06;
const MIN_SPEED_TO_TURN = 0.5;*/
const PLAYER_MOVE_SPEED = 3;

function warriorClass() {

    this.x = 75;
    this.y = 75;
    // this.ang = 0;
    // this.speed = 0;
    this.myWarriorPic; // which picture to use
    this.name = "Untitled Warrior"; 
    
    this.keyHeld_North = false;
    this.keyHeld_West = false;
    this.keyHeld_East = false;
    this.keyHeld_South = false;

    this.controlKeyUp;
    this.controlKeyRight;
    this.controlKeyDown;
    this.controlKeyLeft;

    this.setupInput = function (upKey, rightKey, downKey, leftKey) {
        this.controlKeyUp = upKey;
        this.controlKeyRight = rightKey;
        this.controlKeyDown = downKey;
        this.controlKeyLeft = leftKey; 
    }

    this.reset = function (whichImage, warriorName) {
        this.name = warriorName; 
        this.myWarriorPic = whichImage;
        // this.speed = 0;

        for (var eachRow = 0; eachRow < WORLD_ROWS; eachRow++) {
            for (var eachCol = 0; eachCol < WORLD_COLS; eachCol++) {
                var arrayIndex = rowColToArrayIndex(eachCol, eachRow);
                if (worldGrid[arrayIndex] == WORLD_PLAYERSTART) {
                    worldGrid[arrayIndex] = WORLD_ROAD;
                    // this.ang = -Math.PI / 2;
                    this.x = eachCol * WORLD_W + WORLD_W / 2;
                    this.y = eachRow * WORLD_H + WORLD_H / 2;
                    return;
                } // end of player start if
            } // end of col for
        } // end of row for
        console.log("NO PLAYER START FOUND!");
    } // end of warriorReset func

    this.move = function () {
        var nextX = this.x;
        var nextY = this.y;

        // this.speed *= GROUNDSPEED_DECAY_MULT;
        // slows warrior down
        // if warriorSpeed is negative, the warrior would reverse backwards
        // if warriorspeed is >1, warrior would move faster 

        if (this.keyHeld_North) {
            nextY += PLAYER_MOVE_SPEED;
        }
        if (this.keyHeld_West) {
            nextX -= PLAYER_MOVE_SPEED;
        }
        if (this.keyHeld_East) {
            nextX += PLAYER_MOVE_SPEED;
        }
        if (this.keyHeld_South) {
            nextY -= PLAYER_MOVE_SPEED;
        }
        /* if (Math.abs(this.speed) > MIN_SPEED_TO_TURN) {
            if (this.keyHeld_West) {
                this.ang -= TURN_RATE;
            }
            if (this.keyHeld_East) {
                this.ang += TURN_RATE;
            }
        }

        this.x += Math.cos(this.ang) * this.speed;
        this.y += Math.sin(this.ang) * this.speed; */

        warriorWorldHandling(this);
    }

    this.draw = function () {
        // colorCircle(warriorX,warriorY, 10, 'white'); // draw warrior
        drawBitmapCenteredWithRotation(this.myWarriorPic, this.x, this.y, this.ang);
    }
}