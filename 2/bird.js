function Bird() {
  this.loc = new PVector(width / 8, height / 2);
  this.vel = new PVector(0, 0);
  this.acc = new PVector(0, 0);
  this.radius = 20;
  this.up = false;
  this.theta = 0;
}

Bird.prototype.move = function () {
  this.loc.add(this.vel);
  this.vel.add(this.acc);
  this.acc.mult(0);
  this.loc.x = constrain(this.loc.x, 0, width);
  this.loc.y = constrain(this.loc.y, 0, height);
  this.vel.x = constrain(this.vel.x, -8, 8);
  this.vel.y = constrain(this.vel.y, -8, 8);
};

Bird.prototype.addForce = function (force) {
  var f = new PVector(force.x, force.y);
  this.acc.add(f);
};

Bird.prototype.rotate = function () {
  if (this.acc.y < 0) {
    this.theta = map(this.acc.y, 0, 10, 0, PI / 3);
  } else {
    this.theta = map(this.acc.y, -10, 0, PI * 5 / 3, 0);
  }
  /*
  this.loc.x = this.loc.x * cos(theta);
  this.loc.y = this.loc.y * sin(theta);
  */
  console.log(this.acc);
};

Bird.prototype.show = function () {
  fill(255);
  noStroke();
  pushMatrix();
  translate(this.loc.x, this.loc.y);
  rotate(this.theta);
  triangle(this.loc.x - sqrt(3) / 2 * this.radius, this.loc.y - this.radius,
    this.loc.x + sqrt(3) * this.radius, this.loc.y,
    this.loc.x - sqrt(3) / 2 * this.radius, this.loc.y + this.radius);

  fill(0, 200, 0);
  //triangle(this.)
  popMatrix();
};