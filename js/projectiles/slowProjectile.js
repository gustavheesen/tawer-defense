import { Projectile } from './projectile.js';

export class SlowProjectile extends Projectile {
  constructor(x, y, vx, vy, tileSize = 32) {
    super(x, y, vx, vy);
    this.tileSize = tileSize;
  }

  render(ctx, tileSize, canvas, mapConfig) {
    // Convert tile coordinates to pixel coordinates for rendering
    if (!tileSize && canvas && mapConfig) {
      tileSize = Math.min(canvas.width / mapConfig.width, canvas.height / mapConfig.height);
    }
    // Default fallback
    tileSize = tileSize || this.tileSize;
    const px = this.x * tileSize;
    const py = this.y * tileSize;
    // Draw a cyan arrow pointing in the direction of travel
    const angle = Math.atan2(this.vy, this.vx);
    const size = tileSize * 0.35;
    ctx.save();
    ctx.translate(px, py);
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
    return 0.35; // 0.35 tiles
  }

  applyEffect(enemy) {
    enemy.health -= 4;
    enemy.speed *= 0.7;
  }
} 