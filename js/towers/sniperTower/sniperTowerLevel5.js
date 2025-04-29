// Sniper Tower Level 5
import BaseTower from '../tower.js';

export default class SniperTowerLevel5 extends BaseTower {
  constructor(position) {
    super(position, {
      name: 'Sniper Tower',
      level: 5,
      range: 500,
      fireRate: 1.7,
      damage: 350,
      targets: 1,
      special: 'Pierce+',
      cost: 900,
      projectileType: 'sniper',
      upgradeTo: null,
    });
  }

  fireAt(target) {
    this.cooldown = this.fireRate;
    // ... (projectile creation logic)
  }
} 