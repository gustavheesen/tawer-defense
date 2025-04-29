// Sniper Tower Level 3
import BaseTower from '../tower.js';

export default class SniperTowerLevel3 extends BaseTower {
  constructor(position) {
    super(position, {
      name: 'Sniper Tower',
      level: 3,
      range: 400,
      fireRate: 2.4,
      damage: 200,
      targets: 1,
      special: 'Pierce',
      cost: 400,
      projectileType: 'sniper',
      upgradeTo: 'sniperTowerLevel4',
    });
  }

  fireAt(target) {
    this.cooldown = this.fireRate;
    // ... (projectile creation logic)
  }
} 