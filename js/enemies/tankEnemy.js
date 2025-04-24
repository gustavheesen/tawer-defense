import { Enemy } from './enemy.js';
import { loadConfig } from '../config.js';

export class TankEnemy extends Enemy {
  constructor(path, mapConfig, canvas) {
    super(path, mapConfig, canvas);
    const config = loadConfig();
    this.speed = config.enemySpeed * 0.5;
    this.maxHealth = 40 * config.difficulty;
    this.health = this.maxHealth;
  }

  render(ctx) {
    const tileSize = Math.min(this.canvas.width / this.mapConfig.width, this.canvas.height / this.mapConfig.height);
    ctx.save();
    ctx.fillStyle = '#666';
    ctx.fillRect(this.x - tileSize * 0.3, this.y - tileSize * 0.3, tileSize * 0.6, tileSize * 0.6);
    ctx.strokeStyle = '#222';
    ctx.strokeRect(this.x - tileSize * 0.3, this.y - tileSize * 0.3, tileSize * 0.6, tileSize * 0.6);
    ctx.restore();
    this.renderHealthBar(ctx, tileSize * 0.6);
  }
} 