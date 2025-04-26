import { Tower } from './tower.js';
import { LaserProjectile } from '../projectiles/laserProjectile.js';
import { loadConfig } from '../config.js';

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
    this.rangeTiles = 8; // Tiles
    this.projectileSpeedTiles = config.baseProjectileSpeed * 1.2; // Tiles per second
    this.fireRate = 2.5;
    this.cooldown = 0;
    this.turretTurnSpeed = Math.PI; // 180 deg/sec
  }

  update(delta, enemies, projectiles) {
    super.update(delta, enemies, projectiles);
  }

  fireProjectile(cx, cy, projectiles, tileSize) {
    const speedPixels = this.projectileSpeedTiles * tileSize;
    const vx = Math.cos(this.turretAngle) * speedPixels;
    const vy = Math.sin(this.turretAngle) * speedPixels;
    projectiles.push(new LaserProjectile(cx, cy, vx, vy));
  }

  drawBase(ctx, cx, cy, tileSize) {
    ctx.save();
    ctx.translate(cx, cy);
    // Draw shadow/leg
    ctx.fillStyle = '#222';
    ctx.fillRect(-tileSize * 0.11, tileSize * 0.22, tileSize * 0.22, tileSize * 0.13);
    ctx.fillRect(-tileSize * 0.05, tileSize * 0.32, tileSize * 0.10, tileSize * 0.13);
    // Draw main body (red, blocky)
    ctx.strokeStyle = '#111';
    ctx.lineWidth = 3;
    ctx.fillStyle = '#b71c1c';
    ctx.fillRect(-tileSize * 0.22, -tileSize * 0.18, tileSize * 0.44, tileSize * 0.28);
    ctx.strokeRect(-tileSize * 0.22, -tileSize * 0.18, tileSize * 0.44, tileSize * 0.28);
    // Draw upper body (darker red)
    ctx.fillStyle = '#c62828';
    ctx.fillRect(-tileSize * 0.13, -tileSize * 0.28, tileSize * 0.26, tileSize * 0.13);
    ctx.strokeRect(-tileSize * 0.13, -tileSize * 0.28, tileSize * 0.26, tileSize * 0.13);
    // Draw left side block (shadow)
    ctx.fillStyle = '#8d1919';
    ctx.fillRect(-tileSize * 0.28, -tileSize * 0.13, tileSize * 0.10, tileSize * 0.18);
    ctx.strokeRect(-tileSize * 0.28, -tileSize * 0.13, tileSize * 0.10, tileSize * 0.18);
    ctx.restore();
  }

  drawTurret(ctx, cx, cy, tileSize) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(this.turretAngle);
    // Barrel (yellow/orange)
    ctx.strokeStyle = '#111';
    ctx.lineWidth = 3;
    ctx.fillStyle = '#ffb300';
    ctx.fillRect(tileSize * 0.10, -tileSize * 0.07, tileSize * 0.22, tileSize * 0.14);
    ctx.strokeRect(tileSize * 0.10, -tileSize * 0.07, tileSize * 0.22, tileSize * 0.14);
    // Barrel tip (orange)
    ctx.fillStyle = '#ff8f00';
    ctx.fillRect(tileSize * 0.32, -tileSize * 0.10, tileSize * 0.13, tileSize * 0.20);
    ctx.strokeRect(tileSize * 0.32, -tileSize * 0.10, tileSize * 0.13, tileSize * 0.20);
    // Turret head (red)
    ctx.fillStyle = '#d32f2f';
    ctx.fillRect(-tileSize * 0.05, -tileSize * 0.11, tileSize * 0.18, tileSize * 0.22);
    ctx.strokeRect(-tileSize * 0.05, -tileSize * 0.11, tileSize * 0.18, tileSize * 0.22);
    // Turret head highlight (lighter red)
    ctx.fillStyle = '#e57373';
    ctx.fillRect(0, -tileSize * 0.07, tileSize * 0.06, tileSize * 0.14);
    ctx.restore();
  }

  render(ctx) {
    const tileSize = Math.min(this.canvas.width / this.mapConfig.width, this.canvas.height / this.mapConfig.height);
    const cx = this.tileX * tileSize + tileSize / 2;
    const cy = this.tileY * tileSize + tileSize / 2;
    ctx.save();
    this.drawBase(ctx, cx, cy, tileSize);
    this.drawTurret(ctx, cx, cy, tileSize);
    ctx.restore();
  }
} 