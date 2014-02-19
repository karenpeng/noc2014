//$(document).ready(function () {

var bird;
var tubes = [];

function setup() {
  createGraphics(1000, 600);
  smooth();
  bird = new Bird();
}

function draw() {
  background(0);
  var gravity = new PVector(0, 0.5);
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
}

$(window).keydown(function (event) {
  if (event.which === 38 && !bird.hitGroung && !bird.hitTube /*&& bird.loc.y < height*/ ) {
    bird.fly = true;
    var fly = new PVector(0, -10.5);
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