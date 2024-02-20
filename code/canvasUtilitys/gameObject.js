import { SpriteSheet } from "./UI/spriteSheet.js";
import { Rectangle } from "./UI/rectangle.js";

import { Settings } from "../settings.js";
import { DeltaTime } from "./deltaTime.js";

export class GameObject extends SpriteSheet{
  constructor(data, screenPosition, screenSize) {
    super(data, screenPosition, screenSize);
    this.velocity = { x: 0, y: 0 };

    this.screenPosition = screenPosition;
    this.screenSize = screenSize;

    this.collisionBoxes = new Rectangle({
      "position": data.position,
      "size": data.size,
      "width": Settings.collisionBoxesWidth,
      "strokeColor": "blue",
      "fillColor": "transparent",
      },
      screenPosition,
      screenSize
    )
  }

  update() {
    super.update();

    if (this.velocity.x === 0 && this.velocity.y === 0) return;

    this.refPosition.x += this.velocity.x * DeltaTime.dt;
    this.refPosition.y += this.velocity.y * DeltaTime.dt;

    this.resize(this.screenPosition, this.screenSize);

    this.collisionBoxes.position = this.position;
  }

  draw() {
    super.draw();

    if (Settings.showCollisionBoxes) this.collisionBoxes.draw();
  }

  resize(screenPosition, screenSize) {
    super.resize(screenPosition, screenSize);
    this.collisionBoxes.resize(screenPosition, screenSize);
  }
}
