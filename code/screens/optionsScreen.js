import { getCanvasSize } from "../canvasUtilitys/canvasSize.js";
import { Screen } from "../canvasUtilitys/screen.js";

import { Settings } from "../settings.js";

export class OptionsScreen extends Screen {
  constructor() {
    super(Settings.pathOptionsScreenLayout, { x: 0, y: 0 }, { x: 1, y: 1 }, Settings.zIndex.options,{ x: 0, y: 0 }, getCanvasSize());

    this.graphicsScreen = new Screen(Settings.pathGraphicsScreenLayout, { x: 0, y: 0 }, { x: 1, y: 1 }, 0, { x: 0, y: 0 }, getCanvasSize());
    this.soundScreen = new Screen(Settings.pathSoundScreenLayout, { x: 0, y: 0 }, { x: 1, y: 1 }, 0, { x: 0, y: 0 }, getCanvasSize());
    this.controllsScreen = new Screen(Settings.pathControllsScreenLayout, { x: 0, y: 0 }, { x: 1, y: 1 }, 0, { x: 0, y: 0 }, getCanvasSize());

    this.#loadBlockButtons();

    this.activeOptionsMenu = "graphics";
  }

  update() {
    super.update();
    this.#checkStatus();

    if (!this.change) {
      if (this.frozen || !this.active) return;
    }

    if (!this.isLoaded) return;

    if (this.elements.backButton.isClicked()) {
      Settings.startScreenStatus = "active";
      Settings.optionsScreenStatus = "inactive";
    };

    if(this.elements.buttonGraphics.isClicked()) this.#setGraphicsScreen();
  
    if (this.elements.buttonSound.isClicked()) this.#setSoundScreen();
    
    if (this.elements.buttonControlls.isClicked()) this.#setControllsScreen();
  }

  draw() {
    super.draw();
  }

  #setGraphicsScreen() {
    this.activeOptionsMenu = "graphics";

    this.addElement("graphicsScreen", this.graphicsScreen);
    this.removeElement("soundScreen");
    this.removeElement("controllsScreen");

    this.addElement("buttonGraphicsBlocked", this.buttonGraphicsBlocked);
    this.addElement("buttonGraphicsBlockedText", this.buttonGraphicsBlockedText);
    this.removeElement("buttonSoundBlocked");
    this.removeElement("buttonSoundBlockedText");
    this.removeElement("buttonControllsBlocked");
    this.removeElement("buttonControllsBlockedText");
  }

  #setSoundScreen() {
    this.activeOptionsMenu = "sound";

    this.addElement("soundScreen", this.soundScreen);
    this.removeElement("graphicsScreen");
    this.removeElement("controllsScreen");

    this.addElement("buttonSoundBlocked", this.buttonSoundBlocked);
    this.addElement("buttonSoundBlockedText", this.buttonSoundBlockedText);

    this.removeElement("buttonGraphicsBlocked");
    this.removeElement("buttonGraphicsBlockedText");
    this.removeElement("buttonControllsBlocked");
    this.removeElement("buttonControllsBlockedText");
  }

  #setControllsScreen() {
    this.activeOptionsMenu = "controlls";

    this.addElement("controllsScreen", this.controllsScreen);
    this.removeElement("graphicsScreen");
    this.removeElement("soundScreen");

    this.addElement("buttonControllsBlocked", this.buttonControllsBlocked);
    this.addElement("buttonControllsBlockedText", this.buttonControllsBlockedText);

    this.removeElement("buttonGraphicsBlocked");
    this.removeElement("buttonGraphicsBlockedText");
    this.removeElement("buttonSoundBlocked");
    this.removeElement("buttonSoundBlockedText");
  }

  async #loadBlockButtons() {
    this.buttonGraphicsBlocked = await this.getElement("buttonGraphicsBlocked");
    this.buttonGraphicsBlockedText = await this.getElement("buttonGraphicsBlockedText");

    this.buttonSoundBlocked = await this.getElement("buttonSoundBlocked");
    this.buttonSoundBlockedText = await this.getElement("buttonSoundBlockedText");

    this.buttonControllsBlocked = await this.getElement("buttonControllsBlocked");
    this.buttonControllsBlockedText = await this.getElement("buttonControllsBlockedText");

    this.#setGraphicsScreen();
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
