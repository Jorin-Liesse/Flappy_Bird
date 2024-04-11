import { getCanvasSize } from "../canvasUtilitys/canvasSize.js";
import { Screen } from "../canvasUtilitys/screen.js";
import { InputManager } from "../canvasUtilitys/inputManager.js";
import { PageStatus } from "../canvasUtilitys/pageStatus.js";

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

    // if (!PageStatus.pageVisibility || !PageStatus.pageFocus) console.log("pageVisibility or pageFocus is false");

    // console.log(PageStatus.wasHidden);
    if (this.elements.pauseButton.isClicked() || InputManager.isKeyReleased(27) || PageStatus.wasHidden) {
      Settings.gameScreenStatus = "frozen";
      Settings.inGameScreenStatus = "frozen";
      Settings.backgroundScreenStatus = "frozen";
      Settings.inGameMenuScreenStatus = "active";
      PageStatus.wasHidden = false;
    };

    this.elements.score.text = Settings.score;
    this.elements.highScore.text = Settings.highScore;
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
