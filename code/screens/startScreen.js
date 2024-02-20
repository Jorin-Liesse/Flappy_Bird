import { getCanvasSize } from "../canvasUtilitys/canvasSize.js";
import { Screen } from "../canvasUtilitys/screen.js";

import { Settings } from "../settings.js";

export class StartScreen extends Screen {
  constructor() {
    super(Settings.pathStartScreenLayout, { x: 0, y: 0 }, { x: 1, y: 1 }, Settings.zIndex.start, { x: 0, y: 0 }, getCanvasSize());
  }

  update() {
    super.update();
  }

  draw() {
    super.draw();
  }
}
