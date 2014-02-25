function Ball(x, y, m) {
  this.loc = new PVector(x, y);
  this.vel = new PVector();
  this.acc = new PVector();
  this.dragOffset = new PVector();
  this.damping = 0.98;
  this.dragging = false;
  this.mass = m;
}
Ball.prototype.update = function () {
  this.vel.add(this.acc);
  this.vel.mult(this.damping);
  this.loc.add(this.vel);
  this.acc.mult(0);
  if (this.loc.x <= this.mass || this.loc.x >= width - this.mass) {
    this.vel.x *= -0.9;
  }
  if (this.loc.y <= this.mass || this.loc.y >= height - this.mass) {
    this.vel.y *= -0.9;
  }
  this.loc.x = constrain(this.loc.x, this.mass, width - this.mass);
  this.loc.y = constrain(this.loc.y, this.mass, height - this.mass);
};

Ball.prototype.applyForce = function (force) {
  var f = force.get();
  f.div(this.mass);
  this.acc.add(f);
};

Ball.prototype.render = function () {
  stroke(0);
  strokeWeight(1);
  fill(175);
  if (this.dragging) {
    fill(50);
  }
  ellipse(this.loc.x, this.loc.y, this.mass * 2, this.mass * 2);
};

Ball.prototype.clicked = function (x, y) {
  var dis = dist(x, y, this.loc.x, this.loc.y);
  if (dis < this.mass * 1.5) {
    this.dragging = true;
    this.dragOffset.x = this.loc.x - x;
    this.dragOffset.y = this.loc.y - y;
  }
};

Ball.prototype.stopDragging = function () {
  this.dragging = false;
};

Ball.prototype.drag = function (x, y) {
  if (this.dragging) {
    this.loc.x = x + this.dragOffset.x;
    this.loc.y = y + this.dragOffset.y;
  }
};

///////////////////////////////////////////////////////////////
function Spring(b1, b2) {
  this.k = 0.2;
  this.b1 = b1;
  if (b2.hasOwnProperty("acc")) {
    console.log("acc");
    this.b2 = b2;
    this.len = PVector.sub(b1.loc, b2.loc);
  } else {
    this.anchor = b2.get();
    this.len = new PVector.sub(b1.loc, b2);
  }
  this.len = this.len.mag();
  this.min = this.len * 0.5;
  this.max = this.len * 1.6;
}

Spring.prototype.connect = function () {
  var f, d, strech;
  if (this.b2) {
    f = PVector.sub(this.b1.loc, this.b2.loc);
    d = f.mag();
    stretch = d - this.len;
    f.normalize();
    f.mult(-1 * this.k * stretch);
    //wow do sth to the ball in spring
    this.b1.applyForce(f);
    f.mult(-1);
    this.b2.applyForce(f);
  } else {
    f = PVector.sub(this.b1.loc, this.anchor);
    d = f.mag();
    stretch = d - this.len;
    f.normalize();
    f.mult(-1 * this.k * stretch);
    this.b1.applyForce(f);
  }
};

Spring.prototype.constrainLength = function () {
  var dir, d;
  if (this.b2) {
    dir = PVector.sub(this.b1.loc, this.b2.loc);
    d = dir.mag();
    if (d < this.min) {
      dir.normalize();
      dir.mult(this.min);
      this.b1.loc = PVector.add(this.b2.loc, dir);
      this.b1.vel.mult(0);
    } else if (d > this.max) {
      dir.normalize();
      dir.mult(this.max);
      this.b1.loc = PVector.add(this.b2.loc, dir);
      this.b1.vel.mult(0);
    }
  } else {
    dir = PVector.sub(this.b1.loc, this.anchor);
    d = dir.mag();
    if (d < this.min) {
      dir.normalize();
      dir.mult(this.min);
      this.b1.loc = PVector.add(this.anchor, dir);
      this.b1.vel.mult(0);
    } else if (d > this.max) {
      dir.normalize();
      dir.mult(this.max);
      this.b1.loc = PVector.add(this.anchor, dir);
      this.b1.vel.mult(0);
    }

  }
};

