import { RegeneratingEnemy } from './regeneratingEnemy.js';

export class BossRegeneratingEnemy extends RegeneratingEnemy {
  constructor(path, mapConfig, canvas) {
    super(path, mapConfig, canvas);
    this.speed = this.speed * 0.8; // Slower
    this.maxHealth = 120 * (mapConfig.difficulty || 1);
    this.health = this.maxHealth;
    this.isBoss = true;
    this.regenAmount = (this.regenAmount || 1) * 3; // Boss regens more
  }
} 