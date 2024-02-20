export class Rectangle {
  #ctx;

  constructor(data, screenPosition, screenSize) {
    const canvas = document.getElementById("mainCanvas");
    this.#ctx = canvas.getContext("2d");

    this.refPosition = data.position;
    this.refSize = data.size;
    this.refWidth = data.width;
    this.strokeColor = data.strokeColor;
    this.fillColor = data.fillColor;

    this.#calculateRef(screenPosition, screenSize);
  }

  update() {}

  draw() {
    this.#ctx.save();

    this.#ctx.strokeStyle = this.strokeColor;
    this.#ctx.fillStyle = this.fillColor;
    this.#ctx.lineWidth = this.width;

    this.#ctx.fillRect(
      this.position.x,
      this.position.y,
      this.size.x,
      this.size.y
    );
    this.#ctx.strokeRect(
      this.position.x,
      this.position.y,
      this.size.x,
      this.size.y
    );

    this.#ctx.restore();
  }

  resize(screenPosition, screenSize) {
    this.#calculateRef(screenPosition, screenSize);
  }

  #calculateRef(screenPosition, screenSize) {
    this.position = {
      x: this.refPosition.x * screenSize.x + screenPosition.x,
      y: this.refPosition.y * screenSize.y + screenPosition.y,
    };

    this.size = {
      x: this.refSize.x * screenSize.x,
      y: this.refSize.y * screenSize.y,
    };

    this.width = this.refWidth * screenSize.x;
  }
}
