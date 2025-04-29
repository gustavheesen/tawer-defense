import { renderSniperProjectile } from './sniperProjectileRender.js';

export class SniperProjectile {
  constructor(x, y, vx, vy, damage, target) {
    this.position = { x, y };
    this.velocity = { x: vx, y: vy };
    this.damage = damage;
    this.target = target;
    this.active = true;
    this.alive = true;
    this.angle = Math.atan2(vy, vx);
  }

  update(delta, enemies) {
    if (!this.active) return;
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
    });
  }
} 