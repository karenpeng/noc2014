var b, s;
var gravity;

function setup() {
  createGraphics(1200, 700);
  smooth();
  b = new Ball(width / 2, 100);
  s = new Spring(width / 2, 10, 100);
  gravity = new PVector(0, 2);
}

function draw() {
  background(255);
  b.applyForce(gravity);
  s.connect(b);
  s.constrainLength(b, 30, 200);
  b.update();
  b.drag(mouseX, mouseY);
  s.displayLine(b);
  b.render();
  s.view();
}

$(window).mousedown(function (e) {
  b.click(e.pageX, e.pageY);
});

$(window).mouseup(function (e) {
  b.stopDragging();
});