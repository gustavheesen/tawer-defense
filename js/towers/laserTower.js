import { Tower } from './tower.js';
import { LaserProjectile } from '../projectiles/laserProjectile.js';
import { loadConfig } from '../config.js';
import { drawLaserTowerLevel2Base, drawLaserTowerLevel2Turret } from './laserTowerLevel2.js';
import { drawLaserTowerLevel3Base, drawLaserTowerLevel3Turret } from './laserTowerLevel3.js';
import { drawLaserTowerLevel4Base, drawLaserTowerLevel4Turret } from './laserTowerLevel4.js';
import { drawLaserTowerLevel5Base, drawLaserTowerLevel5Turret } from './laserTowerLevel5.js';

function angleDiff(a, b) {
  let d = a - b;
  while (d > Math.PI) d -= 2 * Math.PI;
  while (d < -Math.PI) d += 2 * Math.PI;
  return d;
}

export class LaserTower extends Tower {
  constructor(tileX, tileY, mapConfig, canvas, path) {
    super(tileX, tileY, mapConfig, canvas, path);
    const config = loadConfig();
    this.level = 1;
    this.setStatsForLevel(this.level);
    this.rangeTiles = 8; // Tiles
    this.projectileSpeedTiles = config.baseProjectileSpeed * 1.2; // Tiles per second
    this.turretTurnSpeed = Math.PI; // 180 deg/sec
  }

  setStatsForLevel(level) {
    // Level 1: weak, Level 5: strong
    const stats = [
      { damage: 1, range: 1.7, fireRate: 0.6, homing: 0 }, // Level 1
      { damage: 2, range: 2.7, fireRate: 1.2, homing: 0.02 }, // Level 2
      { damage: 3, range: 4.0, fireRate: 2.0, homing: 0.05 }, // Level 3
      { damage: 5, range: 6.0, fireRate: 3.0, homing: 0.09 }, // Level 4
      { damage: 8, range: 9.0, fireRate: 4.5, homing: 0.15 }  // Level 5
    ];
    const s = stats[Math.max(0, Math.min(level-1, 4))];
    this.damage = s.damage;
    this.range = s.range;
    this.fireRate = s.fireRate;
    this.homingStrength = s.homing;
  }

  upgrade() {
    if (this.level < 5) {
      this.level++;
      this.setStatsForLevel(this.level);
    }
  }

