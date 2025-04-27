import { Projectile } from './projectile.js';

export class LaserProjectile extends Projectile {
  constructor(x, y, vx, vy, target = null, homingStrength = 0, tileSize = 32) {
    super(x, y, vx, vy);
    this.length = tileSize * 0.45;
    this.thickness = tileSize * 0.1;
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

  render(ctx, tileSize) {
    tileSize = tileSize || this.tileSize;
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
    return this.tileSize * 0.1;
  }

  applyEffect(enemy) {
    enemy.health -= 1;
  }
} 