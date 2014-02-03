function Walker(x, y) {
		this.loc = new PVector(x, y);
		this.noff = new PVector(random(10), random(10));
		this.n = new Perlin();
		//this.c = random(30, 250);
}

Walker.prototype.walk = function (x, y) {
		//this.loc.x = map(this.n.noise(this.noff.x), 0, 1, 0, width);
		//this.loc.y = map(this.n.noise(this.noff.y), 0, 1, 0, height);

		var lerpX = map(this.n.noise(this.noff.x, this.noff.x), 0, 1, -10, 10);
		var lerpY = map(this.n.noise(this.noff.y, this.noff.y), 0, 1, -10, 10);
		/*
		this.loc.x += lerpX;
		this.loc.y += lerpY;
		*/

		var leasing = new PVector(lerpX, lerpY);
		this.loc.add(leasing);

		this.noff.add(0.01, 0.01, 0.00);
		this.loc.x = constrain(this.loc.x, 0, width);
		this.loc.y = constrain(this.loc.y, 0, height);
};

Walker.prototype.show = function () {
		noStroke();
		//fill(this.c, 255, 255);
		fill(0);
		ellipse(this.loc.x, this.loc.y, 3, 3);
};