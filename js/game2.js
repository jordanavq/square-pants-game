//Botão start

window.onload = () => {
  document.getElementById("start-button").onclick = () => {
    startGame();

    document.getElementById("start-button").removeEventListener("onclick");
  };
};

//botões para movimentar o Bob Esponja
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

//Game audio:
const gameSound = new Audio();
gameSound.src = "../sounds/SpongeBobMusic.mp3";
gameSound.volume = 0.2;

const scoreElement = document.getElementById("score");

function startGame() {
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

function stopGame() {
  cancelAnimationFrame(animationId);
}

function gameOver() {
  clearCanvas();
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "yellow";
  ctx.font = "50px 'Verdana'";
  ctx.fillText("Game Over", 220, 300);

  ctx.font = "100px";
  ctx.fillStyle = "white";
  ctx.fillText(`Your Final Score: ${score} `, 290, 350);

  gameSound.pause();
}

function score1() {
  ctx.font = "50px";
  ctx.fillStyle = "white";
  ctx.fillText(`Score: ${score}`, 600, 40);
}

function updateCanvas() {
  showScore();
  gameSound.play();
  clearCanvas();
  background.draw();
  background.move();
  player.draw();
  score1();
  const crash = updateObstacles();
  if (crash && collisions >= 2) {
    console.log(collisions, crash);

    stopGame();
    gameOver();
    collisions = 0;
    score = 0;
  } else {
    animationId = requestAnimationFrame(updateCanvas);
  }
}

function showScore() {
  scoreElement.innerText = score;
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
    this.speed = 12;

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

  left() {
    return this.x;
  }
  right() {
    return this.x + this.width;
  }
  top() {
    return this.y;
  }
  bottom() {
    return this.y + this.height;
  }

  checkCollision(Obstacle) {
    return !(
      this.top() > Obstacle.bottom() ||
      this.bottom() < Obstacle.top() ||
      this.left() > Obstacle.right() ||
      this.right() < Obstacle.left()
    );
  }
}

const player = new SpongeBob("../images/spongebob1.png", 25, 200, 80, 100);

class Objects {
  constructor(source, y) {
    this.x = canvas.width;
    this.y = y;
    this.width = 50;
    this.height = 50;
    this.speed = 5;

    const img = new Image();
    img.src = source;
    //img.onload = () => {
    this.img = img;
    //};
  }

  drawObstacle() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  drawBurguer() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  moveObstacle() {
    this.x -= this.speed;
  }

  left() {
    return this.x;
  }
  right() {
    return this.x + this.width;
  }
  top() {
    return this.y;
  }
  bottom() {
    return this.y + this.height;
  }
}

let frames = 0;
let score = 0;
let collisions = 0;
const seaUrchins = [];
const burguers = [];

updateObstacles = () => {
  frames++;

  for (let i = 0; i < seaUrchins.length; i++) {
    if (frames > 2000) {
      seaUrchins[i].speed = 10;
    }
    seaUrchins[i].drawObstacle();
    seaUrchins[i].moveObstacle();
    if (seaUrchins[i].x <= 0) {
      //sempre que o obstáculo chegar ao final da tela, remove o 1º elemento do array.
      seaUrchins.shift();
    }
    if (player.checkCollision(seaUrchins[i])) {
      seaUrchins.splice(i, 1);
      collisions += 1;
      return true;
    }
  }
  if (frames % 60 === 0) {
    const seaUrchin = new Objects(
      "../images/sea-urchin-9.png",
      Math.floor(Math.random() * 500)
    );

    seaUrchins.push(seaUrchin);
  }

  for (let i = 0; i < burguers.length; i++) {
    if (frames > 2000) {
      burguers[i].speed = 10;
    }
    burguers[i].drawBurguer();
    burguers[i].moveObstacle();
    if (burguers[i].x > canvas.width) {
      //sempre que o obstáculo chegar ao final da tela, remove o 1º elemento do array.
      burguers.shift();
    }
    if (player.checkCollision(burguers[i])) {
      burguers.splice(i, 1);
      score += 1;
    }
  }
  if (frames % 80 === 0) {
    const burguer = new Objects(
      "../images/burguer.png",
      Math.floor(Math.random() * 500)
    );

    burguers.push(burguer);
  }
};
