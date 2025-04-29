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

function getEnemyVelocity(enemy) {
  // Estimate velocity based on next path tile
  if (!enemy.path || enemy.pathIndex >= enemy.path.length - 1) return { vx: 0, vy: 0 };
  const nextTile = enemy.path[enemy.pathIndex + 1];
  const dx = nextTile.x - enemy.x;
  const dy = nextTile.y - enemy.y;
  const dist = Math.sqrt(dx * dx + dy * dy);
  if (dist === 0) return { vx: 0, vy: 0 };
  const speed = enemy.speed || 0;
  return {
    vx: (dx / dist) * speed,
    vy: (dy / dist) * speed,
  };
}

function predictEnemyPosition(enemy, towerX, towerY, projectileSpeed) {
  const { vx, vy } = getEnemyVelocity(enemy);
  const dx = enemy.x - towerX;
  const dy = enemy.y - towerY;
  // Quadratic solution for intercept time
  const a = vx * vx + vy * vy - projectileSpeed * projectileSpeed;
  const b = 2 * (dx * vx + dy * vy);
  const c = dx * dx + dy * dy;
  let t = 0;
  let valid = true;
  if (Math.abs(a) < 1e-6) {
    t = c / Math.max(Math.sqrt(vx * vx + vy * vy), 1e-6);
  } else {
    const disc = b * b - 4 * a * c;
    if (disc < 0) {
      t = 0;
      valid = false;
    } else {
      const t1 = (-b + Math.sqrt(disc)) / (2 * a);
      const t2 = (-b - Math.sqrt(disc)) / (2 * a);
      t = Math.min(t1, t2) > 0 ? Math.min(t1, t2) : Math.max(t1, t2, 0);
      if (t <= 0) valid = false;
    }
  }
  return {
    x: enemy.x + vx * t,
    y: enemy.y + vy * t,
    valid,
    t
  };
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
      { range: 9.5, fireRate: 0.33, damage: 200, homing: 0.08, speed: 1.5 }, // Level 1
      { range: 11, fireRate: 0.37, damage: 300, homing: 0.10, speed: 1.7 }, // Level 2
      { range: 12.5, fireRate: 0.42, damage: 400, homing: 0.12, speed: 2.0 }, // Level 3
      { range: 14, fireRate: 0.5, damage: 500, homing: 0.14, speed: 2.3 }, // Level 4
      { range: 15.5, fireRate: 0.59, damage: 650, homing: 0.16, speed: 2.7 }  // Level 5
    ];
    const s = stats[Math.max(0, Math.min(level-1, 4))];
    this.range = s.range;
    this.rangeTiles = s.range;
    this.fireRate = s.fireRate;
    this.damage = s.damage;
    this.homingStrength = s.homing;
    const config = loadConfig();
    this.projectileSpeedTiles = config.baseProjectileSpeed * s.speed;
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
    let predicted = null;
    for (const enemy of enemies) {
      const dx = enemy.x - cx;
      const dy = enemy.y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < rangeTiles && dist < nearestDist) {
        nearest = enemy;
        nearestDist = dist;
      }
    }
    let canFire = false;
    if (nearest) {
      predicted = predictEnemyPosition(nearest, cx, cy, this.projectileSpeedTiles);
      if (predicted.valid) {
        targetAngle = Math.atan2(predicted.y - cy, predicted.x - cx);
        canFire = true;
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
    // Only fire if perfectly aimed and prediction is valid
    if (canFire && this.cooldown <= 0 && Math.abs(angleDiff(targetAngle, this.turretAngle)) < 0.01) {
      this.fireProjectile(cx, cy, projectiles, nearest);
      this.cooldown = 1 / this.fireRate;
    }
  }

  fireProjectile(cx, cy, projectiles, target) {
    const vx = Math.cos(this.turretAngle) * this.projectileSpeedTiles;
    const vy = Math.sin(this.turretAngle) * this.projectileSpeedTiles;
    projectiles.push(new SniperProjectile(cx, cy, vx, vy, this.damage, target, this.homingStrength, this.level));
  }

  render(ctx, selected = false) {
    renderSniperTower(ctx, this);
  }
} 