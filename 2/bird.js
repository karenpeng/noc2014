function Bird() {
  this.loc = new PVector(width / 2, height / 2);
  this.vel = new PVector(0, 0);
  this.acc = new PVector(0, 0);
}

Bird.prototype.move = function () {
  this.loc.add(this.vel);
  this.vel.add(this.acc);
  this.acc.mult(0);
};

Bird.prototype.addForce = function (force) {
  var f = new PVector(force.x, force.y);
  this.acc.add(f);
};

Bird.prototype.rotate = function () {
  var theta;
  if (this.vel.y < 0) {
    theta = PI / 6;
  } else {
    theta = -PI / 6;
  }
  var xTemp = this.loc.x;
  pushMatrix();
  this.loc.x = this.loc.x * cos(theta) - this.loc.y * sin(theta);
  this.loc.y = xTemp * sin(theta) + this.loc.y * cos（ theta);
popMatrix();
}