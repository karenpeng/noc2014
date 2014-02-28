var gravity;
//var up, left, right;
var left, right;
var jumper;
var threshold;
var invisibleSpring;
var counter;
var mash;
var blocks = [];
var wat = 0.01;

//pitchDetector.getAverageVolume(),

function setup() {
  createGraphics(1100, 400);
  smooth();
  gravity = new PVector(0, 12);
  /*
  up = new PVector(0, -140);
  left = new PVector(-50, 0);
  right = new PVector(50, 0);
  */
  mash = new Mash(19, 4, 50, width / 4, height / 4);
  //jumper = new Mash(width / 20);
  invisible = 30;
  invisibleSpring = [];
  counter = 0;
}

function draw() {
  background(220);
  wat += 0.00001;
  if (wat >= 1) {
    wat -= 0.00001;
  }

  mash.renew();
  mash.getCenter();
  mash.show();
  if (!mash.up) {
    mash.addF(gravity);
  }
  goUp();

  //if (frameCount*frameCount % 600 === 0) {
  //if (frameCount % interval === 0) {
  if (Math.random() < wat) {
    blocks.push(new Block(random(60, 200)));
  }

  for (var i = blocks.length - 1; i > -1; i--) {
    blocks[i].die();
    if (blocks[i].isDead) {
      blocks.splice(i, 1);
    } else {
      blocks[i].move();
      blocks[i].show();
      blocks[i].check(mash);
    }
  }
  //mash.addF(right);
  //mash.addF(left);
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
  // strokeWeight(0.2);
  // text("press 'up' 'right' 'left' to move", 10, 20);
}

function mapPitch(input) {
  var pitch;
  if (input < 10 || input > 1000) {
    pitch = 0;
  } else {
    pitch = map(input, 40, 700, 0, 30);
    pitch = constrain(pitch, 0, 30);
  }
  return pitch;
}

function mapVolume(input) {
  var volume;
  if (input < 127 || input > 140) {
    volume = 0;
  } else {
    volume = map(input, 127, 140, 0, 50);
    volume = constrain(volume, 0, 50);
  }
  return volume;
}

function goUp() {
  var h = mapPitch(pitchDetector.pitch);
  //console.log(pitchDetector.pitch, h, mash.up);
  //mash.addF(up);
  //if (mash.center < 4) {
  //h = 0;
  //}
  var up = new PVector(0, -h);
  mash.addF(up);
  if (h > 0) {
    mash.up = true;
  } else {
    mash.up = false;
  }
}

$(window).mousedown(function (event) {
  event.preventDefault();
  mash.b.forEach(function (item) {
    item.clicked(event.pageX, event.pageY);
  });
});

$(window).mouseup(function (event) {
  event.preventDefault();
  mash.b.forEach(function (item) {
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
  if (event.which === 38) {}
});

$(window).keydown(function (event) {
  event.preventDefault();
  if (event.which === 37) {
    // mash.addF(left);
  }
});

$(window).keydown(function (event) {
  event.preventDefault();
  if (event.which === 39) {
    //  mash.addF(right);
  }
});