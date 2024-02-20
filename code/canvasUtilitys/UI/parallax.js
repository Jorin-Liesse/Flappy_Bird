import { DeltaTime } from "../deltaTime.js";

import { Sprite } from "./sprite.js";

export class Parallax {
  constructor(data, screenPosition, screenSize) {
    this.refPosition = data.position;
    this.refSize = data.size;

    this.layers = [];
    for (let i = 0; i < data.layers.length; i++) {
      const imageData1 = {
        path: data.layers[i].path,
        position: { ...this.refPosition },
        size: { x: this.refSize.x * 1.01, y: this.refSize.y}
      }

      const sprite1 = new Sprite(imageData1, screenPosition, screenSize);
      sprite1.speed = data.layers[i].speed;
      this.layers.push(sprite1);

      const speedFactor = data.layers[i].speed > 0 ? -1 : 1;

      const imageData2 = {
          path: data.layers[i].path,
          position: { x: this.refPosition.x + this.refSize.x * speedFactor, y: this.refPosition.y},
          size: { x: this.refSize.x * 1.01, y: this.refSize.y}
        }

      const sprite2 = new Sprite(imageData2, screenPosition, screenSize);
      sprite2.speed = data.layers[i].speed;
      this.layers.push(sprite2);
    }
    
    this.screenPosition = screenPosition;
    this.screenSize = screenSize;
  }

  update() {
    for (let i = 0; i < this.layers.length; i++) {
      const layer = this.layers[i];
      layer.refPosition.x += layer.speed * DeltaTime.dt / 1000;

      if (layer.refPosition.x >= this.refSize.x && layer.speed > 0) {
          layer.refPosition.x -= this.refSize.x * 2;
      }

      if (layer.refPosition.x <= -this.refSize.x && layer.speed < 0){
        layer.refPosition.x += this.refSize.x * 2;
      }

      layer.resize(this.screenPosition, this.screenSize);
    }
  }

  draw() {
    for (let i = 0; i < this.layers.length; i++) {
      this.layers[i].draw();
    }
  }

  resize(screenPosition, screenSize) {
    this.#calculateRef(screenPosition, screenSize);

    for (let i = 0; i < this.layers.length; i++) {
      this.layers[i].resize(screenPosition, screenSize);
    }

    this.screenPosition = screenPosition;
    this.screenSize = screenSize;
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
