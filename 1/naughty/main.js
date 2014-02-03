  var walkers = [];

  function setup() {
    createGraphics(1300, 660);
    //colorMode(HSB);
    frameRate(24);
    background(255);
    for (var i = 0; i < 10; i++) {
      walkers.push(new Walker(width / 2, height / 2));
    }
  }

  function draw() {
    //background(255);
    fill(255, 10);
    rect(0, 0, width, height);

    if (frameCount % 480 === 0) {
      for (var j = 0; j < 10; j++) {
        walkers.push(new Walker(width / 2, height / 2));
      }
    }

    walkers.forEach(function (item) {
      item.walk();
      item.show();
    });
    if (walkers.length > 19) {
      walkers.splice(0, 10);
    }
  }