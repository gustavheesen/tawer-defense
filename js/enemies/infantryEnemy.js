import { Enemy } from './enemy.js';
import { loadConfig } from '../config.js';

export class InfantryEnemy extends Enemy {
  constructor(path, mapConfig, canvas) {
    super(path, mapConfig, canvas);
    const config = loadConfig();
    this.speed = config.enemySpeed * 1.7;
    this.maxHealth = 8 * config.difficulty;
    this.health = this.maxHealth;
  }

  render(ctx) {
    const tileSize = Math.min(this.canvas.width / this.mapConfig.width, this.canvas.height / this.mapConfig.height);
    ctx.save();
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(this.x, this.y, tileSize * 0.3, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();
    this.renderHealthBar(ctx, tileSize * 0.6);
  }
} 