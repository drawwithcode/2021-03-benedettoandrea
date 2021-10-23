// audiovisual experience based on Autechre's elseq 1–5, AE_LIVE and NTS Sessions 1–4 visual language, originally designed by tDR.
// audio: Autechre - 1996-02-15 Austria-Vienna (https://archive.org/details/Autechre1996-02-15)

var backgroundToggle = 255;

var subd1 = 12;
var subd2 = 24;
var subd3 = 36;

var soundFile, amplitude;

var octaves = 8;
var falloff = 0.5;

function preload() {
  soundFile = loadSound(
    "./assets/music/1996 - Autechre -  live @ flex 96 (remastered).mp3"
  );
  imageFile = loadImage("./assets/images/Incunabula.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight).parent("container");

  frameRate(60);
  angleMode(DEGREES);
  rectMode(CENTER);
  fill(10);
  noStroke();

  amplitude = new p5.Amplitude();
  amplitude.smooth(1);
  amplitude.setInput(soundFile);

  soundFile.loop();
}

function draw() {
  //clear();
  background(backgroundToggle);
  var level = amplitude.getLevel();

  var i1 = 0;
  var i2 = 0;
  var i3 = 0;

  noiseDetail(octaves, falloff);

  // subdivision #1
  var varDim1 = map(
    level,
    0,
    1,
    width / subd1 - windowWidth / 10,
    width / subd1 - windowWidth / 500
  );
  for (var x1 = 0 + width / subd1 / 2; x1 < width; x1 += width / subd1) {
    i1 = 0;
    for (
      var y1 = 0 + width / subd1 / 2;
      y1 < windowHeight - (width / subd1) * 2;
      y1 += width / subd1
    ) {
      i1++;
      push();
      let noiseColor1 = noise(
        frameCount / 2500 + x1 / 250,
        frameCount / 2500 + y1 / 250
      );
      if (Math.floor(noiseColor1 * 10) < 5) {
      } else {
        ellipse(x1, y1, varDim1);
      }
      // rect(x1, y1, varDim1, varDim1);
      pop();
    }
  }

  //subdivision #2
  var varDim2 = map(
    level,
    0,
    1,
    width / subd2 - windowWidth / 100,
    width / subd2 - windowWidth / 5000
  );
  for (var x2 = 0 + width / subd2 / 2; x2 < width; x2 += width / subd2) {
    i2 = 0;
    for (var y2 = 0 + width / subd2 / 2; i2 < i1 * 2; y2 += width / subd2) {
      i2++;
      push();
      let noiseColor2 = noise(
        frameCount / 2500 + x2 / 250,
        frameCount / 2500 + y2 / 250
      );
      // rect(x2, y2, varDim2);
      if (
        Math.floor(noiseColor2 * 10) < 5 &&
        Math.floor(noiseColor2 * 10) > 2
      ) {
        ellipse(x2, y2, varDim2);
      } else {
      }
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
      i3++;
      push();
      let noiseColor3 = noise(
        frameCount / 2500 + x3 / 250,
        frameCount / 2500 + y3 / 250
      );
      // rect(x3, y3, varDim3);
      if (
        Math.floor(noiseColor3 * 10) < 9 &&
        Math.floor(noiseColor3 * 10) > 5
      ) {
        ellipse(x3, y3, varDim3);
      } else {
      }
      pop();
    }
  }
  push();
  if (level > 0.1) {
    if (backgroundToggle === 255) {
      filter(INVERT);
      blendMode(DIFFERENCE);
    } else if (backgroundToggle === 0) {
      blendMode(DIFFERENCE);
    }
    image(imageFile, 0, 0, windowWidth, windowHeight);
  }
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
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
