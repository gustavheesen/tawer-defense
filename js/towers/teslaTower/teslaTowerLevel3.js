// Tesla Tower Level 3
import { Tower } from '../tower.js';

export default class TeslaTowerLevel3 extends Tower {
  constructor(position) {
    super(position, {
      name: 'Tesla Tower',
      level: 3,
      rangeTiles: 140 / 32,
      fireRate: 1 / 1.0,
      damage: 12,
      targets: 4, // chain length
      special: null,
      cost: 500,
      projectileType: 'teslaBolt',
      upgradeTo: 'teslaTowerLevel4',
    });
  }

  fireAt(target, enemies, projectiles) {
    console.log('[TeslaTowerLevel3] fireAt called', { target, enemies, projectiles });
    // Chain logic: find up to 4 enemies (target + 3 chains)
    const chainTargets = [target];
    let last = target;
    for (let i = 0; i < 3; i++) { // 3 additional chains
      let next = null;
      let minDist = Infinity;
      for (const enemy of enemies) {
        if (chainTargets.includes(enemy) || !enemy.alive) continue;
        const dx = enemy.x - last.x;
        const dy = enemy.y - last.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 80 && dist < minDist) {
          minDist = dist;
          next = enemy;
        }
      }
      if (next) {
        chainTargets.push(next);
        last = next;
      } else {
        break;
      }
    }
    // Create the TeslaBolt
    const angle = Math.atan2(target.y - this.position.y, target.x - this.position.x);
    projectiles.push(new (require('./teslaBolt.js').TeslaBolt)(this.position.x, this.position.y, angle, this.damage, chainTargets, this.level));
  }

  fireProjectile(cx, cy, projectiles) {
    console.log('[TeslaTowerLevel3] fireProjectile called', { cx, cy, enemies: this._enemies, projectiles });
    if (!this._enemies) return;
    let nearest = null;
    let nearestDist = Infinity;
    for (const enemy of this._enemies) {
      const dx = enemy.x - cx;
      const dy = enemy.y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < nearestDist) {
        nearest = enemy;
        nearestDist = dist;
      }
    }
    if (nearest) {
      this.fireAt(nearest, this._enemies, projectiles);
    }
  }
} 