  findTarget(enemies) {
    // Return the first enemy in range using tile-based coordinates
    const cx = this.tileX + 0.5; // Center of tower in tile units
    const cy = this.tileY + 0.5;
    for (const enemy of enemies) {
      const dx = enemy.x - cx;
      const dy = enemy.y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist <= this.range) {
        return enemy;
      }
    }
    return null;
  }

  fireProjectile(cx, cy, projectiles, tileSize) {
    // Find target and deal damage
    const enemies = window.currentGame?.enemies || [];
    const target = this.findTarget(enemies);
    if (target) {
      target.takeDamage(this.damage, 'laser');
      // Use tile units for velocity
      const vx = Math.cos(this.turretAngle) * this.projectileSpeedTiles;
      const vy = Math.sin(this.turretAngle) * this.projectileSpeedTiles;
      projectiles.push(new LaserProjectile(cx, cy, vx, vy, target, this.homingStrength, tileSize));
    }
  }

  drawBase(ctx, cx, cy, tileSize) {
    // Level 1 base
    ctx.save();
    ctx.translate(cx, cy);
    const baseColors = ['#b71c1c', '#1976d2', '#43a047', '#ff8f00', '#9c27b0'];
    const upperColors = ['#c62828', '#2196f3', '#66bb6a', '#ffb300', '#ba68c8'];
    const shadowColors = ['#8d1919', '#0d47a1', '#2e7d32', '#ff6f00', '#6a1b9a'];
    const idx = this.level-1;
    if (this.level === 5) {
      // Unique, powerful base for level 5
      ctx.save();
      ctx.shadowColor = '#fff';
      ctx.shadowBlur = 18;
      ctx.globalAlpha = 0.85;
      ctx.fillStyle = '#fffde7';
      ctx.beginPath();
      ctx.arc(0, 0, tileSize * 0.32, 0, 2 * Math.PI);
      ctx.fill();
      ctx.globalAlpha = 1.0;
      ctx.shadowBlur = 0;
      ctx.restore();
      ctx.strokeStyle = '#9c27b0';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.arc(0, 0, tileSize * 0.32, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.fillStyle = '#ba68c8';
      ctx.beginPath();
      ctx.arc(0, 0, tileSize * 0.22, 0, 2 * Math.PI);
      ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(0, 0, tileSize * 0.10, 0, 2 * Math.PI);
      ctx.fill();
    } else {
      // Normal base for levels 1-4
      ctx.fillStyle = '#222';
      ctx.fillRect(-tileSize * 0.11, tileSize * 0.22, tileSize * 0.22, tileSize * 0.13);
      ctx.fillRect(-tileSize * 0.05, tileSize * 0.32, tileSize * 0.10, tileSize * 0.13);
      ctx.strokeStyle = '#111';
      ctx.lineWidth = 3;
      ctx.fillStyle = baseColors[idx];
      ctx.fillRect(-tileSize * 0.22, -tileSize * 0.18, tileSize * 0.44, tileSize * 0.28);
      ctx.strokeRect(-tileSize * 0.22, -tileSize * 0.18, tileSize * 0.44, tileSize * 0.28);
      ctx.fillStyle = upperColors[idx];
      ctx.fillRect(-tileSize * 0.13, -tileSize * 0.28, tileSize * 0.26, tileSize * 0.13);
      ctx.strokeRect(-tileSize * 0.13, -tileSize * 0.28, tileSize * 0.26, tileSize * 0.13);
      ctx.fillStyle = shadowColors[idx];
      ctx.fillRect(-tileSize * 0.28, -tileSize * 0.13, tileSize * 0.10, tileSize * 0.18);
      ctx.strokeRect(-tileSize * 0.28, -tileSize * 0.13, tileSize * 0.10, tileSize * 0.18);
    }
    ctx.restore();
  }

  drawTurret(ctx, cx, cy, tileSize) {
    // Level 1 turret
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(this.turretAngle);
    const barrelColors = ['#ffb300', '#00e676', '#00bcd4', '#ffd600', '#fff']; 
    const tipColors = ['#ff8f00', '#00c853', '#0097a7', '#ffea00', '#fffde7'];
    const headColors = ['#d32f2f', '#1565c0', '#388e3c', '#ffa000', '#7b1fa2'];
    const highlightColors = ['#e57373', '#64b5f6', '#81c784', '#ffe082', '#ce93d8'];
    const idx = this.level-1;
    if (this.level === 5) {
      // Unique, powerful turret for level 5
      ctx.save();
      ctx.shadowColor = '#fff';
      ctx.shadowBlur = 16;
      ctx.globalAlpha = 0.92;
      ctx.fillStyle = '#fffde7';
      ctx.fillRect(tileSize * 0.10, -tileSize * 0.13, tileSize * 0.38, tileSize * 0.26);
      ctx.strokeStyle = '#9c27b0';
      ctx.lineWidth = 4;
      ctx.strokeRect(tileSize * 0.10, -tileSize * 0.13, tileSize * 0.38, tileSize * 0.26);
      ctx.globalAlpha = 1.0;
      ctx.shadowBlur = 0;
      ctx.restore();
      ctx.fillStyle = '#ba68c8';
      ctx.fillRect(tileSize * 0.32, -tileSize * 0.18, tileSize * 0.18, tileSize * 0.36);
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.strokeRect(tileSize * 0.32, -tileSize * 0.18, tileSize * 0.18, tileSize * 0.36);
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(0, 0, tileSize * 0.13, 0, 2 * Math.PI);
      ctx.fill();
    } else {
      // Normal turret for levels 1-4
      ctx.strokeStyle = '#111';
      ctx.lineWidth = 3;
      ctx.fillStyle = barrelColors[idx];
      ctx.fillRect(tileSize * 0.10, -tileSize * 0.07, tileSize * 0.22, tileSize * 0.14);
      ctx.strokeRect(tileSize * 0.10, -tileSize * 0.07, tileSize * 0.22, tileSize * 0.14);
      ctx.fillStyle = tipColors[idx];
      ctx.fillRect(tileSize * 0.32, -tileSize * 0.10, tileSize * 0.13, tileSize * 0.20);
      ctx.strokeRect(tileSize * 0.32, -tileSize * 0.10, tileSize * 0.13, tileSize * 0.20);
      ctx.fillStyle = headColors[idx];
      ctx.fillRect(-tileSize * 0.05, -tileSize * 0.11, tileSize * 0.18, tileSize * 0.22);
      ctx.strokeRect(-tileSize * 0.05, -tileSize * 0.11, tileSize * 0.18, tileSize * 0.22);
      ctx.fillStyle = highlightColors[idx];
      ctx.fillRect(0, -tileSize * 0.07, tileSize * 0.06, tileSize * 0.14);
    }
    ctx.restore();
  }

  render(ctx) {
    const tileSize = Math.min(this.canvas.width / this.mapConfig.width, this.canvas.height / this.mapConfig.height);
    const cx = this.tileX * tileSize + tileSize / 2;
    const cy = this.tileY * tileSize + tileSize / 2;
    ctx.save();
    switch (this.level) {
      case 2:
        drawLaserTowerLevel2Base(ctx, cx, cy, tileSize);
        drawLaserTowerLevel2Turret(ctx, cx, cy, tileSize, this.turretAngle);
        break;
      case 3:
        drawLaserTowerLevel3Base(ctx, cx, cy, tileSize);
        drawLaserTowerLevel3Turret(ctx, cx, cy, tileSize, this.turretAngle);
        break;
      case 4:
        drawLaserTowerLevel4Base(ctx, cx, cy, tileSize);
        drawLaserTowerLevel4Turret(ctx, cx, cy, tileSize, this.turretAngle);
        break;
      case 5:
        drawLaserTowerLevel5Base(ctx, cx, cy, tileSize);
        drawLaserTowerLevel5Turret(ctx, cx, cy, tileSize, this.turretAngle);
        break;
      default:
        // Level 1 (default)
        this.drawBase(ctx, cx, cy, tileSize);
        this.drawTurret(ctx, cx, cy, tileSize);
        break;
    }
    ctx.restore();
  }
} 