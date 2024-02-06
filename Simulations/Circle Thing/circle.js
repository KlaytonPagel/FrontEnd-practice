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
        this.outerTop = this.outerY - this.outerRadius;
        this.outerBottom = this.outerY + this.outerRadius;
        this.outerPoints = [];

        this.innerRadius = this.outerRadius / 10;
        this.innerX = width / 2;
        this.innerY = height / 2
        this.innerDirectionY = 1;
        this.innerDirectionX = 1;
        this.innerSpeed = 10;
        this.innerColor = "red";
        this.innerColorIndex = 0;
        this.innerPoints = []

        console.log("created circle thing")

        this.first = true
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
        for (let x = this.outerX - this.outerRadius; x <= this.outerX + this.outerRadius; x += 4){
            this.pen.beginPath();
            let y = Math.sqrt((this.outerRadius + x - this.outerX)*(this.outerRadius - x + this.outerX)) + this.outerY
            if (this.first === true) {
                this.outerPoints.push([x, y])
            }
            this.pen.arc(x, y, 1, 0, Math.PI * 2)
            this.pen.stroke();
        }
        for (let x = this.outerX - this.outerRadius; x <= this.outerX + this.outerRadius; x += 4){
            this.pen.beginPath();
            let y = -Math.sqrt((this.outerRadius + x - this.outerX)*(this.outerRadius - x + this.outerX)) + this.outerY
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
        for (let x = this.innerX - this.innerRadius; x <= this.innerX + this.innerRadius; x += 4){
            this.pen.beginPath();
            let y = Math.sqrt((this.innerRadius + x - this.innerX)*(this.innerRadius - x + this.innerX)) + this.innerY
            this.innerPoints.push([x, y])
            this.pen.arc(x, y, 1, 0, Math.PI * 2)
            this.pen.stroke();
        }
        for (let x = this.innerX - this.innerRadius; x <= this.innerX + this.innerRadius; x += 4){
            this.pen.beginPath();
            let y = -Math.sqrt((this.innerRadius + x - this.innerX)*(this.innerRadius - x + this.innerX)) + this.innerY
            this.innerPoints.push([x, y])
            this.pen.arc(x, y, 1, 0, Math.PI * 2)
            this.pen.stroke();
        }
    }

    // Checks for collision between the outer nd inner circles__________________________________________________________
    checkCollision() {
        for (let outerIndex = 0; outerIndex < this.outerPoints.length; outerIndex ++) {
            for (let innerIndex = 0; innerIndex < this.innerPoints.length; innerIndex++) {

                // Bottom right segment
                if (this.outerPoints[outerIndex][0] > this.outerX && this.outerPoints[outerIndex][1] > this.outerY) {
                    if (this.innerPoints[innerIndex][0] > this.outerPoints[outerIndex][0]&&
                        this.innerPoints[innerIndex][1] > this.outerPoints[outerIndex][1]) {
                        this.innerDirectionX *= -1;
                        this.innerDirectionY *= -1;
                    }
                }

                // Bottom left segment
                if (this.outerPoints[outerIndex][0] < this.outerX && this.outerPoints[outerIndex][1] > this.outerY) {
                    if (this.innerPoints[innerIndex][0] < this.outerPoints[outerIndex][0]&&
                        this.innerPoints[innerIndex][1] > this.outerPoints[outerIndex][1]) {
                        this.innerDirectionX *= -1;
                        this.innerDirectionY *= -1;
                    }
                }

                // Top left segment
                if (this.outerPoints[outerIndex][0] < this.outerX && this.outerPoints[outerIndex][1] < this.outerY) {
                    if (this.innerPoints[innerIndex][0] < this.outerPoints[outerIndex][0]&&
                        this.innerPoints[innerIndex][1] < this.outerPoints[outerIndex][1]) {
                        this.innerDirectionX *= -1;
                        this.innerDirectionY *= -1;
                    }
                }

                // Top right segment
                if (this.outerPoints[outerIndex][0] > this.outerX && this.outerPoints[outerIndex][1] < this.outerY) {
                    if (this.innerPoints[innerIndex][0] > this.outerPoints[outerIndex][0]&&
                        this.innerPoints[innerIndex][1] < this.outerPoints[outerIndex][1]) {
                        this.innerDirectionX *= -1;
                        this.innerDirectionY *= -1;
                    }
                }
            }
        }
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

    // The main loop that makes changes and updates everything or every frame___________________________________________
    update() {
        this.checkCollision()
        this.pen.clearRect(0, 0, width, height);
        this.innerY += this.innerSpeed * this.innerDirectionY;
        this.innerX += 0.5 * this.innerDirectionX;
        //this.createInnerCircle();
        //this.createOuterCircle();

        this.findInnerPoints();
        this.findOuterPoints();
    }
}

// Create the simulation object
let circ = new circleThing(pen);

// Animation loop to run the simulation
function running() {
    circ.update();
    requestAnimationFrame(running);
}

running();