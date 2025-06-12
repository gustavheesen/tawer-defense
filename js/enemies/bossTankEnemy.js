import { TankEnemy } from './tankEnemy.js';

export class BossTankEnemy extends TankEnemy {
  constructor(path, mapConfig, canvas) {
    super(path, mapConfig, canvas);
    this.speed = this.speed * 0.7; // Even slower
    this.maxHealth = 200 * (mapConfig.difficulty || 1);
    this.health = this.maxHealth;
    this.isBoss = true;
  }

  update(delta) {
    console.log('[BossTankEnemy] update', 'x:', this.x, 'y:', this.y, 'pathIndex:', this.pathIndex);
    super.update(delta);
  }
} 