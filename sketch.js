// audiovisual experience based on Autechre's elseq 1–5, AE_LIVE and NTS Sessions 1–4 visual language, originally designed by tDR (https://www.thedesignersrepublic.com/ae-vs-tdr; https://autechre.warp.net/merch/77199-autechre-poster).
/* tracks:
   1) Autechre Live at Flex on 1996-02-15 (https://archive.org/details/Autechre1996-02-15)
   2) Autechre - 1999-07-05 Peel Session - 2 Blifil (https://archive.org/details/Autechre1999-07-06)
   3) Autechre - 2000-XX-XX Germany-Berlin - 16 (https://archive.org/details/Autechre2000-00-00.Autechre2000-00-00)
   4) Autechre Live at BBC Radio 3 on 2003-03-30 (https://archive.org/details/Autechre2003-03-30)
*/

// theme selector (255 = light, 0 = dark)
var currentTheme = 255;
var flashingImages = 1;

// noise
const octaves = 8;
const falloff = 0.5;

// subdivision values for the grid system
const subd1Horizontal = 12;
const subd2Horizontal = 24;
const subd1Vertical = 6;
const subd2Vertical = 12;

// assets
var imageFile = new Array();
var imageList;
var imageShow;
var trackList = new Array();

// audio control
var trackState = "pause";
var trackCurrentlyPlaying = 0;
var trackNo = 0;
var soundFile, amplitude, fft;

function preload() {
  trackList = loadJSON("tracks.json");
  imageList = loadJSON("images.json");
}

function setup() {
  // canvas initialisation
  createCanvas(windowWidth, windowHeight).parent("container");
  angleMode(DEGREES);
  rectMode(CENTER);
  fill(10);
  noStroke();

  // noise setup
  noiseDetail(octaves, falloff);

  // audio setup
  // some reference can be found here: https://stackoverflow.com/questions/68310022/load-sound-of-live-playing-audio-onto-p5js
  fft = new p5.FFT();
  peakDetect = new p5.PeakDetect(5200, 14000, 0.5); // treble
  soundFile = document.getElementById("soundFile");
  let context = getAudioContext();
  // wire all media elements up to the p5.sound AudioContext
  for (let elem of selectAll("audio").concat(selectAll("video"))) {
    let mediaSource = context.createMediaElementSource(elem.elt);
    mediaSource.connect(p5.soundOut);
  }

  // load images inside an array
  for (let i = 0; i < imageList.images.length; i++) {
    imageFile[i] = loadImage("./assets/images/" + imageList.images[i]);
  }
  console.log("track no. " + trackNo + " (" + trackList.tracks[trackNo] + ")");

  // select a random image insie the array to show before starting
  randomImage();
}

