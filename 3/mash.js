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
    this.vel.x *= -1.2;
  }
  if (this.loc.y <= this.mass || this.loc.y >= height - this.mass) {
    this.vel.y *= -1.2;
  }
  this.loc.x = constrain(this.loc.x, this.mass, width - this.mass);
  this.loc.y = constrain(this.loc.y, this.mass, height - this.mass);
};

Ball.prototype.applyForce = function (force) {
  //var f = new PVector(force.x, force.y);
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
    //this.loc.x = x;
    //this.loc.y = y;
  }
};

///////////////////////////////////////////////////////////////
function Spring(b1, b2, l, minlen, maxlen) {
  this.anchor = new PVector();
  this.len = l;
  this.k = 0.2;
  this.b1 = b1;
  this.b2 = b2;
  this.min = minlen;
  this.max = maxlen;
}

Spring.prototype.connect = function () {
  var f = PVector.sub(this.b1.loc, this.b2.loc);
  var d = f.mag();
  var stretch = d - this.len;
  f.normalize();
  f.mult(-1 * this.k * stretch);
  //wow do sth to the ball in spring
  this.b1.applyForce(f);
  f.mult(-1);
  this.b2.applyForce(f);
};

Spring.prototype.constrainLength = function () {
  var dir = PVector.sub(this.b1.loc, this.b2.loc);
  var d = dir.mag();
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
};

Spring.prototype.displayLine = function () {
  strokeWeight(1);
  stroke(0);
  line(this.b1.loc.x, this.b1.loc.y, this.b2.loc.x, this.b2.loc.y);
};

///////////////////////////////////////////////////////////////////
function Mash(number, bones) {
  //this.radius = 100;
  this.b = [];
  this.s = [];
  this.n = number;
  this.skeleton = false;

  for (var j = 0; j < this.n; j++) {
    this.b.push(new Ball(width / 2 + cos(j * PI / this.n * 2) * 100, height / 3 +
      sin(j * PI /
        this.n * 2) * 100, 10));
  }

  for (var i = 0; i < this.n - 1; i++) {
    this.s.push(new Spring(this.b[i], this.b[i + 1], 8, 3, 30));
  }

  for (var k = 0; k < Math.floor(this.n / bones); k++) {
    this.link((k + 1) * bones, this.n);
  }
}

Mash.prototype.link = function (interval, n) {

  for (var j = 0; j < n - interval; j++) {
    var dis1 = dist(this.b[j].loc.x, this.b[j].loc.y, this.b[j + interval].loc.x,
      this.b[j + interval].loc.y);
    this.s.push(new Spring(this.b[j], this.b[j + interval], dis1, 40, 220));
  }
  var m = 0;
  for (var k = n - interval; k < n; k++) {
    var dis2 = dist(this.b[k].loc.x, this.b[k].loc.y, this.b[m].loc.x, this.b[m]
      .loc.y);
    this.s.push(new Spring(this.b[k], this.b[m], dis2, 40, 220));
    m++;
  }
};

Mash.prototype.renew = function () {
  var j = 0;
  this.b.forEach(function (item) {
    //var tar = new PVector(cos(j * PI /this.n * 2) * 2, sin(j * PI /this.n * 2) * 2);
    //var f = PVector.add(center, tar);
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
  this.b = [];
  this.s = [];
  this.n = number;

  for (var i = 0; i < number; i++) {
    this.b.push(new Ball(i * width / number, height - 60, 8));
  }
  for (var j = 0; j < number - 1; j++) {
    var l = Math.floor(width / number);
    this.s.push(new Spring(this.b[j], this.b[j + 1], l));
  }

}

Jumper.prototype.refresh = function () {
  this.b[0].loc.x = 0;
  this.b[0].loc.y = height - 60;
  this.b[Math.floor(this.n - 1)].loc.x = (this.n - 1) * 60;
  this.b[Math.floor(this.n - 1)].loc.y = height - 60;
  this.b.forEach(function (item) {
    item.update();
    item.render();
    item.drag(mouseX, mouseY);
  });
  this.s.forEach(function (item) {
    item.connect();
    item.displayLine();
    item.constrainLength(10, 60);
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