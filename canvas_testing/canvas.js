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

// Creates a line
pen.moveTo(0,0); // Line starting point
pen.lineTo(width, height); // Line ending point
pen.stroke(); // Makes the line visible