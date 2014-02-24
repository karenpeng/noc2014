var b, s;
var gravity;
var mash;

function setup() {
  createGraphics(1200, 700);
  smooth();
  //b = new Ball(width / 2, 100);
  //s = new Spring(width / 2, 10, 100);
  //gravity = new PVector(0, 2);
  mash = new Mash(32);
}

function draw() {
  background(255);
  /*
  b.applyForce(gravity);
  s.connect(b);
  s.constrainLength(b, 30, 200);
  b.update();
  b.drag(e.pageX, e.pageY);
  s.displayLine(b);
  b.render();
  s.view();
  */
  mash.renew();
  //=mash.show();
}

$(window).mousedown(function (e) {
  event.preventDefault();
  mash.b.forEach(function (item) {
    item.clicked(e.pageX, e.pageY);
  });
});

$(window).mouseup(function (e) {
  event.preventDefault();
  mash.b.forEach(function (item) {
    item.stopDragging();
  });
});