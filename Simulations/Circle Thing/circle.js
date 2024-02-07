const screen = document.getElementById("screen");
const pen = screen.getContext("2d");
let width = window.innerWidth - 20;
let height = window.innerHeight - 20;
screen.width = width;
screen.height = height;


// Class to run and build the whole simulation__________________________________________________________________________
class circleThing {

    // Constructor to initialize all variables and values______________________________________________________________
    constructor(pen) {
        this.pen = pen;
        this.colors = ["red", "blue", "green", "white", "orange", "pink", "black", "yellow"]

        this.outerRadius = width / 5;
        this.outerX = width / 2;
        this.outerY = height / 2;
        this.outerPoints = [];

        this.innerRadius = this.outerRadius / 10;
        this.innerX = width / 2;
        this.innerY = height / 2
        this.innerDirectionY = 1;
        this.innerDirectionX = 0;
        this.innerSpeed = 5;
        this.innerColor = "red";
        this.innerColorIndex = 0;
        this.innerPoints = [];
        this.previousX = this.innerX;
        this.previousY = this.innerY;
        this.previousPoints = [];

        this.currentVelocity = 0;

        console.log("created circle thing")

        this.first = true
        this.collisions = 0;
    }

    // Draws the outer circle___________________________________________________________________________________________
    createOuterCircle() {
        this.pen.lineWidth = 5;
        this.pen.beginPath()
        this.pen.arc(this.outerX, this.outerY, this.outerRadius, 0 , Math.PI*2);
        this.pen.stroke();
    }

    // Finds all points for the outer circle____________________________________________________________________________
    findOuterPoints() {
        this.pen.lineWidth = 10;

        // Bottom half
        for (let x = this.outerX - this.outerRadius; x <= this.outerX + this.outerRadius; x += 10){
            this.pen.beginPath();
            let y = Math.sqrt((this.outerRadius + x - this.outerX)*(this.outerRadius - x + this.outerX)) + this.outerY
            if (this.first === true) {
                this.outerPoints.push([x, y])
            }
            this.pen.arc(x, y, 1, 0, Math.PI * 2)
            this.pen.stroke();
        }
        // Top half
        for (let x = this.outerX - this.outerRadius; x <= this.outerX + this.outerRadius; x += 10){
            this.pen.beginPath();
            let y = -Math.sqrt((this.outerRadius + x - this.outerX)*(this.outerRadius - x + this.outerX)) + this.outerY
            if (this.first === true) {
                this.outerPoints.push([x, y])
            }
            this.pen.arc(x, y, 1, 0, Math.PI * 2)
            this.pen.stroke();
        }
        // Right half
        for (let y = this.outerY - this.outerRadius; y <= this.outerY + this.outerRadius; y += 10){
            this.pen.beginPath();
            let x = Math.sqrt((this.outerRadius + y - this.outerY)*(this.outerRadius - y + this.outerY)) + this.outerX
            if (this.first === true) {
                this.outerPoints.push([x, y])
            }
            this.pen.arc(x, y, 1, 0, Math.PI * 2)
            this.pen.stroke();
        }
        // Left half
        for (let y = this.outerY - this.outerRadius; y <= this.outerY + this.outerRadius; y += 10){
            this.pen.beginPath();
            let x = -Math.sqrt((this.outerRadius + y - this.outerY)*(this.outerRadius - y + this.outerY)) + this.outerX
            if (this.first === true) {
                this.outerPoints.push([x, y])
            }
            this.pen.arc(x, y, 1, 0, Math.PI * 2)
            this.pen.stroke();
        }
        this.first = false;
    }

    // Draws the inner circle___________________________________________________________________________________________
    createInnerCircle() {
        this.pen.lineWidth = 10;
        this.pen.beginPath();
        this.pen.strokeStyle = "black"
        this.pen.fillStyle = this.innerColor
        this.pen.arc(this.innerX, this.innerY, this.innerRadius, 0, Math.PI * 2);
        this.pen.stroke();
        this.pen.fill();
    }

    findInnerPoints() {
        this.innerPoints = [];

        // Bottom half
        for (let x = this.innerX - this.innerRadius; x <= this.innerX + this.innerRadius; x += 5){
            this.pen.beginPath();
            let y = Math.sqrt((this.innerRadius + x - this.innerX)*(this.innerRadius - x + this.innerX)) + this.innerY
            this.innerPoints.push([x, y])
            this.pen.arc(x, y, 1, 0, Math.PI * 2)
            this.pen.stroke();
        }

        // Top half
        for (let x = this.innerX - this.innerRadius; x <= this.innerX + this.innerRadius; x += 5){
            this.pen.beginPath();
            let y = -Math.sqrt((this.innerRadius + x - this.innerX)*(this.innerRadius - x + this.innerX)) + this.innerY
            this.innerPoints.push([x, y])
            this.pen.arc(x, y, 1, 0, Math.PI * 2)
            this.pen.stroke();
        }
        // Right half
        for (let y = this.innerY - this.innerRadius; y <= this.innerY + this.innerRadius; y += 5){
            this.pen.beginPath();
            let x = Math.sqrt((this.innerRadius + y - this.innerY)*(this.innerRadius - y + this.innerY)) + this.innerX
            this.innerPoints.push([x, y])
            this.pen.arc(x, y, 1, 0, Math.PI * 2)
            this.pen.stroke();
        }
        // Left half
        for (let y = this.innerY - this.innerRadius; y <= this.innerY + this.innerRadius; y += 5){
            this.pen.beginPath();
            let x = -Math.sqrt((this.innerRadius + y - this.innerY)*(this.innerRadius - y + this.innerY)) + this.innerX
            this.innerPoints.push([x, y])
            this.pen.arc(x, y, 1, 0, Math.PI * 2)
            this.pen.stroke();
        }
    }

