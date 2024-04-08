import { Line } from "./UI/line.js";
import { Circle } from "./UI/circle.js";
import { Rectangle } from "./UI/rectangle.js";
import { Sprite } from "./UI/sprite.js";
import { Text } from "./UI/text.js";
import { Button } from "./UI/button.js";
import { ChoiceBox } from "./UI/choiceBox.js";
import { Slider } from "./UI/slider.js";
import { Switch } from "./UI/switch.js";
import { ProgressBar } from "./UI/progressBar.js";
import { SpriteSheet } from "./UI/spriteSheet.js";
import { Parallax } from "./UI/parallax.js";

export class Screen {
  constructor(layoutPath, refPosition, refSize, zIndex, screenPosition, screenSize) {
    this.refPosition = refPosition;
    this.refSize = refSize;

    this.zIndex = zIndex;

    this.screenPosition = screenPosition;
    this.screenSize = screenSize;

    this.#calculateRef(screenPosition, screenSize);

    this.active = true;
    this.frozen = false;

    this.preActive = true;
    this.preFrozen = false;

    this.isLoaded = false;

    this.elements = {};

    this.loadPromise = this.#loadUI(layoutPath);
  }

  update() {
    const changeActive = this.active !== this.preActive;
    const changeFrozen = this.frozen !== this.preFrozen;

    this.change = changeActive || changeFrozen;

    this.preActive = this.active;
    this.preFrozen = this.frozen;

    if (!this.change) {
      if (this.frozen || !this.active) return;
    }

    if (!this.isLoaded) return

    for (const element in this.elements) {
      this.elements[element].update();
    }
  }

  draw() {
    if (!this.isLoaded || !this.active) return;

    for (const element in this.elements) {
      this.elements[element].draw();
    }
  }

  resize(screenPosition, screenSize) {
    this.screenPosition = screenPosition;
    this.screenSize = screenSize;

    this.#calculateRef(screenPosition, screenSize);

    for (const element in this.elements) {
      this.elements[element].resize(this.position, this.size);
    }
  }

  async addElement(name, element) {
    this.elements[name] = element;

    await this.loadPromise;
    this.putElementOnTop(name);
  }

  async removeElement(name) {
    await this.loadPromise;
    delete this.elements[name];
  }

  async getElement(name) {
    await this.loadPromise;
    return this.elements[name];
  }

  async putElementOnTop(elementName) {
    await this.loadPromise;

    const element = this.elements[elementName];
    delete this.elements[elementName];
    this.elements[elementName] = element;
  }

  async #loadUI(layoutPath) {
    try {
      const response = await fetch(layoutPath);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      for (const element in data) {
        switch (data[element].type) {
          case "Line":
            this.elements[element] = new Line(data[element], this.position, this.size);
            break;

          case "Circle":
            this.elements[element] = new Circle(data[element], this.position, this.size);
            break;

          case "Rectangle":
            this.elements[element] = new Rectangle(data[element], this.position, this.size);
            break;

          case "Sprite":
            this.elements[element] = new Sprite(data[element], this.position, this.size);
            break;

          case "Text":
            this.elements[element] = new Text(data[element], this.position, this.size);
            break;

          case "Button":
            this.elements[element] = new Button(data[element], this.position, this.size);
            break;

          case "ChoiceBox":
            this.elements[element] = new ChoiceBox(data[element], this.position, this.size);
            break;

          case "Slider":
            this.elements[element] = new Slider(data[element], this.position, this.size);
            break;

          case "Switch":
            this.elements[element] = new Switch(data[element], this.position, this.size);
            break;

          case "ProgressBar":
            this.elements[element] = new ProgressBar(data[element], this.position, this.size);
            break;

          case "SpriteSheet":
            this.elements[element] = new SpriteSheet(data[element], this.position, this.size);
            break;

            case "Parallax":
              this.elements[element] = new Parallax(data[element], this.position, this.size);
              break;
        }
      }
      
      this.isLoaded = true;
      
    } catch (error) {
      console.error("There was a problem fetching the data:", error);
    }
  }

  #calculateRef(screenPosition, screenSize) {
    this.position = {
      x: this.refPosition.x * screenSize.x + screenPosition.x,
      y: this.refPosition.y * screenSize.y + screenPosition.y,
    };

    this.size = {
      x: this.refSize.x * screenSize.x,
      y: this.refSize.y * screenSize.y,
    };
  }
}
