const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const widthControl = document.getElementById("widthControl");
const heightControl = document.getElementById("heightControl");
const slider = document.getElementById("cantidad");

let window_width = widthControl.value;
let window_height = heightControl.value;

canvas.width = window_width;
canvas.height = window_height;

let circles = [];

class Circle {
  constructor(x, y, radius, speed) {
    this.posX = x;
    this.posY = y;
    this.radius = radius;

    this.dx = (Math.random() - 0.5) * speed;
    this.dy = (Math.random() - 0.5) * speed;
  }

  draw(context) {
    context.beginPath();

    // Glass effect en círculo
    context.fillStyle = "rgba(255,255,255,0.1)";
    context.strokeStyle = "rgba(255,255,255,0.5)";
    context.lineWidth = 2;

    context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2);
    context.fill();
    context.stroke();
  }

  update(context) {

    // Rebote PERFECTO
    if (this.posX + this.radius >= window_width) {
      this.posX = window_width - this.radius;
      this.dx *= -1;
    }

    if (this.posX - this.radius <= 0) {
      this.posX = this.radius;
      this.dx *= -1;
    }

    if (this.posY + this.radius >= window_height) {
      this.posY = window_height - this.radius;
      this.dy *= -1;
    }

    if (this.posY - this.radius <= 0) {
      this.posY = this.radius;
      this.dy *= -1;
    }

    this.posX += this.dx;
    this.posY += this.dy;

    this.draw(context);
  }
}

function crearCirculos(cantidad) {
  circles = [];

  for (let i = 0; i < cantidad; i++) {
    let radius = Math.random() * 30 + 10;

    let x = Math.random() * (window_width - 2 * radius) + radius;
    let y = Math.random() * (window_height - 2 * radius) + radius;

    let speed = Math.random() * 4 + 1;

    circles.push(new Circle(x, y, radius, speed));
  }
}

function update() {
  requestAnimationFrame(update);
  ctx.clearRect(0, 0, window_width, window_height);

  circles.forEach(c => c.update(ctx));
}

update();


// 🎛️ EVENTOS

widthControl.addEventListener("input", () => {
  window_width = widthControl.value;
  canvas.width = window_width;
  crearCirculos(slider.value);
});

heightControl.addEventListener("input", () => {
  window_height = heightControl.value;
  canvas.height = window_height;
  crearCirculos(slider.value);
});

slider.addEventListener("input", () => {
  crearCirculos(slider.value);
});

// Inicializar
crearCirculos(slider.value);