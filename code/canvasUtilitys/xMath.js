export function normalizeVector(vector) {
  // Calculate the magnitude of the vector
  const magnitude = calculateMagnitude(vector);

  // Normalize the vector
  return {
    x: vector.x / magnitude,
    y: vector.y / magnitude,
  };
}

export function calculateMagnitude(vector) {
  return Math.sqrt(vector.x ** 2 + vector.y ** 2);
}
