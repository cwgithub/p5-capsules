let baseColor;
let variations = [];

let boxWidth = 2500;
let boxHeight = 2500;

// Generate a random seed
let seed;

function setup() {
  // seed = floor(random(100000)); // Get a random integer seed

  seed = 58124;

  // Set the random seed
  randomSeed(seed);
  noiseSeed(seed);

  console.log("Random Seed:", seed);

  // createCanvas(2481, 3507);
  createCanvas(2500, 2500);

  angleMode(DEGREES);

  colorMode(HSB, 360, 100, 100, 100); // Use HSB for easy manipulation
  baseColor = color(30, 100, 100); // Approximate HSB of (255,128,0) in RGB

  for (let i = 0; i < 5; i++) {
    let hueShift = (hue(baseColor) + random(-10, 10)) % 360;
    let satShift = constrain(saturation(baseColor) + random(-30, 30), 0, 100);
    let brightShift = constrain(
      brightness(baseColor) + random(-30, 30),
      0,
      100
    );
    let alphaShift = random(50, 100);
    variations.push(color(hueShift, satShift, brightShift, alphaShift));
  }

  background(255);
  noLoop();
}

function draw() {
  noStroke();

  const frame = createFrame(2500, 2500);
  image(frame, 0, 0);

  const mainBlock = createMainBlock(2500, 2500);
  image(mainBlock, 0, 0);

  let x = 500;
  let y = boxHeight / 2;
  console.log(y);
  console.log(pixelDensity());
  imageMode(CENTER);

  for (let c = 0; c < 25; c++) {
    push();

    const capLength = random(200, 400);
    const capFat = random(20, 100);

    const c = capsule(capLength, capFat, variations[0]);

    x = random(200, 2000);
    y = random(200, 2000);

    translate(x, y);
    // rotate(45);
    image(c.img, 0, 0);
    pop();
  }

  for (let c = 0; c < 5; c++) {
    push();

    const capLength = random(200, 400);
    const capFat = random(20, 100);

    const c = capsule(capLength, capFat, variations[3]);

    x = random(200, 2000);
    y = random(200, 2000);

    translate(x, y);
    // rotate(45);
    image(c.img, 0, 0);
    pop();
  }

  push();
}

// define the capsule function
function capsule(w, h, c) {
  const capsuleCanvas = createGraphics(w, h);
  capsuleCanvas.noStroke();
  // capsuleCanvas.background(128, 128, 128); // match the background color of the main canvas

  // calculate the radius of the capsule
  let r = h / 2;

  capsuleCanvas.fill(c); // set the fill color to white

  // draw the left and right circles of the capsule
  capsuleCanvas.ellipse(r, r, r * 2, r * 2);
  capsuleCanvas.ellipse(w - r, r, r * 2, r * 2);
  // draw the rectangle in the middle of the capsule
  capsuleCanvas.rect(r, 0, w - 2 * r, h);

  let circleArea = PI * h;
  let rectArea = h * (w - h);

  return {
    img: capsuleCanvas,
    area: circleArea + rectArea,
  };
}

function createFrame(frameWidth, frameHeight) {
  const frameGraphics = createGraphics(frameWidth, frameHeight);
  frameGraphics.rectMode(CENTER);

  frameGraphics.push();
  frameGraphics.fill(variations[2]);
  frameGraphics.rect(
    frameWidth / 2,
    frameHeight / 2,
    frameWidth ,
    frameHeight 
  );
  frameGraphics.pop();

  return frameGraphics;
}

function createMainBlock(mainBlockWidth, mainBlockHeight) {
  const mainBlockGraphics = createGraphics(mainBlockWidth, mainBlockHeight);
  mainBlockGraphics.rectMode(CENTER);

  mainBlockGraphics.push();
  mainBlockGraphics.fill(baseColor);
  mainBlockGraphics.rect(mainBlockWidth / 2, mainBlockHeight / 2, 2200, 2200);
  mainBlockGraphics.pop();

  return mainBlockGraphics;
}
