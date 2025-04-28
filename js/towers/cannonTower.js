import { Tower } from './tower.js';
import { CannonProjectile } from '../projectiles/bullet.js';
import { loadConfig } from '../config.js';
import { drawCannonTowerLevel2Base, drawCannonTowerLevel2Turret } from './cannonTowerLevel2.js';
import { drawCannonTowerLevel3Base, drawCannonTowerLevel3Turret } from './cannonTowerLevel3.js';
import { drawCannonTowerLevel4Base, drawCannonTowerLevel4Turret } from './cannonTowerLevel4.js';
import { drawCannonTowerLevel5Base, drawCannonTowerLevel5Turret } from './cannonTowerLevel5.js';
import { GuidedMissileProjectile } from '../projectiles/guidedMissileProjectile.js';

function angleDiff(a, b) {
  let d = a - b;
  while (d > Math.PI) d -= 2 * Math.PI;
  while (d < -Math.PI) d += 2 * Math.PI;
  return d;
}

export class CannonTower extends Tower {
  constructor(tileX, tileY, mapConfig, canvas, path) {
    super(tileX, tileY, mapConfig, canvas, path);
    const config = loadConfig();
    this.level = 1;
    this.setStatsForLevel(this.level);
    this.projectileSpeedTiles = config.baseProjectileSpeed * 0.8;
    this.turretTurnSpeed = Math.PI / 4;
  }

  setStatsForLevel(level) {
    const stats = [
      { range: 5, fireRate: 0.7, damage: 6, turnSpeed: Math.PI / 4 }, // Level 1
      { range: 6, fireRate: 1.1, damage: 10, turnSpeed: Math.PI / 3 }, // Level 2
      { range: 7.5, fireRate: 1.7, damage: 16, turnSpeed: Math.PI / 2 }, // Level 3
      { range: 9.5, fireRate: 2.5, damage: 24, turnSpeed: (2 * Math.PI) / 3 }, // Level 4
      { range: 12, fireRate: 3.5, damage: 36, turnSpeed: Math.PI }  // Level 5
    ];
    const s = stats[Math.max(0, Math.min(level-1, 4))];
    this.range = s.range;
    this.fireRate = s.fireRate;
    this.damage = s.damage;
    this.turretTurnSpeed = s.turnSpeed;
  }

  upgrade() {
    if (this.level < 5) {
      this.level++;
      this.setStatsForLevel(this.level);
    }
  }

  update(delta, enemies, projectiles) {
    this.cooldown -= delta;
    // Use tile units for all calculations
    const cx = this.tileX + 0.5;
    const cy = this.tileY + 0.5;
    const rangeTiles = this.range;

    let nearest = null;
    let nearestDist = Infinity;
    let targetAngle = this.turretAngle;
    for (const enemy of enemies) {
      const dx = enemy.x - cx;
      const dy = enemy.y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < rangeTiles && dist < nearestDist) {
        nearest = enemy;
        nearestDist = dist;
        targetAngle = Math.atan2(dy, dx);
      }
    }

    // If no enemy in range, aim at path start point
    if (!nearest && this.path && this.path[0]) {
      const startX = this.path[0].x + 0.5;
      const startY = this.path[0].y + 0.5;
      targetAngle = Math.atan2(startY - cy, startX - cx);
    }

    // Rotate turret toward target
    let diff = angleDiff(targetAngle, this.turretAngle);
    const maxTurn = this.turretTurnSpeed * delta;
    if (Math.abs(diff) < maxTurn) {
      this.turretAngle = targetAngle;
    } else {
      this.turretAngle += Math.sign(diff) * maxTurn;
    }