Spring.prototype.displayLine = function () {
  strokeWeight(1);
  stroke(0);
  if (this.b2) {
    line(this.b1.loc.x, this.b1.loc.y, this.b2.loc.x, this.b2.loc.y);
  } else {
    line(this.b1.loc.x, this.b1.loc.y, this.anchor.x, this.anchor.y);
  }
};

///////////////////////////////////////////////////////////////////
function Mash(number, bones, size) {
  this.b = [];
  this.s = [];
  this.n = number;
  this.skeleton = false;

  for (var j = 0; j < this.n; j++) {
    this.b.push(new Ball(width / 2 + cos(j * PI / this.n * 2) * size, height /
      3 +
      sin(j * PI /
        this.n * 2) * size, 10));
  }

  for (var i = 0; i < this.n - 1; i++) {
    this.s.push(new Spring(this.b[i], this.b[i + 1]));
  }

  for (var k = 0; k < Math.floor(this.n / bones); k++) {
    this.link((k + 1) * bones, this.n);
  }
}

Mash.prototype.link = function (interval, n) {

  for (var j = 0; j < n - interval; j++) {
    this.s.push(new Spring(this.b[j], this.b[j + interval]));
  }
  var m = 0;
  for (var k = n - interval; k < n; k++) {
    this.s.push(new Spring(this.b[k], this.b[m]));
    m++;
  }
};

Mash.prototype.renew = function () {
  var j = 0;
  this.b.forEach(function (item) {
    item.update();
    //if (this.skeleton) {
    item.render();
    //}
    item.drag(mouseX, mouseY);
    text(j, item.loc.x, item.loc.y + 20);
    j++;
  });
  this.s.forEach(function (item) {
    item.connect();
    //if (this.skeleton) {
    item.displayLine();
    //}
    item.constrainLength();
  });
};

Mash.prototype.appF = function (f) {
  this.b.forEach(function (item) {
    var force = new PVector(f.x, f.y);
    item.applyForce(force);
  });
};

Mash.prototype.show = function () {

  strokeWeight(1);
  stroke(0);
  fill(100);
  //noFill();
  beginShape();
  //curveVertex(0, 0);
  for (var k = 0; k < this.n; k++) {
    //curveVertex(this.b[j].loc.x, this.b[j].loc.y);
    vertex(this.b[k].loc.x, this.b[k].loc.y);
  }
  //curveVertex(0, 0);
  endShape(CLOSE);
};

////////////////////////////////////////////////////////////
function Jumper(number) {
  this.bb = [];
  this.ss = [];
  this.nn = number;

  for (var i = 1; i < number - 1; i++) {
    this.bb.push(new Ball(i * Math.floor(width / number), height - 60, 8));
  }
  var anchor1 = new PVector(60, height - 60);
  var anchor2 = new PVector(width - 60, height - 60);

  //this.ss.push(new Spring(this.bb[0], anchor1));
  //this.ss.push(new Spring(this.bb[number - 2], anchor2));

  for (var j = 1; j < number - 2; j++) {
    this.ss.push(new Spring(this.bb[j], this.bb[j + 1]));
  }
}

Jumper.prototype.refresh = function () {
  this.bb.forEach(function (item) {
    item.update();
    item.render();
    item.drag(mouseX, mouseY);
  });
  this.ss.forEach(function (item) {
    item.connect();
    item.displayLine();
    item.constrainLength();
  });
};

Jumper.prototype.check = function (b) {
  var up = new PVector(0, -10);
  for (var i = 0; i < this.b.length; i++) {
    var dis = dist(b.loc.x, b.loc.y, this.b[i].loc.x, this.b[i].loc.y);
    if (dis <= b.mass + this.b.mass) {
      b.applyForce(up);
    }
  }
};