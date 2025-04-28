import { Enemy } from './enemy.js';
import { loadConfig } from '../config.js';
import { getTileSize } from '../utils.js';

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
    const tileSize = getTileSize(this.canvas, this.mapConfig);
    const px = this.x * tileSize + tileSize / 2;
    const py = this.y * tileSize + tileSize / 2;
    ctx.save();
    ctx.translate(px, py);
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
    // Health bar
    ctx.save();
    ctx.fillStyle = 'black';
    ctx.fillRect(px - tileSize * 0.14, py - tileSize * 0.28 - 10, tileSize * 0.28, 6);
    ctx.fillStyle = 'lime';
    ctx.fillRect(px - tileSize * 0.14, py - tileSize * 0.28 - 10, tileSize * 0.28 * (this.health / this.maxHealth), 6);
    ctx.strokeStyle = '#222';
    ctx.strokeRect(px - tileSize * 0.14, py - tileSize * 0.28 - 10, tileSize * 0.28, 6);
    ctx.restore();
  }
} 