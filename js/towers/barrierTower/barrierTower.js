import { Tower } from '../tower.js';
import BarrierTowerLevel1 from './barrierTowerLevel1.js';
import BarrierTowerLevel2 from './barrierTowerLevel2.js';
import BarrierTowerLevel3 from './barrierTowerLevel3.js';
import BarrierTowerLevel4 from './barrierTowerLevel4.js';
import BarrierTowerLevel5 from './barrierTowerLevel5.js';
import { renderBarrierTower } from './barrierTowerRender.js';

const LEVEL_CLASSES = [
  BarrierTowerLevel1,
  BarrierTowerLevel2,
  BarrierTowerLevel3,
  BarrierTowerLevel4,
  BarrierTowerLevel5,
];

export class BarrierTower extends Tower {
  constructor(tileX, tileY, mapConfig, canvas, path) {
    super(tileX, tileY, mapConfig, canvas, path);
    this.level = 1;
    this.setLevelClass();
  }

  setLevelClass() {
    const LevelClass = LEVEL_CLASSES[Math.max(0, Math.min(this.level - 1, 4))];
    this.levelInstance = new LevelClass(this.tileX, this.tileY, this.mapConfig, this.canvas, this.path);
    this.maxHealth = this.levelInstance.maxHealth;
    this.health = this.levelInstance.health;
    this.duration = this.levelInstance.duration;
    this.active = this.levelInstance.active;
    this.placedAt = this.levelInstance.placedAt;
    this.attackers = this.levelInstance.attackers;
  }

  upgrade() {
    if (this.level < 5) {
      this.level++;
      this.setLevelClass();
    }
  }

  update(delta, enemies, projectiles, game) {
    // Count how many enemies are being blocked
    let blockedEnemies = 0;
    if (enemies && Array.isArray(enemies)) {
      for (const enemy of enemies) {
        if (!enemy.ghost && enemy.alive && enemy.tileX === this.tileX && enemy.tileY === this.tileY) {
          enemy.barrierBlocked = 0.2;
          blockedEnemies++;
        }
      }
    }
    this.blockedEnemies = blockedEnemies;

    // Start timer only when first enemy is blocked
    if (blockedEnemies > 0 && !this.timerStarted) {
      this.timerStarted = true;
      // Set base lifetime by level
      let baseLifetime = 60;
      if (this.level === 2) baseLifetime = 90;
      else if (this.level === 3) baseLifetime = 120;
      else if (this.level === 4) baseLifetime = 150;
      else if (this.level === 5) baseLifetime = 180;
      this.remainingTime = baseLifetime; // seconds
    }
    // Decrease timer based on number of blocked enemies
    if (this.timerStarted && blockedEnemies > 0) {
      this.remainingTime -= delta * blockedEnemies;
      if (this.remainingTime <= 0) {
        this.active = false;
        if (game && typeof game.removeTower === 'function') {
          game.removeTower(this);
        }
        return;
      }
    }
    if (this.levelInstance && typeof this.levelInstance.update === 'function') {
      this.levelInstance.update(delta, enemies, projectiles, game);
      this.health = this.levelInstance.health;
      this.active = this.levelInstance.active;
    }
  }

  onAttacked(damage) {
    if (this.levelInstance && typeof this.levelInstance.onAttacked === 'function') {
      this.levelInstance.onAttacked(damage);
      this.health = this.levelInstance.health;
      this.active = this.levelInstance.active;
    }
  }

  render(ctx, selected = false) {
    renderBarrierTower(ctx, this);
  }

  renderPreview(ctx, tileX, tileY, isValid) {
    ctx.save();
    ctx.globalAlpha = 0.5;
    renderBarrierTower(ctx, this);
    ctx.restore();
  }
}

export default BarrierTower; 