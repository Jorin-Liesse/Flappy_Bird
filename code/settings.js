export class Settings {
  static pathStartScreenLayout = "assets/layout/start.json";
  static pathOptionsScreenLayout = "assets/layout/options.json";
  static pathGameScreenLayout = "assets/layout/game.json";
  static pathBackgroundLayout = "assets/layout/background.json";
  static pathCreditsScreenLayout = "assets/layout/credits.json";
  static pathPausedScreenLayout = "assets/layout/paused.json";
  static pathInGameScreenLayout = "assets/layout/inGame.json";
  static pathInGameMenuScreenLayout = "assets/layout/inGameMenu.json";
  static pathGameoverScreenLayout = "assets/layout/gameOver.json";
  static pathFPSCounterLayout = "assets/layout/FPSCounter.json";
  static pathGrayFilterLayout = "assets/layout/grayFilter.json";
  static pathGraphicsScreenLayout = "assets/layout/graphics.json";
  static pathSoundScreenLayout = "assets/layout/sound.json";
  static pathControllsScreenLayout = "assets/layout/controlls.json";

  static pathScanlines = "assets/graphics/textures/scanlines.jpg";
  static pathNoise = "assets/graphics/textures/noise.jpg";
  static pathVignette = "assets/graphics/textures/vignette.jpg";

  static zIndex = {
    background: 0,
    game: 1,
    inGame: 2,
    grayFilter: 3,
    credits: 4,
    start: 4,
    gameOver: 4,
    options: 4,
    FPSCounter: 4
  };

  static gravity = 0.000003;

  static pathPilarTop = "assets/graphics/game/pilarTop.png";
  static pathPilarBottom = "assets/graphics/game/pilarBottom.png";
  static pilarAnimationInfo = {rows: 1, columns: 1, startFrame: 0, endFrame: 0, frameRate: 1};
  static pilarSize = {x: 0.0948, y: 0.7185};
  static pilarSpeed = -0.00015;
  static pilarOpeningMax = 0.35;
  static pilarOpeningMin = 0.235;
  static pilarOffsetMax = 0.1;
  static pilarOffsetMin = -0.1;
  static pilarSpawnIntervalMax = 0.3;
  static pilarSpawnIntervalMin = 0.15;
  
  static pathPlayer = "assets/graphics/game/playerSheet.png";
  static playerAnimationInfo = {rows: 1, columns: 6, startFrame: 0, endFrame: 5, frameRate: 10};
  static playerSize = {x: 0.0690, y: 0.1255};
  static playerJumpForce = -0.0007;
  static playerRotationSmoothness = 0.1;
  static playerRotationMultiplier = 500;
  static playerRecenterForce = 0.00001;

  static groundPosition = {x: 0.0, y: 0.765};
  static groundSize = {x: 1, y: 0.235};

  static roofPosition = {x: 0.0, y: -0.3};
  static roofSize = {x: 1, y: 0.265};

  static pathPointTrigger = "assets/graphics/empty.png";
}
