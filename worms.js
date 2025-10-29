
let trailX = [], trailY = [];
let trailLength = 50;

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < trailLength; i++) {
    trailX[i] = mouseX;
    trailY[i] = mouseY;
  }
}

function draw() {
  background(0);
  //tails
  for (let i = 0; i < trailLength - 1; i++) {
    trailX[i] = trailX[i+1];
    trailY[i] = trailY[i+1];
  }
  trailX[trailLength-1] = mouseX; 
  trailY[trailLength-1] = mouseY;

  for (let i = 0; i < trailLength; i++) {
    let c = map(i, 0, trailLength, 0, 255);
    fill(c, 255-c, 200);
    noStroke();
    circle(trailX[i], trailY[i], i);
  }
}
