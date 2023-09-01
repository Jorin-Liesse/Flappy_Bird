import { Background } from "./background.js";

import { Level } from "./level.js";

class Main {
  constructor() {
    this.canvas = document.getElementById("mainCanvas");
    this.ctx = this.canvas.getContext("2d");

    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.timeLastFrame = 0;
    this.timeThisFrame = 0;

    this.background = new Background();

    this.level = new Level();

    this.constructEventLisstener();
  }

  constructEventLisstener() {
    const startButton = document.getElementById("startButtonMainMenu");
    const optionsButton = document.getElementById("optionsButtonMainMenu");
    const exitButton = document.getElementById("exitButtonMainMenu");

    const backButton = document.getElementById("backButtonMainMenu");

    const startMenu = document.querySelector(".startMenu");
    const optionsMenu = document.querySelector(".optionsMenu");

    const backButtonMainMenu = document.getElementById("backButtonMainMenu");
    
    startButton.addEventListener("click", () => {
      startMenu.classList.remove("active");
      this.level.status = "play";
    });

    optionsButton.addEventListener("click", () => {
      startMenu.classList.remove("active");
      optionsMenu.classList.add("active");
    });

    exitButton.addEventListener("click", () => {
      window.close();
    });

    backButtonMainMenu.addEventListener("click", () => {
      startMenu.classList.add("active");
      optionsMenu.classList.remove("active");
    });

    backButton.addEventListener("click", () => {
      startMenu.classList.add("active");
      optionsMenu.classList.remove("active");
    });

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

document.addEventListener("DOMContentLoaded", () => {
  const main = new Main();
  main.run();
});
