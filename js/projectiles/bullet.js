import { Projectile } from './projectile.js';

export class CannonProjectile extends Projectile {
  constructor(x, y, vx, vy) {
    super(x, y, vx, vy); // x, y, vx, vy are in tile units
    this.tileSize = 32;
    this.radius = this.tileSize * 0.15;
  }

  render(ctx, tileSize, canvas, mapConfig) {
    // Convert tile units to pixels
    if (!tileSize && canvas && mapConfig) {
      tileSize = Math.min(canvas.width / mapConfig.width, canvas.height / mapConfig.height);
    }
    // Default fallback
    tileSize = tileSize || this.tileSize;
    const px = this.x * tileSize;
    const py = this.y * tileSize;
    // Draw a blue arrow pointing in the direction of travel
    const angle = Math.atan2(this.vy, this.vx);
    const size = tileSize * 0.3;
    ctx.save();
    ctx.translate(px, py);
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
    // Use tile units for hit radius
    return 0.3; // 0.3 tiles
  }

  applyEffect(enemy) {
    enemy.health -= 12;
  }
} 