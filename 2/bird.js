function Bird() {
  this.loc = new PVector(width / 8, height / 2);
  this.vel = new PVector(0, 0);
  this.acc = new PVector(0, 0);
  this.radius = 20;
}

Bird.prototype.move = function () {
  this.loc.add(this.vel);
  this.vel.add(this.acc);
  this.acc.mult(0);
  this.loc.x = constrain(this.loc.x, 0, width);
  this.loc.y = constrain(this.loc.y, 0, height);
};

Bird.prototype.addForce = function (force) {
  var f = new PVector(force.x, force.y);
  this.acc.add(f);
};

Bird.prototype.rotate = function () {
  var theta = map(this.vel.y, -10, 10, -PI / 3, PI / 3);
  theta = constrain(theta, -PI / 4, PI / 4);
  var xTemp = this.loc.x;
  pushMatrix();
  this.loc.x = this.loc.x * cos(theta) - this.loc.y * sin(theta);
  this.loc.y = xTemp * sin(theta) + this.loc.y * cos(theta);
  popMatrix();
};

Bird.prototype.show = function () {
  fill(255);
  noStroke();
  triangle(this.loc.x - sqrt(3) / 2 * this.radius, this.loc.y - this.radius,
    this.loc.x + sqrt(3) / 2 * this.radius, this.loc.y,
    this.loc.x - sqrt(3) / 2 * this.radius, this.loc.y + this.radius);
};