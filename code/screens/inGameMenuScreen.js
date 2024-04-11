import { getCanvasSize } from "../canvasUtilitys/canvasSize.js";
import { Screen } from "../canvasUtilitys/screen.js";
import { InputManager } from "../canvasUtilitys/inputManager.js";
import { PageStatus } from "../canvasUtilitys/pageStatus.js";

import { Settings } from "../settings.js";

export class InGameMenuScreen extends Screen {
  constructor() {
    super(Settings.pathInGameMenuScreenLayout, { x: 0, y: 0 }, { x: 1, y: 1 }, Settings.zIndex.options, { x: 0, y: 0 }, getCanvasSize());
  }

  update() {
    super.update();
    this.#checkStatus();

    if (!this.change) {
      if (this.frozen || !this.active) return;
    }

    if (!this.isLoaded) return;

    if (this.elements.resumeButton.isClicked()) {
      Settings.gameScreenStatus = "active";
      Settings.inGameScreenStatus = "active";
      Settings.inGameMenuScreenStatus = "inactive";
      Settings.backgroundScreenStatus = "active";
      PageStatus.wasHidden = false;
    };

    if (this.elements.restartButton.isClicked()) {
      Settings.gameScreenStatus = "active";
      Settings.inGameScreenStatus = "active";
      Settings.inGameMenuScreenStatus = "inactive";
      Settings.backgroundScreenStatus = "active";
      Settings.restart = true;
      PageStatus.wasHidden = false;
    };
    
    if (this.elements.exitButton.isClicked() || InputManager.isKeyPressed(27)) {
      Settings.startScreenStatus = "active";
      Settings.gameScreenStatus = "inactive";
      Settings.inGameScreenStatus = "inactive";
      Settings.inGameMenuScreenStatus = "inactive";
      Settings.backgroundScreenStatus = "active";

      Settings.restart = true;
    };
  }

  draw() {
    super.draw();
  }

  #checkStatus() {
    if (Settings.inGameMenuScreenStatus === "inactive") {
      this.active = false;
      this.frozen = false;
    }

    if (Settings.inGameMenuScreenStatus === "active") {
      this.active = true;
      this.frozen = false;
    }

    if (Settings.inGameMenuScreenStatus === "frozen") {
      this.active = true;
      this.frozen = true;
    }
  }
}
