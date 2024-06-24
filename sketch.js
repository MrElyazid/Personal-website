let particles = [];
let quadtree;

function setup() {
    const canvas = createCanvas(windowWidth, windowHeight);
    canvas.id('particle-canvas');
    canvas.style('z-index', '-1');
    for (let i = 0; i < 100; i++) { // Reduced number of particles
        particles.push(new Particle());
    }
}

function draw() {
    background(240); // Light gray background

    // Initialize quadtree
    quadtree = new Quadtree(new Rectangle(width / 2, height / 2, width, height), 4);

    // Insert particles into quadtree
    for (let particle of particles) {
        let point = new Point(particle.pos.x, particle.pos.y, particle);
        quadtree.insert(point);
    }

    // Update and draw particles
    for (let particle of particles) {
        particle.update();
        particle.show();
        particle.checkParticles(quadtree);
    }
}

class Particle {
    constructor() {
        this.pos = createVector(random(width), random(height));
        this.vel = createVector(random(-1, 1), random(-1, 1));
        this.size = random(2, 5);
    }

    update() {
        this.pos.add(this.vel);
        this.edges();
        this.repel();
    }

    repel() {
        let d = dist(mouseX, mouseY, this.pos.x, this.pos.y);
        if (d < 100) {
            let force = p5.Vector.sub(this.pos, createVector(mouseX, mouseY));
            force.setMag(2);
            this.pos.add(force);
        }
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
        fill(173, 216, 230); // Light blue color
        ellipse(this.pos.x, this.pos.y, this.size);
    }

    checkParticles(quadtree) {
        let range = new Circle(this.pos.x, this.pos.y, 120);
        let points = quadtree.query(range);

        for (let point of points) {
            let other = point.userData;
            const d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
            if (d < 120) {
                stroke(200, 200, 200, 150); // Light gray lines
                line(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
            }
        }
    }
}

// Quadtree data structures
class Point {
    constructor(x, y, userData) {
        this.x = x;
        this.y = y;
        this.userData = userData;
    }
}

class Rectangle {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    contains(point) {
        return (point.x >= this.x - this.w &&
            point.x < this.x + this.w &&
            point.y >= this.y - this.h &&
            point.y < this.y + this.h);
    }

    intersects(range) {
        return !(range.x - range.r > this.x + this.w ||
            range.x + range.r < this.x - this.w ||
            range.y - range.r > this.y + this.h ||
            range.y + range.r < this.y - this.h);
    }
}

class Circle {
    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.rSquared = this.r * this.r;
    }

    contains(point) {
        let d = dist(point.x, point.y, this.x, this.y);
        return d <= this.r;
    }

    intersects(range) {
        let xDist = abs(range.x - this.x);
        let yDist = abs(range.y - this.y);

        // Radius of the circle
        let r = this.r;

        let w = range.w / 2;
        let h = range.h / 2;

        let edges = sq(xDist - w) + sq(yDist - h);

        // No intersection
        if (xDist > (r + w) || yDist > (r + h)) {
            return false;
        }

        // Intersection within the circle
        if (xDist <= w || yDist <= h) {
            return true;
        }

        // Intersection on the edge
        return edges <= this.rSquared;
    }
}

class Quadtree {
    constructor(boundary, capacity) {
        this.boundary = boundary;
        this.capacity = capacity;
        this.points = [];
        this.divided = false;
    }

    subdivide() {
        let x = this.boundary.x;
        let y = this.boundary.y;
        let w = this.boundary.w / 2;
        let h = this.boundary.h / 2;

        let ne = new Rectangle(x + w, y - h, w, h);
        this.northeast = new Quadtree(ne, this.capacity);
        let nw = new Rectangle(x - w, y - h, w, h);
        this.northwest = new Quadtree(nw, this.capacity);
        let se = new Rectangle(x + w, y + h, w, h);
        this.southeast = new Quadtree(se, this.capacity);
        let sw = new Rectangle(x - w, y + h, w, h);
        this.southwest = new Quadtree(sw, this.capacity);

        this.divided = true;
    }

    insert(point) {
        if (!this.boundary.contains(point)) {
            return false;
        }

        if (this.points.length < this.capacity) {
            this.points.push(point);
            return true;
        } else {
            if (!this.divided) {
                this.subdivide();
            }
            if (this.northeast.insert(point)) {
                return true;
            } else if (this.northwest.insert(point)) {
                return true;
            } else if (this.southeast.insert(point)) {
                return true;
            } else if (this.southwest.insert(point)) {
                return true;
            }
        }
    }

    query(range, found) {
        if (!found) {
            found = [];
        }

        if (!this.boundary.intersects(range)) {
            return found;
        } else {
            for (let p of this.points) {
                if (range.contains(p)) {
                    found.push(p);
                }
            }
            if (this.divided) {
                this.northwest.query(range, found);
                this.northeast.query(range, found);
                this.southwest.query(range, found);
                this.southeast.query(range, found);
            }
        }

        return found;
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
