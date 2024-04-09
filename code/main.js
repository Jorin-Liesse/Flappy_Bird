import { InputManager } from "./canvasUtilitys/inputManager.js";
import { DeltaTime } from "./canvasUtilitys/deltaTime.js";
import { AspectRatio } from "./canvasUtilitys/aspectRatio.js";
import { setCanvasSize } from "./canvasUtilitys/canvasSize.js";
import { PageStatus } from "./canvasUtilitys/pageStatus.js";

import { StartScreen } from "./screens/startScreen.js";
import { OptionsScreen } from "./screens/optionsScreen.js";
import { GameScreen } from "./screens/gameScreen.js";
import { BackgroundScreen } from "./screens/backgroundScreen.js";
import { CreditsScreen } from "./screens/creditsScreen.js";
import { InGameScreen } from "./screens/inGameScreen.js";
import { InGameMenuScreen } from "./screens/inGameMenuScreen.js";
import { GameOverScreen } from "./screens/gameOverScreen.js";

import { Shader } from "./canvasUtilitys/shader.js";
import { fragmentShaderSource } from "../assets/shaders/CRT/fragmentShader.js";
import { vertexShaderSource } from "../assets/shaders/CRT/vertexShader.js";
import { Settings } from "./settings.js";

class Main {
  #canvas;
  #ctx;

  constructor() {
    this.#canvas = document.getElementById("mainCanvas");
    this.#ctx = this.#canvas.getContext("2d");

    InputManager.init();
    AspectRatio.init(this.#canvas);
    PageStatus.init();
    Shader.init(vertexShaderSource, fragmentShaderSource);

    Shader.initExtraTexture(Settings.pathScanlines, 1, 'u_scanlines');
    Shader.initExtraTexture(Settings.pathNoise, 2, 'u_noise');
    Shader.initExtraTexture(Settings.pathVignette, 3, 'u_vignette');

    setCanvasSize(this.#canvas.width, this.#canvas.height);

    this.screens = {};

    this.screens.backgroundScreen = new BackgroundScreen();
    this.screens.gameScreen = new GameScreen();
    this.screens.startScreen = new StartScreen();
    this.screens.optionsScreen = new OptionsScreen();
    this.screens.creditsScreen = new CreditsScreen();
    this.screens.inGameScreen = new InGameScreen();
    this.screens.inGameMenuScreen = new InGameMenuScreen();
    this.screens.gameOverScreen = new GameOverScreen();

    const soundtrack = new Audio('assets/audio/UI/soundtrack.mp3');
    soundtrack.volume = 0.5;
    soundtrack.loop = true;

    window.addEventListener("click", () => {
      soundtrack.play();
    }, { once: true });

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
    PageStatus.update();
    Shader.update();

    // if (!PageStatus.pageVisibility || !PageStatus.pageFocus) return;

    for (const screen in this.screens) {
      this.screens[screen].update();
    }
  }

  #draw() {
    this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);

    const screenNames = Object.keys(this.screens);
    screenNames.sort((a, b) => this.screens[a].zIndex - this.screens[b].zIndex);

    for (const screenName of screenNames) {
      this.screens[screenName].draw();
    }

    Shader.draw();
  }

  #resize() {
    AspectRatio.adjust();
    Shader.resize();
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
