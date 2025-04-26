import { loadConfig } from './config.js';
import { Map } from './maps/map.js';
import { Enemy } from './enemies/enemy.js';
import { TankEnemy } from './enemies/tankEnemy.js';
import { InfantryEnemy } from './enemies/infantryEnemy.js';
import { Tower } from './towers/tower.js';
import { CannonTower } from './towers/cannonTower.js';
import { LaserTower } from './towers/laserTower.js';
import { SlowTower } from './towers/slowTower.js';
import { Projectile } from './projectiles/projectile.js';
import { CannonProjectile } from './projectiles/bullet.js';
import { LaserProjectile } from './projectiles/laserProjectile.js';
import { SlowProjectile } from './projectiles/slowProjectile.js';
import { path as enemyPath } from './maps/map1.js';
import { SpiderEnemy } from './enemies/spiderEnemy.js';
import { getTileSize } from './utils.js';
import { BomberEnemy } from './enemies/bomberEnemy.js';
import { GhostEnemy } from './enemies/ghostEnemy.js';
import { SplitterEnemy, MiniSplitterEnemy } from './enemies/splitterEnemy.js';
import { ShieldedEnemy } from './enemies/shieldedEnemy.js';
import { RegeneratingEnemy } from './enemies/regeneratingEnemy.js';
import { ArmoredEnemy } from './enemies/armoredEnemy.js';
import { HealerEnemy } from './enemies/healerEnemy.js';
import { SpeedBurstEnemy } from './enemies/speedBurstEnemy.js';
import { StealthEnemy } from './enemies/stealthEnemy.js';
import { EMPEnemy } from './enemies/empEnemy.js';
// import { updateSidebarHUD } from './main.js';

function getPathTiles(path) {
  const tiles = new Set();
  for (let i = 0; i < path.length - 1; i++) {
    const a = path[i];
    const b = path[i + 1];
    const dx = Math.sign(b.x - a.x);
    const dy = Math.sign(b.y - a.y);
    let x = a.x, y = a.y;
    tiles.add(`${x},${y}`);
    while (x !== b.x || y !== b.y) {
      if (x !== b.x) x += dx;
      if (y !== b.y) y += dy;
      tiles.add(`${x},${y}`);
    }
  }
  return tiles;
}

const TOWER_CLASSES = {
  cannon: CannonTower,
  laser: LaserTower,
  slow: SlowTower
};

