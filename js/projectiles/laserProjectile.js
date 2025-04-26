import { Projectile } from './projectile.js';

export class LaserProjectile extends Projectile {
  constructor(x, y, vx, vy) {
    super(x, y, vx, vy);
    this.length = 18;
  }

  render(ctx, tileSize) {
    // Draw a magenta line in the direction of travel
    const angle = Math.atan2(this.vy, this.vx);
    const length = tileSize * 0.45;
    const thickness = tileSize * 0.1;
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(angle);
    ctx.strokeStyle = 'magenta';
    ctx.lineWidth = thickness;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(length, 0);
    ctx.stroke();
    ctx.restore();
  }

  getHitRadius() {
    return 12;
  }

  applyEffect(enemy) {
    enemy.health -= 7;
  }
} 