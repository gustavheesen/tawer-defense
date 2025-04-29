// Sniper Tower Level 1
import BaseTower from '../tower.js';

export default class SniperTowerLevel1 extends BaseTower {
  constructor(position) {
    super(position, {
      name: 'Sniper Tower',
      level: 1,
      range: 300,
      fireRate: 3.0,
      damage: 100,
      targets: 1,
      special: null,
      cost: 200,
      projectileType: 'sniper',
      upgradeTo: 'sniperTowerLevel2',
    });
  }

  // ... existing code ...
  fireAt(target) {
    // Logic to fire a sniper projectile at the target
    // Rendering handled in sniperProjectileRender.js
    this.cooldown = this.fireRate;
    // ... (projectile creation logic)
  }
} 