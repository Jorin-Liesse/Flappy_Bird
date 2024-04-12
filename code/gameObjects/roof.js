import { Settings } from "../settings.js";
import { Rectangle } from "../canvasUtilitys/UI/rectangle.js";

export class Roof {
  constructor(screenPosition, screenSize) {
    this.refPosition = Settings.roofPosition;
    this.refSize = Settings.roofSize;

    this.velocity = { x: 0, y: 0 };

    this.#calculateRef(screenPosition, screenSize);

    this.collisionBoxes = new Rectangle({data: {
      position: Settings.roofPosition,
      size: Settings.roofSize,
      width: Settings.collisionBoxesWidth,
      strokeColor: "blue",
      fillColor: "transparent",
      },
      screenPosition: screenPosition,
      screenSize: screenSize
    })

    this.collisionBoxes.velocity = this.velocity;
  }

  update() {
    this.collisionBoxes.position = this.position;
  }

  draw() {
    if (Settings.showCollisionBoxes) this.collisionBoxes.draw();
  }

  resize(screenPosition, screenSize) {
    this.#calculateRef(screenPosition, screenSize);
    this.collisionBoxes.resize(screenPosition, screenSize);
  }

  #calculateRef(screenPosition, screenSize) {
    this.position = {
      x: (this.refPosition.x * screenSize.x) + screenPosition.x,
      y: (this.refPosition.y * screenSize.y) + screenPosition.y,
    };

    this.size = {
      x: (this.refSize.x * screenSize.x),
      y: (this.refSize.y * screenSize.y),
    };
  }
}
