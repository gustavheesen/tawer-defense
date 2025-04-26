import { drawTile } from '../tiles/tileRenderer.js';

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
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        drawTile(ctx, x * tileSize, y * tileSize, tileSize);
      }
    }
    if (this.path && this.path.length > 1) {
      ctx.strokeStyle = 'yellow';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(
        this.path[0].x * tileSize + tileSize / 2,
        this.path[0].y * tileSize + tileSize / 2
      );
      for (let i = 1; i < this.path.length; i++) {
        ctx.lineTo(
          this.path[i].x * tileSize + tileSize / 2,
          this.path[i].y * tileSize + tileSize / 2
        );
      }
      ctx.stroke();
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