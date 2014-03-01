var gravity;
var left, right;
var left, right;
var jumper;
var threshold;
var invisibleSpring;
var counter;
var mash;
var blocks = [];
var bullets = [];
var wat = 0.01;
var hit = 0;
var blockCounter = 0;

function setup() {
  createGraphics(1100, 500);
  var windowWidth = window.innerWidth;
  var canvasWidth = 1100;
  var gap = (windowWidth - canvasWidth) / 2;
  var gapToString = gap.toString();
  var cssGap = gapToString + 'px';
  console.log($("canvas"));
  $("canvas").css("margin-left", cssGap);

  smooth();
  gravity = new PVector(0, 10);

  left = new PVector(-50, 0);
  right = new PVector(50, 0);

  mash = new Mash(19, 4, 50, width / 4, height / 4);
  //jumper = new Mash(width / 20);
  invisible = 30;
  invisibleSpring = [];
  counter = 0;
}

function draw() {
  background(255);

  if (hit >= height / 2) {
    console.log("gameover");
    textSize(30);
    text("GAMEOVER", width / 2 - 30, height / 2 - 10);
    noLoop();
  }

  mash.renew();
  mash.show();
  mash.getCenter();
  if (!mash.up) {
    mash.addF(gravity);
  }
  goUp();

  //if (frameCount*frameCount % 600 === 0) {
  //if (frameCount % interval === 0)

  wat += 0.00001;
  if (wat >= 1) {
    wat -= 0.00001;
  }

  if (Math.random() < wat) {
    var result = getText();
    var ww = result.w;
    var hh = random(14, 20);
    var tt = result.t;
    blocks.push(new Block(ww, hh, tt));
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
  for (var j = bullets.length - 1; j > -1; j--) {
    bullets[j].die();
    if (bullets[j].isDead) {
      bullets.splice(j, 1);
    } else {
      bullets[j].update();
      bullets[j].show();
      blocks.forEach(function (item) {
        bullets[j].check(item);
      });
    }
  }
  /*
  for (var j in bullets) {
    bullets[j].update();
    bullets[j].show();
    for (var k in blocks) {
      bullets[j].check(blocks[k]);
    }
  }
  */

  if (mash.hurt) {
    hit += 0.6;
  }
  fill(34);
  noStroke();
  rect(0, 0, width, hit);
  rect(0, height - hit, width, hit);
  rect(0, 0, hit, height);
  rect(width - hit, 0, hit, height);
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
    volume = map(input, 127, 140, 0, 60);
    volume = constrain(volume, 0, 60);
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

function getText() {
  if (blockCounter === 0) {
    $("#content").empty();
    getNYTimesData();
  }
  var topic = '#headLine' + blockCounter;
  var w, t;
  w = $(topic).width();
  t = $(topic).html();
  blockCounter++;
  if (blockCounter > 9) {
    blockCounter = 0;
    //$("#content").empty();
  }
  return {
    w: w,
    t: t
  };
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
    if (!mash.hurt) {
      var r = mapVolume(pitchDetector.volume);
      bullets.push(new Bullet(mash.center.x, mash.center.y, r));
    }
  }
});

$(window).keyup(function (event) {
  event.preventDefault();
  shootCounter = 0;
});

$(window).keydown(function (event) {
  event.preventDefault();
  if (event.which === 37) {
    mash.addF(left);
  }
});

$(window).keydown(function (event) {
  event.preventDefault();
  if (event.which === 39) {
    mash.addF(right);
  }
});