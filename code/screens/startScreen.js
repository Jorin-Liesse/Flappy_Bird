import { getCanvasSize } from "../canvasUtilitys/canvasSize.js";
import { Screen } from "../canvasUtilitys/screen.js";

import { Settings } from "../settings.js";

export class StartScreen extends Screen {
  constructor() {
    super(Settings.pathStartScreenLayout, { x: 0, y: 0 }, { x: 1, y: 1 }, Settings.zIndex.start, { x: 0, y: 0 }, getCanvasSize());
  }

  update() {
    super.update();

    this.#checkStatus();
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
