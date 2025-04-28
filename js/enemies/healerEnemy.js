import { Enemy } from './enemy.js';
import { loadConfig } from '../config.js';
import { getTileSize } from '../utils.js';

export class HealerEnemy extends Enemy {
  constructor(path, mapConfig, canvas) {
    super(path, mapConfig, canvas);
    const config = loadConfig();
    this.speed = config.enemySpeed * 0.8;
    this.maxHealth = 14 * config.difficulty;
    this.health = this.maxHealth;
    this.healCooldown = 0;
    this.healRadius = 1.5; // tiles
    this.healAmount = 4 * config.difficulty;
    this.healInterval = 2.5; // seconds
  }

  update(delta, allEnemies = []) {
    super.update(delta);
    this.healCooldown -= delta;
    if (this.healCooldown <= 0) {
      this.healCooldown = this.healInterval;
      // Heal nearby enemies
      const tileSize = Math.min(this.canvas.width / this.mapConfig.width, this.canvas.height / this.mapConfig.height);
      for (const e of allEnemies) {
        if (e !== this && e.alive) {
          const dist = Math.sqrt((e.x - this.x) ** 2 + (e.y - this.y) ** 2);
          if (dist < this.healRadius * tileSize) {
            e.health = Math.min(e.maxHealth, e.health + this.healAmount);
          }
        }
      }
    }
  }

  render(ctx) {
    const tileSize = getTileSize(this.canvas, this.mapConfig);
    const px = this.x * tileSize + tileSize / 2;
    const py = this.y * tileSize + tileSize / 2;
    ctx.save();
    ctx.translate(px, py);
    // Body
    ctx.fillStyle = '#b2ff59';
    ctx.beginPath();
    ctx.arc(0, 0, tileSize * 0.17, 0, 2 * Math.PI);
    ctx.fill();
    // Healing aura
    ctx.globalAlpha = 0.3 + 0.2 * Math.sin(Date.now() / 300);
    ctx.strokeStyle = '#00ffb0';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.arc(0, 0, tileSize * 0.28, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.globalAlpha = 1.0;
    ctx.restore();
    // Health bar
    ctx.save();
    ctx.fillStyle = 'black';
    ctx.fillRect(px - tileSize * 0.17, py - tileSize * 0.34 - 10, tileSize * 0.34, 6);
    ctx.fillStyle = 'lime';
    ctx.fillRect(px - tileSize * 0.17, py - tileSize * 0.34 - 10, tileSize * 0.34 * (this.health / this.maxHealth), 6);
    ctx.strokeStyle = '#222';
    ctx.strokeRect(px - tileSize * 0.17, py - tileSize * 0.34 - 10, tileSize * 0.34, 6);
    ctx.restore();
  }
} 