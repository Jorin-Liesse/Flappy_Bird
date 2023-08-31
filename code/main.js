import { Background } from "./background.js";

import { Level } from "./level.js";

const layerInfo = {
    "sky": {"distance": 10000},
    "clouds": {"distance": 9000},
    "mountains": {"distance": 8000},  
    "hills": {"distance": 1000},
    "trees": {"distance": 100},
    "land": {"distance": 0},
  }

class Main {
  constructor() {
    this.canvas = document.getElementById("mainCanvas");
    this.ctx = this.canvas.getContext("2d");

    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.timeLastFrame = 0;
    this.timeThisFrame = 0;

    this.background = new Background(layerInfo, -10);

    this.level = new Level();

    window.addEventListener("resize", () => {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    });
  }

  run() {
    this.update();
    requestAnimationFrame(this.run.bind(this));
  }

  update() {
    this.deltaTime();

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.background.update(this.dt);

    this.level.update(this.dt);
  }

  deltaTime() {
    this.timeThisFrame = Date.now();

    this.dt = (this.timeThisFrame - this.timeLastFrame) / 1000;

    if (this.dt > 1) {
      this.dt = 0;
    }

    this.timeLastFrame = this.timeThisFrame;
  }
}

const main = new Main();
main.run();
