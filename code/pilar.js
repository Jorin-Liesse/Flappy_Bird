export class Pilar {
  constructor() {
    this.canvas = document.getElementById("mainCanvas");
    this.ctx = this.canvas.getContext("2d");

    this.spriteSheet = new Image();
    this.spriteSheet.src = "assets/pilar.png";

    this.spriteSheet.onload = () => {
      this.imageWidth = this.spriteSheet.naturalWidth;
      this.imageHeight = this.spriteSheet.naturalHeight;
    };
  }

  update(dt) {
  }
}
