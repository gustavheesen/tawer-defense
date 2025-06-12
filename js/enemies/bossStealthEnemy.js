import { StealthEnemy } from './stealthEnemy.js';

export class BossStealthEnemy extends StealthEnemy {
  constructor(path, mapConfig, canvas) {
    super(path, mapConfig, canvas);
    this.speed = this.speed * 0.9; // Slightly slower
    this.maxHealth = 100 * (mapConfig.difficulty || 1);
    this.health = this.maxHealth;
    this.isBoss = true;
    this.stealth = true; // Remain stealth
  }
} 