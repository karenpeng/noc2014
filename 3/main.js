var b, s;
var gravity;
var mash;
var jump;
var jumper;

function setup() {
  createGraphics(1100, 500);
  smooth();
  //b = new Ball(width / 2, 100);
  //s = new Spring(width / 2, 10, 100);
  gravity = new PVector(0, 2);
  mash = new Mash(31, 4);
  jump = new PVector(0, -160);
  jumper = new Jumper(width / 10);
}

function draw() {
  background(220);
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
  if (!mash.skeleton) {
    mash.show();
  }
  mash.appF(gravity);
  jumper.refresh();

  strokeWeight(0.2);
  text("press 'up' to jump, press 'space' to see the skeleton", 10, height - 30);
  text("no libraries are used", 10, height - 10);
}

$(window).mousedown(function (event) {
  event.preventDefault();
  mash.b.forEach(function (item) {
    item.clicked(event.pageX, event.pageY);
  });
  jumper.b.forEach(function (item) {
    item.clicked(event.pageX, event.pageY);
  });
});

$(window).mouseup(function (event) {
  event.preventDefault();
  mash.b.forEach(function (item) {
    item.stopDragging();
  });
  jumper.b.forEach(function (item) {
    item.stopDragging();
  });
});

$(window).keydown(function (event) {
  event.preventDefault();
  if (event.which === 32) {
    mash.skeleton = !mash.skeleton;
  }
});

$(window).keydown(function (event) {
  event.preventDefault();
  if (event.which === 38) {
    mash.appF(jump);
    console.log("jump!!");
  }
});