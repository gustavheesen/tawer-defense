import { Enemy } from './enemy.js';
import { loadConfig } from '../config.js';
import { getTileSize } from '../utils.js';

export class InfantryEnemy extends Enemy {
  constructor(path, mapConfig, canvas) {
    super(path, mapConfig, canvas);
    const config = loadConfig();
    this.speed = config.enemySpeed * 1.7;
    this.maxHealth = 8 * config.difficulty;
    this.health = this.maxHealth;
    this.angle = 0;
    this.animPhase = 0;
  }

  update(delta) {
    // Calculate angle to next path tile before moving (tile-based)
    if (this.pathIndex < this.path.length - 1) {
      const targetTile = this.path[this.pathIndex + 1];
      const dx = targetTile.x - this.x;
      const dy = targetTile.y - this.y;
      if (dx !== 0 || dy !== 0) {
        this.angle = Math.atan2(dy, dx);
      }
    }
    this.animPhase += delta * 4;
    super.update(delta);
  }

  render(ctx) {
    const tileSize = getTileSize(this.canvas, this.mapConfig);
    const px = this.x * tileSize + tileSize / 2;
    const py = this.y * tileSize + tileSize / 2;
    ctx.save();
    ctx.translate(px, py);
    ctx.rotate(this.angle);
    // Floating shadow
    ctx.save();
    ctx.globalAlpha = 0.25;
    ctx.fillStyle = '#222';
    ctx.ellipse(0, tileSize * 0.32 + Math.sin(this.animPhase) * tileSize * 0.04, tileSize * 0.18, tileSize * 0.07, 0, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();
    // Tattered robe (body)
    ctx.save();
    ctx.translate(0, Math.sin(this.animPhase) * tileSize * 0.04);
    ctx.beginPath();
    ctx.moveTo(-tileSize * 0.18, tileSize * 0.18);
    ctx.lineTo(-tileSize * 0.13, tileSize * 0.05);
    ctx.lineTo(-tileSize * 0.10, tileSize * 0.22);
    ctx.lineTo(-tileSize * 0.04, tileSize * 0.08);
    ctx.lineTo(0, tileSize * 0.22);
    ctx.lineTo(tileSize * 0.04, tileSize * 0.08);
    ctx.lineTo(tileSize * 0.10, tileSize * 0.22);
    ctx.lineTo(tileSize * 0.13, tileSize * 0.05);
    ctx.lineTo(tileSize * 0.18, tileSize * 0.18);
    ctx.lineTo(0, tileSize * 0.32);
    ctx.closePath();
    ctx.fillStyle = '#23232b';
    ctx.fill();
    // Belt
    ctx.fillStyle = '#7b2f1a';
    ctx.fillRect(-tileSize * 0.10, tileSize * 0.13, tileSize * 0.20, tileSize * 0.04);
    ctx.beginPath();
    ctx.arc(0, tileSize * 0.15, tileSize * 0.025, 0, 2 * Math.PI);
    ctx.fillStyle = '#b44d1a';
    ctx.fill();
    ctx.restore();
    // Spear (held out front)
    ctx.save();
    ctx.rotate(-Math.PI / 6);
    ctx.strokeStyle = '#2d2d38';
    ctx.lineWidth = tileSize * 0.06;
    ctx.beginPath();
    ctx.moveTo(tileSize * 0.10, tileSize * 0.05);
    ctx.lineTo(tileSize * 0.38, -tileSize * 0.04);
    ctx.stroke();
    ctx.lineWidth = tileSize * 0.03;
    ctx.strokeStyle = '#444';
    ctx.beginPath();
    ctx.moveTo(tileSize * 0.38, -tileSize * 0.04);
    ctx.lineTo(tileSize * 0.48, -tileSize * 0.09);
    ctx.stroke();
    ctx.restore();
    // Head/hood
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(0, -tileSize * 0.10, tileSize * 0.16, tileSize * 0.18, 0, 0, 2 * Math.PI);
    ctx.fillStyle = '#23232b';
    ctx.fill();
    // Horns
    ctx.strokeStyle = '#bdbdbd';
    ctx.lineWidth = tileSize * 0.04;
    ctx.beginPath();
    ctx.moveTo(-tileSize * 0.07, -tileSize * 0.22);
    ctx.lineTo(-tileSize * 0.13, -tileSize * 0.28);
    ctx.moveTo(tileSize * 0.07, -tileSize * 0.22);
    ctx.lineTo(tileSize * 0.13, -tileSize * 0.28);
    ctx.stroke();
    // Face
    ctx.beginPath();
    ctx.ellipse(0, -tileSize * 0.10, tileSize * 0.09, tileSize * 0.10, 0, 0, 2 * Math.PI);
    ctx.fillStyle = '#2e5d4f';
    ctx.fill();
    // Eye
    ctx.beginPath();
    ctx.arc(tileSize * 0.04, -tileSize * 0.11, tileSize * 0.025, 0, 2 * Math.PI);
    ctx.fillStyle = '#ff6f00';
    ctx.fill();
    // Fangs
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = tileSize * 0.012;
    ctx.beginPath();
    ctx.moveTo(-tileSize * 0.03, -tileSize * 0.04);
    ctx.lineTo(-tileSize * 0.04, -tileSize * 0.01);
    ctx.moveTo(tileSize * 0.03, -tileSize * 0.04);
    ctx.lineTo(tileSize * 0.04, -tileSize * 0.01);
    ctx.stroke();
    // Mouth
    ctx.strokeStyle = '#b71c1c';
    ctx.lineWidth = tileSize * 0.01;
    ctx.beginPath();
    ctx.arc(0, -tileSize * 0.03, tileSize * 0.03, 0, Math.PI);
    ctx.stroke();
    ctx.restore();
    ctx.restore();
    // Health bar
    ctx.save();
    ctx.fillStyle = 'black';
    ctx.fillRect(px - tileSize * 0.3, py - tileSize * 0.6 - 10, tileSize * 0.6, 6);
    ctx.fillStyle = 'lime';
    ctx.fillRect(px - tileSize * 0.3, py - tileSize * 0.6 - 10, tileSize * 0.6 * (this.health / this.maxHealth), 6);
    ctx.strokeStyle = '#222';
    ctx.strokeRect(px - tileSize * 0.3, py - tileSize * 0.6 - 10, tileSize * 0.6, 6);
    ctx.restore();
  }
} 