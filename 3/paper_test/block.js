function Block(w) {
  this.w = w;
  this.h = 20;
  this.loc = new PVector(width, random(0, height - this.h));
  this.vel = new PVector(random(-10, -60), 0);
  //this.angle = theta;
  this.isDead = false;
}

Block.prototype.move = function () {
  this.loc.add(this.vel);
  this.loc.y = constrain(this.loc.y, hit, height - this.h - hit);
};

Block.prototype.die = function () {
  if (this.loc.x + this.w < 0) {
    this.isDead = true;
  }
};

Block.prototype.check = function (mash) {
  var that = this;
  mash.b.forEach(function (item) {
    if (item.loc.x + item.mass > that.loc.x && item.loc.x - item.mass + item
      .mass < that
      .loc.x + that.w) {
      if (item.loc.y + item.mass > that.loc.y && item.loc.y - item.mass <
        that.loc.y + that.h) {
        item.applyForce(that.vel);
        mash.hurt = true;
      }
    }
  });
  /*
  for (var i in mash.b) {
    if (mash.b[i].hasOwnProperty("loc")) console.log(i);
  }
*/
};

Block.prototype.show = function () {
  noStroke();
  fill(88, 23, 124);
  rect(this.loc.x, this.loc.y, this.w, this.h);
};

//////////////////////////////////////////////////////////////

function Bullet(x, y, r) {
  this.loc = new PVector(x, y);
  this.vel = new PVector(2, 0);
  this.acc = new PVector(2, 0);
  this.radius = r;
}

Bullet.prototype.update = function () {
  this.loc.add(this.vel);
  this.vel.add(this.acc);
};

Bullet.prototype.show = function () {
  noFill();
  ellipse(this.loc.x, this.loc.y, this.radius * 2, this.radius * 2);
};