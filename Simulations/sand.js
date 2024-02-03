// Set up canvas________________________________________________________________________________________________________
screen = document.getElementById("screen");
pen = screen.getContext("2d");
let width  = window.innerWidth;
let height  = window.innerHeight;
screen.width = width;
screen.height = height;

const tileSize = 32;
const rowCount = Math.floor(height / tileSize);
const colCount = Math.floor(width / tileSize);

let sand = [];

// Set the listener for mouse clicks____________________________________________________________________________________
let mouseState = false;

screen.addEventListener('click', addSand);

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
function addSand(event){
    mouseX = event.offsetX;
    mouseY = event.offsetY;
    console.log(event)
    let sandX = Math.floor(mouseX / tileSize) * tileSize;
    let sandY = Math.floor(mouseY / tileSize) * tileSize;
    sand.push([sandX, sandY, tileSize, tileSize, 1])
}

// Draw all sand________________________________________________________________________________________________________
function drawSand(){
    for (let index = 0; index < sand.length; index++) {
        let data = sand[index];
        let speed = sandSpeed(data)
        pen.fillRect(data[0], data[1] += speed, data[2], data[3])
        pen.stroke()
    }
}

// Sets the sands movement speed________________________________________________________________________________________
function sandSpeed(data){
    let move = checkBelow(data);
    if (move ===  true) {
        data[4] += 0
        return Math.floor(data[4]) * tileSize
    } else {
        return 0
    }
}

// Checks the tile below the current sand_______________________________________________________________________________
function checkBelow(data){
    if (data[1] + tileSize === rowCount * tileSize){
        return false
    }
    for (let index = 0; index < sand.length; index++){
        let tile = sand[index];
        if (data[1] + tileSize === tile[1] && data[0] === tile[0]){
            return false;
        }
    }
    return true;
}

// Checks for users input_______________________________________________________________________________________________
function userInput(){

}

// The main program loop________________________________________________________________________________________________
function running(){
    pen.clearRect(0, 0, width, height); // Clear the screen
    drawSand(); // Draws the sand the player places
    drawBoundary();// Draw a boundary around canvas
    drawGrid(); // Draw the grid on the screen

    setTimeout(() => {requestAnimationFrame(running) }, 1000/60)
}

running()

