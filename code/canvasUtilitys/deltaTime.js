export class DeltaTime {
  static #timeLastFrame = 0;
  static #timeThisFrame = 0;

  static update() {
    this.#timeThisFrame = performance.now();
    this.dt = (this.#timeThisFrame - this.#timeLastFrame);
    this.#timeLastFrame = this.#timeThisFrame;
  }
}
