export class Settings {
  static aspectRatio = 16 / 9;
  static showCollisionBoxes = true;
  static collisionBoxesWidth = 0.005;

  static pathStartScreenLayout = "assets/layout/startScreen.json";
  static pathOptionsScreenLayout = "assets/layout/optionsScreen.json";
  static pathGameScreenLayout = "assets/layout/gameScreen.json";
  static pathBackgroundLayout = "assets/layout/background.json";

  static zIndex = {
    background: 0,
    game: 1,
    start: 2,
    options: 3,
  };

  static gravity = 0.000003;

  static pathPilarTop = "assets/graphics/Game/pilarTop.png";
  static pathPilarBottom = "assets/graphics/Game/pilarBottom.png";
  static pilarAnimationInfo = {rows: 1, columns: 1, startFrame: 0, endFrame: 0, frameRate: 1};
  static pilarSize = {x: 0.0948, y: 0.7185};
  static pilarSpeed = -0.00015;
  static pilarOpeningMax = 0.35;
  static pilarOpeningMin = 0.235;
  static pilarOffsetMax = 0.1;
  static pilarOffsetMin = -0.1;
  static pilarSpawnIntervalMax = 2000;
  static pilarSpawnIntervalMin = 1000;
  
  static pathPlayer = "assets/graphics/Game/player.png";
  static playerAnimationInfo = {rows: 1, columns: 3, startFrame: 0, endFrame: 2, frameRate: 10};
  static playerSize = {x: 0.0690, y: 0.1255};
  static playerJumpForce = -0.0007;
  static playerRotationSmoothness = 0.1;
  static playerRotationMultiplier = 500;

  static groundPosition = {x: 0.0, y: 0.765};
  static groundSize = {x: 1, y: 0.235};
}
