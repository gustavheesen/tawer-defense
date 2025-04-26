// Improved path generator for tower defense maps
// Uses randomized DFS for a winding, non-crossing path

function shuffleDirs(dirs) {
  for (let i = dirs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [dirs[i], dirs[j]] = [dirs[j], dirs[i]];
  }
  return dirs;
}

/**
 * Generate a random, non-crossing path for a grid.
 * @param {number} width - Number of tiles horizontally
 * @param {number} height - Number of tiles vertically
 * @param {'horizontal'|'vertical'} [direction='horizontal'] - Path direction
 * @returns {Array<{x:number, y:number}>} Array of tile coordinates
 */
export function generateRandomPath(width, height, direction = 'horizontal') {
  let visited = Array.from({ length: width }, () => Array(height).fill(false));
  let path = [];
  let found = false;

  function dfs(x, y, prevX = null, prevY = null) {
    if (x < 0 || x >= width || y < 0 || y >= height) return false;
    if (visited[x][y]) return false;
    // Prevent touching: check all neighbors except previous tile
    const neighbors = [
      [x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]
    ];
    for (const [nx, ny] of neighbors) {
      if (
        (nx !== prevX || ny !== prevY) &&
        nx >= 0 && nx < width && ny >= 0 && ny < height &&
        visited[nx][ny]
      ) {
        return false;
      }
    }
    visited[x][y] = true;
    path.push({ x, y });

    if ((direction === 'horizontal' && x === width - 1) ||
        (direction === 'vertical' && y === height - 1)) {
      found = true;
      return true;
    }

    // Shuffle directions: right, up, down (for horizontal)
    let dirs = direction === 'horizontal'
      ? [[1,0],[0,1],[0,-1]]
      : [[0,1],[1,0],[-1,0]];
    shuffleDirs(dirs);

    for (const [dx, dy] of dirs) {
      if (dfs(x + dx, y + dy, x, y)) return true;
    }

    // Backtrack
    path.pop();
    visited[x][y] = false;
    return false;
  }

  let startY = Math.floor(Math.random() * height);
  let startX = 0;
  if (direction === 'vertical') {
    startX = Math.floor(Math.random() * width);
    startY = 0;
  }
  dfs(startX, startY);

  return path;
} 