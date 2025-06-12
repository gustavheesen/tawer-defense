import { InfantryEnemy } from './infantryEnemy.js';

export class BossInfantryEnemy extends InfantryEnemy {
  constructor(path, mapConfig, canvas) {
    super(path, mapConfig, canvas);
    this.speed = this.speed * 0.8; // Slower
    this.maxHealth = 80 * (mapConfig.difficulty || 1);
    this.health = this.maxHealth;
    this.isBoss = true;
  }
} 