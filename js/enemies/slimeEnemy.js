// Rendering for SlimeEnemy is handled in slimeEnemyRenderer.js
import { Enemy } from './enemy.js';
import { loadConfig } from '../config.js';

export class SlimeEnemy extends Enemy {
  constructor(path, mapConfig, canvas) {
    super(path, mapConfig, canvas);
    const config = loadConfig();
    this.speed = config.enemySpeed * 1.6; // fast
    this.maxHealth = 8 * config.difficulty;
    this.health = this.maxHealth;
    this.wrapping = false;
    this.wrapTime = 0;
    this.wrapDuration = 60; // seconds
    this.targetTower = null;
  }

  update(delta, towers = []) {
    if (this.wrapping) {
      this.wrapTime += delta;
      if (this.wrapTime >= this.wrapDuration) {
        this.alive = false; // Slime dies after wrapping
      }
      return;
    }
    // Check for nearby towers to wrap
    for (const tower of towers) {
      if ((!tower.disabled || tower.disabled <= 0) && this._isNearTower(tower)) {
        this.wrapping = true;
        this.wrapTime = 0;
        this.targetTower = tower;
        tower.disabled = 60; // Disable for 60 seconds
        break;
      }
    }
    super.update(delta);
  }

  _isNearTower(tower) {
    // Use tile center positions for both slime and tower
    const slimeX = this.x;
    const slimeY = this.y;
    const towerX = tower.tileX + 0.5;
    const towerY = tower.tileY + 0.5;
    return Math.sqrt((towerX - slimeX) ** 2 + (towerY - slimeY) ** 2) < 0.8;
  }
} 