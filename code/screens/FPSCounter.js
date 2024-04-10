import { getCanvasSize } from "../canvasUtilitys/canvasSize.js";
import { Screen } from "../canvasUtilitys/screen.js";
import { DeltaTime } from "../canvasUtilitys/deltaTime.js";

import { Settings } from "../settings.js";

export class FPSCounter extends Screen {
  constructor() {
    super(Settings.pathFPSCounterLayout, { x: 0, y: 0 }, { x: 1, y: 1 }, Settings.zIndex.FPSCounter, { x: 0, y: 0 }, getCanvasSize());
  }

  update() {
    super.update();
    this.#checkStatus();

    if (!this.change) {
      if (this.frozen || !this.active) return;
    }

    if (!this.isLoaded) return;
    this.elements.FPSCounter.text = `${Settings.currentFPS} FPS`;
  }

  draw() {
    super.draw();
  }

  #checkStatus() {
    if (Settings.FPSCounterStatus === "inactive") {
      this.active = false;
      this.frozen = false;
    }

    if (Settings.FPSCounterStatus === "active") {
      this.active = true;
      this.frozen = false;
    }

    if (Settings.FPSCounterStatus === "frozen") {
      this.active = true;
      this.frozen = true;
    }
  }
}
