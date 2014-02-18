var bird;

function setup() {
  createGraphics(1200, 600);
  smooth();
  bird = new Bird();
}

function draw() {
  background(0);
  var gravity = new PVector(0, 0.4);
  bird.addForce(gravity);
  bird.move();
  //bird.rotate();
  bird.show();

}

$(window).keydown(function (event) {
  if (event.which === 38) {
    console.log("mouse");
    var fly = new PVector(0, -9);
    bird.addForce(fly);
  }
});