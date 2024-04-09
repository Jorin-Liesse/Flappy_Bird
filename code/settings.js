export class Settings {
  static aspectRatio = 16 / 9;
  static showCollisionBoxes = true;
  static collisionBoxesWidth = 0.005;

  static pathStartScreenLayout = "assets/layout/startScreen.json";
  static pathOptionsScreenLayout = "assets/layout/optionsScreen.json";
  static pathGameScreenLayout = "assets/layout/gameScreen.json";
  static pathBackgroundLayout = "assets/layout/background.json";
  static pathCreditsScreenLayout = "assets/layout/creditsScreen.json";
  static pathPausedScreenLayout = "assets/layout/pausedScreen.json";
  static pathInGameScreenLayout = "assets/layout/inGameScreen.json";
  static pathInGameMenuScreenLayout = "assets/layout/inGameMenuScreen.json";
  static pathGameoverScreenLayout = "assets/layout/gameOverScreen.json";

  static pathGraphicsScreenLayout = "assets/layout/graphicsScreen.json";
  static pathSoundScreenLayout = "assets/layout/soundScreen.json";
  static pathControllsScreenLayout = "assets/layout/controllsScreen.json";

  static backgroundScreenStatus = "active"; //active, inactive, transitionin, transitionout, forzen
  static startScreenStatus = "active"; //active, inactive, transitionin, transitionout, forzen
  static optionsScreenStatus = "inactive"; //active, inactive, transitionin, transitionout, forzen
  static gameScreenStatus = "inactive"; //active, inactive, transitionin, transitionout, forzen
  static creditsScreenStatus = "inactive"; //active, inactive, transitionin, transitionout, forzen
  static pausedScreenStatus = "inactive"; //active, inactive, transitionin, transitionout, forzen
  static inGameScreenStatus = "inactive"; //active, inactive, transitionin, transitionout, forzen
  static inGameMenuScreenStatus = "inactive"; //active, inactive, transitionin, transitionout, forzen
  static gameoverScreenStatus = "inactive"; //active, inactive, transitionin, transitionout, forzen

  static transitionDuration = 1000;
  static restart = false;
  static lost = false;
  static score = 0;

  static zIndex = {
    background: 0,
    credits: 1,
    game: 1,
    inGame: 2,
    paused: 2,
    start: 2,
    gameOver: 2,
    options: 3,
  };

  static inBrowser = typeof window !== "undefined";

  static gravity = 0.000003;

  static pathScanlines = "assets/graphics/textures/scanlines.jpg";
  static pathNoise = "assets/graphics/textures/noise.jpg";
  static pathVignette = "assets/graphics/textures/vignette.jpg";

  static pathPilarTop = "assets/graphics/Game/pilarTop.png";
  static pathPilarBottom = "assets/graphics/Game/pilarBottom.png";
  static pilarAnimationInfo = {rows: 1, columns: 1, startFrame: 0, endFrame: 0, frameRate: 1};
  static pilarSize = {x: 0.0948, y: 0.7185};
  static pilarSpeed = -0.00015;
  static pilarOpeningMax = 0.35;
  static pilarOpeningMin = 0.235;
  static pilarOffsetMax = 0.1;
  static pilarOffsetMin = -0.1;
  static pilarSpawnIntervalMax = 0.3;
  static pilarSpawnIntervalMin = 0.15;
  
  static pathPlayer = "assets/graphics/Game/player.png";
  static playerAnimationInfo = {rows: 1, columns: 3, startFrame: 0, endFrame: 2, frameRate: 10};
  static playerSize = {x: 0.0690, y: 0.1255};
  static playerJumpForce = -0.0007;
  static playerRotationSmoothness = 0.1;
  static playerRotationMultiplier = 500;
  static playerRecenterForce = 0.00005;

  static groundPosition = {x: 0.0, y: 0.765};
  static groundSize = {x: 1, y: 0.235};

  static roofPosition = {x: 0.0, y: -0.3};
  static roofSize = {x: 1, y: 0.265};

  static pathPointTrigger = "assets/graphics/Game/empty.png";
}
