import { Tower } from './tower.js';
import { SlowProjectile } from '../projectiles/slowProjectile.js';

function angleDiff(a, b) {
  let d = a - b;
  while (d > Math.PI) d -= 2 * Math.PI;
  while (d < -Math.PI) d += 2 * Math.PI;
  return d;
}

export class SlowTower extends Tower {
  constructor(tileX, tileY, mapConfig, canvas) {
    super(tileX, tileY, mapConfig, canvas);
    this.range = 90;
    this.fireRate = 1.2;
    this.cooldown = 0;
    this.turretTurnSpeed = Math.PI / 1.5; // 120 deg/sec
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
      const speed = 180;
      const vx = Math.cos(this.turretAngle) * speed;
      const vy = Math.sin(this.turretAngle) * speed;
      projectiles.push(new SlowProjectile(cx, cy, vx, vy));
      this.cooldown = 1 / this.fireRate;
    }
  }

  drawBase(ctx, cx, cy, tileSize) {
    ctx.save();
    ctx.translate(cx, cy);
    // Primitive base: small dark circle
    ctx.beginPath();
    ctx.arc(0, tileSize * 0.32, tileSize * 0.13, 0, 2 * Math.PI);
    ctx.fillStyle = '#222';
    ctx.globalAlpha = 0.7;
    ctx.fill();
    ctx.globalAlpha = 1.0;
    ctx.restore();
  }

  drawTurret(ctx, cx, cy, tileSize) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(this.turretAngle);
    ctx.rotate(-Math.PI / 2);
    // --- Draw the turret as a vertical block, narrow part is the front ---
    // Lower body (main shaft)
    ctx.fillStyle = '#4db6ac';
    ctx.fillRect(-tileSize * 0.10, tileSize * 0.10, tileSize * 0.20, tileSize * 0.32);
    ctx.fillStyle = '#00897b';
    ctx.fillRect(-tileSize * 0.10, tileSize * 0.22, tileSize * 0.20, tileSize * 0.10);
    // Middle body (wider)
    ctx.fillStyle = '#80cbc4';
    ctx.fillRect(-tileSize * 0.16, -tileSize * 0.04, tileSize * 0.32, tileSize * 0.18);
    ctx.fillStyle = '#4db6ac';
    ctx.fillRect(-tileSize * 0.16, 0, tileSize * 0.32, tileSize * 0.07);
    // Side blocks
    ctx.fillStyle = '#607d8b';
    ctx.fillRect(-tileSize * 0.22, -tileSize * 0.04, tileSize * 0.06, tileSize * 0.18);
    ctx.fillRect(tileSize * 0.16, -tileSize * 0.04, tileSize * 0.06, tileSize * 0.18);
    // Orange ring
    ctx.fillStyle = '#ef6c00';
    ctx.fillRect(-tileSize * 0.22, -tileSize * 0.13, tileSize * 0.44, tileSize * 0.10);
    ctx.fillStyle = '#b53d00';
    ctx.fillRect(-tileSize * 0.22, -tileSize * 0.13, tileSize * 0.44, tileSize * 0.03);
    // Top cap
    ctx.fillStyle = '#00897b';
    ctx.fillRect(-tileSize * 0.10, -tileSize * 0.22, tileSize * 0.20, tileSize * 0.08);
    ctx.fillStyle = '#ef6c00';
    ctx.fillRect(-tileSize * 0.10, -tileSize * 0.22, tileSize * 0.20, tileSize * 0.03);
    // Pixel-art shading (optional)
    ctx.fillStyle = 'rgba(0,0,0,0.13)';
    ctx.fillRect(-tileSize * 0.16, -tileSize * 0.04, tileSize * 0.08, tileSize * 0.18);
    ctx.fillStyle = 'rgba(255,255,255,0.10)';
    ctx.fillRect(0, -tileSize * 0.04, tileSize * 0.16, tileSize * 0.18);
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