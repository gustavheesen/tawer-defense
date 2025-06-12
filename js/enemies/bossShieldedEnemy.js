import { ShieldedEnemy } from './shieldedEnemy.js';

export class BossShieldedEnemy extends ShieldedEnemy {
  constructor(path, mapConfig, canvas) {
    super(path, mapConfig, canvas);
    this.speed = this.speed * 0.8; // Slower
    this.maxHealth = 140 * (mapConfig.difficulty || 1);
    this.health = this.maxHealth;
    this.isBoss = true;
    this.shield = (this.shield || 1) * 3; // Boss has more shield
  }
} 