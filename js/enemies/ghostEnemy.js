import { Enemy } from './enemy.js';
import { loadConfig } from '../config.js';
import { getTileSize } from '../utils.js';

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
    const tileSize = getTileSize(this.canvas, this.mapConfig);
    const px = this.x * tileSize + tileSize / 2;
    const py = this.y * tileSize + tileSize / 2;
    ctx.save();
    ctx.translate(px, py);
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
    // Health bar
    ctx.save();
    ctx.fillStyle = 'black';
    ctx.fillRect(px - tileSize * 0.22, py - tileSize * 0.44 - 10, tileSize * 0.44, 6);
    ctx.fillStyle = 'lime';
    ctx.fillRect(px - tileSize * 0.22, py - tileSize * 0.44 - 10, tileSize * 0.44 * (this.health / this.maxHealth), 6);
    ctx.strokeStyle = '#222';
    ctx.strokeRect(px - tileSize * 0.22, py - tileSize * 0.44 - 10, tileSize * 0.44, 6);
    ctx.restore();
  }
} 