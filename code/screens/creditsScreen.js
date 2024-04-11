import { getCanvasSize } from "../canvasUtilitys/canvasSize.js";
import { Screen } from "../canvasUtilitys/screen.js";
import { InputManager } from "../canvasUtilitys/inputManager.js";

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

    if (this.elements.backButton.isClicked() || InputManager.isKeyPressed(27)) {
      Settings.creditsScreenStatus = "inactive";
      Settings.startScreenStatus = "active";
    }

    if (this.elements.linkedinButton.isClicked()) window.open('https://www.linkedin.com/in/jorin-liesse-755774287/', '_blank');

    if (this.elements.githubButton.isClicked()) window.open('https://github.com/Jorin-Liesse/Flappy_Bird', '_blank');


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
