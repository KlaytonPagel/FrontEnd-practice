const screen = document.getElementById("screen")
const pen = screen.getContext("2d")

let width = window.innerWidth;
let height = window.innerHeight;
let halfWidth = width / 2;
let halfHeight = height / 2;
screen.width = width;
screen.height = height;


const mA = 0.1;
const mB = 0.3;
const b = 1;

const objects = [];

class Circle {
    constructor(context, x, y, speed, radius) {
        this.pen = context;
        this.radius = radius
        this.x = x;
        this.y = y;
        this.color = 1;
        this.velocityX = speed;
        this.velocityY = speed;
        this.speed = speed;

        this.colliding = false;
    }

    draw() {
        this.pen.beginPath();
        this.pen.lineWidth = 3;
        this.pen.fillStyle = "hsl(" + this.color + ", 100%, 50%)";
        this.pen.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        this.pen.fill();
        this.pen.stroke();
    }

    wallCollision() {
        if (this.x + this.radius > width) {
            this.x = width - this.radius;
            this.velocityX *= -1;
        } else if (this.x - this.radius < 0) {
            this.x = this.radius;
            this.velocityX *= -1;
        } else if (this.y + this.radius > height) {
            this.y = height - this.radius;
            this.velocityY *= -1
        } else if (this.y - this.radius < 0) {
            this.y = this.radius;
            this.velocityY *= -1;
        }
    }

    objectCollision() {
        this.colliding = false;
        for (let index = 0; index <= objects.length-1; index ++) {
            let radiusSum = objects[index].radius + this.radius;
            let distance = Math.sqrt(((objects[index].x - this.x)**2) + ((objects[index].y - this.y)**2))
            if (objects[index] !== this) {
                if (distance <= radiusSum) {
                    this.collisionResponse(index)
                    this.colliding = true;
                }
            }
        }
    }

    collisionResponse(index) {
        let object = objects[index];
        let collisionVector = {x: object.x - this.x, y: object.y - this.y};
        let distance = Math.sqrt((object.x-this.x)*(object.x-this.x) + (object.y-this.y)*(object.y-this.y));
        let normalVector = {x: collisionVector.x / distance, y: collisionVector.y / distance};
        let relativeVelocity = {x: object.velocityX-this.velocityX, y: object.velocityY-this.velocityY};
        let speed = relativeVelocity.x * normalVector.x + relativeVelocity.y * normalVector.y;
        object.velocityX = this.speed * normalVector.x;
        object.velocityY = this.speed * normalVector.y;
        this.velocityX = this.speed * -normalVector.x;
        this.velocityY = this.speed * -normalVector.y;
        this.color += 1;
        if (this.color > 360) {
            this.color = 1;
        }

    }

    move() {
        this.x += this.velocityX;
        this.y += this.velocityY;
    }


    update () {
        this.objectCollision();
        this.wallCollision();
        this.move();
        this.draw();
    }
}
let maxSize = 100;
let xSpots = Math.floor(width / maxSize);
let ySpots = Math.floor(height / maxSize);
for (let x = 1; x <= xSpots; x++) {
    for (let y = 1; y <= ySpots; y++) {
        let size = 100 * Math.random();
        let chance = Math.random()
        if (chance > 0) {
                objects.push(new Circle(pen, x * maxSize - maxSize/2, y * maxSize - maxSize/2, Math.random() + .5, size / 2));
        }
    }
}

function running() {
    pen.clearRect(0, 0, width, height);

    for (let index = 0; index <= objects.length - 1; index++) {
        objects[index].update();
    }

    requestAnimationFrame(running)
}
running()