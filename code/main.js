import { InputManager } from "./canvasUtilitys/inputManager.js";
import { DeltaTime } from "./canvasUtilitys/deltaTime.js";
import { AspectRatio } from "./canvasUtilitys/aspectRatio.js";
import { setCanvasSize } from "./canvasUtilitys/canvasSize.js";

import { StartScreen } from "./screens/startScreen.js";
import { OptionsScreen } from "./screens/optionsScreen.js";
import { GameScreen } from "./screens/gameScreen.js";
import { BackgroundScreen } from "./screens/backgroundScreen.js";

class Main {
  #canvas;
  #ctx;

  constructor() {
    this.#canvas = document.getElementById("mainCanvas");
    this.#ctx = this.#canvas.getContext("2d");

    InputManager.init();
    AspectRatio.init();

    setCanvasSize(this.#canvas.width, this.#canvas.height);

    this.screens = {};

    this.screens.backgroundScreen = new BackgroundScreen();
    this.screens.gameScreen = new GameScreen();
    this.screens.startScreen = new StartScreen();
    this.screens.optionsScreen = new OptionsScreen();

    window.addEventListener("resize", this.#resize.bind(this));
  }

  run() {
    this.#update();
    this.#draw();

    requestAnimationFrame(this.run.bind(this));
  }

  #update() {
    InputManager.update();
    DeltaTime.update();

    for (const screen in this.screens) {
      this.screens[screen].update();
    }

    // if (!this.screens.gameScreen.isLoaded) return;
  }

  #draw() {
    this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);

    const screenNames = Object.keys(this.screens);
    screenNames.sort((a, b) => this.screens[a].zIndex - this.screens[b].zIndex);

    for (const screenName of screenNames) {
      this.screens[screenName].draw();
    }
  }

  #resize() {
    AspectRatio.adjust();
    setCanvasSize(this.#canvas.width, this.#canvas.height);

    for (const screen in this.screens) {
      this.screens[screen].resize({ x: 0, y: 0 }, { x: this.#canvas.width, y: this.#canvas.height });
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const main = new Main();
  main.run();
});
