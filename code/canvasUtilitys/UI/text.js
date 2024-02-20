export class Text {
  #ctx;

  constructor(data, screenPosition, screenSize) {
    const canvas = document.getElementById("mainCanvas");
    this.#ctx = canvas.getContext("2d");

    this.refPosition = data.position;
    this.refSize = data.size;
    this.text = data.text;
    this.font = data.font;
    this.color = data.color;
    this.align = data.align;

    this.#calculateRef(screenPosition, screenSize);
  }

  update() {}

  draw() {
    this.#ctx.save();

    this.#ctx.font = `${this.size}px "${this.font}"`;
    this.#ctx.fillStyle = this.color;

    if (this.align === "center") {
      this.#ctx.textAlign = "center";
      this.#ctx.textBaseline = "bottom";
    }

    else if (this.align === "topLeft") {
      this.#ctx.textAlign = "left";
      this.#ctx.textBaseline = "middle";
    }

    this.width = this.#ctx.measureText(this.text).width;
    this.height = parseInt(this.#ctx.font) / 2;

    this.#ctx.fillText(this.text, this.position.x, this.position.y + this.height);

    this.#ctx.restore();
  }

  resize(screenPosition, screenSize) {
    this.#calculateRef(screenPosition, screenSize);
  }

  #calculateRef(screenPosition, screenSize) {
    this.position = {
      x: (this.refPosition.x * screenSize.x) + screenPosition.x,
      y: (this.refPosition.y * screenSize.y) + screenPosition.y,
    };

    this.size = (this.refSize * screenSize.x);
  }
}
