// Random path generator for tower defense maps
// Generates a path from left-to-right or top-to-bottom, avoiding backtracking

/**
 * Generate a random path for a grid.
 * @param {number} width - Number of tiles horizontally
 * @param {number} height - Number of tiles vertically
 * @param {'horizontal'|'vertical'} [direction='horizontal'] - Path direction
 * @returns {Array<{x:number, y:number}>} Array of tile coordinates
 */
export function generateRandomPath(width, height, direction = 'horizontal') {
  // Choose start and end points
  let path = [];
  if (direction === 'vertical') {
    // Top to bottom
    let x = Math.floor(Math.random() * width);
    let y = 0;
    path.push({ x, y });
    while (y < height - 1) {
      const moves = [];
      if (x > 0) moves.push({ x: x - 1, y });
      if (x < width - 1) moves.push({ x: x + 1, y });
      moves.push({ x, y: y + 1 }); // always allow down
      // Prefer moving down, but sometimes left/right
      let next;
      if (Math.random() < 0.7) {
        next = { x, y: y + 1 };
      } else {
        next = moves[Math.floor(Math.random() * moves.length)];
      }
      // Avoid backtracking
      if (path.some(p => p.x === next.x && p.y === next.y)) {
        next = { x, y: y + 1 };
      }
      x = next.x;
      y = next.y;
      path.push({ x, y });
    }
  } else {
    // Left to right
    let x = 0;
    let y = Math.floor(Math.random() * height);
    path.push({ x, y });
    while (x < width - 1) {
      const moves = [];
      if (y > 0) moves.push({ x, y: y - 1 });
      if (y < height - 1) moves.push({ x, y: y + 1 });
      moves.push({ x: x + 1, y }); // always allow right
      // Prefer moving right, but sometimes up/down
      let next;
      if (Math.random() < 0.7) {
        next = { x: x + 1, y };
      } else {
        next = moves[Math.floor(Math.random() * moves.length)];
      }
      // Avoid backtracking
      if (path.some(p => p.x === next.x && p.y === next.y)) {
        next = { x: x + 1, y };
      }
      x = next.x;
      y = next.y;
      path.push({ x, y });
    }
  }
  return path;
} 