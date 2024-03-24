import { getCanvasSize } from "../canvasUtilitys/canvasSize.js";
import { Screen } from "../canvasUtilitys/screen.js";

import { Settings } from "../settings.js";

export class OptionsScreen extends Screen {
  constructor() {
    super(Settings.pathOptionsScreenLayout, { x: 0, y: 0 }, { x: 1, y: 1 }, Settings.zIndex.options,{ x: 0, y: 0 }, getCanvasSize());

    this.graphicsScreen = new Screen(Settings.pathGraphicsScreenLayout, { x: 0, y: 0 }, { x: 1, y: 1 }, 0, { x: 0, y: 0 }, getCanvasSize());
    this.soundScreen = new Screen(Settings.pathSoundScreenLayout, { x: 0, y: 0 }, { x: 1, y: 1 }, 0, { x: 0, y: 0 }, getCanvasSize());
    this.controllsScreen = new Screen(Settings.pathControllsScreenLayout, { x: 0, y: 0 }, { x: 1, y: 1 }, 0, { x: 0, y: 0 }, getCanvasSize());

    this.addElement("graphicsScreen", this.graphicsScreen);
    // this.addElement("soundScreen", this.soundScreen);
    // this.addElement("controllsScreen", this.controllsScreen);

    this.putElementOnTop("graphicsScreen");
    // this.putElementOnTop("soundScreen");
    // this.putElementOnTop("controllsScreen");
  }

  update() {
    super.update();

    this.#checkStatus();
  }

  draw() {
    super.draw();
  }

  #checkStatus() {
    if (Settings.optionsScreenStatus === "inactive") {
      this.active = false;
      this.frozen = false;
    }

    if (Settings.optionsScreenStatus === "active") {
      this.active = true;
      this.frozen = false;
    }

    if (Settings.optionsScreenStatus === "frozen") {
      this.active = true;
      this.frozen = true;
    }
  }
}
