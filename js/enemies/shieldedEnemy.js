import { Enemy } from './enemy.js';
import { loadConfig } from '../config.js';
import { getTileSize } from '../utils.js';

export class ShieldedEnemy extends Enemy {
  constructor(path, mapConfig, canvas) {
    super(path, mapConfig, canvas);
    const config = loadConfig();
    this.speed = config.enemySpeed * 0.9;
    this.maxHealth = 18 * config.difficulty;
    this.health = this.maxHealth;
    this.shield = 20;
  }

  takeDamage(amount) {
    if (this.shield > 0) {
      const absorbed = Math.min(this.shield, amount);
      this.shield -= absorbed;
      amount -= absorbed;
    }
    if (amount > 0) {
      this.health -= amount;
      if (this.health <= 0) this.alive = false;
    }
  }

  render(ctx) {
    const tileSize = getTileSize(this.canvas, this.mapConfig);
    const px = this.x * tileSize + tileSize / 2;
    const py = this.y * tileSize + tileSize / 2;
    ctx.save();
    ctx.translate(px, py);
    // Body
    ctx.fillStyle = '#4a90e2';
    ctx.beginPath();
    ctx.arc(0, 0, tileSize * 0.19, 0, 2 * Math.PI);
    ctx.fill();
    // Shield
    if (this.shield > 0) {
      ctx.strokeStyle = '#00e6ff';
      ctx.lineWidth = 5;
      ctx.globalAlpha = 0.7;
      ctx.beginPath();
      ctx.arc(0, 0, tileSize * 0.23, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.globalAlpha = 1.0;
    }
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