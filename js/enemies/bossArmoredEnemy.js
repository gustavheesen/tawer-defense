import { ArmoredEnemy } from './armoredEnemy.js';

export class BossArmoredEnemy extends ArmoredEnemy {
  constructor(path, mapConfig, canvas) {
    super(path, mapConfig, canvas);
    this.speed = this.speed * 0.7; // Slower
    this.maxHealth = 180 * (mapConfig.difficulty || 1);
    this.health = this.maxHealth;
    this.isBoss = true;
  }
} 