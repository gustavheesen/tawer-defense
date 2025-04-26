import { Tower } from './tower.js';
import { CannonProjectile } from '../projectiles/bullet.js';

function angleDiff(a, b) {
  let d = a - b;
  while (d > Math.PI) d -= 2 * Math.PI;
  while (d < -Math.PI) d += 2 * Math.PI;
  return d;
}

export class CannonTower extends Tower {
  constructor(tileX, tileY, mapConfig, canvas) {
    super(tileX, tileY, mapConfig, canvas);
    this.range = 200;
    this.fireRate = 0.7;
    this.cooldown = 0;
    this.turretTurnSpeed = Math.PI / 4; // 45 deg/sec
  }

  update(delta, enemies, projectiles) {
    super.update(delta, enemies, projectiles);
  }

  fireProjectile(cx, cy, projectiles) {
    const speed = 250;
    const vx = Math.cos(this.turretAngle) * speed;
    const vy = Math.sin(this.turretAngle) * speed;
    projectiles.push(new CannonProjectile(cx, cy, vx, vy));
  }

  drawBase(ctx, cx, cy, tileSize) {
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
    this.drawBase(ctx, cx, cy, tileSize);
    this.drawTurret(ctx, cx, cy, tileSize);
    ctx.restore();
  }
} 