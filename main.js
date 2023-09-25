let grid = [];
for(let i = 0; i < 8; i++){
    grid.push([]);
    for(let j = 0; j < 8; j++){
        grid[i].push(j + 1)
    }
}

/** 
 * connect [i , j] to i + 1 , i  , i - 1 for all the arrays
 */