export class Background {
  constructor() {
    this.layerInfo = {
      "sky": {"distance": 10000},
      "clouds": {"distance": 9000},
      "mountains": {"distance": 8000},  
      "hills": {"distance": 1000},
      "trees": {"distance": 100},
      "land": {"distance": 0},
    };

    this.speed = -10;

    this.status = "play";

    this.canvas = document.getElementById("mainCanvas");
    this.ctx = this.canvas.getContext("2d");

    let highestDistance = Number.MIN_SAFE_INTEGER;
  
    for (const key in this.layerInfo) {
      if (this.layerInfo.hasOwnProperty(key)) {
        const distance = this.layerInfo[key].distance;
        if (distance > highestDistance) {
          highestDistance = distance;
        }
      }
    }

    for (let key in this.layerInfo) {
      this.layerInfo[key]["image"] = new Image();
      this.layerInfo[key]["image"].src = "assets/background/" + key + ".png";

      this.layerInfo[key]["speed"] = ((highestDistance - this.layerInfo[key]["distance"]) * this.speed) / highestDistance;
      this.layerInfo[key]["offset"] = 0
    }
  }

  update(dt) {
    if (this.status === "play") {
      for (let key in this.layerInfo) {
        if (Number.isFinite(this.canvas.height / this.imageHeight)) {
          this.layerInfo[key]["offset"] += 100 * dt * this.layerInfo[key]["speed"] * (this.canvas.height / this.imageHeight);
        }

        if (this.layerInfo[key]["speed"] < 0) {
          if (this.layerInfo[key]["offset"] <= ((this.canvas.height / this.imageHeight) * this.imageWidth - 1)) {
            this.layerInfo[key]["offset"] = this.layerInfo[key]["offset"] % ((this.canvas.height / this.imageHeight) * this.imageWidth);
          }
        }

        if (this.layerInfo[key]["speed"] > 0) {
          if (this.layerInfo[key]["offset"] >= ((this.canvas.height / this.imageHeight) * this.imageWidth - 1)) {
            this.layerInfo[key]["offset"] = this.layerInfo[key]["offset"] % ((this.canvas.height / this.imageHeight) * this.imageWidth);
          }
        }
      }
    } 

    this.imageWidth = this.layerInfo["sky"]["image"].naturalWidth;
    this.imageHeight = this.layerInfo["sky"]["image"].naturalHeight;

    this.amountImage = Math.ceil(
      this.canvas.width /
        ((this.canvas.height / this.imageHeight) * this.imageWidth)
    );

    for (let key in this.layerInfo) {
      for (let i = this.layerInfo[key]["speed"] < 0 ? 0 : -1; i < this.amountImage + (this.layerInfo[key]["speed"] < 0 ? 1 : 0); i++) {
        this.ctx.drawImage(
          this.layerInfo[key]["image"],
          0,
          0,
          this.imageWidth,
          this.imageHeight,
          this.layerInfo[key]["offset"] + i * ((this.canvas.height / this.imageHeight) * this.imageWidth - 1),
          0,
          (this.canvas.height / this.imageHeight) * this.imageWidth,
          this.canvas.height
        );
      }
    }
  }
}
