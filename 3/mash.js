function Ball(x, y, m) {
  this.loc = new PVector(x, y);
  this.vel = new PVector();
  this.acc = new PVector();
  this.dragOffset = new PVector();
  this.damping = 0.96;
  this.dragging = false;
  this.mass = m;
}
Ball.prototype.update = function () {
  this.vel.add(this.acc);
  this.vel.mult(this.damping);
  this.loc.add(this.vel);
  this.acc.mult(0);
};

Ball.prototype.applyForce = function (force) {
  //var f = new PVector(force.x, force.y);
  var f = force.get();
  f.div(this.mass);
  this.acc.add(f);
};

Ball.prototype.render = function () {
  stroke(0);
  strokeWeight(2);
  fill(175);
  if (this.dragging) {
    fill(50);
  }
  ellipse(this.loc.x, this.loc.y, this.mass * 2, this.mass * 2);
};

Ball.prototype.clicked = function (x, y) {
  var dis = dist(x, y, this.loc.x, this.loc.y);
  if (dis < this.mass) {
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
function Spring(x, y, l) {
  this.anchor = new PVector(x, y);
  this.len = l;
  this.k = 0.6;
}

Spring.prototype.connect = function (b) {
  var f = PVector.sub(b.loc, this.anchor);
  var d = f.mag();
  var stretch = d - this.len;
  f.normalize();
  f.mult(-1 * this.k * stretch);
  //wow do sth to the ball in spring
  b.applyForce(f);
};

Spring.prototype.constrainLength = function (b, minlen, maxlen) {
  var dir = PVector.sub(b.loc, this.anchor);
  var d = dir.mag();
  if (d < minlen) {
    dir.normalize();
    dir.mult(minlen);
    b.loc = PVector.add(this.anchor, dir);
    b.vel.mult(0);
  } else if (d > maxlen) {
    dir.normalize();
    dir.mult(maxlen);
    b.loc = PVector.add(this.anchor, dir);
    b.vel.mult(0);
  }
};

Spring.prototype.view = function () {
  stroke(0);
  fill(175);
  strokeWeight(2);
  rectMode(CENTER);
  rect(this.anchor.x, this.anchor.y, 10, 10);
};

Spring.prototype.displayLine = function (b) {
  strokeWeight(2);
  stroke(0);
  line(b.loc.x, b.loc.y, this.anchor.x, this.anchor.y);
};

///////////////////////////////////////////////////////////////////
function Mash(number) {
  //this.radius = 100;
  this.b = [];
  this.s = [];
  this.n = number;
  /*
  for (var theta = 0; theta < 2 * PI; theta += PI / 3) {
    this.b.push(new Ball(width / 2 + cos(theta) * this.radius, height / 2 + sin(
      theta) * this.radius));
    this.s.push(new Spring());
  }
  */
  for (var i = 0; i < this.n; i++) {
    this.b.push(new Ball(width / 2, height / 2, 10));
    this.s.push(new Spring(width / 2, height / 2, 100));
  }
}

Mash.prototype.update = function () {
  for (var j = 0; j < this.n; j++) {
    //var center = new PVector(width / 2, height / 2);
    var tar = new PVector(cos(j * PI / this.n * 2) * 2, sin(j * PI /
      this.n * 2) * 2);
    //var f = PVector.add(center, tar);
    this.b[j].applyForce(tar);
    this.s[j].connect(this.b[j]);
    this.s[j].constrainLength(this.b[j], 30, 200);
    this.b[j].update();
    this.b[j].drag(mouseX, mouseY);
  }
};

Mash.prototype.show = function () {
  for (var i = 0; i < this.n; i++) {
    this.s[i].displayLine(this.b[i]);
    this.b[i].render();
    this.s[i].view();
  }
  strokeWeight(3);
  stroke(0);
  //fill(100);
  noFill();
  beginShape();
  //curveVertex(0, 0);
  for (var j = 0; j < this.n; j++) {
    //curveVertex(this.b[j].loc.x, this.b[j].loc.y);
    vertex(this.b[j].loc.x, this.b[j].loc.y);
  }
  //curveVertex(0, 0);
  endShape(CLOSE);
};