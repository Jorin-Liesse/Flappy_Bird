import { Background } from "./background.js";
import { Level } from "./level.js";

class Main {
  #timeLastFrame = 0;
  #timeThisFrame = 0;

  constructor() {
    this.canvas = document.getElementById("mainCanvas");
    this.ctx = this.canvas.getContext("2d");

    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.background = new Background();

    this.level = new Level();
  }

  run() {
    this.#update();
    this.#draw();
    requestAnimationFrame(this.run.bind(this));
  }

  #update() {
    this.#deltaTime();

    this.background.update(this.dt);
    // this.level.update(this.dt);
  }

  #draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.background.draw(this.dt);
    // this.level.draw(this.dt);
  }

  #deltaTime() {
    this.#timeThisFrame = Date.now();

    this.dt = (this.#timeThisFrame - this.#timeLastFrame) / 1000;

    if (this.dt > 1) {
      this.dt = 0;
    }

    this.timeLastFrame = this.#timeThisFrame;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const main = new Main();
  main.run();
});
