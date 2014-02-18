var bird;

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

}

$(window).keydown(function (event) {
  if (event.which === 38) {
    bird.fly = true;
    var fly = new PVector(0, -10);
    bird.addForce(fly);
  }
});

$(window).keyup(function (event) {
  bird.fly = false;
});

function touchStarted() {
  bird.fly = true;
  var fly = new PVector(0, -10);
  bird.addForce(fly);
}

function touchEnded() {
  bird.fly = false;
}