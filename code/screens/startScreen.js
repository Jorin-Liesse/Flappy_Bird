import { getCanvasSize } from "../canvasUtilitys/canvasSize.js";
import { Screen } from "../canvasUtilitys/screen.js";
import { PageStatus } from "../canvasUtilitys/pageStatus.js";

import { Settings } from "../settings.js";

export class StartScreen extends Screen {
  constructor() {
    super(Settings.pathStartScreenLayout, { x: 0, y: 0 }, { x: 1, y: 1 }, Settings.zIndex.start, { x: 0, y: 0 }, getCanvasSize());
  }

  update() {
    super.update();
    this.#checkStatus();

    if (!this.change) {
      if (this.frozen || !this.active) return;
    }

    if (!this.isLoaded) return;

    if (this.elements.infoButton.isClicked()) {
      Settings.startScreenStatus = "inactive";
      Settings.creditsScreenStatus = "active";
    };

    if (this.elements.buttonStart.isClicked()) {
      Settings.startScreenStatus = "inactive";
      Settings.gameScreenStatus = "active";
      Settings.inGameScreenStatus = "active";
      Settings.restart = true;
      PageStatus.wasHidden = false;
    };
    
    if (this.elements.buttonOptions.isClicked()) {
      Settings.startScreenStatus = "inactive";
      Settings.optionsScreenStatus = "active";
    };
    
    if (this.elements.buttonQuit.isClicked()) window.close();;
  }

  draw() {
    super.draw();
  }

  #checkStatus() {
    if (Settings.startScreenStatus === "inactive") {
      this.active = false;
      this.frozen = false;
    }

    if (Settings.startScreenStatus === "active") {
      this.active = true;
      this.frozen = false;
    }

    if (Settings.startScreenStatus === "frozen") {
      this.active = true;
      this.frozen = true;
    }
  }
}
