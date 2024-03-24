import { Sprite } from "./sprite.js";

import { InputManager } from "../inputManager.js";

export class Switch {
  constructor(data, screenPosition, screenSize) {
    this.refPosition = data.position;
    this.refSize = data.size;

    this.status = data.value;

    this.#loadSprites(data, screenPosition, screenSize);

    this.sound = new Audio(data.pathSound);

    this.#calculateRef(screenPosition, screenSize);
  }

  update() {
    const mousePosition = InputManager.getMousePosition();

    const switchBounds =
      mousePosition.x > this.position.x &&
      mousePosition.x < this.position.x + this.size.x &&
      mousePosition.y > this.position.y &&
      mousePosition.y < this.position.y + this.size.y;

    if (switchBounds && InputManager.isMouseButtonPressed(0)) {
      this.status = this.status === "off" ? "on" : "off";
      this.sound.play();
    }
  }

  draw() {
    if (this.status === "on") {
      this.spriteOn.draw();
    } else {
      this.spriteOff.draw();
    }
  }

  resize(screenPosition, screenSize) {
    this.#calculateRef(screenPosition, screenSize);

    this.spriteOn.resize(screenPosition, screenSize);
    this.spriteOff.resize(screenPosition, screenSize);
  }

  #loadSprites(data, screenPosition, screenSize) {
    const spriteOnData = {
      "path": data.pathOn,
      "position": this.refPosition,
      "size": this.refSize
    };

    const spriteOffData = {
      "path": data.pathOff,
      "position": this.refPosition,
      "size": this.refSize
    };

    this.spriteOn = new Sprite(spriteOnData, screenPosition, screenSize);
    this.spriteOff = new Sprite(spriteOffData, screenPosition, screenSize);
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
  }
}