// Sniper Tower Level 4
import BaseTower from '../tower.js';

export default class SniperTowerLevel4 extends BaseTower {
  constructor(position) {
    super(position, {
      name: 'Sniper Tower',
      level: 4,
      range: 450,
      fireRate: 2.0,
      damage: 250,
      targets: 1,
      special: 'Crit',
      cost: 600,
      projectileType: 'sniper',
      upgradeTo: 'sniperTowerLevel5',
    });
  }

  fireAt(target) {
    this.cooldown = this.fireRate;
    // ... (projectile creation logic)
  }
} 