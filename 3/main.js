var gravity, jump;
var mash;
var jumper;

function setup() {
  createGraphics(1100, 500);
  smooth();
  gravity = new PVector(0, 2);
  mash = new Mash(31, 4, 100);
  jump = new PVector(0, -140);
  jumper = new Jumper(width / 10);
}

function draw() {
  background(220);

  mash.renew();
  if (!mash.skeleton) {
    mash.show();
  }
  mash.appF(gravity);
  jumper.refresh();

  strokeWeight(0.2);
  text("press 'up' to jump, press 'space' to see the skeleton", 10, height - 30);
}

$(window).mousedown(function (event) {
  event.preventDefault();
  mash.b.forEach(function (item) {
    item.clicked(event.pageX, event.pageY);
  });
  /*
  jumper.bb.forEach(function (item) {
    item.clicked(event.pageX, event.pageY);
  });
*/
});

$(window).mouseup(function (event) {
  event.preventDefault();
  mash.b.forEach(function (item) {
    item.stopDragging();
  });
  /*
  jumper.bb.forEach(function (item) {
    item.stopDragging();
  });
*/
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
  }
});