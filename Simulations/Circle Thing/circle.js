const screen = document.getElementById("screen");
const pen = screen.getContext("2d");
let width = window.innerWidth - 20;
let height = window.innerHeight - 20;
screen.width = width;
screen.height = height;

class circleThing {
    constructor(pen) {
        this.pen = pen;

        this.outerRadius = width / 3;
        this.outerX = width / 2;
        this.outerY = height / 2;

        this.innerRadius = this.outerRadius / 10;
        this.innerX = width / 2;
        this.innerY = height / 2

        console.log("created circle thing")
    }

    createOuterCircle() {
        this.pen.lineWidth = 5;
        this.pen. beginPath();
        this.pen.arc(this.outerX, this.outerY, this.outerRadius, 0, Math.PI * 2);
        this.pen.stroke();
    }

    createInnerCircle() {
        this.pen.lineWidth = 5;
        this.pen. beginPath();
        this.pen.arc(this.innerX, this.innerY, this.innerRadius, 0, Math.PI * 2);
        this.pen.stroke();
    }

    update () {
        this.pen.clearRect(0, 0, width, height);
        this.innerY += 0.5;
        this.createInnerCircle();
        this.createOuterCircle();
    }
}

let circ = new circleThing(pen);

function running() {
    circ.update();
    requestAnimationFrame(running);
}

running();