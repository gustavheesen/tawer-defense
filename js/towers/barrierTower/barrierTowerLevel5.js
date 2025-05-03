// BarrierTowerLevel5: Blocks enemies for 90 seconds or until 5 enemies destroy it
import { Tower } from '../tower.js';

export default class BarrierTowerLevel5 extends Tower {
  constructor(tileX, tileY, mapConfig, canvas, path) {
    super(tileX, tileY, mapConfig, canvas, path);
    this.type = 'barrier';
    this.level = 5;
    this.maxHealth = 700;
    this.health = this.maxHealth;
    this.duration = 90 * 1000; // 90 seconds
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
    if (this.attackers >= 5 || this.health <= 0) {
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