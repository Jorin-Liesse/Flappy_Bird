import { getCanvasSize } from "../canvasUtilitys/canvasSize.js";
import { Screen } from "../canvasUtilitys/screen.js";

import { Settings } from "../settings.js";

export class GameOverScreen extends Screen {
  constructor() {
    super(Settings.pathGameoverScreenLayout, { x: 0, y: 0 }, { x: 1, y: 1 }, Settings.zIndex.gameOver, { x: 0, y: 0 }, getCanvasSize());
  }

  update() {
    super.update();
    this.#checkStatus();

    if (!this.change) {
      if (this.frozen || !this.active) return;
    }

    if (!this.isLoaded) return;

    this.elements.scoreNumberText.text = Settings.score;

    Settings.highScore = Math.max(Settings.highScore, Settings.score);

    if (this.elements.buttonRestart.isClicked()) {
      Settings.gameScreenStatus = "active";
      Settings.inGameScreenStatus = "active";
      Settings.backgroundScreenStatus = "active";
      Settings.gameoverScreenStatus = "inactive";
      Settings.restart = true;
      Settings.lost = false;
    }

    if (this.elements.buttonExit.isClicked()) {
      Settings.gameScreenStatus = "inactive";
      Settings.inGameScreenStatus = "inactive";
      Settings.startScreenStatus = "active";
      Settings.backgroundScreenStatus = "active";
      Settings.gameoverScreenStatus = "inactive";
      Settings.lost = false;
    }
  }

  draw() {
    super.draw();
  }

  #checkStatus() {
    if (Settings.gameoverScreenStatus === "inactive") {
      this.active = false;
      this.frozen = false;
    }

    if (Settings.gameoverScreenStatus === "active") {
      this.active = true;
      this.frozen = false;
    }

    if (Settings.gameoverScreenStatus === "frozen") {
      this.active = true;
      this.frozen = true;
    }
  }
}
