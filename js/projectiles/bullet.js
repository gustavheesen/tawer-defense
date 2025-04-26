import { Projectile } from './projectile.js';

export class CannonProjectile extends Projectile {
  constructor(x, y, vx, vy) {
    super(x, y, vx, vy);
    this.radius = 8;
  }

  render(ctx, tileSize) {
    // Draw a blue arrow pointing in the direction of travel
    const angle = Math.atan2(this.vy, this.vx);
    const size = tileSize * 0.3; // Base size scaled by tile size
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(angle);
    ctx.fillStyle = 'blue';
    ctx.beginPath();
    ctx.moveTo(-size * 0.5, -size * 0.5);
    ctx.lineTo(size, 0);
    ctx.lineTo(-size * 0.5, size * 0.5);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  getHitRadius() {
    return 16;
  }

  applyEffect(enemy) {
    enemy.health -= 12;
  }
} 