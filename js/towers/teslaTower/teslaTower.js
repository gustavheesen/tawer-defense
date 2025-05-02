console.log('teslaTower.js loaded');
import { Tower } from '../tower.js';
import TeslaTowerLevel1 from './teslaTowerLevel1.js';
import TeslaTowerLevel2 from './teslaTowerLevel2.js';
import TeslaTowerLevel3 from './teslaTowerLevel3.js';
import TeslaTowerLevel4 from './teslaTowerLevel4.js';
import TeslaTowerLevel5 from './teslaTowerLevel5.js';
import { renderTeslaTower } from './teslaTowerRender.js';

const LEVEL_CLASSES = [
  TeslaTowerLevel1,
  TeslaTowerLevel2,
  TeslaTowerLevel3,
  TeslaTowerLevel4,
  TeslaTowerLevel5,
];

export class TeslaTower extends Tower {
  constructor(tileX, tileY, mapConfig, canvas, path) {
    super(tileX, tileY, mapConfig, canvas, path);
    this.level = 1;
    this.setLevelClass();
  }

  setLevelClass() {
    const LevelClass = LEVEL_CLASSES[Math.max(0, Math.min(this.level - 1, 4))];
    this.levelInstance = new LevelClass({
      x: this.tileX + 0.5,
      y: this.tileY + 0.5,
      tileX: this.tileX,
      tileY: this.tileY,
      mapConfig: this.mapConfig,
      canvas: this.canvas,
      path: this.path,
    });
    this.range = this.levelInstance.range;
    this.rangeTiles = this.levelInstance.rangeTiles;
    this.fireRate = this.levelInstance.fireRate;
    this.damage = this.levelInstance.damage;
    this.targets = this.levelInstance.targets;
    this.special = this.levelInstance.special;
    this.cost = this.levelInstance.cost;
  }

  upgrade() {
    if (this.level < 5) {
      this.level++;
      this.setLevelClass();
    }
  }

  update(delta, enemies, projectiles) {
    console.log('[TeslaTower] update called', this);
    if (this.levelInstance) {
      this.levelInstance._enemies = enemies;
    }
    // Call the base Tower update to handle aiming and firing
    super.update(delta, enemies, projectiles);
  }

  fireAt(target, enemies, projectiles) {
    if (this.levelInstance.fireAt) {
      this.levelInstance.fireAt(target, enemies, projectiles);
    }
  }

  fireProjectile(cx, cy, projectiles) {
    if (this.levelInstance && typeof this.levelInstance.fireProjectile === 'function') {
      this.levelInstance.fireProjectile(cx, cy, projectiles);
    }
  }

  render(ctx, selected = false) {
    renderTeslaTower(ctx, this);
  }

  renderPreview(ctx, tileX, tileY, isValid) {
    ctx.save();
    ctx.globalAlpha = 0.5;
    renderTeslaTower(ctx, this);
    ctx.restore();
  }
}

export default TeslaTower; 