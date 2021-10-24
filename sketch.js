// audiovisual experience based on Autechre's elseq 1–5, AE_LIVE and NTS Sessions 1–4 visual language, originally designed by tDR.
// audio: Autechre - 2000-XX-XX Germany-Berlin - 16 (https://archive.org/details/Autechre2003-03-30)

var backgroundToggle = 255;

var subd1 = 12;
var subd2 = 24;
var subd3 = 36;

var soundFile, amplitude, fft;

var octaves = 8;
var falloff = 0.5;

var alphaEff = 1;

function preload() {
  soundFile = loadSound(
    "./assets/music/Autechre-2000-xx-xxGermany-berlin-16.ogg"
  );
  imageFile = loadImage("./assets/images/AE_LIVE.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight).parent("container");

  pixelDensity(1);

  frameRate(60);
  angleMode(DEGREES);
  rectMode(CENTER);
  fill(10);
  noStroke();

  amplitude = new p5.Amplitude();
  amplitude.smooth(1);
  amplitude.setInput(soundFile);

  fft = new p5.FFT();
  peakDetect = new p5.PeakDetect("treble");

  soundFile.loop();
}

function draw() {
  background(backgroundToggle);

  var bass = fft.getEnergy(20, 400);
  var mid = fft.getEnergy(400, 2600);
  var high = fft.getEnergy(2600, 5200);
  // var treble = fft.getEnergy(5200, 1400);

  fft.analyze();
  peakDetect.update(fft);

  var i1 = 0;
  var i2 = 0;
  var i3 = 0;

  noiseDetail(octaves, falloff);

  // subdivision #1
  var varDim1 = map(
    bass,
    0,
    255,
    (width / subd1) * 0.05,
    width / subd1 - windowWidth / 1000
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
      if (noiseColor1 * 10 > 2.5 && noiseColor1 * 10 < 5) {
        if (noiseColor1 * 10 > 3.75 && noiseColor1 * 10 < 5) {
          rect(x1, y1, varDim1, varDim1);
        } else {
          ellipse(x1, y1, varDim1);
        }
      } else {
      }
      pop();
    }
  }

  //subdivision #2
  var varDim2 = map(
    mid,
    0,
    255,
    (width / subd2) * 0.05,
    width / subd2 - windowWidth / 1000
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
      if (noiseColor2 * 10 > 5 && noiseColor2 * 10 < 7.5) {
        if (noiseColor2 * 10 > 6.75 && noiseColor2 * 10 < 7.5) {
          rect(x2, y2, varDim2);
        } else {
          ellipse(x2, y2, varDim2);
        }
      } else {
      }
      pop();
    }
  }

  // subdivision #3
  var varDim3 = map(
    high,
    0,
    255,
    (width / subd3) * 0.05,
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
      if (noiseColor3 * 10 > 7.5 && noiseColor3 * 10 < 10) {
        ellipse(x3, y3, varDim3);
      } else {
      }
      pop();
    }
  }

  // image manipulation
  push();
  if (mid > 150 && mid < 200) {
    console.log("altoo");
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

// generate a random integer from range, inclusive
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
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
