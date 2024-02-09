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
        this.hue = 0;

        this.outerRadius = width / 2;
        this.outerX = width / 2;
        this.outerY = height / 2;
        this.outerPoints = [];
        this.getOuterSize();
        this.findOuterPoints();

        this.innerRadius = this.outerRadius / 10;
        this.innerX = width / 2 - this.outerRadius / 1.5;
        this.innerY = height / 2
        this.innerDirectionY = 1;
        this.innerDirectionX = 0;
        this.innerSpeed = 10;
        this.innerPoints = [];
        this.previousPoints = [];

        this.currentVelocity = 0;

        this.collisions = 0;

        this.audioFiles = [
            "Audio/Note1.wav",
            "Audio/Note2.wav",
            "Audio/Note3.wav",
            "Audio/Note4.wav",
            "Audio/Note5.wav",
            "Audio/Note6.wav",
            "Audio/Note7.wav",
            "Audio/Note8.wav",
            "Audio/Note9.wav",
            "Audio/Note10.wav",
            "Audio/Note11.wav",
            "Audio/Note12.wav",
        ]

        this.currentAudio = 0

        console.log("created circle thing")


    }

    // Sets the size of the outer circle based on the smallest axis_____________________________________________________
    getOuterSize() {
        if (width < height){
            this.outerRadius =  width / 2;
        } else {
            this.outerRadius = height / 2;
        }
    }

    // Draws the outer circle___________________________________________________________________________________________
    drawOuterCircle() {
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
            let y = Math.sqrt((this.outerRadius + x - this.outerX)*(this.outerRadius - x + this.outerX)) + this.outerY
            this.outerPoints.push([x, y])
        }
        // Top half
        for (let x = this.outerX - this.outerRadius; x <= this.outerX + this.outerRadius; x += 10){
            let y = -Math.sqrt((this.outerRadius + x - this.outerX)*(this.outerRadius - x + this.outerX)) + this.outerY
            this.outerPoints.push([x, y])
        }
        // Right half
        for (let y = this.outerY - this.outerRadius; y <= this.outerY + this.outerRadius; y += 10){
            let x = Math.sqrt((this.outerRadius + y - this.outerY)*(this.outerRadius - y + this.outerY)) + this.outerX
            this.outerPoints.push([x, y])
        }
        // Left half
        for (let y = this.outerY - this.outerRadius; y <= this.outerY + this.outerRadius; y += 10){
            let x = -Math.sqrt((this.outerRadius + y - this.outerY)*(this.outerRadius - y + this.outerY)) + this.outerX
            this.outerPoints.push([x, y])
        }
    }

    // Draws the inner circle___________________________________________________________________________________________
    drawInnerCircle() {
        this.pen.lineWidth = 10;
        this.pen.beginPath();
        this.pen.strokeStyle = "black"
        this.pen.fillStyle = "hsl(" + this.hue + ", 100%, 50%)";

        // Draw past circle positions
        for (let index = 0; index < this.previousPoints.length; index++) {
            this.pen.beginPath();
            this.pen.arc(this.previousPoints[index][0], this.previousPoints[index][1], this.innerRadius, 0, Math.PI * 2)
            this.pen.fill();
            this.pen.stroke();
        }

        // Draw current circle position
        this.pen.arc(this.innerX, this.innerY, this.innerRadius, 0, Math.PI * 2);
        this.pen.stroke();
        this.pen.fill();
    }

    // Find points on the inner circle__________________________________________________________________________________
    findInnerPoints() {
        this.innerPoints = [];

        // Bottom half
        for (let x = this.innerX - this.innerRadius; x <= this.innerX + this.innerRadius; x += 5){
            let y = Math.sqrt((this.innerRadius + x - this.innerX)*(this.innerRadius - x + this.innerX)) + this.innerY
            this.innerPoints.push([x, y])
        }
        // Top half
        for (let x = this.innerX - this.innerRadius; x <= this.innerX + this.innerRadius; x += 5){
            let y = -Math.sqrt((this.innerRadius + x - this.innerX)*(this.innerRadius - x + this.innerX)) + this.innerY
            this.innerPoints.push([x, y])
        }
        // Right half
        for (let y = this.innerY - this.innerRadius; y <= this.innerY + this.innerRadius; y += 5){
            let x = Math.sqrt((this.innerRadius + y - this.innerY)*(this.innerRadius - y + this.innerY)) + this.innerX
            this.innerPoints.push([x, y])
        }
        // Left half
        for (let y = this.innerY - this.innerRadius; y <= this.innerY + this.innerRadius; y += 5){
            let x = -Math.sqrt((this.innerRadius + y - this.innerY)*(this.innerRadius - y + this.innerY)) + this.innerX
            this.innerPoints.push([x, y])
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
                        this.getSlope(outerIndex);
                        this.innerDirectionX = this.vect.y
                        this.innerDirectionY = -this.vect.x
                        this.collide();
                        return;
                    }
                }

                // Bottom left segment
                else if (this.outerPoints[outerIndex][0] < this.outerX && this.outerPoints[outerIndex][1] > this.outerY) {
                    if (this.innerPoints[innerIndex][0] < this.outerPoints[outerIndex][0]&&
                        this.innerPoints[innerIndex][1] > this.outerPoints[outerIndex][1]) {
                        this.getSlope(outerIndex);
                        this.innerDirectionX = this.vect.y
                        this.innerDirectionY = -this.vect.x
                        this.collide();
                        return;
                    }
                }

                // Top left segment
                else if (this.outerPoints[outerIndex][0] < this.outerX && this.outerPoints[outerIndex][1] < this.outerY) {
                    if (this.innerPoints[innerIndex][0] < this.outerPoints[outerIndex][0]&&
                        this.innerPoints[innerIndex][1] < this.outerPoints[outerIndex][1]) {
                        this.getSlope(outerIndex);
                        this.innerDirectionX = -this.vect.y
                        this.innerDirectionY = this.vect.x
                        this.collide();
                        return;
                    }
                }

                // Top right segment
                else if (this.outerPoints[outerIndex][0] > this.outerX && this.outerPoints[outerIndex][1] < this.outerY) {
                    if (this.innerPoints[innerIndex][0] > this.outerPoints[outerIndex][0]&&
                        this.innerPoints[innerIndex][1] < this.outerPoints[outerIndex][1]) {
                        this.getSlope(outerIndex);
                        this.innerDirectionX = -this.vect.y
                        this.innerDirectionY = this.vect.x
                        this.collide();
                        return;
                    }
                }
            }
        }
    }

    // Changes made when the ball collides______________________________________________________________________________
    collide() {
        this.hue += 1 // Change the color of the circle
        this.currentVelocity = 0; // reset gravity

        this.innerSpeed += .5;
        this.innerRadius += .5;

        // set the position to the circles last position
        this.innerX = this.previousPoints[this.previousPoints.length - 1][0]
        this.innerY = this.previousPoints[this.previousPoints.length - 1][1]

        this.collisions ++

        //new Audio(this.audioFiles[this.currentAudio]).play();
        this.updateAudio();
    }

    getSlope(outerIndex) {

        // Gets the slope of the spot the ball collided with
        let outerRise = this.outerPoints[outerIndex][1] - this.outerPoints[outerIndex-1][1];
        let outerRun = this.outerPoints[outerIndex][0] - this.outerPoints[outerIndex-1][0];

        this.vect = {
            x: outerRun / Math.sqrt((outerRun * outerRun) + (outerRise*outerRise)),
            y: outerRise / Math.sqrt((outerRun * outerRun) + (outerRise*outerRise))
        }
    }

    updateAudio() {
        this.currentAudio++;
        if (this.currentAudio > this.audioFiles.length -1){
            this.currentAudio = 0;
        }
    }

    move() {
        this.checkCollision();
        this.previousPoints.push([this.innerX, this.innerY])
        this.innerY += (this.innerSpeed * this.innerDirectionY) + this.currentVelocity;
        this.innerX += this.innerSpeed * this.innerDirectionX;

        this.currentVelocity += .05; // Increase the effect of gravity
    }

    // The main loop that makes changes and updates everything or every frame___________________________________________
    update() {
        this.pen.clearRect(0, 0, width, height);

        this.move();

        this.drawInnerCircle();
        this.drawOuterCircle();

        this.findInnerPoints();

        if (this.previousPoints.length > 20){
            this.previousPoints.shift();
        }

        this.debug(this.collisions)
    }

    // Display the provided information as text on screen_______________________________________________________________
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
    setTimeout(() => requestAnimationFrame(running), 1000/60)
    //requestAnimationFrame(running);
}

running();