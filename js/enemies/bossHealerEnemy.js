import { HealerEnemy } from './healerEnemy.js';

export class BossHealerEnemy extends HealerEnemy {
  constructor(path, mapConfig, canvas) {
    super(path, mapConfig, canvas);
    this.speed = this.speed * 0.8; // Slower
    this.maxHealth = 90 * (mapConfig.difficulty || 1);
    this.health = this.maxHealth;
    this.isBoss = true;
    this.healAmount = (this.healAmount || 1) * 3; // Boss heals more
    this.healRadius = (this.healRadius || 1.5) * 1.5;
  }
} 