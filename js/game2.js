window.onload = () => {
  document.getElementById("start-button").onclick = () => {
    startGame();
  };

  function startGame() {
    background.draw();
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
};
