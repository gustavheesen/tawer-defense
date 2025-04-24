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

  drawTurret(ctx, cx, cy, tileSize) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(this.turretAngle);
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(tileSize / 2.7, 0);
    ctx.stroke();
    ctx.restore();
  }

  render(ctx) {
    const tileSize = Math.min(this.canvas.width / this.mapConfig.width, this.canvas.height / this.mapConfig.height);
    const cx = this.tileX * tileSize + tileSize / 2;
    const cy = this.tileY * tileSize + tileSize / 2;
    // Draw base
    ctx.save();
    ctx.fillStyle = 'cyan';
    ctx.beginPath();
    ctx.arc(cx, cy, tileSize / 3, 0, 2 * Math.PI);
    ctx.fill();
    this.drawTurret(ctx, cx, cy, tileSize);
    ctx.restore();
  }
} 