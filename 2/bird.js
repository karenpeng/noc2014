function Bird() {
  this.loc = new PVector(width / 8, height / 2);
  this.vel = new PVector(0, 0);
  this.acc = new PVector(0, 0);
  this.radius = 30;
  this.up = false;
  this.gama = 0;
}

Bird.prototype.move = function () {
  this.loc.add(this.vel);
  this.vel.add(this.acc);
  this.acc.mult(0);
  this.loc.x = constrain(this.loc.x, 0, width);
  this.loc.y = constrain(this.loc.y, 0, height);
  this.vel.x = constrain(this.vel.x, -10, 10);
  this.vel.y = constrain(this.vel.y, -10, 19);
};

Bird.prototype.addForce = function (force) {
  var f = new PVector(force.x, force.y);
  this.acc.add(f);
};

Bird.prototype.rotate = function () {
  if (this.vel.y < 0) {
    this.gama = map(this.vel.y, 0, -8, -PI / 10, -PI / 3);
  } else {
    this.gama = map(this.vel.y * this.vel.y, 0, 380, -PI / 10, PI / 2);
  }
};

Bird.prototype.show = function () {
  fill(255);
  noStroke();
  pushMatrix();
  translate(this.loc.x, this.loc.y);
  rotate(this.gama);
  triangle(0 - sqrt(3) / 2 * this.radius, 0 - this.radius,
    0 + sqrt(3) * this.radius, 0,
    0 - sqrt(3) / 2 * this.radius, 0 + this.radius);

  stroke(0, 200, 0);
  strokeWeight(5);
  point(0, 0);
  line(0, 0, this.loc.x, this.loc.y);
  //triangle(this.)
  popMatrix();
  console.log(this.gama);
};