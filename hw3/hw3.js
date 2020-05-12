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
    this.node.style.top = parseInt(this.node.style.top)+this.velocity.y+"px";
    this.node.style.left = parseInt(this.node.style.left)+this.velocity.x+"px";
}


function randInt(start,end){
    return Math.floor(Math.random()*(end - start + 1))+start;
}

const N = 10;
var container = document.getElementById("container");
ball_arr = [];
for(let i = 0;i < N;i++){
    ball_arr[i] = new Ball();
    container.appendChild(ball_arr[i].node);
}

var id = setInterval(frame,200)
function frame(){
    ball_arr.forEach(ball => {
        ball.move();
    });
}
 
 
setTimeout("clearInterval(id)",10000);
