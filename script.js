document.addEventListener("DOMContentLoaded", () => {
  if (window.screen.orientation) {
    window.screen.orientation.lock('landscape')
      .then(() => {
        console.log('Screen orientation locked to landscape.');
      })
      .catch((error) => {
        console.error('Error locking screen orientation:', error);
      });
  } else {
    console.log('Screen orientation API is not supported on this device.');
  }

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
 