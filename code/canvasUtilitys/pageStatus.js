export class PageStatus {
  static #pageVisibility = true;
  static #pageFocus = true;

  static init() {}

  static update() {
    this.#checkVisibility();
    this.#checkFocus();
  }

  static #checkVisibility() {
    if (typeof document.hidden !== "undefined") {
      document.addEventListener("visibilitychange", () => {
        this.#pageVisibility = document.hidden;
      });

    } else if (typeof document.msHidden !== "undefined") {
      document.addEventListener("msvisibilitychange", () => {
        this.#pageVisibility = document.msHidden;
      });

    } else if (typeof document.webkitHidden !== "undefined") {
      document.addEventListener("webkitvisibilitychange", () => {
        this.#pageVisibility = document.webkitHidden;
      });
    }
  }

  static #checkFocus() {
    if (typeof document.hasFocus === "function") {
      if (document.hasFocus()) {
        this.#pageVisibility = true;
      } else {
        this.#pageVisibility = false
      }
    }
  }

  static get pageVisibility() {
    return this.#pageVisibility;
  }

  static get pageFocus() {
    return this.#pageFocus;
  }
}
