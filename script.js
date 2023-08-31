document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById("startButtonMainMenu");
  const optionsButton = document.getElementById("optionsButtonMainMenu");
  const exitButton = document.getElementById("exitButtonMainMenu");

  const backButton = document.getElementById("backButtonMainMenu");

  const startMenu = document.querySelector(".startMenu");
  const optionsMenu = document.querySelector(".optionsMenu");

  const backButtonMainMenu = document.getElementById("backButtonMainMenu");

  startButton.addEventListener("click", () => {
    startMenu.classList.remove("active");
  });

  optionsButton.addEventListener("click", () => {
    startMenu.classList.remove("active");
    optionsMenu.classList.add("active");
  });

  exitButton.addEventListener("click", () => {
    window.close();
  });

  backButtonMainMenu.addEventListener("click", () => {
    startMenu.classList.add("active");
    optionsMenu.classList.remove("active");
  });

  backButton.addEventListener("click", () => {
    startMenu.classList.add("active");
    optionsMenu.classList.remove("active");
  });
});
 