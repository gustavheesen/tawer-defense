import { Enemy } from './enemy.js';
import { loadConfig } from '../config.js';
import { getTileSize } from '../utils.js';

export class ArmoredEnemy extends Enemy {
  constructor(path, mapConfig, canvas) {
    super(path, mapConfig, canvas);
    const config = loadConfig();
    this.speed = config.enemySpeed * 0.7;
    this.maxHealth = 28 * config.difficulty;
    this.health = this.maxHealth;
    this.armored = true;
  }

  takeDamage(amount, type = 'projectile') {
    if (type === 'projectile') {
      amount *= 0.5; // Half damage from projectiles
    }
    this.health -= amount;
    if (this.health <= 0) this.alive = false;
  }

  render(ctx) {
    const tileSize = getTileSize(this.canvas, this.mapConfig);
    const px = this.x * tileSize + tileSize / 2;
    const py = this.y * tileSize + tileSize / 2;
    ctx.save();
    ctx.translate(px, py);
    // Body
    ctx.fillStyle = '#888';
    ctx.beginPath();
    ctx.arc(0, 0, tileSize * 0.20, 0, 2 * Math.PI);
    ctx.fill();
    // Metal plates
    ctx.strokeStyle = '#444';
    ctx.lineWidth = 4;
    for (let i = 0; i < 4; i++) {
      ctx.beginPath();
      ctx.arc(0, 0, tileSize * 0.20, (i * Math.PI) / 2, ((i + 1) * Math.PI) / 2);
      ctx.stroke();
    }
    ctx.restore();
    // Health bar
    ctx.save();
    ctx.fillStyle = 'black';
    ctx.fillRect(px - tileSize * 0.20, py - tileSize * 0.40 - 10, tileSize * 0.40, 6);
    ctx.fillStyle = 'lime';
    ctx.fillRect(px - tileSize * 0.20, py - tileSize * 0.40 - 10, tileSize * 0.40 * (this.health / this.maxHealth), 6);
    ctx.strokeStyle = '#222';
    ctx.strokeRect(px - tileSize * 0.20, py - tileSize * 0.40 - 10, tileSize * 0.40, 6);
    ctx.restore();
  }
} 