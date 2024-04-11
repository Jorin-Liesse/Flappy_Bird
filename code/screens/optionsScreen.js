import { getCanvasSize } from "../canvasUtilitys/canvasSize.js";
import { Screen } from "../canvasUtilitys/screen.js";
import { AudioManager } from "../canvasUtilitys/audioManager.js";
import { InputManager } from "../canvasUtilitys/inputManager.js";

import { goFullScreen, exitFullScreen } from "../../script.js";

import { Settings } from "../settings.js";

export class OptionsScreen extends Screen {
  constructor() {
    super(Settings.pathOptionsScreenLayout, { x: 0, y: 0 }, { x: 1, y: 1 }, Settings.zIndex.options,{ x: 0, y: 0 }, getCanvasSize());

    this.graphicsScreen = new Screen(Settings.pathGraphicsScreenLayout, { x: 0, y: 0 }, { x: 1, y: 1 }, 0, { x: 0, y: 0 }, getCanvasSize());
    this.soundScreen = new Screen(Settings.pathSoundScreenLayout, { x: 0, y: 0 }, { x: 1, y: 1 }, 0, { x: 0, y: 0 }, getCanvasSize());
    this.controllsScreen = new Screen(Settings.pathControllsScreenLayout, { x: 0, y: 0 }, { x: 1, y: 1 }, 0, { x: 0, y: 0 }, getCanvasSize());

    this.#loadBlockButtons();

    this.activeOptionsMenu = "graphics";

    if (navigator.userAgent.includes('Electron')) {
      this.graphicsScreen.removeElement("choiceResolutionGray");
      this.graphicsScreen.removeElement("textResolutionGray");
    } else {
      this.graphicsScreen.removeElement("textResolution");
      this.graphicsScreen.removeElement("choiceResolution");
    }

    this.#setUIToSettings();
  }

  update() {
    super.update();
    this.#checkStatus();

    if (!this.change) {
      if (this.frozen || !this.active) return;
    }

    if (!this.isLoaded) return;

    if (this.elements.backButton.isClicked() || InputManager.isKeyPressed(27)) {
      Settings.save = true;
      Settings.startScreenStatus = "active";
      Settings.optionsScreenStatus = "inactive";
    };

    this.#applySettings();

    if(this.elements.buttonGraphics.isClicked()) this.#setGraphicsScreen();
  
    if (this.elements.buttonSound.isClicked()) this.#setSoundScreen();
    
    if (this.elements.buttonControlls.isClicked()) this.#setControllsScreen();
  }

  changeWindowMode() {
    switch (Settings.windowMode) {
      case "fullscreen":
        goFullScreen();
        break;
      case "windowed":
        exitFullScreen();
        break;
      case "borderless":
        goFullScreen();
        break;
      }
  }

  draw() {
    super.draw();
  }

  resize(position, size) {
    super.resize(position, size);

    this.graphicsScreen.resize(position, size);
    this.soundScreen.resize(position, size);
    this.controllsScreen.resize(position, size);

    this.buttonGraphicsBlocked.resize(position, size);
    this.buttonGraphicsBlockedText.resize(position, size);

    this.buttonSoundBlocked.resize(position, size);
    this.buttonSoundBlockedText.resize(position, size);

    this.buttonControllsBlocked.resize(position, size);
    this.buttonControllsBlockedText.resize(position, size);
  }

  async #setUIToSettings() {
    await this.graphicsScreen.loadPromise;
    await this.soundScreen.loadPromise;
    this.graphicsScreen.elements.choiceFPS.changeValue(Settings.fpsLimit);
    this.graphicsScreen.elements.choiceWindowMode.changeValue(Settings.windowMode);

    this.graphicsScreen.elements.switchHitboxes.status = Settings.showCollisionBoxes ? "on" : "off";
    this.graphicsScreen.elements.switchShowFPS.status = Settings.FPSCounterStatus === "active" ? "on" : "off";

    this.soundScreen.elements.sliderMasterVolume.changeValue(Settings.masterVolume);
    this.soundScreen.elements.sliderMusicVolume.changeValue(Settings.musicVolume);
    this.soundScreen.elements.sliderSoundEffectVolume.changeValue(Settings.soundEffectVolume);

    if (navigator.userAgent.includes('Electron') && this.graphicsScreen.elements.choiceResolution.isChanged()) {
      this.graphicsScreen.elements.choiceResolution.changeValue(Settings.resolution);
      window.electronAPI.setResolution(this.graphicsScreen.elements.choiceResolution.value);
    }

    await this.#applySettings();
  }

  async #applySettings() {
    await this.graphicsScreen.loadPromise;
    await this.soundScreen.loadPromise;

    if (this.graphicsScreen.elements.choiceFPS.isChanged()) {
      Settings.fpsLimit = parseInt(this.graphicsScreen.elements.choiceFPS.value);
    }
    if (this.graphicsScreen.elements.choiceWindowMode.isChanged()) {
      Settings.windowMode = this.graphicsScreen.elements.choiceWindowMode.value;
      this.changeWindowMode();
    }

    if (navigator.userAgent.includes('Electron') && this.graphicsScreen.elements.choiceResolution.isChanged()) {
      Settings.resolution = this.graphicsScreen.elements.choiceResolution.value;
      window.electronAPI.setResolution(this.graphicsScreen.elements.choiceResolution.value);
    }

    if (this.graphicsScreen.elements.switchHitboxes.isChanged()) {
      Settings.showCollisionBoxes = this.graphicsScreen.elements.switchHitboxes.status === "on" ? true : false;
    }
    if (this.graphicsScreen.elements.switchShowFPS.isChanged()) {
      Settings.FPSCounterStatus = this.graphicsScreen.elements.switchShowFPS.status === "on" ? "active" : "inactive";
    }

    if (this.soundScreen.elements.sliderMasterVolume.isChanged()) {
      Settings.masterVolume = this.soundScreen.elements.sliderMasterVolume.value;
      AudioManager.update(Settings.masterVolume, Settings.musicVolume, Settings.soundEffectVolume);
    }
    if (this.soundScreen.elements.sliderMusicVolume.isChanged()) {
      Settings.musicVolume = this.soundScreen.elements.sliderMusicVolume.value;
      AudioManager.update(Settings.masterVolume, Settings.musicVolume, Settings.soundEffectVolume);
    }
    if (this.soundScreen.elements.sliderSoundEffectVolume.isChanged()) {
      Settings.soundEffectVolume = this.soundScreen.elements.sliderSoundEffectVolume.value;
      AudioManager.update(Settings.masterVolume, Settings.musicVolume, Settings.soundEffectVolume);
    }
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
