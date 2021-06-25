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

      const img = new Image();
      img.src = source;
      img.onload = () => {
        this.img = img;
      };
    }

    draw() {
      ctx.drawImage(this.img, this.x, this.y, canvas.width, canvas.height);
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
      this.x -= this.speed;
    }
    moveRight() {
      this.x += this.speed;
    }
    moveUp() {
      this.y -= this.speed;
    }
    moveDown() {
      this.y += this.speed;
    }
  }

  const player = new SpongeBob("../images/spongebob8.png", 25, 200, 80, 100);
};
