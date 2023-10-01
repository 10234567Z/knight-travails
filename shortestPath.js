dx = [2, 1, -1, -2, -2, -1, 1, 2]
dy = [1, 2, 2, 1, -1, -2, -2, -1]

function isSafe(x, y) {
    return x >= 0 && y >= 0 && x < 8 && y < 8;
}

function knightTravails(start , end){
    let distances = new Array(8).fill(null).map(() => new Array(8).fill(Infinity))
    distances[start[0]][start[1]] = 0;

    let queue = [];
    queue.push({x:start[0] , y:start[1] , dist: 0});

    while(queue.length > 0){
        queue.sort((a,b) => a.dist - b.dist);
        let current = queue.shift();
        if(current.x === end[0] && current.y === end[1]){
            return constructPath(distances , start , end);
        }
        for(let i = 0 ; i < 8; i++){
            let next = [current.x + dx[i], current.y + dy[i]];
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