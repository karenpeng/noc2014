//$(document).ready(function () {

var bird;
var tubes = [];
var winds = [];
var snows = [];
var hitCount = 0;
var dieCount = 0;
var gravity;
var wat;
var wing = document.getElementById("wing");
var hit = document.getElementById("hit");
var die = document.getElementById("die");
var wind = document.getElementById("wind");
var init = false;
var lost = false;
var again = false;
var counter;
var ok;

if (!init) {
  $(".button").html("Play!");
}

$(".button").click(function () {
  countDown();
  if (lost) {
    again = true;
    reStart();
  }
});

$(".button").hover(function () {
  $(this).addClass("clickAble");
});

function setup() {
  createGraphics(1200, 700);
  smooth();
  wat = 0;
  counter = 0;
  bird = new Bird();
  gravity = new PVector(0, 1.5);
  snowFriction = new PVector(0, -1.1);
  ok = 0;
}

function countDown() {
  $(".button").addClass("unClickAble");
  $(".button").html(3);
  setTimeout(
    function () {
      $(".button").html(2);
    }, 1000);
  setTimeout(
    function () {
      $(".button").html(1);
    }, 2000);
  setTimeout(
    function () {
      init = true;
      $(".button").hide();
    }, 3000);
}

function reStart() {
  bird = null;
  snows = [];
  winds = [];
  tubes = [];
  wat = 0;
  counter = 0;
  hitCount = 0;
  dieCount = 0;
  init = false;
  lost = false;
  again = false;
  ok = 0;
  bird = new Bird();
}

function draw() {
  if (lost && ok < 1) {
    $(".button").removeClass("unClickAble");
    $(".button").html("Try Again");
    $(".button").show();
    ok++;
  }

  background(0);
  if (init) {
    wat += 0.00001;
    if (wat >= 1) {
      wat--;
    }
    counter++;
  }
  if (bird.hitTube && hitCount < 2) {
    fill(255, 150);
    rect(0, 0, width, height);
    hit.play();
    hitCount++;
  }
  if (bird.hitGround && dieCount < 2) {
    die.play();
    dieCount++;
    lost = true;
  }

  if (!bird.fly) {
    bird.addForce(gravity);
  }
  bird.rotate();
  bird.move();
  bird.show();

  if (!bird.hitGround && !bird.hitTube) {
    if (counter !== 0 && counter % 30 === 0) {
      tubes.push(new Tube());
    }
    if (Math.random() < wat) {
      winds.push(new Wind());
      wind.play();
    }
  }
  /*
  tubes.forEach(function(item){
    item.update();
    item.view();
  });
*/
  snows.push(new Snow());
  for (var n = 0; n < snows.length; n++) {
    if (snows[n].loc.y >= height || snows[n].loc.x <= -200 || snows[n].loc.x >
      width + 400 || snows[n].loc.y < -2
    ) {
      snows.splice(n, 1);
      //snows[n].reset();
    }
    if (bird.hitGround || bird.hitTube) {
      snows[n].still = true;
    }
    snows[n].renew();
    snows[n].addF(gravity);
    snows[n].addF(snowFriction);
    snows[n].render();
  }

  for (var j = 0; j < tubes.length; j++) {
    if (tubes[j].loc.x < -tubes[j].w) {
      tubes.splice(j, 1);
    }
    if (init && !bird.hitGround && !bird.hitTube) {
      tubes[j].update();
    }
    bird.check(tubes[j]);
    tubes[j].view();
    if (!tubes[j].pass) {
      if (bird.countScore >= 50) {
        tubes[j].sick = true;
      }
      if (bird.countScore >= 56) {
        tubes[j].scale = 60;
        tubes[j].increment = 0.1;
      }
      if (bird.countScore >= 62) {
        tubes[j].scale = 80;
        tubes[j].increment = 0.2;
      }
    }
  }

  for (var i = 0; i < winds.length; i++) {
    if (init && !bird.hitGround && !bird.hitTube) {
      winds[i].move();
    }

    snows.forEach(function (item) {
      item.addF(winds[i].blow());
    });

    bird.addForce(winds[i].blow());

    winds[i].view();
    if (bird.countScore >= 25) {
      winds[i].change = Math.random() > 0.6 ? true : false;
    }

    if (winds[i].loc.x < -winds[i].radius) {
      winds.splice(i, 1);
    }

  }

  stroke(255);
  strokeWeight(2);
  fill(255);
  textSize(30);
  text(bird.countScore, 20, 40);
}

$(window).keydown(function (event) {
  if (init && !bird.hitGround && !bird.hitTube /*&& bird.loc.y < height*/ ) {
    if (event.which === 38) {
      bird.fly = true;
      var fly = new PVector(0, -18);
      bird.addForce(fly);
      //wing.pause();
      wing.play();
    }
    if (event.which === 37) {
      bird.loc.x -= 10;
    }
    if (event.which === 39) {
      bird.loc.x += 10;
    }
  }
});

$(window).keyup(function (event) {
  bird.fly = false;
  //wing.pause();
});

$(window).mousedown(function () {
  if (init && !bird.hitGround && !bird.hitTube /*&& bird.loc.y < height*/ ) {
    bird.fly = true;
    var fly = new PVector(0, -18);
    bird.addForce(fly);
    //wing.pause();
    wing.play();
  }
});

$(window).mouseup(function () {
  bird.fly = false;
});

/*
var onPointerDown = function (evt) {
  evt.preventDefault();
  bird.fly = true;
  var fly = new PVector(0, -10);
  bird.addForce(fly);
};

var onPointerUp = function (evt) {
  evt.preventDefault();
  bird.fly = false;
};

var onload = function () {
  window.addEventListener("pointerdown", onPointerDown, false);
  window.addEventListener("pointerup", onPointerUp, false);
};

document.addEventListener("DOMContentLoaded", onload, false);
*/
//});