export class Game {
  constructor(canvas, ctx, config = null, path = null) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.config = config ? config : loadConfig();
    this.path = path || enemyPath;
    this.map = new Map(this.config.map, this.path);
    this.enemies = [];
    this.towers = [];
    this.projectiles = [];
    this.score = 0;
    this.lives = this.config.lives;
    this.running = false;
    this.lastTimestamp = 0;
    this.pathTiles = getPathTiles(this.path);
    this.selectedTowerType = 'cannon';
    // Add event listener for placing towers
    this.canvas.addEventListener('click', this.handleCanvasClick.bind(this));
  }

  handleCanvasClick(event) {
    const rect = this.canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const tileSize = Math.min(this.canvas.width / this.config.map.width, this.canvas.height / this.config.map.height);
    const tileX = Math.floor(x / tileSize);
    const tileY = Math.floor(y / tileSize);
    // Prevent placing on path (all tiles)
    if (this.pathTiles.has(`${tileX},${tileY}`)) return;
    // Prevent placing on another tower
    if (this.towers.some(t => t.tileX === tileX && t.tileY === tileY)) return;
    
    
    // Place tower with type
    const TowerClass = TOWER_CLASSES[this.selectedTowerType] || CannonTower;
    this.towers.push(new TowerClass(tileX, tileY, this.config.map, this.canvas, this.path));
  }

  start() {
    this.running = true;
    requestAnimationFrame(this.loop.bind(this));
  }

  startWave() {
    // Spawn a mix of all enemy types
    for (let i = 0; i < 2; i++) {
      setTimeout(() => {
        this.enemies.push(new TankEnemy(this.path, this.config.map, this.canvas));
      }, i * 1200);
    }
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        this.enemies.push(new InfantryEnemy(this.path, this.config.map, this.canvas));
      }, i * 700 + 600);
    }
    for (let i = 0; i < 2; i++) {
      setTimeout(() => {
        this.enemies.push(new SpiderEnemy(this.path, this.config.map, this.canvas));
      }, i * 500 + 300);
    }
    for (let i = 0; i < 2; i++) {
      setTimeout(() => {
        this.enemies.push(new BomberEnemy(this.path, this.config.map, this.canvas));
      }, i * 1800 + 900);
    }
    for (let i = 0; i < 2; i++) {
      setTimeout(() => {
        this.enemies.push(new GhostEnemy(this.path, this.config.map, this.canvas));
      }, i * 1000 + 1200);
    }
    for (let i = 0; i < 2; i++) {
      setTimeout(() => {
        this.enemies.push(new SplitterEnemy(this.path, this.config.map, this.canvas));
      }, i * 1600 + 1500);
    }
    for (let i = 0; i < 2; i++) {
      setTimeout(() => {
        this.enemies.push(new ShieldedEnemy(this.path, this.config.map, this.canvas));
      }, i * 1100 + 800);
    }
    for (let i = 0; i < 2; i++) {
      setTimeout(() => {
        this.enemies.push(new RegeneratingEnemy(this.path, this.config.map, this.canvas));
      }, i * 1300 + 1000);
    }
    for (let i = 0; i < 2; i++) {
      setTimeout(() => {
        this.enemies.push(new ArmoredEnemy(this.path, this.config.map, this.canvas));
      }, i * 1400 + 1200);
    }
    for (let i = 0; i < 2; i++) {
      setTimeout(() => {
        this.enemies.push(new HealerEnemy(this.path, this.config.map, this.canvas));
      }, i * 1500 + 1300);
    }
    for (let i = 0; i < 2; i++) {
      setTimeout(() => {
        this.enemies.push(new SpeedBurstEnemy(this.path, this.config.map, this.canvas));
      }, i * 900 + 700);
    }
    for (let i = 0; i < 2; i++) {
      setTimeout(() => {
        this.enemies.push(new StealthEnemy(this.path, this.config.map, this.canvas));
      }, i * 1200 + 900);
    }
    for (let i = 0; i < 1; i++) {
      setTimeout(() => {
        this.enemies.push(new EMPEnemy(this.path, this.config.map, this.canvas));
      }, i * 2000 + 1500);
    }
    // if (typeof window.updateSidebarHUD === 'function') window.updateSidebarHUD(this, this.score, this.lives, this.currentWave);
  }

  loop(timestamp) {
    if (!this.running) return;
    const delta = (timestamp - this.lastTimestamp) / 1000 || 0;
    this.lastTimestamp = timestamp;
    this.update(delta);
    this.render();
    requestAnimationFrame(this.loop.bind(this));
  }

  update(delta) {
    // Update towers (handle disabled)
    for (const tower of this.towers) {
      if (tower.disabled && tower.disabled > 0) {
        tower.disabled -= delta;
        if (tower.disabled < 0) tower.disabled = 0;
        continue; // skip update if disabled
      }
      tower.update(delta, this.enemies, this.projectiles);
    }
    // Update enemies
    for (const enemy of this.enemies) {
      // HealerEnemy: pass all enemies for healing
      if (enemy instanceof HealerEnemy) {
        enemy.update(delta, this.enemies);
      } else {
        enemy.update(delta);
      }
    }
    // Handle special deaths before removing dead enemies
    const newEnemies = [];
    for (const enemy of this.enemies) {
      if (!enemy.alive) {
        // BomberEnemy: explode and damage towers in 1-tile radius
        if (enemy instanceof BomberEnemy && !enemy.exploded) {
          const tileSize = Math.min(this.canvas.width / this.config.map.width, this.canvas.height / this.config.map.height);
          const ex = enemy.x;
          const ey = enemy.y;
          for (const tower of this.towers) {
            const tx = tower.tileX * tileSize + tileSize / 2;
            const ty = tower.tileY * tileSize + tileSize / 2;
            const dist = Math.sqrt((tx - ex) ** 2 + (ty - ey) ** 2);
            if (dist < tileSize * 1.2) {
              tower.health = (tower.health || 3) - 1;
            }
          }
          enemy.exploded = true;
        }
        // SplitterEnemy: split into two MiniSplitters
        if (enemy instanceof SplitterEnemy) {
          for (let i = 0; i < 2; i++) {
            const mini = new MiniSplitterEnemy(this.path, this.config.map, this.canvas);
            mini.x = enemy.x + (i === 0 ? -8 : 8);
            mini.y = enemy.y + (i === 0 ? -8 : 8);
            newEnemies.push(mini);
          }
        }
        // EMPEnemy: disable towers in radius
        if (enemy instanceof EMPEnemy && !enemy.empTriggered) {
          enemy.triggerEMP(this);
        }
        // GhostEnemy: no special death logic
      }
    }
    // Remove dead enemies
    this.enemies = this.enemies.filter(e => e.alive);
    // Add new enemies (from splitting)
    this.enemies.push(...newEnemies);
    // Update projectiles
    for (const proj of this.projectiles) {
      proj.update(delta, this.enemies);
    }
    // Remove dead projectiles
    this.projectiles = this.projectiles.filter(p => p.alive);
    // if (typeof window.updateSidebarHUD === 'function') window.updateSidebarHUD(this, this.score, this.lives, this.currentWave);
  }

  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.map.render(this.ctx);
    const tileSize = getTileSize(this.canvas, this.config.map);
    // Render towers using their own render method
    for (const tower of this.towers) {
      tower.render(this.ctx);
    }
    // Render enemies
    for (const enemy of this.enemies) {
      enemy.render(this.ctx);
    }
    // Render projectiles
    for (const proj of this.projectiles) {
      proj.render(this.ctx, tileSize);
    }
    // TODO: Render UI overlays, etc.
  }
} 