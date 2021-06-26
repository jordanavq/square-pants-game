//Botão start
window.onload = () => {
  document.getElementById("start-button").onclick = () => {
    startGame();
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
    updateCanvas();
  }
  //Canvas
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  let animationId = null;

  //Função updateCanvas=>limpa o canvas e desenha
  function updateCanvas() {
    clearCanvas();
    background.draw();
    background.move();
    player.draw();

    animationId = requestAnimationFrame(updateCanvas);
  }

  function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
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

  class Obstacle {
    constructor(y) {
      this.x = 0;
      this.y = y;
      this.width = 40;
      this.height = 40;
    }

    createObstacle() {
      this.imgO = new Image();
      this.imgO.src = "../images/sea-urchin-9.png";
      //img.onload = () => {
      //this.imgO = imgO;
      //};
      ctx.drawImage(this.imgO, this.x, this.y, this.width, this.height);
    }

    createBurguers() {
      this.imgB = new Image();
      this.imgB.src = "../images/burguer.png";
      ctx.drawImage(
        this.imgB,
        this.x,
        this.y,
        this.width + 50,
        this.height + 50
      );
    }

    moveObstacles() {
      this.x -= 5;
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

  const frames = 0;
  const seaUrchin = [];
  const lifes = 2;
  const burguer = [];

  // Para criar novos obstáculos, guardando no array e movimentar
  function createObstaclesArr() {
    frames += 1;
    if (lifes < 15) {
      if (frames % 50 === 0) {
        seaUrchin.push(
          new Obstacle(Math.floor(Math.random() * (canvas.height - 25)))
        );
      }
    } else if (lifes >= 15) {
      if (frames % 35 === 0) {
        seaUrchin.push(
          new Obstacle(Math.floor(Math.random() * (canvas.height - 25)))
        );
      }
    }
    if (frames % 150 === 0) {
      setTimeout(function () {
        burguer.push(
          new Obstacle(Math.floor(Math.random() * (canvas.height - 25)))
        );
      }, 2000);
    }
  }
};
