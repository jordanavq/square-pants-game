const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const cWidth = canvas.width;
const cHeight = canvas.height;

/* 
function clearCanvas() {
    ctx.clearRect (0,0,cWidth,cHeight);
};

function


const draw = (x,y,w,h,color) => {
    ctx.fillStyle = color;
    ctx.fillRect (x,y,w,h);
}

draw(20, 40, 60, 100, 'orange'); */

class SpongeBob {
  constructor() {
    this.x = 25; //posição x do Bob Esponja
    this.y = 25; //posição y do Bob Esponja
    const img = new Image();
    img.addEventListener("load", () => {
      this.img = img;
      this.draw();
    });

    img.src = "/images/spongebob.png";
  }

  draw() {
    ctx.drawImage(this.img, this.x, this.y, 80, 100);
  }

  //Sponge Bob moviments
  moveUp() {
    this.y -= 25;
  }

  moveDown() {
    this.y += 25;
  }

  moveRight() {
    this.x += 25;
  }

  moveLeft() {
    this.x -= 25;
  }
}

const spongeBob = new SpongeBob();

function updateCanvas() {
  ctx.clearRect(0, 0, cWidth, cHeight);
  spongeBob.draw();
  requestAnimationFrame(updateCanvas);
}

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
  updateCanvas();
});
