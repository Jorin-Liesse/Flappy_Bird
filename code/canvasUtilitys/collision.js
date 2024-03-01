export function circleRectCollision(circle, rect) {
  const circleCenterrefPosition = {
    x: circle.refPosition.x + circle.radius,
    y: circle.refPosition.y + circle.radius,
  };

  let testX = circleCenterrefPosition.x;
  let testY = circleCenterrefPosition.y;

  if (circleCenterrefPosition.x < rect.refPosition.x)
    testX = rect.refPosition.x; // test left edge
  else if (circleCenterrefPosition.x > rect.refPosition.x + rects.refSize.x)
    testX = rect.refPosition.x + rect.refSize.x; // right edge
  if (circleCenterrefPosition.y < rect.refPosition.y)
    testY = rect.refPosition.y; // top edge
  else if (circleCenterrefPosition.y > rect.refPosition.y + rect.refSize.y)
    testY = rect.refPosition.y + rect.refSize.y; // bottom edge

  // get distance from closest edges
  let distX = circleCenterrefPosition.x - testX;
  let distY = circleCenterrefPosition.y - testY;
  let distance = Math.sqrt(distX * distX + distY * distY);

  // if the distance is less than the radius, collision!
  if (distance <= circle.radius) {
    return true;
  }
  return false;
}

export function circleCircleCollision(circle1, circle2) {
  const distance = Math.sqrt(
    Math.pow(circle1.refPosition.x - circle2.refPosition.x, 2) +
      Math.pow(circle1.refPosition.y - circle2.refPosition.y, 2)
  );

  if (distance <= circle1.radius + circle2.radius) {
    return true;
  }
  return false;
}

export function rectRectCollision(rect1, rect2) {
  const scaledWidth = rect1.collisionBoxes.refSize.x;
  const scaledHeight = rect1.collisionBoxes.refSize.y;

  const scaledX = rect1.collisionBoxes.refPosition.x + (rect1.collisionBoxes.refSize.x - scaledWidth) / 2;
  const scaledY = rect1.collisionBoxes.refPosition.y + (rect1.collisionBoxes.refSize.y - scaledHeight) / 2;

  if (
    scaledX < rect2.collisionBoxes.refPosition.x + rect2.collisionBoxes.refSize.x &&
    scaledX + scaledWidth > rect2.collisionBoxes.refPosition.x &&
    scaledY < rect2.collisionBoxes.refPosition.y + rect2.collisionBoxes.refSize.y &&
    scaledY + scaledHeight > rect2.collisionBoxes.refPosition.y
  ) {
    return true;
  }
  return false;
}
