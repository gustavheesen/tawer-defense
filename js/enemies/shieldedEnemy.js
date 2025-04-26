import { Enemy } from './enemy.js';
import { loadConfig } from '../config.js';

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
    const tileSize = Math.min(this.canvas.width / this.mapConfig.width, this.canvas.height / this.mapConfig.height);
    ctx.save();
    ctx.translate(this.x, this.y);
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
    this.renderHealthBar(ctx, tileSize * 0.38);
  }
} 