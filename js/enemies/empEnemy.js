import { Enemy } from './enemy.js';
import { loadConfig } from '../config.js';
import { getTileSize } from '../utils.js';

export class EMPEnemy extends Enemy {
  constructor(path, mapConfig, canvas) {
    super(path, mapConfig, canvas);
    const config = loadConfig();
    this.speed = config.enemySpeed * 0.85;
    this.maxHealth = 15 * config.difficulty;
    this.health = this.maxHealth;
    this.emp = true;
    this.empRadius = 1.5; // tiles
    this.empDuration = 2.0; // seconds
    this.empTriggered = false;
  }

  update(delta) {
    super.update(delta);
  }

  triggerEMP(game) {
    if (this.empTriggered) return;
    this.empTriggered = true;
    const tileSize = Math.min(this.canvas.width / this.mapConfig.width, this.canvas.height / this.mapConfig.height);
    for (const tower of game.towers) {
      const tx = tower.tileX * tileSize + tileSize / 2;
      const ty = tower.tileY * tileSize + tileSize / 2;
      const dist = Math.sqrt((tx - this.x) ** 2 + (ty - this.y) ** 2);
      if (dist < this.empRadius * tileSize) {
        tower.disabled = this.empDuration;
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
    ctx.fillStyle = '#00e6ff';
    ctx.beginPath();
    ctx.arc(0, 0, tileSize * 0.16, 0, 2 * Math.PI);
    ctx.fill();
    // Electric spark (if dead)
    if (!this.alive) {
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 3;
      for (let i = 0; i < 6; i++) {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        const angle = (i / 6) * 2 * Math.PI;
        ctx.lineTo(Math.cos(angle) * tileSize * 0.22, Math.sin(angle) * tileSize * 0.22);
        ctx.stroke();
      }
    }
    ctx.restore();
    // Health bar
    ctx.save();
    ctx.fillStyle = 'black';
    ctx.fillRect(px - tileSize * 0.16, py - tileSize * 0.32 - 10, tileSize * 0.32, 6);
    ctx.fillStyle = 'lime';
    ctx.fillRect(px - tileSize * 0.16, py - tileSize * 0.32 - 10, tileSize * 0.32 * (this.health / this.maxHealth), 6);
    ctx.strokeStyle = '#222';
    ctx.strokeRect(px - tileSize * 0.16, py - tileSize * 0.32 - 10, tileSize * 0.32, 6);
    ctx.restore();
  }
} 