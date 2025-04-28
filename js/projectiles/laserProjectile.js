import { Projectile } from './projectile.js';

export class LaserProjectile extends Projectile {
  constructor(x, y, vx, vy, target = null, homingStrength = 0, tileSize = 32) {
    super(x, y, vx, vy);
    this.target = target;
    this.homingStrength = homingStrength;
    this.tileSize = tileSize;
  }

  update(delta, enemies) {
    // Homing logic
    if (this.target && this.homingStrength > 0 && this.target.alive) {
      const dx = this.target.x - this.x;
      const dy = this.target.y - this.y;
      const targetAngle = Math.atan2(dy, dx);
      const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
      let currentAngle = Math.atan2(this.vy, this.vx);
      // Interpolate angle
      let diff = targetAngle - currentAngle;
      while (diff > Math.PI) diff -= 2 * Math.PI;
      while (diff < -Math.PI) diff += 2 * Math.PI;
      currentAngle += diff * this.homingStrength;
      this.vx = Math.cos(currentAngle) * speed;
      this.vy = Math.sin(currentAngle) * speed;
    }
    // Move as normal
    this.x += this.vx * delta;
    this.y += this.vy * delta;
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
    // Draw a magenta line in the direction of travel
    const angle = Math.atan2(this.vy, this.vx);
    const length = tileSize * 0.45;
    const thickness = tileSize * 0.1;
    ctx.save();
    ctx.translate(px, py);
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
    return 0.2; // 0.2 tiles
  }

  applyEffect(enemy) {
    enemy.health -= 1;
  }
} 