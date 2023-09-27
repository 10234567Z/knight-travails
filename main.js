function isSafe(x , y , sol){
    return (x >= 0 && y >= 0 && x < 8 && y < 8 && sol[x][y] === -1)
}

function travailing(){
    /** Make an empty arr */
    let sol = []

    /** Make an 8x8 grid with -1 all inputs */
    for(let i = 0; i < 8; i++){
        sol.push([])
        for(let j = 0; j < 8; j++){
            sol[i].push(-1)
        }
    }

    /** Define all [x][y] axis moves that can be done by a knight in chess */
    let xMove = [ 2, 1, -1, -2, -2, -1, 1, 2 ];
    let yMove = [ 1, 2, 2, 1, -1, -2, -2, -1 ];

    /** Make the initial move start from 0th cell/axis */
    sol[0][0] = 0;

    /** Print sol if solution exists*/
    if(!traverseRec(0, 0 , 1 , sol , xMove , yMove)){
        console.log('no solution')
        return false
    }
    else{
        console.log(sol);
    }

}

function traverseRec(x , y , move , sol , xMove , yMove){
    let k  , next_x , next_y;

    /** If next move is 64 i.e 8x8 so return true and end the recursion , keeping this as base */
    if(move === 64){
        return true;
    }

    for(let k = 0; k < 8; k++){

        /** Trying all the moves inside x and y moves passed into function */
        next_x = x + xMove[k];
        next_y = y + yMove[k];

        /** Checking if next move is safe i.e it returns true, if it is then make the next move cell value as current move like 1st move will become 1 of a[x][y] cell 
        */
        if(isSafe(next_x , next_y , sol)){
            sol[next_x][next_y] = move;

            /** Recurse through the traverseRec func by passing next cell indices while increasing moves everytimes it gets increased */
            if(traverseRec(next_x , next_y , move + 1, sol , xMove , yMove)){
                return true;
            }
            else{
                /** Backtrack if next solution is invalid */
                sol[next_x][next_y] = -1;
            }
        }
    }
    return false
}

travailing();
/**
 * connect [i , j] to i + 1 , i  , i - 1 for all the arrays
 */