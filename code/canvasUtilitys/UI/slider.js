import { Sprite } from "./sprite.js";
import { InputManager } from "../inputManager.js";
import { AudioManager } from "../audioManager.js";

export class Slider {
  constructor(data, screenPosition, screenSize) {
    this.refPosition = data.position;
    this.refSizes = data.sizes;

    this.screenPosition = screenPosition;
    this.screenSize = screenSize;

    this.status = "passive";
    this.previousStatus = "passive";

    this.previousValue = data.value;
    this.value = data.value;

    this.#loadSprites(data, screenPosition, screenSize);

    AudioManager.createSoundEffect("sound", data.pathSound);

    this.#calculateRef(screenPosition, screenSize);
  }

  update() {
    const mousePosition = InputManager.getMouseTouchPosition();

    const pinBounds = mousePosition.x > this.spritePin.position.x &&
      mousePosition.x < this.spritePin.position.x + this.spritePin.size.x &&
      mousePosition.y > this.spritePin.position.y &&
      mousePosition.y < this.spritePin.position.y + this.spritePin.size.y

    if (InputManager.isMouseTouchDown(0) && pinBounds) {
      this.status = "active";
    }

    else if (InputManager.isMouseTouchReleased(0)) {
      this.status = "passive";
    }

    if (this.status === "active") {
      const distanceToPoint1 = mousePosition.x - this.screenPosition.x;
      const distanceToPoint2 = mousePosition.x - this.screenPosition.x + this.screenSize.x;

      const totalDistance = Math.abs(distanceToPoint1 - distanceToPoint2);
      const normalizedValue = distanceToPoint1 / totalDistance;

      this.spritePin.refPosition.x = normalizedValue - this.spritePin.refSize.x / 2;
      
      if (this.spritePin.refPosition.x < this.refPosition.x) {
        this.spritePin.refPosition.x = this.refPosition.x;
      }

      if (this.spritePin.refPosition.x > this.refPosition.x + this.refSizes.bar.x - this.spritePin.refSize.x) {
        this.spritePin.refPosition.x = this.refPosition.x + this.refSizes.bar.x - this.spritePin.refSize.x;
      }

      this.spritePin.resize(this.screenPosition, this.screenSize);
    }
    

    if (pinBounds && InputManager.isMouseTouchDown(0) && this.previousStatus === "passive") {
      AudioManager.play("sound");
    }

    if (InputManager.isMouseTouchReleased(0) && this.previousStatus === "active") {
      AudioManager.play("sound");
    }

    this.value = (this.spritePin.refPosition.x - this.refPosition.x) / this.refSizes.bar.x;

    this.previousStatus = this.status;
  }

  draw() {
    this.spriteBar.draw();
    this.spritePin.draw();
  }

  isChanged() {
    const changed = this.previousValue !== this.value;
    this.previousValue = this.value;
    return changed;
  }

  resize(screenPosition, screenSize) {
    this.screenPosition = screenPosition;

    for (const size in this.refSizes) {
      this.sizes[size] = {
        x: this.refSizes[size].x * screenSize.x,
        y: this.refSizes[size].y * screenSize.y,
      }
    };

    this.screenSize = screenSize;

    this.#calculateRef(screenPosition, screenSize);

    this.spriteBar.resize(screenPosition, screenSize);
    this.spritePin.resize(screenPosition, screenSize);
  }
  
  #loadSprites(data, screenPosition, screenSize) {
    const spriteBarData = {
      "path": data.pathBar,
      "position": this.refPosition,
      "size": this.refSizes.bar
    };

    const spritePinData = {
      "path": data.pathPin,
      "position": {
        "x": this.refPosition.x + this.refSizes.bar.x * this.value,
        "y": this.refPosition.y
      },
      "size": this.refSizes.pin
    };

    this.spriteBar = new Sprite(spriteBarData, screenPosition, screenSize);
    this.spritePin = new Sprite(spritePinData, screenPosition, screenSize);
  }

  #calculateRef(screenPosition, screenSize) {
    this.position = {
      x: this.refPosition.x * screenSize.x + screenPosition.x,
      y: this.refPosition.y * screenSize.y + screenPosition.y,
    };

    this.sizes = {
      x: this.refSizes.x * screenSize.x,
      y: this.refSizes.y * screenSize.y,
    };
  }
}
