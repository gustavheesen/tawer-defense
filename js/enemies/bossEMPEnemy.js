import { EMPEnemy } from './empEnemy.js';

export class BossEMPEnemy extends EMPEnemy {
  constructor(path, mapConfig, canvas) {
    super(path, mapConfig, canvas);
    this.speed = this.speed * 0.8; // Slower
    this.maxHealth = 110 * (mapConfig.difficulty || 1);
    this.health = this.maxHealth;
    this.isBoss = true;
    this.empRadius = (this.empRadius || 1.5) * 2.2; // Boss EMP is much larger
    this.empDuration = (this.empDuration || 2.0) * 2;
  }
} 