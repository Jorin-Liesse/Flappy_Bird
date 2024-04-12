import { GameObject } from "../canvasUtilitys/gameObject.js";
import { DeltaTime } from "../canvasUtilitys/deltaTime.js";
import { InputManager } from "../canvasUtilitys/inputManager.js";
import { rectRectCollision } from "../canvasUtilitys/collision.js";
import { Settings } from "../settings.js";

export class Player extends GameObject {
  hitTolerance = 1;
  constructor(screenPosition, screenSize) {
    super({
      data: {
        path: Settings.pathPlayer,
        position: { x: 0.5 - Settings.playerSize.x/2, y: 0.5 },
        size: Settings.playerSize,
        animationInfo: Settings.playerAnimationInfo,
      },
      screenPosition: screenPosition,
      screenSize: screenSize
    });

    this.collidables = [];
  }

  update() {
    super.updateSpriteSheet();

    this.velocity.x = (0.5 - Settings.playerSize.x/2 - this.refPosition.x) * Settings.playerRecenterForce * DeltaTime.dt;
    this.velocity.y += Settings.gravity * DeltaTime.dt;

    if (InputManager.isKeyPressed(32) || InputManager.isMouseButtonPressed(0) || InputManager.isTouchPressed())
      this.velocity.y = Settings.playerJumpForce;

    this.rotate();

    this.refPosition.x += this.velocity.x * DeltaTime.dt;
    this.#collision(this.collidables, "horizontal");
    this.refPosition.y += this.velocity.y * DeltaTime.dt;
    this.#collision(this.collidables, "vertical");

    this.resize(this.screenPosition, this.screenSize);

    this.setCollisionBoxesPosition();
  }

  draw() {
    super.draw();
  }

  rotate() {
    let targetAngle = Math.atan(this.velocity.y * Settings.playerRotationMultiplier);

    this.angle = this.angle + (targetAngle - this.angle) * Settings.playerRotationSmoothness;

    if (this.angle > Math.PI / 2) this.angle = Math.PI / 2;
  }

  #collision(collidables, direction) {
    collidables.forEach((collidable) => {
      if (rectRectCollision(this.collisionBoxes, collidable)) {
        if (direction === "horizontal") {
          this.refPosition.x -= this.velocity.x * DeltaTime.dt;
          this.velocity.x = 0;
          this.refPosition.x += collidable.velocity.x * DeltaTime.dt;
        } 
        else if (direction === "vertical") {
          this.refPosition.y -= this.velocity.y * DeltaTime.dt;
          this.velocity.y = 0;
          this.refPosition.y += collidable.velocity.y * DeltaTime.dt;
        }
      }
    });
  }
}
