const screen = document.getElementById("screen");
const pen = screen.getContext("2d");
let width = window.innerWidth - 20;
let height = window.innerHeight - 20;
screen.width = width;
screen.height = height;

class circleThing {
    constructor(pen) {
        this.pen = pen;
        console.log("created circle thing")
        this.createOuterCircle()
    }

    createOuterCircle() {
        this.pen.lineWidth = 10;
        this.pen. beginPath();
        this.pen.arc(width/2, height/2, width/3, 0, Math.PI * 2);
        this.pen.stroke();
    }
}

new circleThing(pen)