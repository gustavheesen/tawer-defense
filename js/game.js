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
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.config = loadConfig();
    this.map = new Map(this.config.map, enemyPath);
    this.enemies = [];
    this.towers = [];
    this.projectiles = [];
    this.score = 0;
    this.lives = this.config.lives;
    this.running = false;
    this.lastTimestamp = 0;
    this.pathTiles = getPathTiles(enemyPath);
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
    this.towers.push(new TowerClass(tileX, tileY, this.config.map, this.canvas));
  }

  start() {
    this.running = true;
    requestAnimationFrame(this.loop.bind(this));
  }

  startWave() {
    // Spawn a mix of tanks, infantry, and fast enemies
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        this.enemies.push(new TankEnemy(enemyPath, this.config.map, this.canvas));
      }, i * 1200);
    }
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        this.enemies.push(new InfantryEnemy(enemyPath, this.config.map, this.canvas));
      }, i * 700 + 600);
    }
    for (let i = 0; i < 4; i++) {
      setTimeout(() => {
        this.enemies.push(new SpiderEnemy(enemyPath, this.config.map, this.canvas));
      }, i * 500 + 300);
    }
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
    // Update towers
    for (const tower of this.towers) {
      tower.update(delta, this.enemies, this.projectiles);
    }
    // Update enemies
    for (const enemy of this.enemies) {
      enemy.update(delta);
    }
    // Remove dead enemies (not implemented yet)
    this.enemies = this.enemies.filter(e => e.alive);
    // Update projectiles
    for (const proj of this.projectiles) {
      proj.update(delta);
    }
    // Collision detection: projectiles hit enemies
    for (const proj of this.projectiles) {
      for (const enemy of this.enemies) {
        const dx = enemy.x - proj.x;
        const dy = enemy.y - proj.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const hitRadius = proj instanceof LaserProjectile ? 12 : 16;
        if (dist < hitRadius) {
          // Apply damage/effect
          if (proj instanceof CannonProjectile) {
            enemy.health -= 12;
          } else if (proj instanceof LaserProjectile) {
            enemy.health -= 7;
          } else if (proj instanceof SlowProjectile) {
            enemy.health -= 4;
            enemy.speed *= 0.7; // slow effect
          }
          proj.alive = false;
          if (enemy.health <= 0) {
            enemy.alive = false;
          }
          break;
        }
      }
    }
    // Remove dead projectiles
    this.projectiles = this.projectiles.filter(p => p.alive);
  }

  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.map.render(this.ctx);
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
      proj.render(this.ctx);
    }
    // TODO: Render UI overlays, etc.
  }
} 