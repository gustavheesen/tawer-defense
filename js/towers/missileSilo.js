import { Tower } from './tower.js';
import { GuidedMissileProjectile } from '../projectiles/guidedMissileProjectile.js';
import { ClusterMissileProjectile } from '../projectiles/clusterMissileProjectile.js';
import { EMPMissileProjectile } from '../projectiles/empMissileProjectile.js';
import { NuclearMissileProjectile } from '../projectiles/nuclearMissileProjectile.js';
import { drawMissileSiloLevel1Base, drawMissileSiloLevel1Turret } from './missileSiloLevel1.js';
import { drawMissileSiloLevel2Base, drawMissileSiloLevel2Turret } from './missileSiloLevel2.js';
import { drawMissileSiloLevel3Base, drawMissileSiloLevel3Turret } from './missileSiloLevel3.js';
import { drawMissileSiloLevel4Base, drawMissileSiloLevel4Turret } from './missileSiloLevel4.js';
import { drawMissileSiloLevel5Base, drawMissileSiloLevel5Turret } from './missileSiloLevel5.js';

export class MissileSilo extends Tower {
  constructor(tileX, tileY, mapConfig, canvas, path) {
    super(tileX, tileY, mapConfig, canvas, path);
    this.level = 1;
    this.setStatsForLevel(this.level);
    this.cooldown = 0;
    this.turretAngle = 0;
  }

  setStatsForLevel(level) {
    const stats = [
      { range: 7, fireRate: 0.25, damage: 18 }, // Level 1
      { range: 8, fireRate: 0.33, damage: 28 }, // Level 2
      { range: 9, fireRate: 0.45, damage: 40 }, // Level 3
      { range: 10, fireRate: 0.6, damage: 60 }, // Level 4
      { range: 12, fireRate: 0.8, damage: 100 } // Level 5
    ];
    const s = stats[Math.max(0, Math.min(level-1, 4))];
    this.range = s.range;
    this.fireRate = s.fireRate;
    this.damage = s.damage;
  }

  upgrade() {
    if (this.level < 5) {
      this.level++;
      this.setStatsForLevel(this.level);
    }
  }

  update(delta, enemies, projectiles) {
    this.cooldown -= delta;
    const tileSize = this.canvas.width / this.mapConfig.width;
    const cx = this.tileX * tileSize + tileSize / 2;
    const cy = this.tileY * tileSize + tileSize / 2;
    const rangePixels = this.range * tileSize;
    let nearest = null;
    let nearestDist = Infinity;
    let targetAngle = this.turretAngle;
    for (const enemy of enemies) {
      const dx = enemy.x - cx;
      const dy = enemy.y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < rangePixels && dist < nearestDist) {
        nearest = enemy;
        nearestDist = dist;
        targetAngle = Math.atan2(dy, dx);
      }
    }
    if (!nearest && this.path && this.path[0]) {
      const startX = this.path[0].x * tileSize + tileSize / 2;
      const startY = this.path[0].y * tileSize + tileSize / 2;
      targetAngle = Math.atan2(startY - cy, startX - cx);
    }
    // Rotate turret toward target
    let diff = ((a, b) => { let d = a - b; while (d > Math.PI) d -= 2 * Math.PI; while (d < -Math.PI) d += 2 * Math.PI; return d; })(targetAngle, this.turretAngle);
    const maxTurn = Math.PI * delta;
    if (Math.abs(diff) < maxTurn) {
      this.turretAngle = targetAngle;
    } else {
      this.turretAngle += Math.sign(diff) * maxTurn;
    }
    if (nearest && this.cooldown <= 0 && Math.abs(diff) < 0.087) {
      this.fireProjectile(cx, cy, projectiles, tileSize, enemies);
      this.cooldown = 1 / this.fireRate;
    }
  }

  fireProjectile(cx, cy, projectiles, tileSize, enemies = []) {
    let bestEnemy = null;
    let bestDist = Infinity;
    for (const enemy of enemies) {
      const dx = enemy.x - cx;
      const dy = enemy.y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < bestDist) {
        bestDist = dist;
        bestEnemy = enemy;
      }
    }
    if (!bestEnemy) return;
    const missileSpeed = tileSize * 2.5;
    const angle = Math.atan2(bestEnemy.y - cy, bestEnemy.x - cx);
    const vx = Math.cos(angle) * missileSpeed;
    const vy = Math.sin(angle) * missileSpeed;
    if (this.level === 1 || this.level === 2) {
      projectiles.push(new GuidedMissileProjectile(cx, cy, vx, vy, this.damage, bestEnemy, false, tileSize));
    } else if (this.level === 3) {
      projectiles.push(new ClusterMissileProjectile(cx, cy, vx, vy, this.damage, bestEnemy, tileSize));
    } else if (this.level === 4) {
      projectiles.push(new EMPMissileProjectile(cx, cy, vx, vy, this.damage, bestEnemy, tileSize));
    } else if (this.level === 5) {
      projectiles.push(new NuclearMissileProjectile(cx, cy, vx, vy, this.damage, bestEnemy, tileSize));
    }
  }

  drawBase(ctx, cx, cy, tileSize) {
    if (this.level === 1) return drawMissileSiloLevel1Base(ctx, cx, cy, tileSize);
    if (this.level === 2) return drawMissileSiloLevel2Base(ctx, cx, cy, tileSize);
    if (this.level === 3) return drawMissileSiloLevel3Base(ctx, cx, cy, tileSize);
    if (this.level === 4) return drawMissileSiloLevel4Base(ctx, cx, cy, tileSize);
    if (this.level === 5) return drawMissileSiloLevel5Base(ctx, cx, cy, tileSize);
    // fallback
    ctx.save();
    ctx.translate(cx, cy);
    ctx.fillStyle = '#888';
    ctx.beginPath();
    ctx.arc(0, 0, tileSize * 0.32, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();
  }

  drawTurret(ctx, cx, cy, tileSize, angle) {
    if (this.level === 1) return drawMissileSiloLevel1Turret(ctx, cx, cy, tileSize, angle);
    if (this.level === 2) return drawMissileSiloLevel2Turret(ctx, cx, cy, tileSize, angle);
    if (this.level === 3) return drawMissileSiloLevel3Turret(ctx, cx, cy, tileSize, angle);
    if (this.level === 4) return drawMissileSiloLevel4Turret(ctx, cx, cy, tileSize, angle);
    if (this.level === 5) return drawMissileSiloLevel5Turret(ctx, cx, cy, tileSize, angle);
    // fallback
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle);
    ctx.fillStyle = '#bdbdbd';
    ctx.beginPath();
    ctx.ellipse(tileSize * 0.18, 0, tileSize * 0.13, tileSize * 0.07, 0, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();
  }

  render(ctx) {
    const tileSize = Math.min(this.canvas.width / this.mapConfig.width, this.canvas.height / this.mapConfig.height);
    const cx = this.tileX * tileSize + tileSize / 2;
    const cy = this.tileY * tileSize + tileSize / 2;
    ctx.save();
    this.drawBase(ctx, cx, cy, tileSize);
    this.drawTurret(ctx, cx, cy, tileSize, this.turretAngle);
    ctx.restore();
  }
} 