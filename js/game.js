/* const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const cWidth = canvas.width;
const cHeight = canvas.height;

class SpongeBob {
  constructor() {
    this.x = 25; //posição x do Bob Esponja
    this.y = 25; //posição y do Bob Esponja
    const imgG = new Image();
    imgG.src = "../images/spongebob8.png";
    imgG.addEventListener("load", () => {
      this.img = imgG;
      this.draw();
    });
  }

  draw() {
    ctx.drawImage(this.img, this.x, this.y, 80, 100);
  }

  //Sponge Bob moviments
  moveUp() {
    if (this.y > 0) {
      this.y -= 25;
    }
  }

  moveDown() {
    this.y += 25;
  }

  moveRight() {
    this.x += 25;
  }
  moveLeft() {
    if (this.x > 0) {
      this.x -= 25;
    }
  }
}

const spongeBob = new SpongeBob();

document.addEventListener("keydown", (e) => {
  switch (e.keyCode) {
    case 38:
      spongeBob.moveUp();
      console.log("up", spongeBob);
      break;
    case 40:
      spongeBob.moveDown();
      console.log("down", spongeBob);
      break;
    case 37:
      spongeBob.moveLeft();
      console.log("left", spongeBob);
      break;
    case 39:
      spongeBob.moveRight();
      console.log("right", spongeBob);
      break;
  }
});

//Creating o backgroungd

const img = new Image();
img.src = "../images/backgroundImage.png";
const backgroundImage = {
  img: img,
  x: 0,
  speed: -1,

  move: function () {
    this.x += this.speed;
    this.x %= canvas.width;
  },

  draw: function () {
    ctx.drawImage(this.img, this.x, 0);
    if (this.speed < 0) {
      ctx.drawImage(this.img, this.x + canvas.width, 0);
    } else {
      ctx.drawImage(this.img, this.x - this.img.width, 0);
    }
  },
};

// start calling updateCanvas when the image is loaded
img.onload = updateCanvas;

function updateCanvas() {
  backgroundImage.move();

  ctx.clearRect(0, 0, canvas.cWidth, canvas.height);
  backgroundImage.draw();

  spongeBob.draw();

  requestAnimationFrame(updateCanvas);
}
updateCanvas();
 */
