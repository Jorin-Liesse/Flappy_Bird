import { GameObject } from "../canvasUtilitys/gameObject.js";
import { Settings } from "../settings.js";

export class PointTrigger extends GameObject {
  constructor(path, position, size, screenPosition, screenSize) {
    super(
      {
        path: path,
        position: position,
        size: size,
        animationInfo: Settings.pilarAnimationInfo,
      },
      screenPosition,
      screenSize
    );

    this.velocity.x = Settings.pilarSpeed;
  }

  update() {
    super.update();
  }

  draw() {
    super.draw();
  }

  resize(screenPosition, screenSize) {
    super.resize(screenPosition, screenSize);
  }
}
