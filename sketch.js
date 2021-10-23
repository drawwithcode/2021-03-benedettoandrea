// audiovisual experience based on Autechre's elseq 1–5, AE_LIVE and NTS Sessions 1–4 visual language, originally designed by tDR.
// audio: Autechre - 1996-02-15 Austria-Vienna (https://archive.org/details/Autechre1996-02-15)

var backgroundToggle = 255;
var subd1 = 12;
var subd2 = 24;
var subd3 = 36;
var soundFile, amplitude;

var canvasDiv, canvasHeight, sketchCanvas;

function preload() {
  soundFile = loadSound(
    "../assets/1996 - Autechre -  live @ flex 96 (remastered).mp3"
  );
}

function setup() {
  canvasDiv = document.getElementById("container");
  canvasHeight = canvasDiv.offsetHeight;

  sketchCanvas = createCanvas(windowWidth, canvasHeight).parent("container");
  console.log(sketchCanvas);

  frameRate(60);
  angleMode(DEGREES);
  rectMode(CENTER);
  fill(10);
  noStroke();

  amplitude = new p5.Amplitude();
  amplitude.smooth(1);
  amplitude.setInput(soundFile);
}

function draw() {
  clear();
  //background("yellow");
  //background(backgroundToggle);
  var level = amplitude.getLevel();

  var i1 = 0;
  var i2 = 0;
  var i3 = 0;

  // subdivision #1
  var varDim1 = map(
    level,
    0,
    1,
    width / subd1 - windowWidth / 500,
    width / subd1 - windowWidth / 1000
  );
  for (var x1 = 0 + width / subd1 / 2; x1 < width; x1 += width / subd1) {
    i1 = 0;
    for (
      var y1 = 0 + width / subd1 / 2;
      y1 < canvasHeight - width / subd1 / 2;
      y1 += width / subd1
    ) {
      i1++;
      //console.log("A" + i);
      push();
      //fill("black");
      rect(x1, y1, varDim1, varDim1);
      // ellipse(x1, y1, varDim1);
      // fill("white");
      // text("A" + i, x1, y1);
      pop();
    }
  }
  //console.log("reset" + i);

  //subdivision #2
  var varDim2 = map(
    level,
    0,
    1,
    width / subd2 - windowWidth / 500,
    width / subd2 - windowWidth / 1000
  );
  for (var x2 = 0 + width / subd2 / 2; x2 < width; x2 += width / subd2) {
    i2 = 0;
    for (var y2 = 0 + width / subd2 / 2; i2 < i1 * 2; y2 += width / subd2) {
      push();
      i2++;
      //console.log("B" + i2);
      fill("blue");
      // rect(x2, y2, varDim2);
      ellipse(x2, y2, varDim2);
      // fill("yellow");
      // textSize(8);
      // text("B" + i2, x2, y2);
      pop();
    }
  }

  // subdivision #3
  var varDim3 = map(
    level,
    0,
    1,
    width / subd3 - windowWidth / 500,
    width / subd3 - windowWidth / 1000
  );
  for (var x3 = 0 + width / subd3 / 2; x3 < width; x3 += width / subd3) {
    i3 = 0;
    for (var y3 = 0 + width / subd3 / 2; i3 < i1 * 3; y3 += width / subd3) {
      push();
      i3++;
      fill("red");
      ellipse(x3, y3, varDim3);
      // fill("yellow");
      // textSize(8);
      // text("C" + i3, x3, y3);
      pop();
    }
  }
}

function windowResized() {
  //sketchCanvas.resizeCanvas(windowWidth, canvasHeight);
  canvasDiv = document.getElementById("container");
  canvasHeight = canvasDiv.offsetHeight;

  resizeCanvas(windowWidth, canvasHeight);
  // = createCanvas(windowWidth, canvasHeight).parent("container");
  console.log(sketchCanvas);
}

function switchBackground() {
  if (backgroundToggle === 255) {
    backgroundToggle = 0;
    fill(255);
  } else if (backgroundToggle === 0) {
    backgroundToggle = 255;
    fill(10);
  }
}

function startStop() {
  if (soundFile.isPlaying() && isLooping()) {
    soundFile.pause();
    noLoop();
  } else {
    soundFile.loop();
    loop();
  }
}

function saveScreenshot() {
  saveCanvas("myCanvas", "png");
}
