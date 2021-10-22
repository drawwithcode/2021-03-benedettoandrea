// audiovisual experience based on Autechre's elseq 1–5, AE_LIVE and NTS Sessions 1–4 visual language, originally designed by tDR.
// audio: Autechre - 1996-02-15 Austria-Vienna (https://archive.org/details/Autechre1996-02-15)

var xDim = 20;
var yDim = 20;
var angleX = 0;
var angleY = 0;
var octaves = 8;
var falloff = 0.5;

var soundFile;

function preload() {
  soundFile = loadSound(
    "../assets/1996 - Autechre -  live @ flex 96 (remastered).mp3"
  );
  console.log("loaded");
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL).parent("container");
  frameRate(60);
  fill(0);
  noStroke();
  angleMode(DEGREES);
  blendMode(MULTIPLY);
  soundFile.play();
  amplitude = new p5.Amplitude();
  amplitude.smooth(0.8);
}

function draw() {
  background(255);

  ortho(-width / 2, width / 2, -height / 2, height / 2, -100000, 100000);

  var level = amplitude.getLevel();
  var diameter = map(level, 0, 0.3, 10, 200);
  //var ellipseHeight = map(level, 0, mapMax, height, 0);

  for (
    var x = -width / 2 + width / xDim / 2;
    x < width / 2;
    x += width / xDim
  ) {
    for (
      var y = -height / 2 + height / yDim / 2;
      y < height / 2;
      y += height / yDim
    ) {
      push();
      translate(x, y);
      rotateX(angleX);
      rotateY(angleY);
      //plane(windowWidth / xDim, windowHeight / yDim);
      ellipse(x, y, diameter);
      pop();
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
