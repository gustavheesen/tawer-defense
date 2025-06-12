import { Tower } from '../tower.js';
Uncaught ReferenceError: SlimeEnemy is not defined
    at Game.update (game.js:422:35)
    at Game.loop (game.js:392:10)
update @ game.js:422
loop @ game.js:392
requestAnimationFrame
loop @ game.js:394
requestAnimationFrame
loop @ game.js:394
requestAnimationFrame
start @ game.js:247
startGameWithPath @ main.js:291
document.getElementById.onclick @ main.js:179Understand this errorimport { SlowTower } from '../slowTower.js';
import TeslaTower from '../teslaTower/teslaTower.js';

export default class ModularTower extends Tower {
  constructor(tileX, tileY, mapConfig, canvas, path, abilities = []) {
    super(tileX, tileY, mapConfig, canvas, path);
    this.type = 'modular';
    this.abilities = abilities;
    this.level = 1;
    // Internal towers for full logic reuse
    if (abilities.includes('tesla')) {
      this.tesla = new TeslaTower(tileX, tileY, mapConfig, canvas, path);
      this.tesla.level = this.level;
    }
    if (abilities.includes('slow')) {
      this.slow = new SlowTower(tileX, tileY, mapConfig, canvas, path);
      this.slow.level = this.level;
    }
  }

  update(delta, enemies, projectiles, game) {
    // Sync internal towers' position and level
    if (this.tesla) {
      this.tesla.tileX = this.tileX;
      this.tesla.tileY = this.tileY;
      this.tesla.level = this.level;
      this.tesla.update(delta, enemies, projectiles, game);
    }
    if (this.slow) {
      this.slow.tileX = this.tileX;
      this.slow.tileY = this.tileY;
      this.slow.level = this.level;
      this.slow.update(delta, enemies, projectiles, game);
    }
  }

  static fuse(towerA, towerB, tileX, tileY, mapConfig, canvas, path) {
    const abilities = Array.from(new Set([...(towerA.abilities || [towerA.type]), ...(towerB.abilities || [towerB.type])]));
    return new ModularTower(tileX, tileY, mapConfig, canvas, path, abilities);
  }
} 