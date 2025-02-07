let particles = [];
let numParticles



function setup() {
    const canvas = createCanvas(windowWidth, windowHeight);
    canvas.id('particle-canvas');
    canvas.style('z-index', '-1');
    frameRate(30);

    numParticles = windowWidth > 768 ? 60 : 40; // less particles on small screens
    for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
    }
}


function mousePressed(){
    if (mouseButton === LEFT && numParticles < 100) {
        particles.push(new Particle(createVector(mouseX, mouseY)))
        numParticles++
    }
}


function draw() {
    background(240); 

    for (let particle of particles) {
        particle.update();
        particle.show();
    }
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
