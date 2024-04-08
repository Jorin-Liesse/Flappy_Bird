import { getCanvasSize } from "../canvasUtilitys/canvasSize.js";
import { Screen } from "../canvasUtilitys/screen.js";

import { Settings } from "../settings.js";

export class CreditsScreen extends Screen {
  constructor() {
    super(Settings.pathCreditsScreenLayout, { x: 0, y: 0 }, { x: 1, y: 1 }, Settings.zIndex.credits, { x: 0, y: 0 }, getCanvasSize());
  }

  update() {
    super.update();
    this.#checkStatus();

    if (!this.change) {
      if (this.frozen || !this.active) return;
    }

    if (!this.isLoaded) return;

    if (this.elements.backButton.isClicked()) {
      Settings.creditsScreenStatus = "inactive";
      Settings.startScreenStatus = "active";
    }
  }

  draw() {
    super.draw();
  }

  #checkStatus() {
    if (Settings.creditsScreenStatus === "inactive") {
      this.active = false;
      this.frozen = false;
    }

    if (Settings.creditsScreenStatus === "active") {
      this.active = true;
      this.frozen = false;
    }

    if (Settings.creditsScreenStatus === "frozen") {
      this.active = true;
      this.frozen = true;
    }
  }
}
