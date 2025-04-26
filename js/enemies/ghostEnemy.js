import { Enemy } from './enemy.js';
import { loadConfig } from '../config.js';

export class GhostEnemy extends Enemy {
  constructor(path, mapConfig, canvas) {
    super(path, mapConfig, canvas);
    const config = loadConfig();
    this.speed = config.enemySpeed * 1.1;
    this.maxHealth = 12 * config.difficulty;
    this.health = this.maxHealth;
    this.ghost = true; // for logic: ignores slow, passes through towers
  }

  update(delta) {
    // Ignores slow effects (handled externally if needed)
    super.update(delta);
  }

  render(ctx) {
    const tileSize = Math.min(this.canvas.width / this.mapConfig.width, this.canvas.height / this.mapConfig.height);
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.globalAlpha = 0.55;
    // Body
    ctx.fillStyle = '#e0e7ef';
    ctx.beginPath();
    ctx.ellipse(0, 0, tileSize * 0.18, tileSize * 0.23, 0, 0, 2 * Math.PI);
    ctx.fill();
    // Wispy tail
    ctx.beginPath();
    ctx.moveTo(-tileSize * 0.10, tileSize * 0.18);
    ctx.quadraticCurveTo(0, tileSize * 0.32 + Math.sin(Date.now()/200)*tileSize*0.04, tileSize * 0.10, tileSize * 0.18);
    ctx.lineTo(0, tileSize * 0.23);
    ctx.closePath();
    ctx.fillStyle = '#bfc9d6';
    ctx.fill();
    // Face
    ctx.globalAlpha = 0.8;
    ctx.fillStyle = '#444';
    ctx.beginPath();
    ctx.arc(-tileSize * 0.05, -tileSize * 0.05, tileSize * 0.025, 0, 2 * Math.PI);
    ctx.arc(tileSize * 0.05, -tileSize * 0.05, tileSize * 0.025, 0, 2 * Math.PI);
    ctx.fill();
    ctx.globalAlpha = 1.0;
    ctx.restore();
    this.renderHealthBar(ctx, tileSize * 0.44);
  }
} 