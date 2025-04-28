import { Enemy } from './enemy.js';
import { loadConfig } from '../config.js';
import { getTileSize } from '../utils.js';

export class RegeneratingEnemy extends Enemy {
  constructor(path, mapConfig, canvas) {
    super(path, mapConfig, canvas);
    const config = loadConfig();
    this.speed = config.enemySpeed * 0.9;
    this.maxHealth = 16 * config.difficulty;
    this.health = this.maxHealth;
    this.regenRate = 2 * config.difficulty; // HP per second
  }

  update(delta) {
    super.update(delta);
    if (this.health < this.maxHealth) {
      this.health = Math.min(this.maxHealth, this.health + this.regenRate * delta);
    }
  }

  render(ctx) {
    const tileSize = getTileSize(this.canvas, this.mapConfig);
    const px = this.x * tileSize + tileSize / 2;
    const py = this.y * tileSize + tileSize / 2;
    ctx.save();
    ctx.translate(px, py);
    // Body
    ctx.fillStyle = '#4caf50';
    ctx.beginPath();
    ctx.arc(0, 0, tileSize * 0.18, 0, 2 * Math.PI);
    ctx.fill();
    // Glow
    ctx.globalAlpha = 0.4 + 0.3 * Math.sin(Date.now() / 200);
    ctx.strokeStyle = '#a5ffb0';
    ctx.lineWidth = 7;
    ctx.beginPath();
    ctx.arc(0, 0, tileSize * 0.23, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.globalAlpha = 1.0;
    ctx.restore();
    // Health bar
    ctx.save();
    ctx.fillStyle = 'black';
    ctx.fillRect(px - tileSize * 0.19, py - tileSize * 0.38 - 10, tileSize * 0.38, 6);
    ctx.fillStyle = 'lime';
    ctx.fillRect(px - tileSize * 0.19, py - tileSize * 0.38 - 10, tileSize * 0.38 * (this.health / this.maxHealth), 6);
    ctx.strokeStyle = '#222';
    ctx.strokeRect(px - tileSize * 0.19, py - tileSize * 0.38 - 10, tileSize * 0.38, 6);
    ctx.restore();
  }
} 