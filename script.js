let isActive =  new Promise((resolve) => {
  document.addEventListener("click", () => {resolve();}, { once: true });
});

// Function to make the page go full screen
export async function goFullScreen() {
  await isActive;

  const elem = document.documentElement;

  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) {/* Firefox */
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) {/* Chrome, Safari and Opera */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {/* IE/Edge */
    elem.msRequestFullscreen();
  }
}

export function exitFullScreen() {
  const elem = document.documentElement;
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) { /* Firefox */
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE/Edge */
    document.msExitFullscreen();
  }
}
