import { Settings } from "../settings.js";
import { Rectangle } from "../canvasUtilitys/UI/rectangle.js";

export class Ground {
  constructor(screenPosition, screenSize) {
    this.refPosition = Settings.groundPosition;
    this.refSize = Settings.groundSize;

    this.velocity = { x: 0, y: 0 };

    this.#calculateRef(screenPosition, screenSize);

    this.collisionBoxes = new Rectangle({
      "position": Settings.groundPosition,
      "size": Settings.groundSize,
      "width": Settings.collisionBoxesWidth,
      "strokeColor": "blue",
      "fillColor": "transparent",
      },
      screenPosition,
      screenSize
    )

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
