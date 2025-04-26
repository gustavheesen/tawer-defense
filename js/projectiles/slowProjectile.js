import { Projectile } from './projectile.js';

export class SlowProjectile extends Projectile {
  constructor(x, y, vx, vy) {
    super(x, y, vx, vy);
    this.radius = 10;
  }

  render(ctx, tileSize) {
    // Draw a cyan arrow pointing in the direction of travel
    const angle = Math.atan2(this.vy, this.vx);
    const size = tileSize * 0.35;
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(angle);
    ctx.fillStyle = 'cyan';
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
    enemy.health -= 4;
    enemy.speed *= 0.7;
  }
} 