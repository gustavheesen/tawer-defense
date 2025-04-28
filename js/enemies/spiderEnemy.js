import { Enemy } from './enemy.js';
import { loadConfig } from '../config.js';
import { getTileSize } from '../utils.js';

export class SpiderEnemy extends Enemy {
  constructor(path, mapConfig, canvas) {
    super(path, mapConfig, canvas);
    const config = loadConfig();
    this.speed = config.enemySpeed * 2;
    this.health = 6 * config.difficulty;
    this.angle = 0;
    this.legAnimPhase = 0;
  }

  update(delta) {
    // Calculate angle to next path tile before moving (tile-based)
    if (this.pathIndex < this.path.length - 1) {
      const targetTile = this.path[this.pathIndex + 1];
      const dx = targetTile.x - this.x;
      const dy = targetTile.y - this.y;
      if (dx !== 0 || dy !== 0) {
        this.angle = Math.atan2(dy, dx);
      }
    }
    this.legAnimPhase += delta * 6; // controls leg speed
    super.update(delta);
  }

  render(ctx) {
    const tileSize = getTileSize(this.canvas, this.mapConfig);
    const px = this.x * tileSize + tileSize / 2;
    const py = this.y * tileSize + tileSize / 2;
    ctx.save();
    ctx.translate(px, py);
    ctx.rotate(this.angle);
    ctx.rotate(-Math.PI/2);
    // Draw legs (8, animated)
    const legLen = tileSize * 0.38;
    const legW = tileSize * 0.07;
    for (let i = 0; i < 8; i++) {
      const side = i < 4 ? -1 : 1;
      const seg = i % 4;
      // Leg base angle (spread)
      const baseA = (Math.PI / 2.5) * (seg - 1.5) + side * Math.PI / 2;
      // Animation: wave offset
      const anim = Math.sin(this.legAnimPhase + i * 0.7) * tileSize * 0.08;
      ctx.save();
      ctx.rotate(baseA);
      ctx.translate(0, anim);
      ctx.fillStyle = '#22242c';
      ctx.fillRect(tileSize * 0.13, -legW / 2, legLen, legW);
      ctx.restore();
    }
    // Draw back body segment (abdomen)
    ctx.beginPath();
    ctx.arc(0, -tileSize * 0.10, tileSize * 0.22, 0, 2 * Math.PI);
    ctx.fillStyle = '#23232b';
    ctx.fill();
    // Draw front body segment (cephalothorax)
    ctx.beginPath();
    ctx.arc(0, tileSize * 0.10, tileSize * 0.16, 0, 2 * Math.PI);
    ctx.fillStyle = '#2d2d38';
    ctx.fill();
    // Draw red eyes
    ctx.fillStyle = '#e53935';
    for (let i = -1; i <= 1; i++) {
      ctx.beginPath();
      ctx.arc(i * tileSize * 0.07, tileSize * 0.19, tileSize * 0.03, 0, 2 * Math.PI);
      ctx.fill();
    }
    ctx.beginPath();
    ctx.arc(-tileSize * 0.04, tileSize * 0.14, tileSize * 0.02, 0, 2 * Math.PI);
    ctx.arc(tileSize * 0.04, tileSize * 0.14, tileSize * 0.02, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();
    // Health bar
    ctx.save();
    ctx.fillStyle = 'black';
    ctx.fillRect(px - tileSize * 0.3, py - tileSize * 0.6 - 10, tileSize * 0.6, 6);
    ctx.fillStyle = 'lime';
    ctx.fillRect(px - tileSize * 0.3, py - tileSize * 0.6 - 10, tileSize * 0.6 * (this.health / this.maxHealth), 6);
    ctx.strokeStyle = '#222';
    ctx.strokeRect(px - tileSize * 0.3, py - tileSize * 0.6 - 10, tileSize * 0.6, 6);
    ctx.restore();
  }
} 