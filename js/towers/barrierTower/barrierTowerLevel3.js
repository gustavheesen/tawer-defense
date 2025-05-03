// BarrierTowerLevel3: Blocks enemies for 60 seconds or until 3 enemies destroy it
import { Tower } from '../tower.js';

export default class BarrierTowerLevel3 extends Tower {
  constructor(tileX, tileY, mapConfig, canvas, path) {
    super(tileX, tileY, mapConfig, canvas, path);
    this.type = 'barrier';
    this.level = 3;
    this.maxHealth = 350;
    this.health = this.maxHealth;
    this.duration = 60 * 1000; // 60 seconds
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
    if (this.attackers >= 3 || this.health <= 0) {
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