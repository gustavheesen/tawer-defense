import { BomberEnemy } from './bomberEnemy.js';

export class BossBomberEnemy extends BomberEnemy {
  constructor(path, mapConfig, canvas) {
    super(path, mapConfig, canvas);
    this.speed = this.speed * 0.8; // Slower
    this.maxHealth = 130 * (mapConfig.difficulty || 1);
    this.health = this.maxHealth;
    this.isBoss = true;
    this.explosionRadius = (this.explosionRadius || 1.2) * 2.2; // Boss explodes bigger
  }
} 