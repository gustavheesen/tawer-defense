import { SpeedBurstEnemy } from './speedBurstEnemy.js';

export class BossSpeedBurstEnemy extends SpeedBurstEnemy {
  constructor(path, mapConfig, canvas) {
    super(path, mapConfig, canvas);
    this.baseSpeed = this.baseSpeed * 1.5; // Boss is much faster
    this.speed = this.baseSpeed;
    this.maxHealth = 70 * (mapConfig.difficulty || 1);
    this.health = this.maxHealth;
    this.isBoss = true;
    this.burstMultiplier = 3.0; // Even faster bursts
    this.burstDuration = 1.2;
    this.burstInterval = 1.8;
  }
} 