import { GhostEnemy } from './ghostEnemy.js';

export class BossGhostEnemy extends GhostEnemy {
  constructor(path, mapConfig, canvas) {
    super(path, mapConfig, canvas);
    this.speed = this.speed * 0.8; // Slower
    this.maxHealth = 60 * (mapConfig.difficulty || 1);
    this.health = this.maxHealth;
    this.isBoss = true;
  }
} 