// BarrierTowerLevel2: Blocks enemies for 45 seconds or until 2 enemies destroy it
import { Tower } from '../tower.js';

export default class BarrierTowerLevel2 extends Tower {
  constructor(tileX, tileY, mapConfig, canvas, path) {
    super(tileX, tileY, mapConfig, canvas, path);
    this.type = 'barrier';
    this.level = 2;
    this.maxHealth = 200;
    this.health = this.maxHealth;
    this.duration = 45 * 1000; // 45 seconds
    this.active = true;
    this.placedAt = Date.now();
    this.attackers = 0;
  }

  update(delta, enemies, projectiles, game) {
    if (!this.active) return;
    if (Date.now() - this.placedAt > this.duration) {
      this.active = false;
      game.removeTower(this);
      return;
    }
    if (this.attackers >= 2 || this.health <= 0) {
      this.active = false;
      game.removeTower(this);
      return;
    }
  }

  onAttacked(damage) {
    this.health -= damage;
    this.attackers += 1;
    if (this.health <= 0) {
      this.active = false;
    }
  }
} 