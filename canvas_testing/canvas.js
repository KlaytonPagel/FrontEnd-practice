const canvas = document.getElementById("screen");
const pen = canvas.getContext("2d")

// Set the width and height
let width = 1400;
let height = 700;
canvas.width = width;
canvas.height = height;

// Creates the color of the fill
pen.fillStyle = "#8f3a3a";

// Creates the color for the lines
pen.strokeStyle = "#278378";

// starts a drawing pathway
pen.beginPath();

// Makes a rectangle filled with the fillStyle color
pen.fillRect(width/2/2, height/2/2, width/2, height/2);

// Makes a line
pen.moveTo(175, 150) // Sets the start point of the line
pen.lineTo(300, 150) // Sets the end point of the line

// makes an unfilled rectangle with the x, y, width, height parameters
pen.rect(50,50,100,100)

// Draws an arc at the x, y, radius, start angle end angle
pen.moveTo(740, 50)
pen.arc(700, 50, 40, 0, 2 ) // use 2 * pi end angle for circle

// sets the line width of shape's lines
pen.lineWidth = 10;

// Draws all shapes, lines, etc
pen.stroke();



// animates a line bouncing back end fourth_____________________________________________________________________________
let start = 0;
let speed = 3;
let direction = 0;
// run();
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