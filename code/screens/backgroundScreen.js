import { getCanvasSize } from "../canvasUtilitys/canvasSize.js";
import { Screen } from "../canvasUtilitys/screen.js";

import { Settings } from "../settings.js";

export class BackgroundScreen extends Screen {
  constructor() {
    super(Settings.pathBackgroundLayout, { x: 0, y: 0 }, { x: 1, y: 1 }, Settings.zIndex.background, { x: 0, y: 0 }, getCanvasSize());
  }

  update() {
    super.update();

    this.#checkStatus();
  }

  draw() {
    super.draw();
  }

  #checkStatus() {
    if (Settings.backgroundScreenStatus === "inactive") {
      this.active = false;
      this.frozen = false;
    }

    if (Settings.backgroundScreenStatus === "active") {
      this.active = true;
      this.frozen = false;
    }

    if (Settings.backgroundScreenStatus === "frozen") {
      this.active = true;
      this.frozen = true;
    }
  }
}
