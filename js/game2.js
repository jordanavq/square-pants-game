window.onload = () => {
  document.getElementById("start-button").onclick = () => {
    startGame();
  };

  function startGame() {
    background.draw();
    player.draw();
  }

  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

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

      const img = new Image();
      img.src = source;
      img.onload = () => {
        this.img = img;
      };
    }
    draw() {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
  }
  const player = new SpongeBob("../images/spongebob8.png", 25, 200, 80, 100);
};
