//Botão start
window.onload = () => {
  document.getElementById("start-button").onclick = () => {
    startGame();
  };
};

//botões para movimentar o
document.addEventListener("keydown", (e) => {
  //console.log(e) P/ ver o keycode

  switch (e.key) {
    case "ArrowLeft":
      player.moveLeft();
      break;

    case "ArrowRight":
      player.moveRight();
      break;

    case "ArrowUp":
      player.moveUp();
      break;

    case "ArrowDown":
      player.moveDown();
      break;
  }
});

function startGame() {
  console.log("cliquei");
  updateCanvas();
}
//Canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let animationId = null;

//Função updateCanvas=>limpa o canvas e desenha
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function updateCanvas() {
  console.log("update");
  clearCanvas();
  background.draw();
  background.move();
  player.draw();
  updateObstacles();
  animationId = requestAnimationFrame(updateCanvas);
}

class Background {
  constructor(source) {
    this.x = 0;
    this.y = 0;
    this.speed = -1;

    const img = new Image();
    img.src = source;
    img.onload = () => {
      this.img = img;
    };
  }

  draw() {
    ctx.drawImage(this.img, this.x, this.y, canvas.width, canvas.height);
    if (this.speed < 0) {
      ctx.drawImage(this.img, this.x + canvas.width, 0);
    } else {
      ctx.drawImage(this.img, this.x - this.img.width, 0);
    }
  }
  move() {
    this.x += this.speed;
    this.x %= canvas.width;
  }
}
const background = new Background("./images/backgroundImage.png");

class SpongeBob {
  constructor(source, x, y, w, h) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.speed = 10;

    const img = new Image();
    img.src = source;
    img.onload = () => {
      this.img = img;
    };
  }
  draw() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
  moveLeft() {
    if (this.x > 0) {
      this.x -= this.speed;
    }
  }
  moveRight() {
    if (this.x < canvas.width - this.width) {
      this.x += this.speed;
    }
  }
  moveUp() {
    if (this.y > 0) {
      this.y -= this.speed;
    }
  }
  moveDown() {
    if (this.y < canvas.height - this.height) {
      this.y += this.speed;
    }
  }
}

const player = new SpongeBob("../images/spongebob1.png", 25, 200, 80, 100);

class Objects {
  constructor(source, y) {
    this.x = canvas.width;
    this.y = y;
    this.width = 40;
    this.height = 40;
    this.speed = 6;

    const img = new Image();
    img.src = source;
    img.onload = () => {
      this.img = img;
    };
  }

  drawObstacle() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  drawBurguer() {
    ctx.drawImage(this.img, this.x, this.y, this.width + 20, this.height + 20);
  }

  moveObstacle() {
    this.x -= this.speed;
  }
}
//const seaUrchin = new Objects("../images/sea-urchin-9.png", 200);
//const burguer = new Objects("../images/burguer.png", 300);

let frames = 0;
const seaUrchins = [];
const burguers = [];

updateObstacles = () => {
  frames++;
  console.log(seaUrchins);
  for (let i = 0; i < seaUrchins.length; i++) {
    if (frames > 1500 && frames < 2500) {
      seaUrchins[i].speed = 10;
    }
    seaUrchins[i].drawObstacle();
    seaUrchins[i].moveObstacle();
  }
  if (frames % 120 === 0) {
    const seaUrchin = new Objects(
      "../images/sea-urchin-9.png",
      Math.floor(Math.random() * 500)
    );

    seaUrchins.push(seaUrchin);
  }

  for (let i = 0; i < burguers.length; i++) {
    if (frames > 1500 && frames < 2500) {
      burguers[i].speed = 10;
    }
    burguers[i].drawObstacle();
    burguers[i].moveObstacle();
  }
  if (frames % 120 === 0) {
    const burguer = new Objects(
      "../images/burguer.png",
      Math.floor(Math.random() * 500)
    );

    burguers.push(burguer);
  }
};
