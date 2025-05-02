import { renderTeslaBolt } from './teslaBoltRender.js';

export class TeslaBolt {
  constructor(x, y, angle, damage, chainTargets, level = 1) {
    this.position = { x, y };
    this.angle = angle;
    this.damage = damage;
    this.chainTargets = chainTargets; // array of enemy objects
    this.level = level;
    this.active = true;
    this.alive = true;
    this.framesAlive = 0; // Track how many frames the bolt has existed
  }

  update(delta, enemies) {
    this.framesAlive++;
    // Only apply effects after 3 frames (after rendering)
    if (this.framesAlive === 4) {
      // Minimum HP thresholds by level
      const minHpPercent = [0.5, 0.4, 0.3, 0.2, 0.0];
      const minHp = (enemy) => enemy.maxHealth * minHpPercent[Math.max(0, Math.min(this.level - 1, 4))];
      for (const enemy of this.chainTargets) {
        if (enemy && enemy.alive) {
          if (typeof enemy.takeDamage === 'function') {
            // Only allow damage to reduce to the minimum HP threshold
            const threshold = minHp(enemy);
            const newHealth = Math.max(enemy.health - this.damage, threshold);
            const actualDamage = enemy.health - newHealth;
            if (actualDamage > 0) {
              enemy.takeDamage(actualDamage, 'tesla');
            }
          }
          // Optional: stun/slow effect
          if (typeof enemy.stun === 'function') {
            const durations = [0.5, 0.7, 0.9, 1.1, 1.3];
            enemy.stun(durations[Math.max(0, Math.min(this.level - 1, 4))]);
          } else if (typeof enemy.slow === 'function') {
            enemy.slow(0.5, 0.5);
          }
        }
      }
    }
    // Mark for removal after damage is applied
    if (this.framesAlive > 4) {
      this.alive = false;
    }
  }

  render(ctx, tileSize) {
    // Convert tile coordinates to pixel coordinates for rendering
    const px = this.position.x * tileSize;
    const py = this.position.y * tileSize;
    renderTeslaBolt(ctx, { ...this, position: { x: px, y: py }, tileSize });
  }
} 