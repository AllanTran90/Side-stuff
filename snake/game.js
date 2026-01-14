const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const scoreEl = document.getElementById("score");

const tileSize = 20
const tile = canvas.width / tileSize;

let snake = [
    { x: 10, y: 10 },
    { x: 9, y: 10},
    { x: 8, y: 10}
];

let direction = { x: 1, y: 0 };
let score = 0;

let food = spawnFood();
let bonusFood = null;
let bonusTimer = 0;

function spawnFood(){
    return{
        x:Math.floor(Math.random() * tiles),
        y:Math.floor(Math.random() * tiles)
    };
}

function draw(){
    ctx.fillStyle = "#1f2b16";
    snake.forEach(part => {
        ctx.fillRect(
            part.x * tileSize,
            part.y * tileSize,
            tileSize,
            tileSize
        );
        ctx.fillStyle = "#1f2b16";
    })
}
// regular food
 function update(){
    const head = snake[0];
    let newHead = {
        x: head.x + direction.x,
        y: head.y + direction.y
    };
    // can pass through wall
    if (newHead.x < 0) newHead.x = tiles -1;
    if (newHead.x >= tiles) newHead.x = 0;
    if (newHead.y < 0) newHead.y = tiles -1;
    if (newHead.y >= tiles) newHead.y = 0;
 }

//  crash into itselt = game over
for (const part of snake){
    if (part.x === newHead.x && part.y === newHead.y){
        alert("GAME OVER\nPoints: " + score);
        location.reload();
        return;
    }
}

snake.unshift;

// regular food
if (newHead.x === food.x && newHead.y === food.y){
    score++;
    scoreEl.textContent = score
}