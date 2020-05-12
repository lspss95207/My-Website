const height = 600;
const width = 800;

var gameArea = document.getElementById("gameArea");
gameArea.style.height = height+"px";
gameArea.style.width = width+"px";


function Ball(){
    this.radius = randInt(5,20);
    this.velocity = {x: randInt(-5,5),y: randInt(-5,5)}
    this.node = document.createElement("div");
    this.node.className = "ball";
    this.node.style.height = 2*this.radius + "px";
    this.node.style.width = 2*this.radius + "px";
    this.node.style.backgroundColor = `rgb(${randInt(0,255)},${randInt(0,255)},${randInt(0,255)})`;
    this.node.style.top = randInt(100,500) + "px";
    this.node.style.left = randInt(100,700) + "px";
}
Ball.prototype.move = function(){
    let pos = {x:parseInt(this.node.style.left),y:parseInt(this.node.style.top)};
    if(pos.x + 2*this.radius >= width || pos.x <= 0){
        this.velocity.x *= -randInt(0.8,1.2);
    }
    if(pos.y + 2*this.radius >= height || pos.y <= 0){
        this.velocity.y *= -randInt(0.8,1.2);    
    }

    this.node.style.top = Math.max(0,Math.min(height-2*this.radius,pos.y+this.velocity.y))+"px";
    this.node.style.left = Math.max(0,Math.min(width-2*this.radius,pos.x+this.velocity.x))+"px";
}


function randInt(start,end){
    return Math.floor(Math.random()*(end - start + 1))+start;
}

const N = 10;
const fps = 60;


ball_arr = [];
for(let i = 0;i < N;i++){
    ball_arr[i] = new Ball();
    gameArea.appendChild(ball_arr[i].node);
}

var id = setInterval(frame,1000/fps)
function frame(){
    ball_arr.forEach(ball => {
        ball.move();
    });
}
 
 
setTimeout(()=>clearInterval(id),10000);
