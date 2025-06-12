import { SplitterEnemy, MiniSplitterEnemy } from './splitterEnemy.js';

export class BossSplitterEnemy extends SplitterEnemy {
  constructor(path, mapConfig, canvas) {
    super(path, mapConfig, canvas);
    this.speed = this.speed * 0.8; // Slower
    this.maxHealth = 120 * (mapConfig.difficulty || 1);
    this.health = this.maxHealth;
    this.isBoss = true;
  }

  // Override death logic: split into 4 MiniSplitters
  onDeath(game) {
    for (let i = 0; i < 4; i++) {
      const mini = new MiniSplitterEnemy(this.path, this.mapConfig, this.canvas);
      mini.x = this.x + (i % 2 === 0 ? -10 : 10);
      mini.y = this.y + (i < 2 ? -10 : 10);
      game.enemies.push(mini);
    }
  }
} 