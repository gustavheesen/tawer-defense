import { Enemy } from './enemy.js';
import { loadConfig } from '../config.js';
import { getTileSize } from '../utils.js';

export class SpeedBurstEnemy extends Enemy {
  constructor(path, mapConfig, canvas) {
    super(path, mapConfig, canvas);
    const config = loadConfig();
    this.baseSpeed = config.enemySpeed * 1.2;
    this.speed = this.baseSpeed;
    this.maxHealth = 13 * config.difficulty;
    this.health = this.maxHealth;
    this.burstCooldown = 0;
    this.burstTime = 0;
    this.burstDuration = 0.7;
    this.burstInterval = 2.5;
    this.burstMultiplier = 2.2;
  }

  update(delta) {
    this.burstCooldown -= delta;
    if (this.burstCooldown <= 0 && this.burstTime <= 0) {
      this.burstTime = this.burstDuration;
      this.burstCooldown = this.burstInterval + Math.random();
    }
    if (this.burstTime > 0) {
      this.speed = this.baseSpeed * this.burstMultiplier;
      this.burstTime -= delta;
    } else {
      this.speed = this.baseSpeed;
    }
    super.update(delta);
  }

  render(ctx) {
    const tileSize = getTileSize(this.canvas, this.mapConfig);
    const px = this.x * tileSize + tileSize / 2;
    const py = this.y * tileSize + tileSize / 2;
    ctx.save();
    ctx.translate(px, py);
    // Afterimage effect
    if (this.burstTime > 0) {
      ctx.globalAlpha = 0.3;
      ctx.fillStyle = '#fbc02d';
      for (let i = 1; i <= 3; i++) {
        ctx.beginPath();
        ctx.arc(-i * 8, 0, tileSize * 0.13, 0, 2 * Math.PI);
        ctx.fill();
      }
      ctx.globalAlpha = 1.0;
    }
    // Body
    ctx.fillStyle = '#ffd600';
    ctx.beginPath();
    ctx.arc(0, 0, tileSize * 0.13, 0, 2 * Math.PI);
    ctx.fill();
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