import { renderSniperProjectile } from './sniperProjectileRender.js';

export class SniperProjectile {
  constructor(x, y, vx, vy, damage, target, homingStrength = 0, level = 1) {
    this.position = { x, y };
    this.velocity = { x: vx, y: vy };
    this.damage = damage;
    this.target = target;
    this.active = true;
    this.alive = true;
    this.angle = Math.atan2(vy, vx);
    this.homingStrength = homingStrength;
    this.speed = Math.sqrt(vx * vx + vy * vy);
    this.level = level;
  }

  update(delta, enemies) {
    if (!this.active) return;
    // Homing logic
    if (this.target && this.homingStrength > 0 && this.target.alive) {
      const dx = this.target.x - this.position.x;
      const dy = this.target.y - this.position.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > 0.01) {
        // Desired direction
        const desiredAngle = Math.atan2(dy, dx);
        let currentAngle = Math.atan2(this.velocity.y, this.velocity.x);
        // Interpolate angle
        let diff = desiredAngle - currentAngle;
        while (diff > Math.PI) diff -= 2 * Math.PI;
        while (diff < -Math.PI) diff += 2 * Math.PI;
        currentAngle += diff * Math.min(1, this.homingStrength * delta * 10);
        this.velocity.x = Math.cos(currentAngle) * this.speed;
        this.velocity.y = Math.sin(currentAngle) * this.speed;
        this.angle = currentAngle;
      }
    }
    // Move the projectile
    this.position.x += this.velocity.x * delta;
    this.position.y += this.velocity.y * delta;
    // Check collision with target
    if (this.target && this.active) {
      const dx = this.target.x - this.position.x;
      const dy = this.target.y - this.position.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 0.2) { // Hit threshold (in tile units)
        this.target.takeDamage(this.damage, 'sniper');
        this.active = false;
        this.alive = false;
      }
    }
  }

  render(ctx, tileSize) {
    renderSniperProjectile(ctx, {
      position: {
        x: this.position.x * tileSize,
        y: this.position.y * tileSize,
      },
      angle: this.angle,
      level: this.level,
    });
  }
} 