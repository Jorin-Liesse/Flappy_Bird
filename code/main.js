import { InputManager } from "./canvasUtilitys/inputManager.js";
import { AudioManager } from "./canvasUtilitys/audioManager.js";
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
import { FPSCounter } from "./screens/FPSCounter.js";

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
    AspectRatio.init(this.#canvas, Settings.aspectRatio);
    PageStatus.init();
    Shader.init(vertexShaderSource, fragmentShaderSource);
    DeltaTime.init();

    Shader.initExtraTexture(Settings.pathScanlines, 1, 'u_scanlines');
    Shader.initExtraTexture(Settings.pathNoise, 2, 'u_noise');
    Shader.initExtraTexture(Settings.pathVignette, 3, 'u_vignette');

    setCanvasSize(this.#canvas.width, this.#canvas.height);

    this.#load();

    this.screens = {};

    this.screens.backgroundScreen = new BackgroundScreen();
    this.screens.gameScreen = new GameScreen();
    this.screens.startScreen = new StartScreen();
    this.screens.optionsScreen = new OptionsScreen();
    this.screens.creditsScreen = new CreditsScreen();
    this.screens.inGameScreen = new InGameScreen();
    this.screens.inGameMenuScreen = new InGameMenuScreen();
    this.screens.gameOverScreen = new GameOverScreen();
    this.screens.FPSCounter = new FPSCounter();

    AudioManager.createMusic("soundtrack", "assets/audio/UI/soundtrack.mp3");

    window.addEventListener("click", () => {
      AudioManager.play("soundtrack");
    }, { once: true });

    window.addEventListener("resize", this.#resize.bind(this));

    this.lastFrameTime = performance.now();
    this.frameCount = 0;
    this.lastLogTime = performance.now();
  }

  run(time) {
    requestAnimationFrame(this.run.bind(this));

    const elapsed = time - this.lastFrameTime;
    const elapsedSinceLog = time - this.lastLogTime;

    if (elapsed < 1000 / Settings.fpsLimit) {
      return;
    }

    this.lastFrameTime = time;
    this.frameCount++;

    if (elapsedSinceLog >= 1000) {
      Settings.currentFPS = this.frameCount;
      this.frameCount = 0;
      this.lastLogTime = time;
    }

    this.#update();
    this.#draw();
  }

  #update() {
    InputManager.update();
    DeltaTime.update();
    Shader.update();

    for (const screen in this.screens) {
      this.screens[screen].update();
    }

    this.#save();
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

  #save() {
    if (!Settings.save) return;

    const saveData = {
      highScore: Settings.highScore,

      showCollisionBoxes: Settings.showCollisionBoxes,
      fpsLimit: Settings.fpsLimit,
      windowMode: Settings.windowMode,
      resolution: Settings.resolution,
      showFPS: Settings.FPSCounterStatus,
      masterVolume: Settings.masterVolume,
      musicVolume: Settings.musicVolume,
      soundEffectVolume: Settings.soundEffectVolume,
    };

    localStorage.setItem("saveData", JSON.stringify(saveData));
    Settings.save = false;
  }

  #load() {
    const saveData = JSON.parse(localStorage.getItem("saveData"));

    if (saveData) {
      Settings.highScore = saveData.highScore;

      Settings.showCollisionBoxes = saveData.showCollisionBoxes;
      Settings.fpsLimit = saveData.fpsLimit;
      Settings.windowMode = saveData.windowMode;
      Settings.resolution = saveData.resolution;
      Settings.FPSCounterStatus = saveData.showFPS;
      Settings.masterVolume = saveData.masterVolume;
      Settings.musicVolume = saveData.musicVolume;
      Settings.soundEffectVolume = saveData.soundEffectVolume;
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const main = new Main();
  main.run();
});
