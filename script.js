// Function to make the page go full screen
function goFullScreen() {
    var elem = document.documentElement;

    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { /* Firefox */
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
        elem.msRequestFullscreen();
    }
}

// Call the function to go full screen
document.addEventListener("click", () => {
    goFullScreen();
  }, { once: true });


// // Check for standard support
// if (typeof document.hidden !== "undefined") {
//     // Standard Page Visibility API supported
//     document.addEventListener("visibilitychange", function() {
//       if (document.hidden) {
//         // Page is not visible
//         console.log("Page is not visible");
//       } else {
//         // Page is visible
//         console.log("Page is visible");
//       }
//     });
//   } else if (typeof document.msHidden !== "undefined") {
//     // IE 10 and IE 11 support
//     document.addEventListener("msvisibilitychange", function() {
//       if (document.msHidden) {
//         // Page is not visible
//         console.log("Page is not visible");
//       } else {
//         // Page is visible
//         console.log("Page is visible");
//       }
//     });
//   } else if (typeof document.webkitHidden !== "undefined") {
//     // WebKit-based browsers support
//     document.addEventListener("webkitvisibilitychange", function() {
//       if (document.webkitHidden) {
//         // Page is not visible
//         console.log("Page is not visible");
//       } else {
//         // Page is visible
//         console.log("Page is visible");
//       }
//     });
//   }
  
//   // Check for focus support
//   if (typeof document.hasFocus === "function") {
//     if (document.hasFocus()) {
//       console.log("Page has focus");
//     } else {
//       console.log("Page does not have focus");
//     }
//   }
  
//   // Listen for focus events
//   window.addEventListener("focus", function() {
//     console.log("Page has gained focus");
//   });
  
//   window.addEventListener("blur", function() {
//     console.log("Page has lost focus");
//   });