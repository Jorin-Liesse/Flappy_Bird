import { getCanvasSize } from "../canvasUtilitys/canvasSize.js";
import { Screen } from "../canvasUtilitys/screen.js";

import { Settings } from "../settings.js";

export class BackgroundScreen extends Screen {
  constructor() {
    super(Settings.pathBackgroundLayout, { x: 0, y: 0 }, { x: 1, y: 1 }, Settings.zIndex.background, { x: 0, y: 0 }, getCanvasSize());
  }

  update() {
    super.update();
  }
}
