// Sniper Tower Level 2
import BaseTower from '../tower.js';

export default class SniperTowerLevel2 extends BaseTower {
  constructor(position) {
    super(position, {
      name: 'Sniper Tower',
      level: 2,
      range: 350,
      fireRate: 2.7,
      damage: 150,
      targets: 1,
      special: null,
      cost: 300,
      projectileType: 'sniper',
      upgradeTo: 'sniperTowerLevel3',
    });
  }

  fireAt(target) {
    this.cooldown = this.fireRate;
    // ... (projectile creation logic)
  }
} 