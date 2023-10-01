dx = [2, 1, -1, -2, -2, -1, 1, 2]
dy = [1, 2, 2, 1, -1, -2, -2, -1]

function isSafe(x, y) {
    return x >= 0 && y >= 0 && x < 8 && y < 8;
}

function knightTravails(start , end){

    /** Make initial distance infinity for all cells and make initial start position 0 */
    let distances = new Array(8).fill(null).map(() => new Array(8).fill(Infinity))
    start[0] = 7 - start[0];
    end[0] = 7 - end[0];
    distances[start[0]][start[1]] = 0;

    let queue = [];
    queue.push({x:start[0] , y:start[1] , dist: 0});

    /** if 1st element in queue is same position as target , construct path otherwise go to loop */
    while(queue.length > 0){
        queue.sort((a,b) => a.dist - b.dist);
        let current = queue.shift();
        if(current.x === end[0] && current.y === end[1]){
            return constructPath(distances , start , end);
        }
        for(let i = 0 ; i < 8; i++){
            let next = [current.x + dx[i], current.y + dy[i]];

            /** only if the current position distance++ is less than next move distance , push the new element inside queue and update the distance */
            if(isSafe(next[0] , next[1]) && current.dist + 1 < distances[next[0]][next[1]]){
                distances[next[0]][next[1]] = current.dist + 1;
                queue.push({x:next[0] , y:next[1] , dist: current.dist + 1})
            }
        }
    }
    return null;
}

function constructPath(distances , start , end){
    let path = [end];

    /** Construct a path by backtreacking from end path to start by checking if the next move pos distance from end (i.e current pos) is exactly 1 less than current position
     * just like end distance = 4 , 2nd last before that would be 4 - 1 = 3 , backtracking like that until it reach the start and then return the reverse array
     */
    while(end[0] !== start[0] || end[1] !== start[1]){
        for(let i = 0; i < 8 ; i++){
            let next = [end[0] + dx[i] , end[1] + dy[i]];
            if(isSafe(next[0] , next[1]) && distances[next[0]][next[1]] === distances[end[0]][end[1]] - 1){
                path.push(next);
                end = next;
                break;
            }
        }
    }
    for(let i = path.length - 1; i >= 0; i--){
        console.log(path[i]);
    }
    return `You made it in ${path.length} moves with the path above!`
}
console.log(knightTravails([2,3] ,[7,7]))