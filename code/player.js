export class Player {
  constructor() {
    this.gravity = 4000;

    this.totalFrames = 25;

    this.frame = 0;
    this.lastFrameTime = 0;

    this.frameRate = 17.5;

    this.canvas = document.getElementById("mainCanvas");
    this.ctx = this.canvas.getContext("2d");

    this.spriteSheet = new Image();
    this.spriteSheet.src = "assets/player.png";

    this.spriteSheet.onload = () => {
      this.imageWidth = this.spriteSheet.naturalWidth;
      this.imageHeight = this.spriteSheet.naturalHeight;

      this.position = {
        x: this.canvas.width * 0.5 - this.imageWidth / 50,
        y: -this.imageHeight,
      };

      this.velocity = { x: 0, y: 0 };

      this.hitBox = {
        x: this.position.x,
        y: this.position.y,
        radius: this.imageHeight * 0.25,
        dx: this.velocity.x,
        dy: this.velocity.y,
      };

      this.hitBoxRadius = this.imageHeight * 0.25;

      document.addEventListener("keydown", (event) => {
        if (event.code === "Space") {
          this.velocity.y = -1000;
        }
      });

      document.addEventListener("click", () => {
        this.velocity.y = -1000;
      });

      document.addEventListener("touchstart", () => {
        this.velocity.y = -1000;
      });

      window.addEventListener("resize", () => {
        this.position.x = this.canvas.width * 0.5 - this.imageWidth / 50;
      });
    };
  }

  movement(dt, collisions) {
    this.velocity.y += this.gravity * dt;


    // if (collisions.length > 0) {
    //   if (collisions[0].y > this.hitBox.y + this.hitBox.radius - this.velocity.y * dt * 3) {
    //     this.velocity.y = 0;
    //     this.position.y = collisions[0].y - this.hitBox.radius * 3;
    //     // console.log("top");
    //   }

    //   else if (collisions[0].y < this.hitBox.y) {
    //     // console.log("bottom");
    //   }

    //   // if (this.velocity.y === this.gravity * dt) {
    //   //   this.velocity.y = 0;
    //   //   console.log("bottom");
    //   // }

    //   this.velocity.x = collisions[0].dx;
    // } else {
    //   if (this.position.x < this.canvas.width * 0.5 - this.imageWidth / 50) {
    //     this.velocity.x = ((this.canvas.width * 0.5 - this.imageWidth / 50) / (this.position.x)) * 100;
    //   }
    //   else {
    //     this.velocity.x = 0;
    //   }
    // }

    this.position.y += this.velocity.y * dt;
    this.position.x += this.velocity.x * dt;
  }

  checkCollision1(dt, collisions) {
    if (collisions.length > 0) {
      const collision = collisions[0];

      const nextRectangle = {
        x: collision.x + collision.dx,
        y: collision.y + collision.dy,
        width: collision.width,
        height: collision.height,
      };

      const nextPlayer = {
        x: this.position.x + this.velocity.x,
        y: this.position.y + this.velocity.y,
        radius: this.hitBox.radius,
      };

      // Calculate the half-width and half-height of the rectangle
      const halfRectWidth = nextRectangle.width / 2;
      const halfRectHeight = nextRectangle.height / 2;

      // Calculate the distance between the centers of the rectangle and the player
      const dx = Math.abs(nextRectangle.x - nextPlayer.x);
      const dy = Math.abs(nextRectangle.y - nextPlayer.y);

      // Check for overlap in the x-axis
      const overlapX = dx < halfRectWidth + nextPlayer.radius;

      // Check for overlap in the y-axis
      const overlapY = dy < halfRectHeight + nextPlayer.radius;

      let collisionSide = "";

      if (overlapX && overlapY) {
        // Both x and y axes overlap, indicating a collision

        if (dx <= dy) {
          // Collision occurred on the left/right side
          collisionSide = nextPlayer.x < nextRectangle.x ? "right" : "left";
        } else {
          // Collision occurred on the top/bottom side
          collisionSide = nextPlayer.y < nextRectangle.y ? "bottom" : "top";
        }
      }

      console.log(collisionSide);
    }
  }

  checkCollision2(dt, collisions) {
    if (collisions.length > 0) {
      const collision = collisions[0];

      const rectX = collision.x + collision.dx;
      const rectY = collision.y + collision.y;
      const rectWidth = collision.width;
      const rectHeight = collision.height;

      const playerX = this.position.x + this.velocity.x;
      const playerY = this.position.y + this.velocity.y;
      const playerRadius = this.imageHeight * 0.25;

      if (playerX < rectX) {
        console.log("left side");
      } else if (playerX > rectX + rectWidth) {
        console.log("right side");
      } else if (playerY < rectY) {
        console.log("top side");
      } else if (playerY > rectY + rectHeight) {
        console.log("bottom side");
      } else {
        console.log("Collision occurred at a corner or inside the rectangle");
      }
    }
  }

  checkCollision(dt, collisions) {
    if (collisions.length > 0) {
      const collision = collisions[0];

      const dx = this.velocity.x - collision.dx
      const dy = this.velocity.y - collision.dy

      if (dx < 0) {
        if (this.position.x > collision.x) {
          this.position.x = collision.x - this.hitBox.radius;collision.x + collision.width - this.hitBox.radius;
          console.log("left side");
          this.velocity.x = 0;
        }
      }
      else if (dx > 0) {
        if (this.position.x < collision.x) {
          this.position.x = collision.x - this.imageWidth / 25;
          console.log("right side");
          this.velocity.x = 0;
        }
      }

      else {
        if (this.position.x < this.canvas.width * 0.5 - this.imageWidth / 50) {
          this.velocity.x = ((this.canvas.width * 0.5 - this.imageWidth / 50) / (this.position.x)) * 100;
          console.log(this.velocity.x);
        }
      }

      if (dy < 0) {
        console.log("bottom side");
      }
      else if (dy > 0) {
        console.log("top side");
      }
  
      console.log(dx, dy);
    }

    if (this.position.x < this.canvas.width * 0.5 - this.imageWidth / 50) {
      this.velocity.x = ((this.canvas.width * 0.5 - this.imageWidth / 50) / (this.position.x)) * 100;
      console.log(this.velocity.x);
    }
  }

  update(dt, collisions) {
    this.hitBox = {
      x: this.position.x + this.imageWidth / 50 + 25,
      y: this.position.y + this.imageHeight / 2,
      radius: this.imageHeight * 0.25,
      dx: this.velocity.x,
      dy: this.velocity.y,
    };

    // this.checkCollision(dt, collisions);

    if (!this.lastFrameTime) {
      this.lastFrameTime = Date.now();
    }

    if (Date.now() - this.lastFrameTime >= 1000 / this.frameRate) {
      this.frame = (this.frame + 1) % this.totalFrames;
      this.lastFrameTime = Date.now();
    }

    this.movement(dt, collisions);

    if (this.position.y + this.imageHeight > this.canvas.height) {
      this.position.y = this.canvas.height - this.imageHeight;
      this.velocity.y = 0;
    }

    this.ctx.save();

    this.ctx.translate(
      this.position.x + this.imageWidth / 50,
      this.position.y + this.imageHeight * 0.5
    );

    this.ctx.rotate((Math.PI * 0.5 * this.velocity.y) / 5000);

    this.ctx.drawImage(
      this.spriteSheet,
      (this.frame * this.imageWidth) / 25,
      0,
      this.imageWidth / 25,
      this.imageHeight,
      -this.imageWidth / 50,
      -this.imageHeight * 0.5,
      this.imageWidth / 25,
      this.imageHeight
    );

    this.ctx.restore();
  }
}
