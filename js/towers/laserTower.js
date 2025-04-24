import { Tower } from './tower.js';
import { LaserProjectile } from '../projectiles/laserProjectile.js';

function angleDiff(a, b) {
  let d = a - b;
  while (d > Math.PI) d -= 2 * Math.PI;
  while (d < -Math.PI) d += 2 * Math.PI;
  return d;
}

export class LaserTower extends Tower {
  constructor(tileX, tileY, mapConfig, canvas) {
    super(tileX, tileY, mapConfig, canvas);
    this.range = 120;
    this.fireRate = 2.5;
    this.cooldown = 0;
    this.turretTurnSpeed = Math.PI; // 180 deg/sec
  }

  update(delta, enemies, projectiles) {
    this.cooldown -= delta;
    const tileSize = Math.min(this.canvas.width / this.mapConfig.width, this.canvas.height / this.mapConfig.height);
    const cx = this.tileX * tileSize + tileSize / 2;
    const cy = this.tileY * tileSize + tileSize / 2;
    let nearest = null;
    let nearestDist = Infinity;
    let targetAngle = this.turretAngle;
    for (const enemy of enemies) {
      const dx = enemy.x - cx;
      const dy = enemy.y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < this.range && dist < nearestDist) {
        nearest = enemy;
        nearestDist = dist;
        targetAngle = Math.atan2(dy, dx);
      }
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
      const speed = 400;
      const vx = Math.cos(this.turretAngle) * speed;
      const vy = Math.sin(this.turretAngle) * speed;
      projectiles.push(new LaserProjectile(cx, cy, vx, vy));
      this.cooldown = 1 / this.fireRate;
    }
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