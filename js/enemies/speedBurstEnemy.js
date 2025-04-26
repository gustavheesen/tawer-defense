import { Enemy } from './enemy.js';
import { loadConfig } from '../config.js';

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
    const tileSize = Math.min(this.canvas.width / this.mapConfig.width, this.canvas.height / this.mapConfig.height);
    ctx.save();
    ctx.translate(this.x, this.y);
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
    this.renderHealthBar(ctx, tileSize * 0.28);
  }
} 