// BarrierTowerLevel1: Blocks enemies for 30 seconds or until 1 enemy destroys it
import { Tower } from '../tower.js';

export default class BarrierTowerLevel1 extends Tower {
  constructor(tileX, tileY, mapConfig, canvas, path) {
    super(tileX, tileY, mapConfig, canvas, path);
    this.type = 'barrier';
    this.level = 1;
    this.maxHealth = 100;
    this.health = this.maxHealth;
    this.duration = 30 * 1000; // 30 seconds
    this.active = true;
    this.placedAt = Date.now();
    this.attacked = false;
  }

  update(delta, enemies, projectiles, game) {
    if (!this.active) return;
    if (Date.now() - this.placedAt > this.duration) {
      this.active = false;
      game.removeTower(this);
      return;
    }
    if (this.attacked) {
      this.active = false;
      game.removeTower(this);
      return;
    }
  }

  onAttacked(damage) {
    this.health -= damage;
    this.attacked = true;
    if (this.health <= 0) {
      this.active = false;
    }
  }
} 