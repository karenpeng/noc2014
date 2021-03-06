function Wind() {
  this.radius = random(40, 100);
  this.loc = new PVector(width + this.radius, random(this.radius, height - this
    .radius));
  //this.tar = new PVector(random(width, width + 100), random(0, height));
  this.vel = new PVector(-10, 0);
  this.theta = random(0, PI * 2);
  this.increment = random(-0.2, 0.2);
  this.tar = new PVector(this.loc.x + cos(this.theta) * this.radius, this.loc.y +
    sin(this.theta) * this.radius);
  this.change = false;
}

Wind.prototype.move = function () {
  //var copy = this.loc.get();
  //var twoPoints = copy.sub(this.tar);
  //var dis = twoPoints.mag();
  this.loc.add(this.vel);
  if (this.change) {
    this.theta += this.increment;
  }
  this.tar.x = this.loc.x + cos(this.theta) * this.radius;
  this.tar.y = this.loc.y + sin(this.theta) * this.radius;
};

Wind.prototype.blow = function () {
  var copy = this.tar.get();
  var f = copy.sub(this.loc);
  //var length = f.mag();
  //var UnitF = f.normalize();
  var strength = map(f.mag(), 0, width, 0.001, 0);
  strength = constrain(strength, 0, 0.001);
  //return UnitF.mult(length).mult(strength);
  return f.mult(strength);
};

Wind.prototype.view = function () {
  noFill();
  stroke(250, 200);
  ellipse(this.loc.x, this.loc.y, this.radius * 2, this.radius * 2);
  line(this.loc.x, this.loc.y, this.tar.x, this.tar.y);
  /*
  strokeWeight(5);
  point(this.loc.x, this.loc.y);
  point(this.tar.x, this.tar.y);
  */
};

function Snow() {
  this.radius = 2;
  this.loc = new PVector(random(-200, width + 400), -2);
  this.vel = new PVector(0, 0.1);
  this.acc = new PVector(0, 0);
  this.count = 0;
  this.still = false;
  //this.friction = new PVector();
}

Snow.prototype.renew = function () {
  if (init && this.count < 1) {
    this.vel.x -= 6;
    this.count++;
  }
  if (this.still && this.count < 2) {
    this.vel.x += 6;
    this.count++;
  }
  this.loc.add(this.vel);
  //this.friction = this.acc.get();
  //this.friction.mult(0.2);
  //this.vel.add(this.friction);
  this.vel.add(this.acc);
  this.acc.mult(0);
};
/*
Snow.prototype.reset = function () {
  this.loc = new PVector(random(width - 1000, width + 4000), random(-2, -200));
  this.vel = new PVector(-6, 0);
  this.acc = new PVector(0, 0);
};
*/
Snow.prototype.addF = function (force) {
  var f = new PVector(force.x, force.y);
  this.acc.add(f);
};

Snow.prototype.render = function () {
  noStroke();
  fill(255);
  ellipse(this.loc.x, this.loc.y, this.radius * 2, this.radius * 2);
};