let inputEl, sizeSlider, colorPicker;
let sendBtn;
let currentText = "Type something✨";
let myFont = null; 
let flying = false;
let textY;
let textAlpha = 255;

function preload(){
}

function setup(){
  createCanvas(windowWidth, windowHeight * 0.6);
  noStroke();
  textAlign(CENTER, CENTER);
  rectMode(CORNER);

  // header
  let header = createElement('h1', 'write it out 💌');
  header.parent(document.body);
  header.style('font-family', 'Comic Sans MS, "Segoe UI Emoji", Arial, sans-serif');
  header.style('text-align', 'center');
  header.style('margin', '12px 0 4px 0');
  header.style('color', '#6a2c70');

  // subtitle
  let subtitle = createElement('p', 'Type something — then send it flying!');
  subtitle.parent(document.body);
  subtitle.style('text-align', 'center');
  subtitle.style('margin', '0 0 12px 0');
  subtitle.style('color', '#444');

  // Controls container
  let controls = createDiv();
  controls.style('display', 'flex');
  controls.style('gap', '10px');
  controls.style('justify-content', 'center');
  controls.style('align-items', 'center');
  controls.style('flex-wrap', 'wrap');
  controls.style('margin-bottom', '12px');

  // Input
  inputEl = createInput('');
  inputEl.attribute('placeholder', 'Write your message here...');
  inputEl.style('padding', '10px 12px');
  inputEl.style('border-radius', '12px');
  inputEl.style('border', '2px solid #ffdce6');
  inputEl.style('font-size', '16px');
  inputEl.parent(controls);

  // Live as you type
  inputEl.input(() => {
    currentText = inputEl.value() || " ";
    textY = height / 2; 
    textAlpha = 255;   
  });

  // Size slider
  sizeSlider = createSlider(24, 120, 48, 1);
  sizeSlider.parent(controls);
  sizeSlider.style('width', '140px');

  // Color picker
  colorPicker = createColorPicker('#ff6fb5');
  colorPicker.parent(controls);
  colorPicker.style('width', '44px');
  colorPicker.elt.title = "Pick text color";

  // Send button
  sendBtn = createButton('📤 Send');
  sendBtn.parent(controls);
  sendBtn.mousePressed(() => {
    if(currentText.trim() !== "") flying = true;
  });
  sendBtn.style('border-radius', '10px');

  //text
  let hint = createP('Type your message, then press "Send"!');
  hint.style('text-align', 'center');
  hint.style('margin-top', '8px');
  hint.style('color', '#666');

  textY = height / 2; 
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight * 0.6);
}

function draw(){
  drawPastelBackground();

  // white paper area
  push();
  fill(255, 255, 255, 230);
  stroke(255, 255, 255, 200);
  rect(30, 30, width - 60, height - 60, 24);
  pop();

  // text display
  push();
  let txtSize = sizeSlider.value();
  textSize(txtSize);
  textAlign(CENTER, CENTER);
  if (myFont) textFont(myFont);
  else textStyle(NORMAL);

  if(flying){
    textY -= 3;        
    textAlpha -= 4;    // fade out
    if(textAlpha <= 0){
      flying = false;
      currentText = "";   // reset text
      inputEl.value('');
      textAlpha = 255;   
      textY = height / 2; 
    }
  }
  push();
  translate(3, 6);
  fill(255, 255, 255, 160 * (textAlpha / 255));
  text(currentText, width/2 - 3, textY - 3, width * 0.9, height * 0.8);
  pop();

  fill(colorPicker.color());
  fill(red(colorPicker.color()), green(colorPicker.color()), blue(colorPicker.color()), textAlpha);
  text(currentText || " ", width/2, textY, width * 0.9, height * 0.8);
  pop();
}

function drawPastelBackground(){
  for(let y=0;y<height;y+=6){
    let lerpVal = map(y, 0, height, 0, 1);
    let c = lerpColor(color('#FFF1F6'), color('#F0FFFB'), lerpVal);
    noStroke();
    fill(c);
    rect(0, y, width, 6);
  }
}

