let vScale = 16;
let cam;
let filterMode = 0; 
// Ive used 4 basic filters: 0 = normal, 1 = grayscale, 2 = invert, 3 = red(for halloween vibes), 
// 4 = rainbow

function setup() {
  createCanvas(windowWidth, windowHeight); 
  pixelDensity(1);
  noStroke();
  rectMode(CENTER);

  cam = createCapture(VIDEO);
  cam.size(width / vScale, height / vScale);
  cam.hide();
}

function draw() {
  background(30);
  cam.loadPixels();

  translate(vScale / 2, vScale / 2);

  for (let y = 0; y < cam.height; y++) {
    for (let x = 0; x < cam.width; x++) {
      let i = (y * cam.width + x) * 4;

      let r = cam.pixels[i];
      let g = cam.pixels[i + 1];
      let b = cam.pixels[i + 2];

      // Apply basic filters
      if (filterMode === 1) {          // Grayscale
        let avg = (r + g + b) / 3;
        r = g = b = avg;
      } else if (filterMode === 2) {   // Invert
        r = 255 - r;
        g = 255 - g;
        b = 255 - b;
      } else if (filterMode === 3) {   // Red 
        r = min(255, r * 1.5);
        g *= 0.5;
        b *= 0.5;
      } else if (filterMode === 4) {   // Rainbow wave
        let wave = sin((x + frameCount * 5) * 0.05) * 128 + 128;
        r = (r + wave) % 255;
        g = (g + wave / 2) % 255;
        b = (b + 255 - wave) % 255;
      }

      // Compute brightness for size
      let brightness = (r + g + b) / 3;
      let s = map(brightness, 0, 255, 0, 1);

      fill(r, g, b);
      rect(x * vScale, y * vScale, vScale * s, vScale * s);
    }
  }

  cam.updatePixels();

  // Instructions
  fill(255);
  textSize(20);
  textAlign(CENTER, BOTTOM);
  text('Press [1–4] for filters | Press [S] to save', width / 2, height - 20);
}

// Save image
function keyPressed() {
  if (key === 's' || key === 'S') {
    saveCanvas('webcam-art', 'png');
  } else if (key >= '0' && key <= '4') {
    filterMode = int(key);
  }
}

// Resize dynamically
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  cam.size(width / vScale, height / vScale);
}
