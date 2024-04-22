const cacheName = "cache-v1";

const resourcesToPrecache = [
  "/",
  "index.html",
  "style.css",
  "script.js",
  "manifest.json",
  "code/canvasUtilitys/animationTimer.js",
  "code/canvasUtilitys/aspectRatio.js",
  "code/canvasUtilitys/audioManager.js",
  "code/canvasUtilitys/canvasSize.js",
  "code/canvasUtilitys/collision.js",
  "code/canvasUtilitys/deltaTime.js",
  "code/canvasUtilitys/gameObject.js",
  "code/canvasUtilitys/inputManager.js",
  "code/canvasUtilitys/pageStatus.js",
  "code/canvasUtilitys/screen.js",
  "code/canvasUtilitys/shader.js",
  "code/canvasUtilitys/UI/button.js",
  "code/canvasUtilitys/UI/choiceBox.js",
  "code/canvasUtilitys/UI/circle.js",
  "code/canvasUtilitys/UI/line.js",
  "code/canvasUtilitys/UI/parallax.js",
  "code/canvasUtilitys/UI/progressBar.js",
  "code/canvasUtilitys/UI/rectangle.js",
  "code/canvasUtilitys/UI/slider.js",
  "code/canvasUtilitys/UI/sprite.js",
  "code/canvasUtilitys/UI/spriteSheet.js",
  "code/canvasUtilitys/UI/switch.js",
  "code/canvasUtilitys/UI/text.js",
  "code/canvasUtilitys/xMath.js",
  "code/gameObjects/ground.js",
  "code/gameObjects/pilar.js",
  "code/gameObjects/player.js",
  "code/gameObjects/pointTrigger.js",
  "code/gameObjects/roof.js",
  "code/index.js",
  "code/main.js",
  "code/preload.js",
  "code/screens/background.js",
  "code/screens/controlls.js",
  "code/screens/credits.js",
  "code/screens/FPSCounter.js",
  "code/screens/game.js",
  "code/screens/gameOver.js",
  "code/screens/graphics.js",
  "code/screens/grayFilter.js",
  "code/screens/inGame.js",
  "code/screens/inGameMenu.js",
  "code/screens/options.js",
  "code/screens/sound.js",
  "code/screens/start.js",
  "code/settings.js",
  "assets/audio/UI/buttonDown.mp3",
  "assets/audio/UI/buttonUp.mp3",
  "assets/audio/UI/soundtrack.mp3",
  "assets/fonts/Ubuntu-Title.ttf",
  "assets/graphics/background/ground.png",
  "assets/graphics/background/hills.png",
  "assets/graphics/background/mountains.png",
  "assets/graphics/background/sky.png",
  "assets/graphics/background/trees.png",
  "assets/graphics/empty.png",
  "assets/graphics/game/pilarBottom.png",
  "assets/graphics/game/pilarTop.png",
  "assets/graphics/game/player.png",
  "assets/graphics/game/player.psb",
  "assets/graphics/game/playerSheet.png",
  "assets/graphics/gamePlayMobile.gif",
  "assets/graphics/gamePlayPC.gif",
  "assets/graphics/icons/icon.ico",
  "assets/graphics/icons/icon.png",
  "assets/graphics/icons/icon.svg",
  "assets/graphics/icons/pwa/apple-icon-180.png",
  "assets/graphics/icons/pwa/apple-splash-1125-2436.jpg",
  "assets/graphics/icons/pwa/apple-splash-1136-640.jpg",
  "assets/graphics/icons/pwa/apple-splash-1170-2532.jpg",
  "assets/graphics/icons/pwa/apple-splash-1179-2556.jpg",
  "assets/graphics/icons/pwa/apple-splash-1242-2208.jpg",
  "assets/graphics/icons/pwa/apple-splash-1242-2688.jpg",
  "assets/graphics/icons/pwa/apple-splash-1284-2778.jpg",
  "assets/graphics/icons/pwa/apple-splash-1290-2796.jpg",
  "assets/graphics/icons/pwa/apple-splash-1334-750.jpg",
  "assets/graphics/icons/pwa/apple-splash-1488-2266.jpg",
  "assets/graphics/icons/pwa/apple-splash-1536-2048.jpg",
  "assets/graphics/icons/pwa/apple-splash-1620-2160.jpg",
  "assets/graphics/icons/pwa/apple-splash-1640-2360.jpg",
  "assets/graphics/icons/pwa/apple-splash-1668-2224.jpg",
  "assets/graphics/icons/pwa/apple-splash-1668-2388.jpg",
  "assets/graphics/icons/pwa/apple-splash-1792-828.jpg",
  "assets/graphics/icons/pwa/apple-splash-2048-1536.jpg",
  "assets/graphics/icons/pwa/apple-splash-2048-2732.jpg",
  "assets/graphics/icons/pwa/apple-splash-2160-1620.jpg",
  "assets/graphics/icons/pwa/apple-splash-2208-1242.jpg",
  "assets/graphics/icons/pwa/apple-splash-2224-1668.jpg",
  "assets/graphics/icons/pwa/apple-splash-2266-1488.jpg",
  "assets/graphics/icons/pwa/apple-splash-2360-1640.jpg",
  "assets/graphics/icons/pwa/apple-splash-2388-1668.jpg",
  "assets/graphics/icons/pwa/apple-splash-2436-1125.jpg",
  "assets/graphics/icons/pwa/apple-splash-2532-1170.jpg",
  "assets/graphics/icons/pwa/apple-splash-2556-1179.jpg",
  "assets/graphics/icons/pwa/apple-splash-2688-1242.jpg",
  "assets/graphics/icons/pwa/apple-splash-2732-2048.jpg",
  "assets/graphics/icons/pwa/apple-splash-2778-1284.jpg",
  "assets/graphics/icons/pwa/apple-splash-2796-1290.jpg",
  "assets/graphics/icons/pwa/apple-splash-640-1136.jpg",
  "assets/graphics/icons/pwa/apple-splash-750-1334.jpg",
  "assets/graphics/icons/pwa/apple-splash-828-1792.jpg",
  "assets/graphics/icons/pwa/manifest-icon-192.maskable.png",
  "assets/graphics/icons/pwa/manifest-icon-512.maskable.png",
  "assets/graphics/textures/noise.jpg",
  "assets/graphics/textures/scanlines.jpg",
  "assets/graphics/textures/vignette.jpg",
  "assets/graphics/UI/BackFrameMedium.png",
  "assets/graphics/UI/BackFrameSmall.png",
  "assets/graphics/UI/BlockButton.png",
  "assets/graphics/UI/ButtonDown.png",
  "assets/graphics/UI/ButtonUp.png",
  "assets/graphics/UI/ChoiceBoxMediumClosed.png",
  "assets/graphics/UI/ChoiceBoxMediumOpen.png",
  "assets/graphics/UI/ChoiceBoxMediumOpenGrayFilter.png",
  "assets/graphics/UI/ChoiceBoxSmallClosed.png",
  "assets/graphics/UI/ChoiceBoxSmallOpen.png",
  "assets/graphics/UI/ControllsPC.png",
  "assets/graphics/UI/CrossButtonDown.png",
  "assets/graphics/UI/CrossButtonUp.png",
  "assets/graphics/UI/ExtraInfo.png",
  "assets/graphics/UI/ExtraInfoText.png",
  "assets/graphics/UI/FlappyBird.png",
  "assets/graphics/UI/GameOver.png",
  "assets/graphics/UI/HomeButtonDown.png",
  "assets/graphics/UI/HomeButtonUp.png",
  "assets/graphics/UI/InfoButtonDown.png",
  "assets/graphics/UI/InfoButtonUp.png",
  "assets/graphics/UI/myGithub.png",
  "assets/graphics/UI/myLinkedin.png",
  "assets/graphics/UI/OptionButtonDown.png",
  "assets/graphics/UI/OptionButtonUp.png",
  "assets/graphics/UI/Options.png",
  "assets/graphics/UI/Paused.png",
  "assets/graphics/UI/SliderBar.png",
  "assets/graphics/UI/SliderPin.png",
  "assets/graphics/UI/SwitchOff.png",
  "assets/graphics/UI/SwitchOn.png",
  "assets/graphics/UI/TitleBox.png",
  "assets/graphics/UI/trophy.png",
  "assets/layout/background.json",
  "assets/layout/controlls.json",
  "assets/layout/credits.json",
  "assets/layout/FPSCounter.json",
  "assets/layout/gameOver.json",
  "assets/layout/graphics.json",
  "assets/layout/grayFilter.json",
  "assets/layout/inGame.json",
  "assets/layout/inGameMenu.json",
  "assets/layout/options.json",
  "assets/layout/sound.json",
  "assets/layout/start.json",
  "assets/shaders/color/fragmentShader.glsl",
  "assets/shaders/color/vertexShader.glsl",
  "assets/shaders/CRT/fragmentShader.glsl",
  "assets/shaders/CRT/vertexShader.glsl",
  "assets/shaders/grayScale/fragmentShader.glsl",
  "assets/shaders/grayScale/vertexShader.glsl"
];

// self.addEventListener("install", (event) => {
//   console.log("Service worker installing...");

//   event.waitUntil(
//     caches.open(cacheName)
//       .then((cache) => {
//         return cache.addAll(resourcesToPrecache);
//       })
//   );
// });

self.addEventListener("activate", (event) => {
  console.log("Service worker activating...");
});

self.addEventListener("fetch", event => {
  console.log("Fetching:", event.request.url);

  event.respondWith(caches.match(event.request)
    .then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName)
      .then((cache) => {
        return fetch('/').then(response => {
          return response.text();
        }).then(html => {
          // Parse the HTML response to get all the URLs
          let doc = new DOMParser().parseFromString(html, 'text/html');
          let urls = Array.from(doc.querySelectorAll('a')).map(a => a.href);

          // Add the URLs to the cache
          return cache.addAll(urls);
        });
      })
  );
});
