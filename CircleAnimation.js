// CircleAnimation.js

/* possible additions:  add speed button for circle growth: make it unobtrusive element */

var stop = true;

// start-stop button
var button = document.querySelector('#startStop');

function start() {
  stop = !stop;
  loop();

  if (stop) {
    button.textContent = 'Start';
  }
  else {
    button.textContent = 'Stop';
  }
}

button.addEventListener('click', start); // start/stop with button click


var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');


var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

// get random value between min and max inclusive
function random(min, max) {
  var num = Math.floor(Math.random() * (max - min + 1) ) + min;
  return num;
}


// Define Circle constructor
function Circle(x, y, rad, color) {
  this.posX = x;
  this.posY = y;
  this.radius = rad;
  this.color = color;
}

// draw a circle object
Circle.prototype.drawCircle = function() {
  ctx.beginPath();
  ctx.fillStyle = this.color; // inner circle
  ctx.strokeStyle = '#000000'; // outline
  ctx.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);
  ctx.fill();
  ctx.stroke();
}

// increase circle's radius
Circle.prototype.growCircle = function() {
  this.radius++;
}

var circles = []; // array of circle objects


function loop() {

  if (stop) { // exit loop
    return;
  }

  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, width, height);

  while (circles.length < 50) {
    var circle = new Circle(
      random(0, width),
      random(0, height),
      random(5, 65),
      'rgba(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ',' + '0.4)'
    );
    circles.push(circle);
  }

  for (var i = 0; i < circles.length; i++) {
    if (circles[i].radius > 70) { // if circle grows past 70, reset.
      circles[i].posX = random(0, width);
      circles[i].posY = random(0, height);
      circles[i].radius = random(5, 65);
      circles[i].color = 'rgba(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ',' + '0.4)';
    }
  }

  for (var i = 0; i < circles.length; i++) {
    circles[i].drawCircle();
    circles[i].growCircle();
  }

  requestAnimationFrame(loop);
}


