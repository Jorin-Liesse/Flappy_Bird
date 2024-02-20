import { Sprite } from "./sprite.js";

export class ProgressBar {
  constructor(data, screenPosition, screenSize) {
    this.refPosition = data.position;
    this.refSizes = data.sizes;

    this.screenPosition = screenPosition;
    this.screenSize = screenSize;

    this.value = data.value;

    this.#loadSprites(data, screenPosition, screenSize);

    this.#calculateRef(screenPosition, screenSize);
  }

  update() {
    if (this.value < 0) this.value = 0;
    if (this.value > 1) this.value = 1;
    
    this.spriteIndicator.refSize =  {x: this.refSizes.bar.x * this.value, y: this.refSizes.bar.y};
    this.spriteIndicator.resize(this.screenPosition, this.screenSize);
  }

  draw() {
    this.spriteBackPlate.draw();
    this.spriteIndicator.draw();
    this.spritePlate.draw();
  }

  resize(screenPosition, screenSize) {
    this.#calculateRef(screenPosition, screenSize);

    this.spriteBackPlate.resize(screenPosition, screenSize);
    this.spriteIndicator.resize(screenPosition, screenSize);
    this.spritePlate.resize(screenPosition, screenSize);
  }

  #loadSprites(data, screenPosition, screenSize) {
    const spriteBackPlateData = {
      path: data.pathBackPlate,
      position: this.refPosition,
      size: this.refSizes.bar,
    };

    const spriteIndicatorData = {
      path: data.pathIndicator,
      position: this.refPosition,
      size: this.refSizes.bar,
    };

    const spritePlateData = {
      path: data.pathPlate,
      position: this.refPosition,
      size: this.refSizes.plate,
    };

    this.spriteBackPlate = new Sprite(spriteBackPlateData, screenPosition, screenSize);
    this.spriteIndicator = new Sprite(spriteIndicatorData, screenPosition, screenSize);
    this.spritePlate = new Sprite(spritePlateData, screenPosition, screenSize);
  }

  #calculateRef(screenPosition, screenSize) {
    this.screenPosition = screenPosition;
    this.screenSize = screenSize;

    this.sizes = {};

    this.position = {
      x: this.refPosition.x * screenSize.x + screenPosition.x,
      y: this.refPosition.y * screenSize.y + screenPosition.y,
    };

    for (const size in this.refSizes) {
      this.sizes[size] = {
        x: this.refSizes[size].x * screenSize.x,
        y: this.refSizes[size].y * screenSize.y,
      }
    };
  }
}
