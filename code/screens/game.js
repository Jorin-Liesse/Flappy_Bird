import { Screen } from "../canvasUtilitys/screen.js";
import { Settings } from "../settings.js";

import { Main } from "../main.js";
import { InGame } from "./inGame.js";
import { GameOver } from "./gameOver.js";
import { Background } from "./background.js";
import { GrayFilter } from "./grayFilter.js";

import { rectRectCollision } from "../canvasUtilitys/collision.js";
import { getCanvasSize } from "../canvasUtilitys/canvasSize.js";
import { Pilar } from "../gameObjects/pilar.js";
import { Player } from "../gameObjects/player.js";
import { Ground } from "../gameObjects/ground.js";
import { Roof } from "../gameObjects/roof.js";
import { PointTrigger } from "../gameObjects/pointTrigger.js";

export class Game extends Screen {
  static restart = false;
  static lost = false;

  static init() {
    super.init({zIndex: Settings.zIndex.game});

    this.reset();
  }

  static update() {
    super.update();
    if (!this.checkUpdateNeeded()) return;

    this.pilarSpawner();
    this.pilarRemover();

    this.checkPointTrigger();

    InGame.score = this.score;

    this.elements["player"].collidables = [];

    for (const key in this.elements) {
      const element = this.elements[key];
      if (element instanceof Pilar) {
        this.elements["player"].collidables.push(element.collisionBoxes);
      }
    }

    this.elements["player"].collidables.push(this.elements["ground"].collisionBoxes);
    this.elements["player"].collidables.push(this.elements["roof"].collisionBoxes);

    if (this.elements["player"].refPosition.x + this.elements["player"].refSize.x < 0) {
      this.lost = true;
      this.elements["player"].refPosition.x = 2;
    };

    if (this.lost) {
      this.status = "frozen";
      GrayFilter.status = "transitionIn";
      InGame.status = "frozen";
      Background.status = "frozen";
      GameOver.status = "transitionIn";
      InGame.highScore = Math.max(InGame.highScore, InGame.score);
      Main.save = true;
    }

    if (this.restart) this.reset();
  }

  static draw() {
    super.draw();
    if (!this.checkDrawNeeded()) return;
  }

  static reset() {
    this.elements = {};
    
    this.spawnDistance = 0;
    this.pilarCounter = 0;

    this.score = 0;

    this.addElement("roof", new Roof({ x: 0, y: 0 }, getCanvasSize()));
    this.addElement("ground", new Ground({ x: 0, y: 0 }, getCanvasSize()));
    this.addElement("player", new Player({ x: 0, y: 0 }, getCanvasSize()));

    this.addPilar();

    this.restart = false;
  }

  static checkPointTrigger() {
    for (const key in this.elements) {
      const element = this.elements[key];
      if (element instanceof PointTrigger) {
        if (rectRectCollision(this.elements["player"].collisionBoxes, element.collisionBoxes)) {
          this.score++;
          delete this.elements[key];
        }
      }
    }
  }

  static pilarSpawner() {
    if (this.pilarCounter === 0) return;
    if (this.elements[this.pilarCounter - 1 + "Top"].refPosition.x > 1 - this.spawnDistance) return;

    this.addPilar();
  }

  static pilarRemover() {
    for (const key in this.elements) {
      const element = this.elements[key];
      if (element instanceof Pilar && (element.position.x + element.size.x < -0.1)) {
        delete this.elements[key];
      }

      if (element instanceof PointTrigger && (element.position.x + element.size.x < -0.1)) {
        delete this.elements[key];
      }
    }
  }

  static addPilar() {
    const pilarOpening = Math.random() * (Settings.pilarOpeningMax - Settings.pilarOpeningMin) + Settings.pilarOpeningMin;
    const pilarOffset =  Math.random() * (Settings.pilarOffsetMax - Settings.pilarOffsetMin) + Settings.pilarOffsetMin;

    const pilarTop = new Pilar(
      Settings.pathPilarTop,
      { x: 1, y: 0.5 - Settings.pilarSize.y - pilarOpening/2 + pilarOffset },
      { x: 0, y: 0 },
      getCanvasSize()
    );

    const pilarBottom = new Pilar(
      Settings.pathPilarBottom,
      { x: 1, y: 0.5 + pilarOpening/2 + pilarOffset },
      { x: 0, y: 0 },
      getCanvasSize()
    );

    const pointTrigger = new PointTrigger(
      Settings.pathPointTrigger,
      { x: 1 + Settings.pilarSize.x / 3, y: 0.5 - pilarOpening/2 + pilarOffset },
      { x: Settings.pilarSize.x / 3, y: pilarOpening},
      { x: 0, y: 0 },
      getCanvasSize()
    );

    this.addElement(this.pilarCounter + "PointTrigger", pointTrigger);

    this.addElement(this.pilarCounter + "Top", pilarTop);
    this.addElement(this.pilarCounter + "Bottom", pilarBottom);

    this.putElementOnTop("player");

    this.pilarCounter++;
    this.spawnDistance = Math.random() * (Settings.pilarSpawnIntervalMax - Settings.pilarSpawnIntervalMin) + Settings.pilarSpawnIntervalMin;

    if (this.spawnDistance - Settings.pilarSize.x * 1.1 < Settings.playerSize.x) {
      this.spawnDistance = Settings.playerSize.x * 1.1 + Settings.pilarSize.x;
    }
  }
}
