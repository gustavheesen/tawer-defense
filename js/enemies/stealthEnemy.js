import { Enemy } from './enemy.js';
import { loadConfig } from '../config.js';

export class StealthEnemy extends Enemy {
  constructor(path, mapConfig, canvas) {
    super(path, mapConfig, canvas);
    const config = loadConfig();
    this.speed = config.enemySpeed * 1.0;
    this.maxHealth = 10 * config.difficulty;
    this.health = this.maxHealth;
    this.stealth = true;
    this.revealed = false;
  }

  reveal() {
    this.revealed = true;
  }

  render(ctx) {
    const tileSize = Math.min(this.canvas.width / this.mapConfig.width, this.canvas.height / this.mapConfig.height);
    ctx.save();
    ctx.translate(this.x, this.y);
    // Flicker effect if not revealed
    if (!this.revealed) {
      ctx.globalAlpha = 0.25 + 0.25 * Math.sin(Date.now() / 120);
    } else {
      ctx.globalAlpha = 1.0;
    }
    // Body
    ctx.fillStyle = '#bdbdbd';
    ctx.beginPath();
    ctx.arc(0, 0, tileSize * 0.15, 0, 2 * Math.PI);
    ctx.fill();
    ctx.globalAlpha = 1.0;
    ctx.restore();
    this.renderHealthBar(ctx, tileSize * 0.28);
  }
} 