function draw() {
  background(currentTheme);

  // grid system counters
  var i1 = 0;
  var i2 = 0;

  // audio analysis
  fft.analyze();
  peakDetect.update(fft);

  // frequencies to analyse
  // https://github.com/processing/p5.js-sound/blob/main/src/fft.js
  var bass = fft.getEnergy(20, 140);
  var lowMid = fft.getEnergy(140, 400);
  var mid = fft.getEnergy(400, 2600);
  var highMid = fft.getEnergy(2600, 5200);
  var treble = fft.getEnergy(5200, 14000);

  // generate moving graphics with a responsive approach
  if (width > height) {
    // horizontal screens
    // subdivision #1
    let varDimBass1 = map(
      bass,
      0,
      255,
      (width / subd1Horizontal) * 0.005,
      width / subd1Horizontal - windowWidth / 2000
    );
    let varDimLowMid = map(
      lowMid,
      0,
      255,
      (width / subd1Horizontal) * 0.005,
      (width / subd1Horizontal) * 1.25
    );
    for (
      var x1 = 0 + width / subd1Horizontal / 2;
      x1 < width;
      x1 += width / subd1Horizontal
    ) {
      i1 = 0;
      for (
        var y1 = 0 + width / subd1Horizontal / 2;
        y1 < windowHeight - (width / subd1Horizontal) * 2;
        y1 += width / subd1Horizontal
      ) {
        i1++;
        push();
        let noiseColor1 = noise(
          frameCount / 2500 + x1 / 250,
          frameCount / 2500 + y1 / 250
        );
        if (noiseColor1 * 10 > 2.75 && noiseColor1 * 10 < 5.5) {
          if (noiseColor1 * 10 > 4.125 && noiseColor1 * 10 < 5.5) {
            if (noiseColor1 * 10 > 4.8125 && noiseColor1 * 10 < 5.5) {
              rect(x1, y1, varDimBass1, varDimBass1);
              ellipse(x1, y1, varDimLowMid);
            }
            rect(x1, y1, varDimBass1, varDimBass1);
          } else {
            ellipse(x1, y1, varDimLowMid);
          }
        } else {
        }
        pop();
      }
    }

    // subdivision #2
    let varDimBass2 = map(
      bass,
      0,
      255,
      (width / subd2Horizontal) * 0.005,
      width / subd2Horizontal - windowWidth / 2000
    );
    let varDimHighMid = map(
      highMid,
      0,
      255,
      (width / subd2Horizontal) * 0.005,
      (width / subd2Horizontal) * 1.25
    );
    let varDimTreble = map(
      treble,
      0,
      255,
      (width / subd2Horizontal) * 0.005,
      (width / subd2Horizontal) * 1.25
    );
    for (
      var x2 = 0 + width / subd2Horizontal / 2;
      x2 < width;
      x2 += width / subd2Horizontal
    ) {
      i2 = 0;
      for (
        var y2 = 0 + width / subd2Horizontal / 2;
        i2 < i1 * 2;
        y2 += width / subd2Horizontal
      ) {
        i2++;
        push();
        let noiseColor2 = noise(
          frameCount / 2500 + x2 / 250,
          frameCount / 2500 + y2 / 250
        );
        if (noiseColor2 * 10 > 5 && noiseColor2 * 10 < 6.375) {
          if (noiseColor2 * 10 > 5.6875 && noiseColor2 * 10 < 6.375) {
            if (noiseColor2 * 10 > 6.03125 && noiseColor2 * 10 < 6.71875) {
              ellipse(x2, y2, varDimTreble);
            }
            rect(x2, y2, varDimBass2);
          } else {
            ellipse(x2, y2, varDimHighMid);
          }
        } else {
        }
        pop();
      }
    }
  } else {
    // vertical screens
    // subdivision #1
    let varDimBass1 = map(
      bass,
      0,
      255,
      (width / subd1Vertical) * 0.005,
      width / subd1Vertical - windowWidth / 375
    );
    let varDimLowMid = map(
      lowMid,
      0,
      255,
      (width / subd1Vertical) * 0.005,
      (width / subd1Vertical) * 1.25
    );
    for (
      var x1 = 0 + width / subd1Vertical / 2;
      x1 < width;
      x1 += width / subd1Vertical
    ) {
      i1 = 0;
      for (
        var y1 = 0 + width / subd1Vertical / 2;
        y1 < windowHeight - (width / subd1Vertical) * 2;
        y1 += width / subd1Vertical
      ) {
        i1++;
        push();
        let noiseColor1 = noise(
          frameCount / 2500 + x1 / 250,
          frameCount / 2500 + y1 / 250
        );
        if (noiseColor1 * 10 > 2.75 && noiseColor1 * 10 < 5.5) {
          if (noiseColor1 * 10 > 4.125 && noiseColor1 * 10 < 5.5) {
            if (noiseColor1 * 10 > 4.8125 && noiseColor1 * 10 < 5.5) {
              rect(x1, y1, varDimBass1, varDimBass1);
              ellipse(x1, y1, varDimLowMid);
            }
            rect(x1, y1, varDimBass1, varDimBass1);
          } else {
            ellipse(x1, y1, varDimLowMid);
          }
        } else {
        }
        pop();
      }
    }

    // subdivision #2
    let varDimBass2 = map(
      bass,
      0,
      255,
      (width / subd2Vertical) * 0.005,
      width / subd2Vertical - windowWidth / 375
    );
    let varDimHighMid = map(
      highMid,
      0,
      255,
      (width / subd2Vertical) * 0.005,
      (width / subd2Vertical) * 1.25
    );
    let varDimTreble = map(
      treble,
      0,
      255,
      (width / subd2Vertical) * 0.005,
      (width / subd2Vertical) * 1.25
    );
    for (
      var x2 = 0 + width / subd2Vertical / 2;
      x2 < width;
      x2 += width / subd2Vertical
    ) {
      i2 = 0;
      for (
        var y2 = 0 + width / subd2Vertical / 2;
        i2 < i1 * 2;
        y2 += width / subd2Vertical
      ) {
        i2++;
        push();
        let noiseColor2 = noise(
          frameCount / 2500 + x2 / 250,
          frameCount / 2500 + y2 / 250
        );
        if (noiseColor2 * 10 > 5 && noiseColor2 * 10 < 6.375) {
          if (noiseColor2 * 10 > 5.6875 && noiseColor2 * 10 < 6.375) {
            if (noiseColor2 * 10 > 6.03125 && noiseColor2 * 10 < 6.71875) {
              ellipse(x2, y2, varDimTreble);
            }
            rect(x2, y2, varDimBass2);
          } else {
            ellipse(x2, y2, varDimHighMid);
          }
        } else {
        }
        pop();
      }
    }
  }

  // image manipulation
  if (flashingImages == 1) {
    push();
    if (mid > 127 && mid < 255) {
      // raster effect: disabled the filter because it can cause extreme lag if a device isn't pretty powerful (aka no dedicated GPU).
      if (currentTheme === 255) {
        // filter(INVERT);
        blendMode(DIFFERENCE);
      } else if (currentTheme === 0) {
        blendMode(DIFFERENCE);
      }
      image(imageFile[imageShow], 0, 0, windowWidth, windowHeight);
    }
    if (peakDetect.isDetected) {
      randomImage();
    }
    pop();
  }
}

