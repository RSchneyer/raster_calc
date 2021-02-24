/**
 * triangleObj = {
 *     p0: [x0, y0],
 *     p1: [x1, y1],
 *     p2: [x2, y2]
 * }
 * 
 * 
 * 
 * 
 */

function drawPath(triangleObj){
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    ctx.lineWidth = 1;
    ctx.strokeStyle = "#000";

    ctx.beginPath();

    ctx.moveTo(triangleObj.p0[0],triangleObj.p0[1]); //start @ p0
    var pointer = [triangleObj.p0[0], triangleObj.p0[1]];
    var prevCoords;
    var currentCoords = pointer;
    var state = "MOVE_RIGHT_CMD"
    var prev_state;
    console.log(isInBounds(triangleObj, currentCoords));
    while(currentCoords[1]<triangleObj.p2[1]){
        // console.log(currentCoords)
        console.log(state);
        console.log("moving to: ("+currentCoords[0]+","+currentCoords[1]+")");
        ctx.moveTo(currentCoords[0], currentCoords[1]);
            if(state.localeCompare("MOVE_RIGHT_CMD")==0){
                prevCoords = currentCoords;
                while(isInBounds(triangleObj, currentCoords)){
                    currentCoords[0]+=5;
                }

                currentCoords = pointer;
                pointer = null;
                state = "POP_MOVE_LEFT_CMD";
                prev_state = "MOVE_RIGHT_COMMAND";
            }

            else if(state.localeCompare("POP_MOVE_LEFT_CMD")==0){
                // ctx.moveTo(currentCoords[0], currentCoords[1]);
                prevCoords = currentCoords;
                while(isInBounds(triangleObj, currentCoords)){
                    currentCoords[0]-=5;
                }
                // ctx.lineTo(currentCoords[0], currentCoords[1]);
                // ctx.stroke();
                state = "PUSH_MOVE_DOWN_CMD";
                prev_state = "POP_MOVE_LEFT_CMD";
            }

            else if(state.localeCompare("PUSH_MOVE_DOWN_CMD")==0){
                // ctx.moveTo(currentCoords[0], currentCoords[1]);
                prevCoords = currentCoords;
                currentCoords[1]+=5;
                // ctx.lineTo(currentCoords[0], currentCoords[1]);
                // ctx.stroke();
                if(isInBounds(triangleObj, currentCoords)){
                    pointer = currentCoords;
                    state = "MOVE_RIGHT_CMD";
                }
                else if(prev_state.localeCompare("POP_MOVE_LEFT_CMD")==0){
                    state = "POP_MOVE_RIGHT_CMD";
                }
                else if(prev_state.localeCompare("POP_MOVE_RIGHT_CMD")==0){
                    state = "MOVE_LEFT_CMD";
                }
                prev_state = "PUSH_MOVE_DOWN_CMD";
            }

            else if(state.localeCompare("MOVE_LEFT_CMD")==0){
                // ctx.moveTo(currentCoords[0], currentCoords[1]);
                prevCoords = currentCoords;
                while(!isInBounds(triangleObj, currentCoords)){
                    currentCoords[0]-=5;
                }
                // ctx.lineTo(currentCoords[0], currentCoords[1]);
                // ctx.stroke();
                state = "POP_MOVE_LEFT_CMD";
                prev_state = "MOVE_LEFT_CMD";
                break;
            }

            else if(state.localeCompare("POP_MOVE_RIGHT_CMD")==0){
                // ctx.moveTo(currentCoords[0], currentCoords[1]);
                prevCoords = currentCoords;
                while(isInBounds(triangleObj, currentCoords)){
                    currentCoords[0]+=5;
                }
                // ctx.lineTo(currentCoords[0], currentCoords[1]);
                // ctx.stroke();
                state = "PUSH_MOVE_DOWN_CMD";
                prev_state = "POP_MOVE_RIGHT_CMD";
            }
            console.log("line to: ("+currentCoords[0]+","+currentCoords[1]+")");
            ctx.lineTo(currentCoords[0], currentCoords[1]);
            ctx.stroke();
    }
    ctx.stroke();
}

function lineTo(ctx, coords){ctx.lineTo(coords[0],coords[1]);}

function isInBounds(triangleObj, checkPoint){
    var countOnBounds = document.getElementById("edgePoint").checked;
    var a = areaFromPoints(triangleObj.p0,triangleObj.p1,triangleObj.p2);
    var ap1 = areaFromPoints(triangleObj.p0,triangleObj.p1,checkPoint);
    var ap2 = areaFromPoints(triangleObj.p1,triangleObj.p2,checkPoint);
    var ap3 = areaFromPoints(triangleObj.p2,triangleObj.p0,checkPoint);
    if(!countOnBounds){
        return ((a * ap1 >= 0) && (a * ap2 >= 0) && (a * ap3 >= 0));
    }
    else{
        return ((a * ap1 > 0) && (a * ap2 > 0) && (a * ap3 > 0));
    }
}


function areaFromPoints([x0, y0],[x1, y1],[x2, y2]){
    return (((x0 - x2) * (y1 - y2)) - ((x1 - x2) * (y0 - y2)))/2;
}

