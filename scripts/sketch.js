let particles = [];
let backgroundColor = 240; // Default light background
let numParticles;
function setup() {
  const canvas = createCanvas(windowWidth, windowHeight);
  canvas.id("particle-canvas");
  canvas.style("z-index", "-1");
  frameRate(30);

  // Make sketch accessible globally
  window.sketch = {
    setBackground: (color) => {
      backgroundColor = color;
    },
  };

  // Apply pending theme if one exists
  if (
    typeof window.pendingTheme !== "undefined" &&
    window.pendingTheme !== null
  ) {
    window.sketch.setBackground(window.pendingTheme ? 30 : 240);
    // Clear the pending theme
    window.pendingTheme = null;
  }

  numParticles = windowWidth > 768 ? 60 : 40;
  for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle());
  }
}

function mousePressed() {
  if (mouseButton === LEFT && numParticles < 100) {
    particles.push(new Particle((pos = createVector(mouseX, mouseY))));
    numParticles++;
  }
}

function draw() {
  background(backgroundColor);

  for (let particle of particles) {
    particle.update();
    particle.show();
  }
}

let scrollTimeout;
function windowScrolled() {
  noLoop();
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    loop();
  }, 150);
}

class Particle {
  constructor(pos = createVector(random(width), random(height))) {
    this.pos = pos;
    this.vel = createVector(random(-1, 1), random(-1, 1));
    this.size = random(3, 10);
    this.colorOffset = random(0, 255);
  }

  update() {
    this.pos.add(this.vel);
    this.edges();
  }

  edges() {
    if (this.pos.x > width || this.pos.x < 0) {
      this.vel.x *= -1;
    }
    if (this.pos.y > height || this.pos.y < 0) {
      this.vel.y *= -1;
    }
  }

  show() {
    noStroke();
    let r = map(sin(frameCount * 0.01 + this.colorOffset), -1, 1, 100, 255);
    let g = map(sin(frameCount * 0.02 + this.colorOffset), -1, 1, 100, 255);
    let b = map(sin(frameCount * 0.03 + this.colorOffset), -1, 1, 100, 255);
    fill(r, g, b);
    ellipse(this.pos.x, this.pos.y, this.size);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
