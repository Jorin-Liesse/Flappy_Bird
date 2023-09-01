import { Player } from "./player.js";
import { Pilar } from "./pilar.js";

export class Level {
  constructor() {
    this.status = "paused";

    this.minDistance = 300;
    this.maxDistance = 500;

    this.canvas = document.getElementById("mainCanvas");
    this.ctx = this.canvas.getContext("2d");

    this.player = new Player();
    this.pilars = [new Pilar()];

    this.spawnDistance = Math.round(Math.random() * this.minDistance + this.maxDistance);
  }

  pilarsSpawner() {
    if (this.pilars[this.pilars.length - 1].position.x < (this.canvas.width * 1.5) - this.spawnDistance) {
      this.spawnDistance = Math.round(Math.random() * this.minDistance + this.maxDistance);
      this.pilars.push(new Pilar());
    }
  }

  update(dt) {
    if (this.status === "play") {
      this.pilarsSpawner();

      this.pilars.forEach(pilar => {
        if (pilar.spriteLoaded) {
          if (pilar.position.x < this.canvas.width * -0.5) {
            this.pilars.shift();
          }
        }
      });

      this.pilars.forEach(pilar => {
        pilar.update(dt);
      });

      this.player.update(dt);
    }
  }
}
