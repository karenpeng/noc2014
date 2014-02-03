class Hold {
  PVector loc;
  //PVector vol;
  //PVector acc;
  PVector noff;
  int clock;
  Hold(float _x, float _y) {
    loc = new PVector(_x, _y);
    //vol = new PVector(0,0);
    //acc = new PVector(0,0);
    noff = new PVector(random(1000), random(1000));
    clock = 0;
  }

  void walk() {
    loc.x = map(noise(noff.x), 0, 1, 0, width);
    loc.y = map(noise(noff.y), 0, 1, 0, height);
    //acc.x = map(noise(noff.x), 0, 1, -1, 1);
    //acc.y = map(noise(noff.y), 0, 1, -1, 1);
    //acc.mult(0.1);
    
    noff.add(0.01, 0.01, 0.00);
    
    //vol.add(acc);
    //loc.add(vol);

    loc.x = constrain(loc.x, 0, width);
    loc.y = constrain(loc.y, 0, height);
    clock++;
  }

  void play() {
    float location = loc.x+loc.y;
    float frequency = map(location, 0, width+height, 65, 1000);
    if (clock % interval == 0) {
      out.playNote( frequency );
    }
  }

  void render() {
    noStroke();
    fill(255);
    ellipse(loc.x, loc.y, 3, 3);
  }
}

