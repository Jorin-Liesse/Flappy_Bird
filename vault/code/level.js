import { Player } from "./player.js";
import { Pillar } from "./pillar.js";

export class Level {
  #minDistance = 300;
  #maxDistance = 500;

  status = "paused";

  constructor() {
    this.canvas = document.getElementById("mainCanvas");
    this.ctx = this.canvas.getContext("2d");

    this.player = new Player();
    this.pillars = [new Pillar()];

    this.spawnDistance = Math.round(
      Math.random() * this.#minDistance + this.#maxDistance
    );
  }

  update(dt) {
    if (this.status === "play") {
      this.pillarsSpawner();
      
      this.pillars.forEach((pilar) => {
        if (pilar.spriteLoaded) {
          if (pilar.position.x < this.canvas.width * -0.5) {
            this.pillars.shift();
          }
        }
      });

      this.pillars.forEach((pilar) => {
        pilar.update(dt);
      });

      this.collisionDetection();

      this.player.update(dt, this.collisions);
    }
  }

  draw(dt) {
    if (this.status === "play") {
      this.pillars.forEach((pilar) => {
        pilar.draw(dt);
      });

      this.player.draw(dt);
    }
  }

  pillarsSpawner() {
    if (
      this.pillars[this.pillars.length - 1].position.x <
      this.canvas.width * 1.5 - this.spawnDistance
    ) {
      this.spawnDistance = Math.round(
        Math.random() * this.#minDistance + this.#maxDistance
      );
      this.pillars.push(new Pillar());
    }
  }

  collisionDetection() {
    const playerHitBox = this.player.hitBox;
    
    this.collisions = [];

    this.pillars.forEach((pillar) => {
      if (!pillar.spriteLoaded) return;
  
      const checkCollision = (hitBox) => {
        const dx = playerHitBox.x - Math.max(hitBox.x, Math.min(playerHitBox.x, hitBox.x + hitBox.width));
        const dy = playerHitBox.y - Math.max(hitBox.y, Math.min(playerHitBox.y, hitBox.y + hitBox.height));
        const distance = Math.sqrt(dx * dx + dy * dy);
  
        if (distance < playerHitBox.radius) {
          this.collisions.push(hitBox);
        }
      };
  
      checkCollision(pillar.hitBox.top);
      checkCollision(pillar.hitBox.bottom);
    });
  }
}
