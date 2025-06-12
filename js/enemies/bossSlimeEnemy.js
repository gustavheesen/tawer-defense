import { SlimeEnemy } from './slimeEnemy.js';

export class BossSlimeEnemy extends SlimeEnemy {
  constructor(path, mapConfig, canvas) {
    super(path, mapConfig, canvas);
    this.speed = this.speed * 0.7; // Slower
    this.maxHealth = 160 * (mapConfig.difficulty || 1);
    this.health = this.maxHealth;
    this.isBoss = true;
    this.splitCount = 4; // Boss splits into 4 slimes
    this.splitHealth = Math.round(this.maxHealth / this.splitCount / 2); // Each split slime is still tough
  }

  // Override death logic: split into 4 strong slimes
  onDeath(game) {
    for (let i = 0; i < this.splitCount; i++) {
      const slime = new SlimeEnemy(this.path, this.mapConfig, this.canvas);
      slime.x = this.x + (i % 2 === 0 ? -12 : 12);
      slime.y = this.y + (i < 2 ? -12 : 12);
      slime.maxHealth = this.splitHealth;
      slime.health = this.splitHealth;
      game.enemies.push(slime);
    }
  }

  update(delta) {
    console.log('[BossSlimeEnemy] update', 'x:', this.x, 'y:', this.y, 'pathIndex:', this.pathIndex);
    super.update(delta);
  }
} 