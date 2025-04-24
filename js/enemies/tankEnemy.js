import { Enemy } from './enemy.js';
import { loadConfig } from '../config.js';

export class TankEnemy extends Enemy {
  constructor(path, mapConfig, canvas) {
    super(path, mapConfig, canvas);
    const config = loadConfig();
    this.speed = config.enemySpeed * 0.5;
    this.maxHealth = 40 * config.difficulty;
    this.health = this.maxHealth;
    this.angle = 0;
    this.trackAnimOffset = 0;
  }

  update(delta) {
    // Calculate angle to next path tile before moving
    if (this.pathIndex < this.path.length - 1) {
      const tileSize = Math.min(this.canvas.width / this.mapConfig.width, this.canvas.height / this.mapConfig.height);
      const targetTile = this.path[this.pathIndex + 1];
      const targetX = targetTile.x * tileSize + tileSize / 2;
      const targetY = targetTile.y * tileSize + tileSize / 2;
      const dx = targetX - this.x;
      const dy = targetY - this.y;
      if (dx !== 0 || dy !== 0) {
        this.angle = Math.atan2(dy, dx);
      }
    }
    // Animate tracks
    this.trackAnimOffset += delta * this.speed * 0.7;
    super.update(delta);
  }

  render(ctx) {
    const tileSize = Math.min(this.canvas.width / this.mapConfig.width, this.canvas.height / this.mapConfig.height);
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.rotate(Math.PI / 2);
    // Draw tracks (animated)
    const trackW = tileSize * 0.18;
    const trackH = tileSize * 0.6;
    for (let side = -1; side <= 1; side += 2) {
      ctx.save();
      ctx.translate(side * tileSize * 0.18, 0);
      // Draw track body
      ctx.fillStyle = '#888';
      ctx.fillRect(-trackW / 2, -trackH / 2, trackW, trackH);
      // Animate treads
      const treadH = tileSize * 0.09;
      for (let i = 0; i < 5; i++) {
        const offset = ((i * treadH + this.trackAnimOffset * tileSize * 0.2) % trackH) - trackH / 2;
        ctx.fillStyle = i % 2 === 0 ? '#444' : '#bbb';
        ctx.fillRect(-trackW / 2, offset, trackW, treadH * 0.7);
      }
      ctx.restore();
    }
    // Draw tank body
    ctx.fillStyle = '#4caf50';
    ctx.fillRect(-tileSize * 0.16, -tileSize * 0.22, tileSize * 0.32, tileSize * 0.44);
    ctx.strokeStyle = '#222';
    ctx.lineWidth = 3;
    ctx.strokeRect(-tileSize * 0.16, -tileSize * 0.22, tileSize * 0.32, tileSize * 0.44);
    // Draw body circle
    ctx.beginPath();
    ctx.arc(0, 0, tileSize * 0.13, 0, 2 * Math.PI);
    ctx.fillStyle = '#388e3c';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#2e7d32';
    ctx.stroke();
    // Draw barrel
    ctx.save();
    ctx.rotate(0);
    ctx.fillStyle = '#388e3c';
    ctx.fillRect(-tileSize * 0.04, -tileSize * 0.22, tileSize * 0.08, tileSize * 0.28);
    ctx.fillStyle = '#4caf50';
    ctx.fillRect(-tileSize * 0.03, -tileSize * 0.32, tileSize * 0.06, tileSize * 0.12);
    ctx.restore();
    ctx.restore();
    this.renderHealthBar(ctx, tileSize * 0.6);
  }
} 