import { getCanvasSize } from "../canvasUtilitys/canvasSize.js";
import { Screen } from "../canvasUtilitys/screen.js";

import { Settings } from "../settings.js";

export class InGameScreen extends Screen {
  constructor() {
    super(Settings.pathInGameScreenLayout, { x: 0, y: 0 }, { x: 1, y: 1 }, Settings.zIndex.inGame, { x: 0, y: 0 }, getCanvasSize());

    this.test = true;
  }

  update() {
    super.update();
    this.#checkStatus();

    if (!this.change) {
      if (this.frozen || !this.active) return;
    }

    if (!this.isLoaded) return;

    if (this.elements.pauseButton.isClicked()) {
      Settings.gameScreenStatus = "frozen";
      Settings.inGameScreenStatus = "frozen";
      Settings.backgroundScreenStatus = "frozen";
      Settings.inGameMenuScreenStatus = "active";
    };

    this.elements.score.text = Settings.score;
  }

  draw() {
    super.draw();
  }

  #checkStatus() {
    if (Settings.inGameScreenStatus === "inactive") {
      this.active = false;
      this.frozen = false;
    }

    if (Settings.inGameScreenStatus === "active") {
      this.active = true;
      this.frozen = false;
    }

    if (Settings.inGameScreenStatus === "frozen") {
      this.active = true;
      this.frozen = true;
    }
  }
}
