// Tesla Tower Level 4
import { Tower } from '../tower.js';

export default class TeslaTowerLevel4 extends Tower {
  constructor(position) {
    super(position, {
      name: 'Tesla Tower',
      level: 4,
      rangeTiles: 160 / 32,
      fireRate: 1 / 0.9,
      damage: 18,
      targets: 5, // chain length
      special: null,
      cost: 700,
      projectileType: 'teslaBolt',
      upgradeTo: 'teslaTowerLevel5',
    });
  }

  fireAt(target, enemies, projectiles) {
    // Chain logic: find up to 5 enemies (target + 4 chains)
    const chainTargets = [target];
    let last = target;
    for (let i = 0; i < 4; i++) { // 4 additional chains
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