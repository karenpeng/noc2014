var gravity, up, left, right;
var jumper;
var threshold;
var invisibleSpring;
var counter;
var mash = [];

function setup() {
  createGraphics(1100, 660);
  smooth();
  gravity = new PVector(0, 2);
  up = new PVector(0, -140);
  left = new PVector(-50, 0);
  right = new PVector(50, 0);
  mash.push(new Mash(19, 4, 50, width / 4, height / 4));
  mash.push(new Mash(19, 4, 50, width * 3 / 4, height / 3));
  //jumper = new Mash(width / 20);
  invisible = 30;
  invisibleSpring = [];
  counter = 0;
}

function draw() {
  background(220);
  mash.forEach(function (item) {
    item.renew();
    // if (!mash.skeleton) {
    //   item.show();
    // }
    item.addF(gravity);
    //item.addF(left);
  });
  //jumper.renew();
  /*
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
*/
  /*
  for (var j = 0; j < mash.b.length; j++) {
    for (var k = 0; k < jumper.b.length; k++) {
      var sub = PVector.sub(mash.b[j].loc, jumper.b[k].loc);
      var dis = sub.mag();
      if (!mash.b[j].check && !jumper.b[k].check && dis <= invisible && abs(
        mash
        .b[j].loc.x -
        jumper.b[k].loc.x) < 10) {
        invisibleSpring.push(new Spring(mash.b[j], jumper.b[k]));
        mash.b[j].check = true;
        jumper.b[k].check = true;
        invisibleSpring[counter].b1Num = j;
        invisibleSpring[counter].b2Num = k;
        invisibleSpring[counter].max *= 0.8;
        invisibleSpring[counter].min *= 1.2;
        counter++;
      }
    }
  }
  */
  /*
  //for (var i = invisibleSpring.length - 1; i > -1; i--) {
  for (var i = 0; i < invisibleSpring.length; i++) {
    invisibleSpring[i].connect();
    invisibleSpring[i].displayLine();
    invisibleSpring[i].constrainLength();
    var sub1 = PVector.sub(invisibleSpring[i].b1.loc, invisibleSpring[i].b2.loc);
    var dis1 = sub1.mag();
    if (dis1 > invisible) {
      mash.b[invisibleSpring[i].b1Num].check = false;
      jumper.b[invisibleSpring[i].b2Num].check = false;
      invisibleSpring.splice(i, 1);
    }
  }
*/
  strokeWeight(0.2);
  text("press 'up' 'right' 'left' to move", 10, 20);
}

$(window).mousedown(function (event) {
  event.preventDefault();
  mash[0].b.forEach(function (item) {
    item.clicked(event.pageX, event.pageY);
  });
});

$(window).mouseup(function (event) {
  event.preventDefault();
  mash[0].b.forEach(function (item) {
    item.stopDragging();
  });
});

$(window).keydown(function (event) {
  event.preventDefault();
  if (event.which === 32) {
    mash.forEach(function (item) {
      item.skeleton = !item.skeleton;
    });
  }
});

$(window).keydown(function (event) {
  event.preventDefault();
  if (event.which === 38) {
    mash[0].addF(up);
  }
});

$(window).keydown(function (event) {
  event.preventDefault();
  if (event.which === 37) {
    mash[0].addF(left);
  }
});

$(window).keydown(function (event) {
  event.preventDefault();
  if (event.which === 39) {
    mash[0].addF(right);
  }
});