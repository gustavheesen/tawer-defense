import { SpiderEnemy } from './spiderEnemy.js';

export class BossSpiderEnemy extends SpiderEnemy {
  constructor(path, mapConfig, canvas) {
    super(path, mapConfig, canvas);
    this.speed = this.speed * 0.85; // Slower
    this.maxHealth = 50 * (mapConfig.difficulty || 1);
    this.health = this.maxHealth;
    this.isBoss = true;
  }

  update(delta) {
    console.log('[BossSpiderEnemy] update', 'x:', this.x, 'y:', this.y, 'pathIndex:', this.pathIndex);
    super.update(delta);
  }
} 