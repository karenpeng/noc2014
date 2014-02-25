var gravity, up;
var mash;
var jumper;
var threshold;
var invisibleSpring;

function setup() {
  createGraphics(1100, 660);
  smooth();
  gravity = new PVector(0, 2);
  up = new PVector(0, -140);
  mash = new Mash(19, 4, 100);
  jumper = new Mash(width / 20);
  invisible = 30;
  invisibleSpring = [];
}

function draw() {
  background(220);

  mash.renew();
  if (!mash.skeleton) {
    mash.show();
  }
  mash.addF(gravity);
  jumper.renew();
  //jumper.addF(gravity);

  mash.b.forEach(function (item) {
    jumper.b.forEach(function (key) {
      var sub = PVector.sub(item.loc, key.loc);
      var dis = sub.mag();
      if (!item.check && !key.check && dis < invisible && abs(item.loc.x -
        key.loc.x) < 10) {
        invisibleSpring.push(new Spring(item, key));
        item.check = true;
        key.check = true;
      }
    });
  });

  for (var i = invisibleSpring.length; i > 0; i--) {

    var sub = PVector.sub(invisibleSpring[i].b1, invisibleSpring[i].b2);
    var dis = sub.mag();
    if (dis > threshold) {
      invisibleSpring.splice(i, 1);
    }
    //element.connect();
    invisibleSpring[i].displayLine();
    //element.constrainLength();
  }

  strokeWeight(0.2);
  text("press 'up' to jump, press 'space' to see the skeleton", 10, 20);
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
    mash.addF(up);
  }
});