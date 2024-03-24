import { SpriteSheet } from "./UI/spriteSheet.js";
import { Rectangle } from "./UI/rectangle.js";

import { Settings } from "../settings.js";
import { DeltaTime } from "./deltaTime.js";

export class GameObject extends SpriteSheet{
  constructor(data, screenPosition, screenSize) {
    super(data, screenPosition, screenSize);
    this.velocity = { x: 0, y: 0 };

    this.hitTolerance = 1;

    this.screenPosition = screenPosition;
    this.screenSize = screenSize;

    this.collisionBoxes = new Rectangle({
      "position": data.position,
      "size": {x: data.size.x * this.hitTolerance, y: data.size.y * this.hitTolerance},
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
    super.update();

    if (this.velocity.x === 0 && this.velocity.y === 0) return;

    this.refPosition.x += this.velocity.x * DeltaTime.dt;
    this.refPosition.y += this.velocity.y * DeltaTime.dt;

    this.resize(this.screenPosition, this.screenSize);

    this.setCollisionBoxesPosition();
  }

  draw() {
    super.draw();

    if (Settings.showCollisionBoxes) this.collisionBoxes.draw();
  }

  resize(screenPosition, screenSize) {
    super.resize(screenPosition, screenSize);
    this.collisionBoxes.resize(screenPosition, screenSize);
  }

  setCollisionBoxesPosition() {
    this.collisionBoxes.position = {
      x: this.position.x + (1 -this.hitTolerance) * this.size.x/2,
      y: this.position.y + (1- this.hitTolerance) * this.size.y/2
    };
  }
}
