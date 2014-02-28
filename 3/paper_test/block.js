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
};

Block.prototype.die = function () {
  if (this.loc.x + this.w < 0) {
    this.isDead = true;
  }
};

Block.prototype.check = function (mash) {
  mash.b.forEach(function (item) {
    if (item.loc.x + item.mass >= this.loc.x && item.loc.x - item.mass + item
      .mass < this
      .loc.x + this.w) {
      if (item.loc.y + item.mass >= this.loc.y && item.loc.y - item.mass <=
        this.loc.y + this.h) {
        item.applyForce(this.vel);
      }
    }
  });
};

Block.prototype.show = function () {
  fill(88, 23, 124);
  rect(this.loc.x, this.loc.y, this.w, this.h);
};