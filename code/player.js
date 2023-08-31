export class Player {
  constructor() {
    this.canvas = document.getElementById("mainCanvas");
    this.ctx = this.canvas.getContext("2d");

    this.spriteSheet = new Image();
    this.spriteSheet.src = "assets/player.png";

    this.imageWidth = this.spriteSheet.naturalWidth;
    this.imageHeight = this.spriteSheet.naturalHeight;

    this.gravity = 4000;

    this.totalFrames = 25;

    this.frame = 0;
    this.lastFrameTime = 0;

    this.frameRate = 17.5;

    this.position = {
      x: this.canvas.width / 2 - this.imageWidth / 50,
      y: -this.imageHeight,
    };

    this.velocity = { x: 0, y: 0 };

    document.addEventListener("keydown", (event) => {
      if (event.code === "Space") {
        this.velocity.y = -1000;
      }
    });

    document.addEventListener("click", () => {
      this.velocity.y = -1000;
    });
    
    document.addEventListener("touchstart", () => {
      this.velocity.y = -1000;
    });

    window.addEventListener("resize", () => {
      this.position.x = this.canvas.width / 2 - this.imageWidth / 50;
    });
  }

  update(dt) {
    if (!this.lastFrameTime) {
      this.lastFrameTime = Date.now();
    }

    if (Date.now() - this.lastFrameTime >= 1000 / this.frameRate) {
      this.frame = (this.frame + 1) % this.totalFrames;
      this.lastFrameTime = Date.now();
    }

    this.velocity.y += this.gravity * dt;
    this.position.y += this.velocity.y * dt;

    if (this.position.y + this.imageHeight > this.canvas.height) {
      this.position.y = this.canvas.height - this.imageHeight;
      this.velocity.y = 0;
    }

    this.ctx.save();

    this.ctx.translate(
        this.position.x + this.imageWidth / 50,
        this.position.y + this.imageHeight / 2
    );

    this.ctx.rotate(Math.PI / 2 * this.velocity.y / 5000);

    this.ctx.drawImage(
      this.spriteSheet,
      (this.frame * this.imageWidth) / 25,
      0,
      this.imageWidth / 25,
      this.imageHeight,
      - this.imageWidth / 50,
      - this.imageHeight / 2,
      this.imageWidth / 25,
      this.imageHeight
    );

    this.ctx.restore();
  }
}
