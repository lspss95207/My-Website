const height = 600;
const width = 800;
const fps = 60;

const N_balls = 1;
const N_bricks = 18;
const bricksPerRow = 6
var ball_arr = [];
var brick_arr = [];

var gameover = false;
var score = 0;

var id;

function startGame(){
    gameover = false;
    score = 0;
    ball_arr = [];
    brick_arr = [];

    for (let i = 0; i < N_balls; i++) {
        ball_arr[i] = new Ball();
        gameArea.appendChild(ball_arr[i].node);
    }

    
    for (let i = 0; i < N_bricks; i++) {
        brick_arr[i] = new Brick();
        brick_arr[i].node.style.left = `${50 + (i % bricksPerRow) * 120}px`;
        brick_arr[i].node.style.top = `${50 + Math.floor(i / bricksPerRow) * 30}px`;
        gameArea.appendChild(brick_arr[i].node);

    }

    paddle = new Paddle();
    gameArea.appendChild(paddle.node)

    id = setInterval(frame, 1000 / fps)

    // setTimeout(()=>clearInterval(id),10000);

    gameArea.addEventListener("mousemove", function (e) {
        paddle.node.style.left = Math.max(0, Math.min(width - paddle.width, e.offsetX)) + "px"
    });
}

function frame() {
    if(gameover){
        ball_arr.forEach(ball => {
            gameArea.removeChild(ball.node);
        });
        clearInterval(id);
        return;
    }
    ball_arr.forEach(ball => {
        ball.move();
    });
}

var gameArea = document.getElementById("gameArea");
gameArea.style.height = height + "px";
gameArea.style.width = width + "px";

function Paddle() {
    this.velocity = { x: 0, y: 0 }
    this.height = 10;
    this.width = 100;
    this.node = document.createElement("div");
    this.node.className = "paddle";
    this.node.style.height = this.height + "px";
    this.node.style.width = this.width + "px";
    this.node.style.backgroundColor = `rgb(${randInt(0, 255)},${randInt(0, 255)},${randInt(0, 255)})`;
    this.node.style.top = "591px";
    this.node.style.left = "351px";
}
Paddle.prototype.move = function () {
    let pos = { x: parseInt(this.node.style.left), y: parseInt(this.node.style.top) };
    console.log(this.velocity);
    this.node.style.top = Math.max(0, Math.min(height - this.height, pos.y + this.velocity.y)) + "px";
    this.node.style.left = Math.max(0, Math.min(width - this.width, pos.x + this.velocity.x)) + "px";
}


function Ball() {
    this.radius = randInt(5, 20);
    this.velocity = { x: randInt(4, 5), y: randInt(4, 5) }
    this.node = document.createElement("div");
    this.node.className = "ball";
    this.node.style.height = 2 * this.radius + "px";
    this.node.style.width = 2 * this.radius + "px";
    this.node.style.backgroundColor = `rgb(${randInt(0, 255)},${randInt(0, 255)},${randInt(0, 255)})`;
    this.node.style.top = randInt(100, 500) + "px";
    this.node.style.left = randInt(100, 700) + "px";
}
Ball.prototype.move = function () {
    if(gameover){
        return;
    }
    let y_reflect = false;
    let x_reflect = false;
    let pos = { x: parseInt(this.node.style.left), y: parseInt(this.node.style.top) };
    let paddlePos = { x: parseInt(paddle.node.style.left), y: parseInt(paddle.node.style.top), width: parseInt(paddle.node.style.width) }

    if (pos.x + 2 * this.radius >= width || pos.x <= 0) {
        x_reflect = true;
    }
    else if (pos.y <= 0) {
        y_reflect = true;
    }
    //paddle collision
    else if (pos.x >= paddlePos.x && pos.x + this.radius <= paddlePos.x + paddlePos.width && pos.y + 2 * this.radius >= paddlePos.y) {
        y_reflect = true;
    }
    else if (pos.y + 2 * this.radius >= height) {
        gameover = true;
        console.log('gameover');
    }else{
        for(let i = 0;i < N_bricks;i++){
            if(brick_arr[i].state == 0){
                continue;
            }
            let brickPos = { x: parseInt(brick_arr[i].node.style.left), y: parseInt(brick_arr[i].node.style.top), width: parseInt(brick_arr[i].node.style.width),  height: parseInt(brick_arr[i].node.style.height) }
            var cx, cy

            if(pos.x+this.radius < brickPos.x) {
                cx = brickPos.x
                y_reflect = true;
            } else if(pos.x+this.radius > brickPos.x + brickPos.width) {
                cx = brickPos.x + brickPos.width
                y_reflect = true;
            } else {
                cx = pos.x+this.radius
                y_reflect = true;
            }
    
            if(pos.y+this.radius < brickPos.y) {
                cy = brickPos.y
                x_reflect = true;
            } else if(pos.y+this.radius > brickPos.y + brickPos.height) {
                cy = brickPos.y + brickPos.height
                x_reflect = true;
            } else {
                cy = pos.y+this.radius
                x_reflect = true;
            }
            
            if(distance(pos.x+this.radius, pos.y+this.radius, cx, cy) < this.radius) {
                brick_arr[i].state--;
                brick_arr[i].node.style.backgroundColor = ['red', 'yellow', 'green', 'blue', 'purple'][brick_arr[i].state - 1];
                if(brick_arr[i].state == 0){
                    gameArea.removeChild(brick_arr[i].node);
                }
                break;
            }else{
                y_reflect = false;
                x_reflect = false;
            }
        }
    }


    if (y_reflect) {
        this.velocity.x *= randFloat(0.9, 1.1);
        this.velocity.y *= -randFloat(0.9, 1.1);
    }
    if (x_reflect) {
        this.velocity.x *= -randFloat(0.9, 1.1);
        this.velocity.y *= randFloat(0.9, 1.1);
    }

    this.velocity.x = this.velocity.x < -10 ? -10 : this.velocity.x;
    this.velocity.x = this.velocity.x > 10 ? 10 : this.velocity.x;
    this.velocity.y = this.velocity.y < -10 ? -10 : this.velocity.y;
    this.velocity.y = this.velocity.y > 10 ? 10 : this.velocity.y;


    this.node.style.top = Math.max(0, Math.min(height - 2 * this.radius, pos.y + this.velocity.y)) + "px";
    this.node.style.left = Math.max(0, Math.min(width - 2 * this.radius, pos.x + this.velocity.x)) + "px";
}
function distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
}

function Brick() {
    this.state = randInt(1, 5);
    this.node = document.createElement("div");
    this.node.className = "brick";
    this.node.style.height = "20px";
    this.node.style.width = "100px";
    this.node.style.backgroundColor = ['red', 'yellow', 'green', 'blue', 'purple'][this.state - 1];
    this.node.style.top = randInt(100, 500) + "px";
    this.node.style.left = randInt(100, 700) + "px";
}





function randInt(start, end) {
    return Math.floor(Math.random() * (end - start + 1)) + start;
}

function randFloat(start, end) {
    return Math.random() * (end - start + 1) + start;
}





window.addEventListener("load", function () {
  
    startGame();
});