    // Only fire if aimed within 5 degrees
    if (nearest && this.cooldown <= 0 && Math.abs(angleDiff(targetAngle, this.turretAngle)) < 0.087) {
      this.fireProjectile(cx, cy, projectiles);
      this.cooldown = 1 / this.fireRate;
    }
  }

  fireProjectile(cx, cy, projectiles) {
    // Use tile units for velocity
    const vx = Math.cos(this.turretAngle) * this.projectileSpeedTiles;
    const vy = Math.sin(this.turretAngle) * this.projectileSpeedTiles;
    projectiles.push(new CannonProjectile(cx, cy, vx, vy));
  }

  drawBase(ctx, cx, cy, tileSize) {
    if (this.level === 2) return drawCannonTowerLevel2Base(ctx, cx, cy, tileSize);
    if (this.level === 3) return drawCannonTowerLevel3Base(ctx, cx, cy, tileSize);
    if (this.level === 4) return drawCannonTowerLevel4Base(ctx, cx, cy, tileSize);
    if (this.level === 5) return drawCannonTowerLevel5Base(ctx, cx, cy, tileSize);
    // Level 1 (default)
    // Draw a pixel-art stepped 'X' base with black outline
    ctx.save();
    ctx.translate(cx, cy);
    // Draw outline first
    ctx.strokeStyle = '#111';
    ctx.lineWidth = 3;
    for (let i = 0; i < 4; i++) {
      ctx.save();
      ctx.rotate((Math.PI / 2) * i);
      // Stepped arm (outline)
      ctx.beginPath();
      ctx.moveTo(-tileSize * 0.08, -tileSize * 0.18);
      ctx.lineTo(-tileSize * 0.18, -tileSize * 0.28);
      ctx.lineTo(-tileSize * 0.08, -tileSize * 0.38);
      ctx.lineTo(tileSize * 0.08, -tileSize * 0.38);
      ctx.lineTo(tileSize * 0.18, -tileSize * 0.28);
      ctx.lineTo(tileSize * 0.08, -tileSize * 0.18);
      ctx.closePath();
      ctx.stroke();
      ctx.restore();
    }
    // Draw arms (fill)
    ctx.fillStyle = '#2e7d32';
    for (let i = 0; i < 4; i++) {
      ctx.save();
      ctx.rotate((Math.PI / 2) * i);
      ctx.beginPath();
      ctx.moveTo(-tileSize * 0.08, -tileSize * 0.18);
      ctx.lineTo(-tileSize * 0.18, -tileSize * 0.28);
      ctx.lineTo(-tileSize * 0.08, -tileSize * 0.38);
      ctx.lineTo(tileSize * 0.08, -tileSize * 0.38);
      ctx.lineTo(tileSize * 0.18, -tileSize * 0.28);
      ctx.lineTo(tileSize * 0.08, -tileSize * 0.18);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }
    // Draw center outline
    ctx.beginPath();
    ctx.arc(0, 0, tileSize * 0.22, 0, 2 * Math.PI);
    ctx.strokeStyle = '#111';
    ctx.lineWidth = 4;
    ctx.stroke();
    // Draw center fill
    ctx.beginPath();
    ctx.arc(0, 0, tileSize * 0.22, 0, 2 * Math.PI);
    ctx.fillStyle = '#388e3c';
    ctx.shadowColor = '#000';
    ctx.shadowBlur = 4;
    ctx.fill();
    // Draw a lighter green highlight
    ctx.beginPath();
    ctx.arc(0, 0, tileSize * 0.11, 0, 2 * Math.PI);
    ctx.fillStyle = '#4caf50';
    ctx.globalAlpha = 0.7;
    ctx.fill();
    ctx.globalAlpha = 1.0;
    // Draw a white 'X' in the center
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-tileSize * 0.07, -tileSize * 0.07);
    ctx.lineTo(tileSize * 0.07, tileSize * 0.07);
    ctx.moveTo(tileSize * 0.07, -tileSize * 0.07);
    ctx.lineTo(-tileSize * 0.07, tileSize * 0.07);
    ctx.stroke();
    ctx.restore();
  }

  drawTurret(ctx, cx, cy, tileSize) {
    if (this.level === 2) return drawCannonTowerLevel2Turret(ctx, cx, cy, tileSize, this.turretAngle);
    if (this.level === 3) return drawCannonTowerLevel3Turret(ctx, cx, cy, tileSize, this.turretAngle);
    if (this.level === 4) return drawCannonTowerLevel4Turret(ctx, cx, cy, tileSize, this.turretAngle);
    if (this.level === 5) return drawCannonTowerLevel5Turret(ctx, cx, cy, tileSize, this.turretAngle);
    // Level 1 (default)
    // Draw a thick, dark turret barrel with a round tip and black outline
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(this.turretAngle);
    // Barrel outline
    ctx.beginPath();
    ctx.ellipse(tileSize * 0.28, 0, tileSize * 0.13, tileSize * 0.09, 0, 0, 2 * Math.PI);
    ctx.strokeStyle = '#111';
    ctx.lineWidth = 5;
    ctx.stroke();
    // Barrel fill
    ctx.beginPath();
    ctx.ellipse(tileSize * 0.28, 0, tileSize * 0.13, tileSize * 0.09, 0, 0, 2 * Math.PI);
    ctx.fillStyle = '#222';
    ctx.fill();
    // Barrel tip outline
    ctx.beginPath();
    ctx.arc(tileSize * 0.38, 0, tileSize * 0.06, 0, 2 * Math.PI);
    ctx.strokeStyle = '#111';
    ctx.lineWidth = 3;
    ctx.stroke();
    // Barrel tip fill
    ctx.beginPath();
    ctx.arc(tileSize * 0.38, 0, tileSize * 0.06, 0, 2 * Math.PI);
    ctx.fillStyle = '#444';
    ctx.fill();
    ctx.restore();
  }

  render(ctx) {
    const tileSize = Math.min(this.canvas.width / this.mapConfig.width, this.canvas.height / this.mapConfig.height);
    const cx = this.tileX * tileSize + tileSize / 2;
    const cy = this.tileY * tileSize + tileSize / 2;
    ctx.save();
    // Draw base and turret by level
    switch (this.level) {
      case 2:
        drawCannonTowerLevel2Base(ctx, cx, cy, tileSize);
        drawCannonTowerLevel2Turret(ctx, cx, cy, tileSize, this.turretAngle);
        break;
      case 3:
        drawCannonTowerLevel3Base(ctx, cx, cy, tileSize);
        drawCannonTowerLevel3Turret(ctx, cx, cy, tileSize, this.turretAngle);
        break;
      case 4:
        drawCannonTowerLevel4Base(ctx, cx, cy, tileSize);
        drawCannonTowerLevel4Turret(ctx, cx, cy, tileSize, this.turretAngle);
        break;
      case 5:
        drawCannonTowerLevel5Base(ctx, cx, cy, tileSize);
        drawCannonTowerLevel5Turret(ctx, cx, cy, tileSize, this.turretAngle);
        break;
      default:
        this.drawBase(ctx, cx, cy, tileSize);
        this.drawTurret(ctx, cx, cy, tileSize);
        break;
    }
    ctx.restore();
  }
} 