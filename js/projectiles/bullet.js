import { Projectile } from './projectile.js';

export class CannonProjectile extends Projectile {
  constructor(x, y, vx, vy) {
    super(x, y, vx, vy);
    this.radius = 8;
  }

  render(ctx) {
    // Draw a blue arrow pointing in the direction of travel
    const angle = Math.atan2(this.vy, this.vx);
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(angle);
    ctx.fillStyle = 'blue';
    ctx.beginPath();
    ctx.moveTo(-this.radius * 0.5, -this.radius * 0.5);
    ctx.lineTo(this.radius, 0);
    ctx.lineTo(-this.radius * 0.5, this.radius * 0.5);
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