import { Enemy } from './enemy.js';
import { loadConfig } from '../config.js';
import { getTileSize } from '../utils.js';

export class BomberEnemy extends Enemy {
  constructor(path, mapConfig, canvas) {
    super(path, mapConfig, canvas);
    const config = loadConfig();
    this.speed = config.enemySpeed * 0.5;
    this.maxHealth = 30 * config.difficulty;
    this.health = this.maxHealth;
    this.exploded = false;
  }

  update(delta) {
    super.update(delta);
    // Explosion logic handled externally on death
  }

  render(ctx) {
    const tileSize = getTileSize(this.canvas, this.mapConfig);
    const px = this.x * tileSize + tileSize / 2;
    const py = this.y * tileSize + tileSize / 2;
    ctx.save();
    ctx.translate(px, py);
    // Body
    ctx.fillStyle = '#223366';
    ctx.beginPath();
    ctx.arc(0, 0, tileSize * 0.22, 0, 2 * Math.PI);
    ctx.fill();
    // Bomb
    ctx.fillStyle = '#b71c1c';
    ctx.beginPath();
    ctx.arc(0, -tileSize * 0.18, tileSize * 0.10, 0, 2 * Math.PI);
    ctx.fill();
    // Fuse
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, -tileSize * 0.28);
    ctx.lineTo(0, -tileSize * 0.22);
    ctx.stroke();
    // Blinking effect
    ctx.globalAlpha = 0.5 + 0.5 * Math.sin(Date.now() / 120);
    ctx.fillStyle = '#ff5252';
    ctx.beginPath();
    ctx.arc(0, -tileSize * 0.18, tileSize * 0.06, 0, 2 * Math.PI);
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