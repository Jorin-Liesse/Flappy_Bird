import { getCanvasSize } from "../canvasUtilitys/canvasSize.js";
import { Screen } from "../canvasUtilitys/screen.js";

import { Settings } from "../settings.js";

export class OptionsScreen extends Screen {
  constructor() {
    super(Settings.pathOptionsScreenLayout, { x: 0, y: 0 }, { x: 1, y: 1 }, Settings.zIndex.options,{ x: 0, y: 0 }, getCanvasSize());
  }

  update() {
    super.update();
  }

  draw() {
    super.draw();
  }
}
