let titles = [
  { name: "Webcam", link: "webcam.html" },
  { name: "Guitar Strings", link: "guitar.html" },
  { name: "Play with Worms", link: "worms.html" },
  { name: "Paint", link: "paint.html" },
  { name: "Crash out here", link: "crash.html" }
];

let angle = 0;
let targetAngle = 0;
let myFont;
let radius = 250;
let c1, c2;
let leaves = [];

function preload() {
  myFont = loadFont('Impact.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  textFont(myFont);
  textSize(70);
  textAlign(CENTER, CENTER);
  noStroke();

  c1 = color(180, 90, 40);  
  c2 = color(255, 180, 90); 

  for (let i = 0; i < 50; i++) {
    leaves.push(new Leaf());
  }
}

function draw() {
  push();
  resetMatrix();
  noFill();
  for (let y = -height / 2; y <= height / 2; y++) {
    let inter = map(y + height / 2, 0, height, 0, 1);
    let c = lerpColor(c1, c2, inter);
    stroke(c);
    line(-width / 2, y, width / 2, y);
  }
  pop();

  let target1 = color(170 + sin(frameCount * 0.002) * 20, 80 + sin(frameCount * 0.001) * 30, 40);
  let target2 = color(255, 160 + sin(frameCount * 0.002) * 40, 100);
  c1 = lerpColor(c1, target1, 0.02);
  c2 = lerpColor(c2, target2, 0.02);

  // Show floating leaves
  for (let leaf of leaves) {
    leaf.update();
    leaf.show();
  }

  // Titles 
  angle = lerp(angle, targetAngle, 0.08);
  rotateX(-PI / 8);

  for (let i = 0; i < titles.length; i++) {
    push();

    let theta = i * (PI / titles.length) * 2 + angle;
    let y = sin(theta) * radius * 0.5;
    let z = cos(theta) * radius;
    translate(0, y, z);

    rotateX(-theta);

    let scaleFactor = map(abs(z - radius), 0, 200, 1.5, 1);
    scale(scaleFactor);

    if (abs(z - radius) < 50) {
      fill(124,10,2);
    } else {
      let brightness = map(abs(y), 0, radius / 2, 220, 140);
      fill(brightness, 100, 50);
    }

    text(titles[i].name, 0, 0);
    pop();
  }
}

function mouseWheel(event) {
  targetAngle += event.delta * 0.002;
}

function mousePressed() {
  let index = Math.round(-angle / ((PI / titles.length) * 2)) % titles.length;
  if (index < 0) index += titles.length;
  window.location.href = titles[index].link;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

class Leaf {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = random(-width / 2, width / 2);
    this.y = random(-height / 2, height / 2);
    this.leafSize = 25;       
    this.stickLength = random(20, 20); 
    this.speed = random(0.3, 1);
    this.angle = random(TWO_PI);
  }

  update() {
    this.y += this.speed;
    this.x += sin(frameCount * 0.01 + this.angle) * 0.5;
    if (this.y > height / 2) {
      this.y = -height / 2;
      this.x = random(-width / 2, width / 2);
    }
  }

  show() {
    push();
    resetMatrix();
    translate(this.x, this.y);
    rotate(sin(frameCount * 0.01 + this.angle) * PI / 6);

    stroke(101, 67, 33); 
    strokeWeight(3);
    line(0, 0, 0, this.stickLength);

    noStroke();
    fill(34, 139, 34); 
    ellipse(0, 0, this.leafSize, this.leafSize);

    pop();
  }
}