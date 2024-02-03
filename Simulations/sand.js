// Set up canvas________________________________________________________________________________________________________
screen = document.getElementById("screen");
pen = screen.getContext("2d");
let width  = window.innerWidth;
let height  = window.innerHeight;
screen.width = width;
screen.height = height;

const tileSize = 32;
const rowCount = height / tileSize;
const colCount = width / tileSize;

let sand = [];

// Set the listener for mouse clicks____________________________________________________________________________________
let mouseX;
let mouseY;

const mouse = screen.addEventListener('click', event => {
    addSand(event.clientX - 10, event.clientY - 10);
});

// Draw a gird on the screen____________________________________________________________________________________________
function drawGrid(){
    for (let row = 0; row < rowCount; row++){
        for (let col = 0; col < colCount; col++){
            pen.beginPath();
            pen.rect(col * tileSize, row * tileSize, tileSize, tileSize)
            pen.stroke();
        }
    }
}

// Draw screen boundary_________________________________________________________________________________________________
function drawBoundary(){
    // Draw lines around the boundary of the canvas
    pen.moveTo(0,0);
    pen.lineTo(width, 0);
    pen.lineTo(width, height);
    pen.lineTo(0, height);
    pen.lineTo(0, 0);
    pen.stroke();

}

// Add a sand tile to an array__________________________________________________________________________________________
function addSand(mouseX, mouseY){
    let sandX = Math.floor(mouseX / tileSize) * tileSize;
    let sandY = Math.floor(mouseY / tileSize) * tileSize;
    sand.push([sandX, sandY, tileSize, tileSize])
}

// Draw all sand________________________________________________________________________________________________________
function drawSand(){
    for (let index = 0; index < sand.length; index++) {
        data = sand[index];
        pen.fillRect(data[0], data[1] += tileSize, data[2], data[3])
        pen.stroke()
    }
}

// The main program loop________________________________________________________________________________________________
function running(){
    pen.clearRect(0, 0, width, height); // Clear the screen
    drawSand(); // Draws the sand the player places
    drawBoundary();// Draw a boundary around canvas
    drawGrid(); // Draw the grid on the screen

    setTimeout(() => {requestAnimationFrame(running) }, 1000/20)
}

running()

