import { Tower } from '../tower.js';
import { loadConfig } from '../../config.js';
import { renderSniperTower } from './sniperTowerRender.js';
import { SniperProjectile } from './sniperProjectile.js';

function angleDiff(a, b) {
  let d = a - b;
  while (d > Math.PI) d -= 2 * Math.PI;
  while (d < -Math.PI) d += 2 * Math.PI;
  return d;
}

export class SniperTower extends Tower {
  constructor(tileX, tileY, mapConfig, canvas, path) {
    super(tileX, tileY, mapConfig, canvas, path);
    const config = loadConfig();
    this.level = 1;
    this.setStatsForLevel(this.level);
    this.projectileSpeedTiles = config.baseProjectileSpeed * 1.5;
    this.turretTurnSpeed = Math.PI / 2;
  }

  setStatsForLevel(level) {
    const stats = [
      { range: 9.5, fireRate: 0.33, damage: 100 }, // Level 1
      { range: 11, fireRate: 0.37, damage: 150 }, // Level 2
      { range: 12.5, fireRate: 0.42, damage: 200 }, // Level 3
      { range: 14, fireRate: 0.5, damage: 250 }, // Level 4
      { range: 15.5, fireRate: 0.59, damage: 350 }  // Level 5
    ];
    const s = stats[Math.max(0, Math.min(level-1, 4))];
    this.range = s.range;
    this.rangeTiles = s.range;
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
    const cx = this.tileX + 0.5;
    const cy = this.tileY + 0.5;
    const rangeTiles = this.rangeTiles;
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
    if (!nearest && this.pathStart) {
      const startX = this.pathStart.x + 0.5;
      const startY = this.pathStart.y + 0.5;
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
      this.fireProjectile(cx, cy, projectiles, nearest);
      this.cooldown = 1 / this.fireRate;
    }
  }

  fireProjectile(cx, cy, projectiles, target) {
    const vx = Math.cos(this.turretAngle) * this.projectileSpeedTiles;
    const vy = Math.sin(this.turretAngle) * this.projectileSpeedTiles;
    projectiles.push(new SniperProjectile(cx, cy, vx, vy, this.damage, target));
  }

  render(ctx, selected = false) {
    renderSniperTower(ctx, this);
  }
} 