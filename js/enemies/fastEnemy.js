import { Enemy } from './enemy.js';
import { loadConfig } from '../config.js';

export class FastEnemy extends Enemy {
  constructor(path) {
    super(path);
    const config = loadConfig();
    this.speed = config.enemySpeed * 1.7;
    this.health = 6 * config.difficulty;
  }

  render(ctx) {
    ctx.save();
    ctx.fillStyle = 'orange';
    ctx.beginPath();
    ctx.arc(this.x, this.y, 10, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();
  }
} 