    // Checks for collision between the outer and inner circles_________________________________________________________
    checkCollision() {
        for (let outerIndex = 0; outerIndex < this.outerPoints.length; outerIndex ++) {
            for (let innerIndex = 0; innerIndex < this.innerPoints.length; innerIndex++) {

                // Bottom right segment
                if (this.outerPoints[outerIndex][0] > this.outerX && this.outerPoints[outerIndex][1] > this.outerY) {
                    if (this.innerPoints[innerIndex][0] > this.outerPoints[outerIndex][0]&&
                        this.innerPoints[innerIndex][1] > this.outerPoints[outerIndex][1]) {
                        this.collide();
                        this.innerDirectionY = -1;
                        return;
                    }
                }

                // Bottom left segment
                else if (this.outerPoints[outerIndex][0] < this.outerX && this.outerPoints[outerIndex][1] > this.outerY) {
                    if (this.innerPoints[innerIndex][0] < this.outerPoints[outerIndex][0]&&
                        this.innerPoints[innerIndex][1] > this.outerPoints[outerIndex][1]) {
                        this.collide();
                        this.innerDirectionY = -1;
                        return;
                    }
                }

                // Top left segment
                else if (this.outerPoints[outerIndex][0] < this.outerX && this.outerPoints[outerIndex][1] < this.outerY) {
                    if (this.innerPoints[innerIndex][0] < this.outerPoints[outerIndex][0]&&
                        this.innerPoints[innerIndex][1] < this.outerPoints[outerIndex][1]) {
                        this.collide();
                        this.innerDirectionY = 1;
                        return;
                    }
                }

                // Top right segment
                else if (this.outerPoints[outerIndex][0] > this.outerX && this.outerPoints[outerIndex][1] < this.outerY) {
                    if (this.innerPoints[innerIndex][0] > this.outerPoints[outerIndex][0]&&
                        this.innerPoints[innerIndex][1] < this.outerPoints[outerIndex][1]) {
                        this.collide();
                        this.innerDirectionY = 1;
                        return;
                    }
                }
            }
        }
    }

    collide() {
        this.changeColor();
        this.innerDirectionX *= -1;
        this.currentVelocity = 0;
        this.innerDirectionX += 0;
        this.innerX = this.previousPoints[this.previousPoints.length - 1][0]
        this.innerY = this.previousPoints[this.previousPoints.length - 1][1]
        this.collisions ++
        console.log(this.innerDirectionX)

    }


    // Loops through an array of colors_________________________________________________________________________________
    changeColor() {
        if (this.innerColor === this.colors[this.colors.length - 1]) {
            this.innerColor = this.colors[0]
            this.innerColorIndex = 0;
        } else {
            this.innerColor = this.colors[this.innerColorIndex += 1]
        }
    }

    move() {
        this.checkCollision();
        this.previousPoints.push([this.innerX, this.innerY])
        this.previousX = this.innerX;
        this.previousY = this.innerY;
        this.innerY += (this.innerSpeed * this.innerDirectionY) + this.currentVelocity;
        this.innerX += this.innerSpeed * this.innerDirectionX;

        this.currentVelocity += .1;
    }

    // The main loop that makes changes and updates everything or every frame___________________________________________
    update() {
        this.pen.clearRect(0, 0, width, height);

        this.move();

        //this.createInnerCircle();
        //this.createOuterCircle();

        this.findInnerPoints();
        this.findOuterPoints();

        for (let index = 0; index < this.previousPoints.length; index++) {
            this.pen.beginPath();
            this.pen.arc(this.previousPoints[index][0], this.previousPoints[index][1], this.innerRadius, 0, Math.PI * 2)
            //this.pen.stroke();
        }
        if (this.previousPoints.length > 1){
            this.previousPoints.shift();
        }

        this.debug(this.collisions)
    }

    debug(text) {
        this.pen.beginPath()
        this.pen.font = "50px Arial"
        this.pen.fillText(text,50, 50)
        this.pen.stroke()
    }
}

// Create the simulation object
let circ = new circleThing(pen);

// Animation loop to run the simulation
function running() {
    circ.update();
    //setTimeout(() => requestAnimationFrame(running), 1000/60)
    requestAnimationFrame(running);
}

running();