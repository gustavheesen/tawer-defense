// Tesla Tower Level 5
import { Tower } from '../tower.js';

export default class TeslaTowerLevel5 extends Tower {
  constructor(position) {
    super(position, {
      name: 'Tesla Tower',
      level: 5,
      rangeTiles: 180 / 32,
      fireRate: 1 / 0.8,
      damage: 25,
      targets: 6, // chain length
      special: 'Split',
      cost: 1000,
      projectileType: 'teslaBolt',
      upgradeTo: null,
    });
  }

  fireAt(target, enemies, projectiles) {
    // Chain logic: find up to 6 enemies (target + 5 chains)
    const findChain = (start, exclude = []) => {
      const chainTargets = [start];
      let last = start;
      for (let i = 0; i < 5; i++) { // 5 additional chains
        let next = null;
        let minDist = Infinity;
        for (const enemy of enemies) {
          if (chainTargets.includes(enemy) || exclude.includes(enemy) || !enemy.alive) continue;
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
      return chainTargets;
    };
    // First chain
    const chain1 = findChain(target);
    // For 'Split', try to start a second chain at the next closest enemy not in chain1
    let chain2 = null;
    if (enemies.length > 1) {
      let nextStart = null;
      let minDist = Infinity;
      for (const enemy of enemies) {
        if (chain1.includes(enemy) || !enemy.alive) continue;
        const dx = enemy.x - this.position.x;
        const dy = enemy.y - this.position.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < minDist) {
          minDist = dist;
          nextStart = enemy;
        }
      }
      if (nextStart) {
        chain2 = findChain(nextStart, chain1);
      }
    }
    // Create the TeslaBolts
    const angle1 = Math.atan2(target.y - this.position.y, target.x - this.position.x);
    projectiles.push(new (require('./teslaBolt.js').TeslaBolt)(this.position.x, this.position.y, angle1, this.damage, chain1, this.level));
    if (chain2 && chain2.length > 0) {
      const angle2 = Math.atan2(chain2[0].y - this.position.y, chain2[0].x - this.position.x);
      projectiles.push(new (require('./teslaBolt.js').TeslaBolt)(this.position.x, this.position.y, angle2, this.damage, chain2, this.level));
    }
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