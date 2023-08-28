export class Menu {
  constructor() {
    const newDiv = document.createElement("div");
    newDiv.textContent = "This is a dynamically created div!";

    // newDiv.setAttribute("class", "dynamic-element");

    document.body.appendChild(newDiv);
  }

  update(dt) {}
}
