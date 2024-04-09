import { Settings } from "../settings.js";

export class AspectRatio {
  static #canvas;

  static init(canvas) {
    this.#canvas = canvas;
    this.adjust();
  }

  static adjust() {
    if (window.innerHeight * Settings.aspectRatio > window.innerWidth) {
      this.#canvas.width = window.innerWidth;
      this.#canvas.height = window.innerWidth * (1 / Settings.aspectRatio);
    } else {
      this.#canvas.width = window.innerHeight * Settings.aspectRatio;
      this.#canvas.height = window.innerHeight;
    }
  }
}
