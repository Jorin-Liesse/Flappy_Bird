import { getCanvasSize } from "../canvasUtilitys/canvasSize.js";
import { DeltaTime } from "../canvasUtilitys/deltaTime.js";
import { Screen } from "../canvasUtilitys/screen.js";

import { Settings } from "../settings.js";
import { Pilar } from "../gameObjects/pilar.js";
import { Player } from "../gameObjects/player.js";
import { Ground } from "../gameObjects/ground.js";

export class GameScreen extends Screen {
  constructor() {
    super(Settings.pathGameScreenLayout, { x: 0, y: 0 }, { x: 1, y: 1 }, Settings.zIndex.game, { x: 0, y: 0 }, getCanvasSize());

    this.spawnInterval = 0;
    this.timeSinceLastSpawn = 0;
    this.pilarCounter = 0;

    this.addElement("ground", new Ground({ x: 0, y: 0 }, getCanvasSize()));
    this.addElement("player", new Player({ x: 0, y: 0 }, getCanvasSize()));
  }

  update() {
    super.update();

    this.pilarSpawner();
    this.pilarRemover();

    for (const key in this.elements) {
      const element = this.elements[key];
      if (element instanceof Pilar) {
        this.elements["player"].collidables.push(element);
      }
    }

    this.elements["player"].collidables.push(this.elements["ground"]);
  }

  draw() {
    super.draw();
  }

  pilarSpawner() {
    this.timeSinceLastSpawn += DeltaTime.dt;

    if (this.timeSinceLastSpawn >= this.spawnInterval) {
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

      this.addElement(this.pilarCounter + "Top", pilarTop);
      this.addElement(this.pilarCounter + "Bottom", pilarBottom);

      this.putElementOnTop("player");

      this.spawnInterval = Math.random() * (Settings.pilarSpawnIntervalMax - Settings.pilarSpawnIntervalMin) + Settings.pilarSpawnIntervalMin;
      this.timeSinceLastSpawn = 0;
      this.pilarCounter++;
    }
  }

  pilarRemover() {
    for (const key in this.elements) {
      const element = this.elements[key];
      if (element instanceof Pilar && element.position.x + element.size.x < 0) {
        delete this.elements[key];
      }
    }
  }
}
