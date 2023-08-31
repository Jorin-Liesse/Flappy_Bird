import { Player } from "./player.js";

export class Level {
  constructor() {
    this.status = "play";

    this.canvas = document.getElementById("mainCanvas");
    this.ctx = this.canvas.getContext("2d");

    this.player = new Player();
  }

  update(dt) {
    if (this.status === "play") {
      this.player.update(dt);
    }
  }
}
