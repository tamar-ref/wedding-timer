const canvas = document.getElementById('heartsCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const hearts = [];

function random(min, max) {
    return Math.random() * (max - min) + min;
}

class Heart {
    constructor() {
        this.x = random(0, canvas.width);
        this.y = random(-canvas.height, 0);
        this.size = random(10, 25);
        this.speed = random(1, 3);
        this.angle = random(0, Math.PI * 2);
        this.color = `rgba(255, ${Math.floor(random(100, 200))}, ${Math.floor(random(150, 255))}, 0.8)`;
    }
    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(Math.sin(this.angle) * 0.5);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(this.size / 2, -this.size / 2, this.size, this.size / 3, 0, this.size);
        ctx.bezierCurveTo(-this.size, this.size / 3, -this.size / 2, -this.size / 2, 0, 0);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
    }
    update() {
        this.y += this.speed;
        this.x += Math.sin(this.angle) * 0.5;
        this.angle += 0.01;
        if (this.y > canvas.height + this.size) {
            this.y = -this.size;
            this.x = random(0, canvas.width);
        }
    }
}

for (let i = 0; i < 50; i++) {
    hearts.push(new Heart());
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hearts.forEach(h => {
        h.update();
        h.draw();
    });
    requestAnimationFrame(animate);
}

animate();
