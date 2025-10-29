let strings = [];
let ripples = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noCursor();

  // create 6 guitar strings with different pitches
  for (let i = 0; i < 6; i++) {
    strings.push(new GuitarString(height / 2 - 100 + i * 40, i));
  }
}

function draw() {
  drawGradientBackground();

  // update and draw strings
  for (let s of strings) {
    s.update();
    s.show();
  }

  // update ripples
  for (let r of ripples) {
    r.update();
    r.show();
  }
  ripples = ripples.filter(r => !r.finished);

  // title 
  noStroke();
  fill(255, 200);
  textAlign(CENTER, TOP );
  textSize(32);
  text("🎸 Click the strings to pluck them 🎵", width / 2, 40);
}

function mousePressed() {
  userStartAudio();
  for (let s of strings) {
    s.pluck(mouseY);
  }
}

// Guitar String class 
class GuitarString {
  constructor(y, i) {
    this.y = y;
    this.amp = 0;
    this.color = color(255 - i * 30, 150 + i * 15, 200 + i * 8);

    // each string gets its own oscillator
    this.osc = new p5.Oscillator('triangle');
    this.osc.amp(0);
    this.osc.start();

    // assign simple frequencies 
    let freqs = [82.41, 110, 146.83, 196, 246.94, 329.63];
    this.freq = freqs[i];
  }

  pluck(yPos) {
    if (abs(yPos - this.y) < 20) {
      this.amp = 30;
      this.playSound();
      ripples.push(new Ripple(mouseX, this.y, this.color));
    }
  }

  playSound() {
    // short pluck
    this.osc.freq(this.freq);
    this.osc.amp(0.3, 0.01); // attack
    this.osc.amp(0, 0.5);    // fade out
  }

  update() {
    this.amp *= 0.9; // damping
  }

  show() {
    stroke(this.color);
    strokeWeight(3);
    let wave = sin(frameCount * 0.2) * this.amp;

    // glowing effect
    push();
    strokeWeight(8);
    stroke(red(this.color), green(this.color), blue(this.color), 60);
    line(100, this.y + wave, width - 100, this.y - wave);
    pop();

    // main string
    line(100, this.y + wave, width - 100, this.y - wave);
  }
}

// Ripple class 
class Ripple {
  constructor(x, y, col) {
    this.x = x;
    this.y = y;
    this.size = 0;
    this.alpha = 255;
    this.col = col;
    this.finished = false;
  }

  update() {
    this.size += 6;
    this.alpha -= 6;
    if (this.alpha <= 0) this.finished = true;
  }

  show() {
    noFill();
    stroke(red(this.col), green(this.col), blue(this.col), this.alpha);
    strokeWeight(2);
    ellipse(this.x, this.y, this.size);
  }
}

// Background gradient 
function drawGradientBackground() {
  for (let y = 0; y < height; y++) {
    let c = lerpColor(color(15, 5, 40), color(60, 20, 80), y / height);
    stroke(c);
    line(0, y, width, y);
  }
}
