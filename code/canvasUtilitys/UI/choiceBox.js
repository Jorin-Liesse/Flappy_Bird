import { Sprite } from "./sprite.js";
import { Text } from "./text.js";

import { InputManager } from "../inputManager.js";

export class ChoiceBox {
  constructor(data, screenPosition, screenSize) {
    this.refPositions = data.positions;
    this.refSizes = data.sizes;
    this.refSizeText = data.sizeText;

    this.data = data;
    this.screenPosition = screenPosition;
    this.screenSize = screenSize;

    this.alwaysOpen = data.alwaysOpen;

    this.status = "closed";
    this.previousStatus = "closed";

    this.#loadSprites(data, screenPosition, screenSize);
    this.#loadTexts(data, screenPosition, screenSize);

    this.sound = new Audio(data.pathSound);

    this.#calculateRef(screenPosition, screenSize);
  }

  update() {
    const mousePosition = InputManager.getMousePosition();

    const closedBounds = mousePosition.x > this.positions.signClosed.x &&
      mousePosition.x < this.positions.signClosed.x + this.sizes.signClosed.x &&
      mousePosition.y > this.positions.signClosed.y &&
      mousePosition.y < this.positions.signClosed.y + this.sizes.signClosed.y

    const openBounds = mousePosition.x > this.positions.signOpen.x &&
      mousePosition.x < this.positions.signOpen.x + this.sizes.signOpen.x &&
      mousePosition.y > this.positions.signOpen.y &&
      mousePosition.y < this.positions.signOpen.y + this.sizes.signOpen.y

    if (!this.alwaysOpen) {
      if (InputManager.isMouseButtonReleased(0) && closedBounds && this.status === "closed") {
        this.sound.play();
        this.status = "open";
      } 
    
      else if ((!(openBounds && InputManager.isMouseButtonReleased(0)) || closedBounds) && InputManager.isMouseButtonReleased(0) && this.status === "open") {
        this.sound.play();
        this.status = "closed";
      }
    }

    else this.status = "open";

    if (this.status === "open") {
      for (let i = 1; i < this.optionsTexts.length; i++) {
        const optionBounds = mousePosition.x > this.optionsTexts[i].position.x - this.optionsTexts[i].width /2 &&
          mousePosition.x < this.optionsTexts[i].position.x + this.optionsTexts[i].width /2 &&
          mousePosition.y > this.optionsTexts[i].position.y - this.optionsTexts[i].height /2 &&
          mousePosition.y < this.optionsTexts[i].position.y + this.optionsTexts[i].height /2;

        if (InputManager.isMouseButtonReleased(0) && optionBounds) {
          this.sound.play();
          this.data.options = [this.data.options[i], ...this.data.options.filter((item) => item !== this.data.options[i])];
          this.optionsTexts = [this.optionsTexts[i], ...this.optionsTexts.filter((item) => item !== this.optionsTexts[i])];
          this.#loadTexts(this.data, this.screenPosition, this.screenSize);

          this.status = "closed";
        }
      }
    }
  }

  draw() {
    if (this.status === "closed") {
      this.spriteClosed.draw();
      this.optionsTexts[0].draw();
    } else {
      this.spriteOpen.draw();
      this.optionsTexts.forEach((option) => option.draw());
    }
  }

  resize(screenPosition, screenSize) {
    this.screenPosition = screenPosition;
    this.screenSize = screenSize;

    this.#calculateRef(screenPosition, screenSize);

    this.spriteOpen.resize(screenPosition, screenSize);
    this.spriteClosed.resize(screenPosition, screenSize);

    this.optionsTexts.forEach((option) => option.resize(screenPosition, screenSize));
  }

  #loadSprites(data, screenPosition, screenSize) {
    const spriteOpenData = {
      "path": data.pathOpenSprite,
      "position": this.refPositions.signOpen,
      "size": this.refSizes.signOpen
    };

    const spriteClosedData = {
      "path": data.pathClosedSprite,
      "position": this.refPositions.signClosed,
      "size": this.refSizes.signClosed
    };

    this.spriteOpen = new Sprite(spriteOpenData, screenPosition, screenSize);
    this.spriteClosed = new Sprite(spriteClosedData, screenPosition, screenSize);
  }

  #loadTexts(data, screenPosition, screenSize) {
    this.optionsTexts = [];

    this.optionsTexts = data.options.map((option, i) => {
      let textData = {
        "position": this.refPositions.options[i],
        "size": this.refSizeText,
        "text": option,
        "font": data.font,
        "color": data.color,
        "align": "center"
      };
    
      return new Text(textData, screenPosition, screenSize);
    });
  }

  #calculateRef(screenPosition, screenSize) {
    this.positions = {};
    this.sizes = {};

    for (const position in this.refPositions) {
      this.positions[position] = {
        x: this.refPositions[position].x * screenSize.x + screenPosition.x,
        y: this.refPositions[position].y * screenSize.y + screenPosition.y,
      }
    }

    for (const size in this.refSizes) {
      this.sizes[size] = {
        x: this.refSizes[size].x * screenSize.x,
        y: this.refSizes[size].y * screenSize.y,
      }
    };

    this.sizeText = this.refSizeText * screenSize.x;
  }
}
