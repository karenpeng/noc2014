import controlP5.*;
ControlP5 GUI;

import ddf.minim.*;
import ddf.minim.ugens.*;
Minim minim;
AudioOutput out;

ArrayList<Hold>holds;
int interval;

void setup() {
  interval=10;
  size(680, 680);
  colorMode(HSB);
  frameRate(24);
  holds=new ArrayList<Hold>();
  minim = new Minim(this);
  out = minim.getLineOut();
  holds.add(new Hold(width/2, height/2));
  GUI = new ControlP5(this);
  GUI.addSlider("interval").setPosition(10, 10).setRange(1, 30);
}

void draw() {
  background(0);
  for (Hold h : holds) {
    h.walk();
    h.render();
    h.play();
  }
  if(holds.size()>10){
    holds.remove(0);
  }
}

void mouseClicked() {
  holds.add(new Hold(width/2, height/2));
}

