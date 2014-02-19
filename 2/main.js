//$(document).ready(function () {

var bird;
var tubes = [];
var hitCount = 0;

function setup() {
  createGraphics(1000, 600);
  smooth();
  bird = new Bird();
}

function draw() {
  background(0);
  var gravity = new PVector(0, 1);
  if (bird.hitTube && hitCount < 3) {
    fill(255, 150);
    rect(0, 0, width, height);
    hitCount++;
  }
  if (!bird.fly) {
    bird.addForce(gravity);
  }
  bird.rotate();
  bird.move();
  bird.show();

  if (frameCount % 30 === 0 && !bird.hitGround) {
    tubes.push(new Tube());
  }
  /*
  tubes.forEach(function(item){
    item.update();
    item.view();
  });
*/
  for (var i = 0; i < tubes.length; i++) {
    if (tubes[i].loc.x < -tubes[i].w) {
      tubes.splice(i, 1);
    }
    if (!bird.hitGround && !bird.hitTube) {
      tubes[i].update();
    }
    bird.check(tubes[i]);
    tubes[i].view();
  }

  stroke(255);
  strokeWeight(2);
  fill(255);
  textSize(30);
  text(bird.counter, 20, 40);
}

$(window).keydown(function (event) {
  if (event.which === 38 && !bird.hitGroung && !bird.hitTube /*&& bird.loc.y < height*/ ) {
    bird.fly = true;
    var fly = new PVector(0, -12);
    bird.addForce(fly);
  }
});

$(window).keyup(function (event) {
  bird.fly = false;
});

var onPointerDown = function (evt) {
  evt.preventDefault();
  bird.fly = true;
  var fly = new PVector(0, -10);
  bird.addForce(fly);
};

var onPointerUp = function (evt) {
  evt.preventDefault();
  bird.fly = false;
};

var onload = function () {
  window.addEventListener("pointerdown", onPointerDown, false);
  window.addEventListener("pointerup", onPointerUp, false);
};

document.addEventListener("DOMContentLoaded", onload, false);
//});