function Water() {

}

function Fish() {
  this.radius = 8;
  this.pos = new PVector(width + this.radius, 0);
  this.vel = new PVector(0, 0);
  this.acc = new PVector(0, 0);
}

Fish.prototype.renew = function () {
  this.pos.add(this.vel);
  this.vel.add(this.acc);
  this.acc.mult(0);
};

Fish.prototype.addF = function (force) {
  var f = new PVector(force.x, force.y);
  this.acc.add(f);
};

Fish.prototype.render = function () {
  noStroke();
  fill(255);
  ellipse(this.loc.x, this.loc.y, this.radius * 2, this.radius * 2);
};