// generate a random integer from range, inclusive
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomImage() {
  imageShow = getRandomInt(0, imageFile.length - 1);
  console.log("image no. " + getRandomInt(0, imageFile.length - 1));
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// toggle the theme between light (255) and dark (0)
function toggleP5Theme() {
  if (currentTheme === 255) {
    currentTheme = 0;
    fill(255);
  } else if (currentTheme === 0) {
    currentTheme = 255;
    fill(10);
  }
}

// save a screenshot
function saveScreenshot() {
  saveCanvas("myCanvas", "png");
}

// toogle flashing images
function toggleImages() {
  if (flashingImages === 1) {
    flashingImages = 0;
  } else if (flashingImages === 0) {
    flashingImages = 1;
  }
}

// play or pause the current track
function togglePlay() {
  if (soundFile.paused) {
    soundFile.play();
    loop();
    trackState = "play";
  } else {
    soundFile.pause();
    noLoop();
    trackState = "pause";
  }
}

// change current track
function toggleAudio() {
  var track = document.getElementById("track");
  trackNo++;
  if (trackNo == trackList.tracks.length) {
    trackNo = 0;
  }
  console.log("track no. " + trackNo + " (" + trackList.tracks[trackNo] + ")");
  track.src = "./assets/tracks/" + trackList.tracks[trackNo];
  document.getElementById("soundFile").load();
  // set the state of the track, so that if the sketch is paused the track isn't going to start
  if (trackState == "play") {
    soundFile.play();
    loop();
  } else {
    soundFile.pause();
    noLoop();
  }
}

// https://p5js.org/reference/#/p5/getAudioContext
// "Some browsers require users to startAudioContext with a user gesture, such as touchStarted in the example below".
function touchStarted() {
  if (getAudioContext().trackState !== "running") {
    getAudioContext().resume();
  }
}
