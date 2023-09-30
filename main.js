let grid = [];

/** Make a grid array of board */
for (let i = 0; i < 8; i++) {
    grid.push([]);
    for (let j = 0; j < 8; j++) {
        grid[i].push('.');
    }
}

/** ALl possible 8 moves of knight */
let xMove = [2, 1, -1, -2, -2, -1, 1, 2];
let yMove = [1, 2, 2, 1, -1, -2, -2, -1];

/** check if next move is empty/valid  */
function isSafe(x, y) {
    return x >= 0 && y >= 0 && x < 8 && y < 8 && grid[x][y] === '.';
}

/** Get the number of valid move the next moves have and returns the count */
function getValidMoves(x, y) {
    let count = 0;
    for (let i = 0; i < 8; i++) {
        let nextX = x + xMove[i];
        let nextY = y + yMove[i];
        if (isSafe(nextX, nextY)) {
            count++;
        }
    }
    return count;
}

function knightTravails(start, step = 1) {
    /** If the its 1st step , to start from bottom to top index subtract startX index from 7 
     * i.e maximum index of board on any side */
    if(step === 1){
        start[0] = 7 - start[0];
    }
    let [row, col] = start;
    grid[row][col] = step;
    if (step === 64) {
        return true;
    }

    /** This will save all possible next moves inside */
    let nextMoves = [];

    /** Checks if the next values have valid moves , if its not safe it wont put values of next moves of nextmove inside nextMoves array
     * otherwise x y and number of valid moves go inside nextMoves array
    */
    for (let i = 0; i < 8; i++) {
        let next = [row + xMove[i] , col + yMove[i]]
        if (isSafe(next[0], next[1])) {
            let validMoves = getValidMoves(next[0], next[1]);
            nextMoves.push({ x: next[0], y: next[1], moves: validMoves });
        }
    }

    /** SOrt the next moves array based on number of moves */
    nextMoves.sort((a, b) => a.moves - b.moves);

    /** checks if the next recursion of knight travails function is false or if its the end */
    for (let i = 0; i < 8; i++) {
        let next = [nextMoves[i].x, nextMoves[i].y];
        if (knightTravails(next, step + 1)) {
            return true;
        }
    }
    /** Backtracks and put the thing to previous value */
    grid[row][col] = ".";
    return false;
}

if (knightTravails([2, 3])) {
    console.log(grid)
} else {
    console.log("No solution found.");
}
