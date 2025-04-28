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
import { MissileSilo } from './towers/missileSilo.js';
import { ClusterMissileProjectile } from './projectiles/clusterMissileProjectile.js';
import { EMPMissileProjectile } from './projectiles/empMissileProjectile.js';
import { updateGameInfoBar } from './ui/GameInfoBar.js';
import { renderSidebarHUD } from './ui/SidebarHUD.js';
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
  slow: SlowTower,
  missile: MissileSilo
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
    this.money = this.config.startingMoney;
    this.running = false;
    this.lastTimestamp = 0;
    this.pathTiles = getPathTiles(this.path);
    this.selectedTowerType = null;
    this.isDragging = false;
    this.currentWave = 1;
    this.TOWER_CLASSES = TOWER_CLASSES;
    
    // Track mouse position
    this.mouseX = 0;
    this.mouseY = 0;
    this.touchX = null;
    this.touchY = null;
    this.isTouchActive = false;
    this.canvas.addEventListener('mousemove', (event) => {
      this.isTouchActive = false;
      const rect = this.canvas.getBoundingClientRect();
      this.mouseX = event.clientX - rect.left;
      this.mouseY = event.clientY - rect.top;
    });
    // Add mouseup listener for tower placement (desktop)
    this.canvas.addEventListener('mouseup', (event) => {
      if (!this.isTouchActive && this.isDragging && this.selectedTowerType) {
        this.handleTowerPlacement(event);
      }
    });
    // Track touch position for mobile drag
    this.canvas.addEventListener('touchmove', (event) => {
      this.isTouchActive = true;
      if (event.touches && event.touches.length > 0) {
        const rect = this.canvas.getBoundingClientRect();
        this.touchX = event.touches[0].clientX - rect.left;
        this.touchY = event.touches[0].clientY - rect.top;
        //console.log('[touchmove] touchX:', this.touchX, 'touchY:', this.touchY, 'canvas rect:', rect.left, rect.top, rect.width, rect.height);
        this.render(); // Force re-render so preview updates
      }
    }, { passive: false });
    // Add touchstart listener for tower selection (separate from drag/placement)
    this.canvas.addEventListener('touchstart', (event) => {
      if (this.isDragging) return; // Don't select while dragging
      // No selection logic here; selection will happen on touchend
    }, { passive: false });
    // Add touchend listener for tower selection/deselection
    this.canvas.addEventListener('touchend', (event) => {
      if (this.isDragging) return; // Don't select while dragging
      if (event.changedTouches && event.changedTouches.length > 0) {
        const rect = this.canvas.getBoundingClientRect();
        const scaleX = this.canvas.width / rect.width;
        const scaleY = this.canvas.height / rect.height;
        const x = (event.changedTouches[0].clientX - rect.left) * scaleX;
        const y = (event.changedTouches[0].clientY - rect.top) * scaleY;
        const tileSize = Math.min(this.canvas.width / this.config.map.width, this.canvas.height / this.config.map.height);
        const tileX = Math.floor(x / tileSize);
        const tileY = Math.floor(y / tileSize);
        // Check if touching a tower
        const clickedTower = this.towers.find(t => t.tileX === tileX && t.tileY === tileY);
        if (clickedTower) {
          this.selectedTower = clickedTower;
          if (this.updateUpgradeSection) this.updateUpgradeSection();
          console.log('[Tower Selection] (touchend) Selected tower at', tileX, tileY, clickedTower);
          if (typeof renderSidebarHUD === 'function') {
            console.log('[game.js] Calling renderSidebarHUD after selecting tower (touch)');
            renderSidebarHUD(this, document.getElementById('sidebar'));
          }
        } else {
          if (this.selectedTower) {
            console.log('[Tower Selection] (touchend) Deselected tower');
          }
          this.selectedTower = null;
          if (this.updateUpgradeSection) this.updateUpgradeSection();
          if (typeof renderSidebarHUD === 'function') {
            console.log('[game.js] Calling renderSidebarHUD after deselecting tower (touch)');
            renderSidebarHUD(this, document.getElementById('sidebar'));
          }
        }
      }
    }, { passive: false });
    // Add click listener for tower selection
    this.canvas.addEventListener('click', this.handleCanvasClick.bind(this));
  }

  getTowerCost(type) {
    switch(type) {
      case 'cannon': return 50;
      case 'laser': return 80;
      case 'slow': return 60;
      case 'missile': return 120;
      default: return 50;
    }
  }

  handleTowerPlacement(event) {
    const rect = this.canvas.getBoundingClientRect();
    const scaleX = this.canvas.width / rect.width;
    const scaleY = this.canvas.height / rect.height;
    let x = (event.clientX - rect.left) * scaleX;
    let y = (event.clientY - rect.top) * scaleY;
    const tileSize = Math.min(this.canvas.width / this.config.map.width, this.canvas.height / this.config.map.height);
    // If touch, place one tile above finger (to match preview)
    if (this.isTouchActive) {
      y -= tileSize;
    }
    const tileX = Math.floor(x / tileSize);
    const tileY = Math.floor(y / tileSize);

    // Check if placement is valid
    if (this.pathTiles.has(`${tileX},${tileY}`)) {
      //console.log('Cannot place tower on path');
      return;
    }
    if (this.towers.some(t => t.tileX === tileX && t.tileY === tileY)) {
      //console.log('Cannot place tower on another tower');
      return;
    }

    // Check if player can afford the tower
    const cost = this.getTowerCost(this.selectedTowerType);
    if (this.money < cost) {
      //console.log('Not enough money');
      return;
    }

    // Place the tower
    this.money -= cost;
    const TowerClass = this.TOWER_CLASSES[this.selectedTowerType];
    this.towers.push(new TowerClass(tileX, tileY, this.config.map, this.canvas, this.path));
    updateGameInfoBar(this);
  }

  start() {
    this.running = true;
    requestAnimationFrame(this.loop.bind(this));
  }

  startWave() {
    const wave = this.currentWave;
    // Increase enemy counts and health per wave
    const tankCount = 2 + Math.floor(wave / 2);
    const infantryCount = 3 + wave;
    const spiderCount = 2 + Math.floor(wave / 3);
    const bomberCount = 2 + Math.floor(wave / 4);
    const ghostCount = 2 + Math.floor(wave / 5);
    const splitterCount = 2 + Math.floor(wave / 4);
    const shieldedCount = 2 + Math.floor(wave / 6);
    const regenCount = 2 + Math.floor(wave / 6);
    const armoredCount = 2 + Math.floor(wave / 7);
    const healerCount = 2 + Math.floor(wave / 8);
    const speedBurstCount = 2 + Math.floor(wave / 5);
    const stealthCount = 2 + Math.floor(wave / 6);
    const empCount = 1 + Math.floor(wave / 10);
    let delay = 0;
    for (let i = 0; i < tankCount; i++) {
      setTimeout(() => {
        this.enemies.push(new TankEnemy(this.path, this.config.map, this.canvas));
      }, delay); delay += 900;
    }
    for (let i = 0; i < infantryCount; i++) {
      setTimeout(() => {
        this.enemies.push(new InfantryEnemy(this.path, this.config.map, this.canvas));
      }, delay); delay += 500;
    }
    for (let i = 0; i < spiderCount; i++) {
      setTimeout(() => {
        this.enemies.push(new SpiderEnemy(this.path, this.config.map, this.canvas));
      }, delay); delay += 350;
    }
    for (let i = 0; i < bomberCount; i++) {
      setTimeout(() => {
        this.enemies.push(new BomberEnemy(this.path, this.config.map, this.canvas));
      }, delay); delay += 1100;
    }
    for (let i = 0; i < ghostCount; i++) {
      setTimeout(() => {
        this.enemies.push(new GhostEnemy(this.path, this.config.map, this.canvas));
      }, delay); delay += 700;
    }
    for (let i = 0; i < splitterCount; i++) {
      setTimeout(() => {
        this.enemies.push(new SplitterEnemy(this.path, this.config.map, this.canvas));
      }, delay); delay += 900;
    }
    for (let i = 0; i < shieldedCount; i++) {
      setTimeout(() => {
        this.enemies.push(new ShieldedEnemy(this.path, this.config.map, this.canvas));
      }, delay); delay += 800;
    }
    for (let i = 0; i < regenCount; i++) {
      setTimeout(() => {
        this.enemies.push(new RegeneratingEnemy(this.path, this.config.map, this.canvas));
      }, delay); delay += 900;
    }
    for (let i = 0; i < armoredCount; i++) {
      setTimeout(() => {
        this.enemies.push(new ArmoredEnemy(this.path, this.config.map, this.canvas));
      }, delay); delay += 950;
    }
    for (let i = 0; i < healerCount; i++) {
      setTimeout(() => {
        this.enemies.push(new HealerEnemy(this.path, this.config.map, this.canvas));
      }, delay); delay += 1000;
    }
    for (let i = 0; i < speedBurstCount; i++) {
      setTimeout(() => {
        this.enemies.push(new SpeedBurstEnemy(this.path, this.config.map, this.canvas));
      }, delay); delay += 600;
    }
    for (let i = 0; i < stealthCount; i++) {
      setTimeout(() => {
        this.enemies.push(new StealthEnemy(this.path, this.config.map, this.canvas));
      }, delay); delay += 800;
    }
    for (let i = 0; i < empCount; i++) {
      setTimeout(() => {
        this.enemies.push(new EMPEnemy(this.path, this.config.map, this.canvas));
      }, delay); delay += 1500;
    }
    updateGameInfoBar(this);
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
    const before = this.enemies.length;
    // Only count as killed if NOT reachedEnd
    const killedEnemies = this.enemies.filter(e => !e.alive && !e.reachedEnd);
    const reachedEndEnemies = this.enemies.filter(e => !e.alive && e.reachedEnd);
    this.enemies = this.enemies.filter(e => e.alive);
    const killed = killedEnemies.length;
    const reachedEnd = reachedEndEnemies.length;
    if (killed > 0) {
      this.money += killed * 10; // +10 per kill
    }
    if (reachedEnd > 0) {
      this.lives -= reachedEnd;
      if (this.lives <= 0) {
        this.running = false;
        if (typeof window.showGameOverScreen === 'function') window.showGameOverScreen();
      }
    }
    // If all enemies are gone and no more are spawning, start next wave
    if (this.enemies.length === 0 && this.running) {
      this.currentWave++;
      this.startWave();
    }
    // Add new enemies (from splitting)
    this.enemies.push(...newEnemies);
    // Update projectiles
    for (const proj of this.projectiles) {
      if (proj instanceof ClusterMissileProjectile) {
        proj.update(delta, this.enemies, this.projectiles);
      } else if (proj instanceof EMPMissileProjectile) {
        proj.update(delta, this.enemies);
      } else {
        proj.update(delta, this.enemies);
      }
    }
    // Remove dead projectiles
    this.projectiles = this.projectiles.filter(p => p.alive);
    updateGameInfoBar(this);
  }

  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.map.render(this.ctx);
    
    // Render towers
    for (const tower of this.towers) {
      tower.render(this.ctx, tower === this.selectedTower);
    }
    
    // Render enemies
    for (const enemy of this.enemies) {
      enemy.render(this.ctx);
    }
    
    // Render projectiles
    const tileSize = getTileSize(this.canvas, this.config.map);
    for (const proj of this.projectiles) {
      proj.render(this.ctx, tileSize, this.canvas, this.config.map);
    }
    
    // Render tower preview if dragging
    if (this.isDragging && this.selectedTowerType) {
      this.renderTowerPreview();
    }
  }

  renderTowerPreview() {
    const rect = this.canvas.getBoundingClientRect();
    const scaleX = this.canvas.width / rect.width;
    const scaleY = this.canvas.height / rect.height;
    let px, py;
    let tileSize = Math.min(this.canvas.width / this.config.map.width, this.canvas.height / this.config.map.height);
    if (this.isTouchActive && this.touchX !== null && this.touchY !== null) {
      // Touch: show preview one tile above finger (fix: only subtract tileSize once)
      px = this.touchX * scaleX;
      py = this.touchY * scaleY - tileSize;
      //console.log('[renderTowerPreview] touch px:', px, 'py:', py, 'tileSize:', tileSize);
    } else {
      // Mouse: show preview under cursor
      px = this.mouseX * scaleX;
      py = this.mouseY * scaleY;
      //console.log('[renderTowerPreview] mouse px:', px, 'py:', py);
    }
    const tileX = Math.floor(px / tileSize);
    const tileY = Math.floor(py / tileSize);
    //console.log('[renderTowerPreview] tileX:', tileX, 'tileY:', tileY, 'isTouchActive:', this.isTouchActive, 'selectedTowerType:', this.selectedTowerType);

    // Check if placement is valid
    const isValidPlacement = !this.pathTiles.has(`${tileX},${tileY}`) && 
                           !this.towers.some(t => t.tileX === tileX && t.tileY === tileY);
    //console.log('[renderTowerPreview] isValidPlacement:', isValidPlacement);

    // Create a temporary tower for preview
    const TowerClass = this.TOWER_CLASSES[this.selectedTowerType];
    const previewTower = new TowerClass(tileX, tileY, this.config.map, this.canvas, this.path);
    previewTower.renderPreview(this.ctx, tileX, tileY, isValidPlacement);
  }
}

// Fix handleCanvasClick TypeError and prevent auto-deselection
const origHandleCanvasClick = Game.prototype.handleCanvasClick;
Game.prototype.handleCanvasClick = function(event) {
  //console.log('[handleCanvasClick] Canvas click event fired', event);
  const rect = this.canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const tileSize = Math.min(this.canvas.width / this.config.map.width, this.canvas.height / this.config.map.height);
  const tileX = Math.floor(x / tileSize);
  const tileY = Math.floor(y / tileSize);
  // Check if clicking on a tower
  const clickedTower = this.towers.find(t => t.tileX === tileX && t.tileY === tileY);
  if (clickedTower) {
    this.selectedTower = clickedTower;
    if (this.updateUpgradeSection) this.updateUpgradeSection();
    console.log('[Tower Selection] Selected tower at', tileX, tileY, clickedTower);
    return;
  }
  if (this.selectedTower) {
    console.log('[Tower Selection] Deselected tower (handleCanvasClick)');
  }
  this.selectedTower = null;
  if (this.updateUpgradeSection) this.updateUpgradeSection();
  // Otherwise, place tower as normal
  if (typeof origHandleCanvasClick === 'function') {
    origHandleCanvasClick.call(this, event);
  }
}; 