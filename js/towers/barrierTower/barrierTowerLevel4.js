// BarrierTowerLevel4: Blocks enemies for 75 seconds or until 4 enemies destroy it
import { Tower } from '../tower.js';

export default class BarrierTowerLevel4 extends Tower {
  constructor(tileX, tileY, mapConfig, canvas, path) {
    super(tileX, tileY, mapConfig, canvas, path);
    this.type = 'barrier';
    this.level = 4;
    this.maxHealth = 500;
    this.health = this.maxHealth;
    this.duration = 75 * 1000; // 75 seconds
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
    if (this.attackers >= 4 || this.health <= 0) {
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