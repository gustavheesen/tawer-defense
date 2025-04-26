// Utility functions

export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function distance(x1, y1, x2, y2) {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

/**
 * Calculates the size of a single tile in pixels based on canvas and grid dimensions.
 * @param {HTMLCanvasElement} canvas - The game canvas.
 * @param {object} mapConfig - The map configuration { width, height }.
 * @returns {number} The size of a tile in pixels.
 */
export function getTileSize(canvas, mapConfig) {
  if (!canvas || !mapConfig) return 40; // Default fallback
  return Math.min(canvas.width / mapConfig.width, canvas.height / mapConfig.height);
} 