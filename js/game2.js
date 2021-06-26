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

  /* class Obstacle {
    constructor (source, y) {
      
      this.size = 40;
      this.x = this.canvas.width + this.size/2;
      this.y = y;
      this.speed = 3;
      this.direction = -2;
      

      const img = new Image();
      img.src = source;
      img.onload = () => {
        this.img = img;
      };

      draw() {
        ctx.drawImage(this.img, this.x, this.y, this.size, this.size);
    }
      move() {
        this.x += this.direction * this.speed;
        
      }
    } 
    const obstacles = [];
    function createObstacle{
      
      this.size = 40;
      this.x = Math.random()this.canvas.width + this.size/2;
      this.y = y;

    } */
};
