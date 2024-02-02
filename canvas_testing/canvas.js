const canvas = document.getElementById("screen");
const pen = canvas.getContext("2d")

// Set the width and height
let width = 1400;
let height = 700;
canvas.width = width;
canvas.height = height;

// Creates the color of the fill
pen.fillStyle = "#8f3a3a";

// Makes a rectangle filled with the fillStyle color
pen.fillRect(width/2/2, height/2/2, width/2, height/2);



// animates a line bouncing back end fourth_____________________________________________________________________________
let start = 0;
let speed = 3;
let direction = 0;
run();
function run(){
    // Clears the last frame and begins a new path
    pen.clearRect(0,0, width, height);
    pen.beginPath();

    // Checks the direction it is moving then moves it
    if (direction == 0) {
        pen.moveTo(start += speed, 0); // Line starting point
        pen.lineTo(start += speed, height); // Line ending point
    } else if (direction == 1) {
        pen.moveTo(start -= speed, 0); // Line starting point
        pen.lineTo(start -= speed, height); // Line ending point
    }

    // Checks to see if it has hit the wall yet
    if (start > width) {
        direction = 1;
    } else if (start < 0){
        direction = 0;
    }

    // Thickens the line and draws it
    pen.lineWidth = 50;
    pen.stroke();

    // Moves to the next frame
    requestAnimationFrame(run);
}