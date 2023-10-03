export class Pillar {
  constructor() {
    this.minOpening = 175;
    this.maxOpening = 250;

    this.maxHeightOffset = 100;

    this.speed = 445;

    this.spriteLoaded = false;

    this.canvas = document.getElementById("mainCanvas");
    this.ctx = this.canvas.getContext("2d");

    this.spriteSheet = new Image();
    this.spriteSheet.src = "assets/pillar.png";

    this.spriteSheet.onload = () => {
      this.imageWidth = this.spriteSheet.naturalWidth;
      this.imageHeight = this.spriteSheet.naturalHeight;

      this.position = {
        x: this.canvas.width * 1.5 - this.imageWidth * 0.5,
        y: this.canvas.height * 0.5 - this.imageHeight * 0.5,
      };

      this.velocity = { x: -this.speed, y: 0 };

      this.updateHitBox();

      this.spriteLoaded = true;
    };

    this.opening = Math.round(
      Math.random() * this.minOpening + this.maxOpening
    );
    this.heightOffset = Math.round(
      Math.random() * this.maxHeightOffset * 2 - this.maxHeightOffset
    );
  }

  updateHitBox() {
    this.hitBox = {
      top: {
        x: this.position.x,
        y: this.position.y + (this.imageHeight/2 - this.imageHeight * 1 - this.opening * 0.5 - this.heightOffset),
        width: this.imageWidth,
        height: this.imageHeight,
        dx: this.velocity.x,
        dy: this.velocity.y,
      },
      bottom: {
        x: this.position.x,
        y: this.position.y - (this.imageHeight /2 - this.imageHeight * 1 - this.opening * 0.5 + this.heightOffset),
        width: this.imageWidth,
        height: this.imageHeight,
        dx: this.velocity.x,
        dy: this.velocity.y,
      },
    };
  }

  update(dt) {
    if (this.spriteLoaded) {
      this.position.x += this.velocity.x * dt;

      this.updateHitBox();

      this.ctx.save();

      this.ctx.translate(
        this.position.x + this.imageWidth * 0.5,
        this.position.y + this.imageHeight * 0.5
      );

      this.ctx.rotate(Math.PI);

      this.ctx.drawImage(
        this.spriteSheet,
        0,
        0,
        this.imageWidth,
        this.imageHeight,
        -this.imageWidth * 0.5,
        -this.imageHeight * 1 - this.opening * 0.5 + this.heightOffset,
        this.imageWidth,
        this.imageHeight
      );

      this.ctx.restore();

      this.ctx.save();

      this.ctx.translate(
        this.position.x + this.imageWidth * 0.5,
        this.position.y + this.imageHeight * 0.5
      );

      this.ctx.drawImage(
        this.spriteSheet,
        0,
        0,
        this.imageWidth,
        this.imageHeight,
        -this.imageWidth * 0.5,
        -this.imageHeight * 1 - this.opening * 0.5 - this.heightOffset,
        this.imageWidth,
        this.imageHeight
      );

      this.ctx.restore();
    }
  }
}
