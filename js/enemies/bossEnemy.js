// DEPRECATED: Do not use this BossEnemy class. Use the specific boss classes (e.g., BossTankEnemy, BossSlimeEnemy, etc.) for proper path following and behavior.
import { Enemy } from './enemy.js';
import { getTileSize } from '../utils.js';

export class BossEnemy extends Enemy {
  constructor(path, mapConfig, canvas) {
    super(path, mapConfig, canvas);
    this.speed = this.speed * 0.7; // Boss is slower
    this.maxHealth = 100 * (mapConfig.difficulty || 1); // Much more health
    this.health = this.maxHealth;
    this.angle = 0;
    this.trackAnimOffset = 0;
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
    // Animate tracks
    this.trackAnimOffset += delta * this.speed * 0.7;
    super.update(delta);
  }

  render(ctx) {
    const tileSize = getTileSize(this.canvas, this.mapConfig);
    const px = this.x * tileSize + tileSize / 2;
    const py = this.y * tileSize + tileSize / 2;
    ctx.save();
    ctx.translate(px, py);
    ctx.rotate(this.angle);
    ctx.rotate(Math.PI / 2);
    // Draw massive tracks (animated)
    const trackW = tileSize * 0.28;
    const trackH = tileSize * 1.1;
    for (let side = -1; side <= 1; side += 2) {
      ctx.save();
      ctx.translate(side * tileSize * 0.32, 0);
      ctx.fillStyle = '#6d4c41';
      ctx.fillRect(-trackW / 2, -trackH / 2, trackW, trackH);
      // Animate treads
      const treadH = tileSize * 0.16;
      for (let i = 0; i < 7; i++) {
        const offset = ((i * treadH + this.trackAnimOffset * tileSize * 0.2) % trackH) - trackH / 2;
        ctx.fillStyle = i % 2 === 0 ? '#3e2723' : '#bdbdbd';
        ctx.fillRect(-trackW / 2, offset, trackW, treadH * 0.7);
      }
      ctx.restore();
    }
    // Draw armored body
    ctx.fillStyle = '#8e24aa';
    ctx.beginPath();
    ctx.ellipse(0, 0, tileSize * 0.38, tileSize * 0.48, 0, 0, 2 * Math.PI);
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#4527a0';
    ctx.stroke();
    // Draw armor plates
    ctx.save();
    ctx.rotate(Math.PI / 8);
    ctx.fillStyle = '#ce93d8';
    for (let i = -1; i <= 1; i++) {
      ctx.beginPath();
      ctx.ellipse(i * tileSize * 0.13, -tileSize * 0.08, tileSize * 0.09, tileSize * 0.18, 0, 0, 2 * Math.PI);
      ctx.fill();
    }
    ctx.restore();
    // Draw glowing eyes
    ctx.save();
    ctx.rotate(-Math.PI / 8);
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.ellipse(-tileSize * 0.09, -tileSize * 0.08, tileSize * 0.04, tileSize * 0.07, 0, 0, 2 * Math.PI);
    ctx.ellipse(tileSize * 0.09, -tileSize * 0.08, tileSize * 0.04, tileSize * 0.07, 0, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = '#ff1744';
    ctx.beginPath();
    ctx.arc(-tileSize * 0.09, -tileSize * 0.08, tileSize * 0.018, 0, 2 * Math.PI);
    ctx.arc(tileSize * 0.09, -tileSize * 0.08, tileSize * 0.018, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();
    // Draw huge cannon
    ctx.save();
    ctx.rotate(0);
    ctx.fillStyle = '#4527a0';
    ctx.fillRect(-tileSize * 0.06, -tileSize * 0.48, tileSize * 0.12, tileSize * 0.38);
    ctx.fillStyle = '#ce93d8';
    ctx.fillRect(-tileSize * 0.04, -tileSize * 0.68, tileSize * 0.08, tileSize * 0.22);
    ctx.restore();
    // Draw crown
    ctx.save();
    ctx.rotate(-Math.PI / 2);
    ctx.translate(0, -tileSize * 0.48);
    ctx.fillStyle = '#ffd600';
    ctx.beginPath();
    ctx.moveTo(-tileSize * 0.18, 0);
    ctx.lineTo(-tileSize * 0.09, -tileSize * 0.18);
    ctx.lineTo(0, 0);
    ctx.lineTo(tileSize * 0.09, -tileSize * 0.18);
    ctx.lineTo(tileSize * 0.18, 0);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
    ctx.restore();
    // Health bar (thicker)
    ctx.save();
    ctx.fillStyle = 'black';
    ctx.fillRect(px - tileSize * 0.6, py - tileSize * 0.9 - 14, tileSize * 1.2, 10);
    ctx.fillStyle = '#ff1744';
    ctx.fillRect(px - tileSize * 0.6, py - tileSize * 0.9 - 14, tileSize * 1.2 * (this.health / this.maxHealth), 10);
    ctx.strokeStyle = '#222';
    ctx.lineWidth = 2;
    ctx.strokeRect(px - tileSize * 0.6, py - tileSize * 0.9 - 14, tileSize * 1.2, 10);
    ctx.restore();
  }
} 