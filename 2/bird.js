var point = document.getElementById("point");

function Bird() {
  this.loc = new PVector(width / 8, height / 8);
  this.vel = new PVector(0, 0);
  this.acc = new PVector(0, 0);
  this.radius1 = 30;
  this.radius2 = 25;
  this.fly = true;
  this.omega = 0;
  this.theta = 0;
  this.hitGround = false;
  this.hitTube = false;
  this.countScore = 0;
}

Bird.prototype.move = function () {
  if (init) {
    if (!this.hitGround && !this.hitTube) {
      this.loc.add(this.vel);
      this.vel.add(this.acc);
      this.acc.mult(0);
    }
    if (this.hitTube) {
      this.loc.y += this.vel.y;
      this.vel.y += this.acc.y;
      this.acc.mult(0);
    }
  } else {
    this.loc.y += sin(this.theta) * 3;
    this.theta += 0.3;
  };
  this.loc.x = constrain(this.loc.x, this.radius1, width - 150);
  this.loc.y = constrain(this.loc.y, this.radius1, height - this.radius1);
  this.vel.x = constrain(this.vel.x, -10, 10);
  this.vel.y = constrain(this.vel.y, -10, 19);
};

Bird.prototype.addForce = function (force) {
  var f = new PVector(force.x, force.y);
  this.acc.add(f);
};

Bird.prototype.rotate = function () {
  if (!this.hitGround) {
    if (this.vel.y < 0) {
      this.omega++;
    } else {
      this.omega += 0.3;
    }
  } else {
    this.omega += 0.06;
  }
  if (this.vel.y < 0) {
    gama = map(this.vel.y, 0, -8, -PI / 10, -PI / 4);
  } else {
    gama = map(this.vel.y * this.vel.y, 0, 440, -PI / 10, PI / 2);
  }
};

Bird.prototype.show = function () {
  pushMatrix();
  translate(this.loc.x, this.loc.y);
  rotate(gama);
  triangle(0 - sqrt(3) / 2 * this.radius1, 0 - this.radius1,
    0 + sqrt(3) * this.radius1, 0,
    0 - sqrt(3) / 2 * this.radius1, 0 + this.radius1);

  stroke(0);
  strokeWeight(5);
  point(36, 0);

  fill(50, 10, 200);
  noStroke();
  /*
  translate(10);
  theta = map(sin(this.omega), -1, 1, -PI / 8, PI / 8);
  rotate(theta);
  triangle(0 - sqrt(3) / 2 * this.radius - 16, 10 - this.radius,
    0 + sqrt(3) * this.radius - 36, -10,
    0 - sqrt(3) / 2 * this.radius + 8, 0 + this.radius - 12);
  popMatrix();
  */
  triangle(0 - sqrt(3) / 2 * this.radius2 - 20, 20 - this.radius2,
    0 + sqrt(3) * this.radius2 - 30, 0,
    0 - sqrt(3) / 2 * this.radius2 + 8, 40 * sin(this.omega) - 10
  );
  //console.log(this.gama);
  popMatrix();
};

Bird.prototype.check = function (t) {
  if (this.loc.y >= height - this.radius1) {
    this.hitGround = true;
  }
  if (this.loc.x + sqrt(3) * this.radius1 >= t.loc.x && this.loc.x + sqrt(3) *
    this.radius1 <= t.loc.x + t.w) {
    if (this.loc.y <= t.h || this.loc.y >= t.h + t.gap) {
      this.hitTube = true;
    }
    // t.pass = true;
    // this.score++;
  }

  if (this.loc.x - sqrt(3) / 2 * this.radius1 >= t.loc.x && this.loc.x - sqrt(3) /
    2 * this.radius1 <= t.loc.x + t.w) {
    if (this.loc.y + this.radius1 >= t.h + t.gap) {
      this.hitTube = true;
    }
  }

  if (this.loc.x - sqrt(3) / 2 * this.radius1 >= t.loc.x && this.loc.x - sqrt(3) /
    2 * this.radius1 <= t.loc.x + t.w) {
    if (this.loc.y - this.radius1 <= t.h) {
      this.hitTube = true;
    }
  }

  if (!this.hitTube && !t.pass && this.loc.x - sqrt(3) / 2 * this.radius1 > t.loc
    .x + t.w) {
    t.pass = true;
    this.countScore++;
    var point = document.getElementById("point");
    point.play();
    console.log("l");
  }
};

function Tube() {
  this.sick = false;
  this.w = 66;
  this.h = round(random(100, 340));
  this.gap = 260;
  this.loc = new PVector(width + this.w, 0);
  this.vel = new PVector(-10, 0);
  this.pass = false;
  this.theta = 0;
}

Tube.prototype.update = function () {
  if (!this.sick) {
    this.loc.add(this.vel);
  } else {
    this.h += sin(theta) * 30;
    this.theta += 0.5;
  }
};

Tube.prototype.view = function () {
  noStroke();
  fill(0, 200, 10);
  rect(this.loc.x, this.loc.y, this.w, this.h);
  rect(this.loc.x, this.loc.y + this.h + this.gap, this.w, height - this.h);
};