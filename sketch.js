let baseColor;
let variations = [];

let boxWidth = 2500;
let boxHeight = 2500;

// Generate a random seed
let seed;

function setup() {
  seed = floor(random(100000)); // Get a random integer seed

  // 58124;
  // 81790;
  // 15968
  // 23135
  // 89674
  // 47239
  // 55587
  // 67031#
  // 83524
  // 47454
  // 18157
  // 33285

  // Set the random seed
  randomSeed(seed);
  noiseSeed(seed);
  angleMode(DEGREES);

  console.log("Random Seed:", seed);

  // createCanvas(2481, 3507);
  createCanvas(2500, 2500);

  colorMode(HSB, 360, 100, 100, 100); // Use HSB for easy manipulation

  baseColor = color(30, 100, 100); // Approximate HSB of (255,128,0) in RGB

  setupColourVariations(baseColor);
  background(255);
  noLoop();

  // imageMode(CENTER);
  // background(255);
  // redraw();
}

function setupColourVariations(baseColor) {
  for (let i = 0; i < 5; i++) {
    let hueShift = (hue(baseColor) + random(-50, 50)) % 360;
    let satShift = constrain(saturation(baseColor) + random(-30, 30), 0, 100);
    let brightShift = constrain(
      brightness(baseColor) + random(-50, 50),
      0,
      100
    );
    let alphaShift = random(10, 100);
    variations.push(color(hueShift, satShift, brightShift, alphaShift));
  }
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

  for (let c = 0; c < 5; c++) {
    push();
    const capLength = random(200, 400);
    const capFat = random(20, 150);
    const c = capsule(capLength, capFat, variations[0]);
    x = random(250, 2000);
    y = random(150, 2400);
    translate(x, y);
    // rotate(45);
    image(c.img, 0, 0);
    pop();
  }

  for (let c = 0; c < 5; c++) {
    push();
    const capLength = random(200, 400);
    const capFat = random(20, 100);
    const c = capsule(capLength, capFat, variations[1]);
    x = random(200, 2000);
    y = random(200, 2000);
    translate(x, y);
    // rotate(45);
    image(c.img, 0, 0);
    pop();
  }

  for (let c = 0; c < 5; c++) {
    push();
    const capLength = random(400, 800);
    const capFat = random(20, 100);
    const c = capsule(capLength, capFat, variations[3]);
    x = random(200, 2000);
    y = random(2000, 2200);
    translate(x, y);
    // rotate(45);
    image(c.img, 0, 0);
    pop();
  }

  for (let c = 0; c < 5; c++) {
    push();
    const capLength = random(400, 800);
    const capFat = random(20, 100);
    const c = capsule(capLength, capFat, variations[4]);
    x = 2000;
    y = random(1, 50) * 100;
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
  frameGraphics.rect(frameWidth / 2, frameHeight / 2, frameWidth, frameHeight);

  // for (var i = 0; i < frameHeight; i += 10) {
  //   frameGraphics.fill(variations[4]);
  //   frameGraphics.rect(frameWidth / 2, i, frameWidth, random(3, 7));
  // }

  frameGraphics.filter(BLUR, 5);
  frameGraphics.pop();

  return frameGraphics;
}

function createMainBlock(mainBlockWidth, mainBlockHeight) {
  const mainBlockGraphics = createGraphics(mainBlockWidth, mainBlockHeight);
  mainBlockGraphics.rectMode(CENTER);
  mainBlockGraphics.noStroke();

  mainBlockGraphics.push();
  mainBlockGraphics.fill(baseColor);
  mainBlockGraphics.rect(mainBlockWidth / 2, mainBlockHeight / 2, 2200, 2200);
  mainBlockGraphics.pop();

  mainBlockGraphics.push();
  mainBlockGraphics.noStroke();
  let y = mainBlockHeight / 2 + random(-100, 100);
  // "barcode"
  for (let x = 200; x <= 2300; x += 6) {
    mainBlockGraphics.fill(variations[floor(random(2))]);
    mainBlockGraphics.rect(
      x,
      y + random(-10, 10),
      random(2, 5),
      random(500, 800)
    );
  }
  mainBlockGraphics.pop();
  mainBlockGraphics.filter(BLUR, 1);

  mainBlockGraphics.push();
  mainBlockGraphics.noStroke();
  for (let thinBarCodes = 0; thinBarCodes < 15; thinBarCodes++) {
    y = mainBlockHeight / 2 + random(-10, 20) * 10;
    // "barcode"
    for (let x = 200; x <= 2300; x += 6) {
      mainBlockGraphics.fill(variations[floor(random(2))]);
      mainBlockGraphics.rect(
        x,
        y + random(-10, 10),
        random(2, 5),
        random(20, 30)
      );
    }
  }
  mainBlockGraphics.pop();

  mainBlockGraphics.filter(BLUR, 1);

  return mainBlockGraphics;
}
