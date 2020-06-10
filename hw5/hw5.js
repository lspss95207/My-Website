window.addEventListener("load", function () {
    var canvas = document.getElementById("clock");
    console.log(canvas);
    var ctx = canvas.getContext("2d");
    var radius = canvas.height / 2;
    ctx.translate(radius, radius);
    radius = radius * 0.90
    setInterval(drawClock, 1000, ctx, radius);
});


function drawClock(ctx, radius) {
    drawFace(ctx, radius);
    drawNumbers(ctx, radius * 0.9);
    drawTicks(ctx, radius * 0.95, 5);
    drawTime(ctx, radius);
}

function drawFace(ctx, radius, color = '#333') {
    var grad;
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
    grad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
    grad.addColorStop(0, '#333');
    grad.addColorStop(0.5, 'white');
    grad.addColorStop(1, '#333');
    ctx.strokeStyle = grad;
    ctx.lineWidth = radius * 0.1;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.01, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
}

function drawNumbers(ctx, radius) {
    var ang;
    ctx.font = radius * 0.15 + "px arial";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    for (let num = 1; num < 13; num++) {
        ang = num * Math.PI / 6;
        ctx.rotate(ang);
        ctx.translate(0, -radius * 0.85);
        ctx.rotate(-ang);
        ctx.fillText(num.toString(), 0, 0);
        ctx.rotate(ang);
        ctx.translate(0, radius * 0.85);
        ctx.rotate(-ang);
    }
}

function drawTicks(ctx, radius, length) {
    for (let i = 0; i < 60; i++) {
        ang = i * Math.PI / 30;
        ctx.beginPath();
        ctx.lineWidth = i % 5 == 0 ? 5 : 3;

        ctx.rotate(ang);
        ctx.translate(0, -radius);
        ctx.moveTo(0, 0);
        ctx.lineTo(0, length);
        ctx.stroke();
        ctx.rotate(-ang);

        ctx.rotate(ang);
        ctx.translate(0, radius);
        ctx.rotate(-ang);
    }
}

function drawTime(ctx, radius) {
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    //hour
    hour = hour % 12;
    hour = (hour * Math.PI / 6) +
        (minute * Math.PI / (6 * 60)) +
        (second * Math.PI / (360 * 60));
    drawHand(ctx, hour, radius * 0.5, radius * 0.04);
    //minute
    minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
    drawHand(ctx, minute, radius * 0.8, radius * 0.04);
    // second
    second = (second * Math.PI / 30);
    drawHand(ctx, second, radius * 0.9, radius * 0.02, 'red');
}

function drawHand(ctx, pos, length, width, color = '#333') {
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.rotate(pos);
    ctx.moveTo(0, 10);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}