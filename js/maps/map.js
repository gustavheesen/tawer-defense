import { drawTile, drawPathTile } from '../tiles/tileRenderer.js';

export class Map {
  constructor(config, path = []) {
    this.width = config.width;
    this.height = config.height;
    this.path = path;
  }

  render(ctx) {
    const canvasWidth = ctx.canvas.width;
    const canvasHeight = ctx.canvas.height;
    const tileSizeX = canvasWidth / this.width;
    const tileSizeY = canvasHeight / this.height;
    const tileSize = Math.min(tileSizeX, tileSizeY);
    ctx.save();
    // Build a set of path tile coordinates for fast lookup
    const pathTiles = new Set();
    // Also build a map of direction for each path tile
    const pathDirections = {};
    if (this.path && this.path.length > 1) {
      for (let i = 0; i < this.path.length; i++) {
        const pt = this.path[i];
        pathTiles.add(`${pt.x},${pt.y}`);
        let rotation = 0;
        if (i < this.path.length - 1) {
          // Not the last tile: point to next
          const next = this.path[i + 1];
          const dx = next.x - pt.x;
          const dy = next.y - pt.y;
          if (dx === 1 && dy === 0) rotation = 0; // right
          else if (dx === -1 && dy === 0) rotation = Math.PI; // left
          else if (dx === 0 && dy === 1) rotation = Math.PI / 2; // down
          else if (dx === 0 && dy === -1) rotation = -Math.PI / 2; // up
        } else if (i > 0) {
          // Last tile: point from previous
          const prev = this.path[i - 1];
          const dx = pt.x - prev.x;
          const dy = pt.y - prev.y;
          if (dx === 1 && dy === 0) rotation = 0; // right
          else if (dx === -1 && dy === 0) rotation = Math.PI; // left
          else if (dx === 0 && dy === 1) rotation = Math.PI / 2; // down
          else if (dx === 0 && dy === -1) rotation = -Math.PI / 2; // up
        }
        // Rotate everything 90 degrees right
        rotation += Math.PI / 2;
        pathDirections[`${pt.x},${pt.y}`] = rotation;
      }
    }
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        if (pathTiles.has(`${x},${y}`)) {
          const rotation = pathDirections[`${x},${y}`] || 0;
          drawPathTile(ctx, x * tileSize, y * tileSize, tileSize, rotation);
        } else {
          drawTile(ctx, x * tileSize, y * tileSize, tileSize);
        }
      }
    }
    if (this.path && this.path.length > 1) {
      // Only draw start and end markers
      ctx.fillStyle = 'lime';
      ctx.beginPath();
      ctx.arc(
        this.path[0].x * tileSize + tileSize / 2,
        this.path[0].y * tileSize + tileSize / 2,
        tileSize / 3,
        0,
        2 * Math.PI
      );
      ctx.fill();
      ctx.fillStyle = 'red';
      ctx.beginPath();
      ctx.arc(
        this.path[this.path.length - 1].x * tileSize + tileSize / 2,
        this.path[this.path.length - 1].y * tileSize + tileSize / 2,
        tileSize / 3,
        0,
        2 * Math.PI
      );
      ctx.fill();
    }
    ctx.restore();
  }
} 