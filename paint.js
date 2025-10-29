function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
}

function draw() {
  if (mouseIsPressed) {
    stroke(random(255), random(255), random(255));
    strokeWeight(10);
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
}
