// Tesla Tower Level 2
import { Tower } from '../tower.js';
import { TeslaBolt } from './teslaBolt.js';

export default class TeslaTowerLevel2 extends Tower {
  constructor(position) {
    super(position, {
      name: 'Tesla Tower',
      level: 2,
      rangeTiles: 120 / 32,
      fireRate: 1 / 1.1,
      damage: 3,
      targets: 3, // chain length
      special: null,
      cost: 350,
      projectileType: 'teslaBolt',
      upgradeTo: 'teslaTowerLevel3',
    });
    this.position = position;
  }

  fireAt(target, enemies, projectiles) {
    console.log('[TeslaTowerLevel2] fireAt called', { target, enemies, projectiles });
    // Chain logic: find up to 3 enemies (target + 2 chains)
    const chainTargets = [target];
    let last = target;
    for (let i = 0; i < 2; i++) { // 2 additional chains
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
    projectiles.push(new TeslaBolt(this.position.x, this.position.y, angle, this.damage, chainTargets, this.level));
  }

  fireProjectile(cx, cy, projectiles) {
    console.log('[TeslaTowerLevel2] fireProjectile called', { cx, cy, enemies: this._enemies, projectiles });
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