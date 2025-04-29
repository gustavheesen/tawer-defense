import { Game } from './game.js';
import { LaserTower } from './towers/laserTower.js';
import { SlowTower } from './towers/slowTower.js';
import { CannonTower } from './towers/cannonTower.js';
import { MissileSilo } from './towers/missileSilo.js';
import { SniperTower } from './towers/sniperTower/sniperTower.js';
import { TrapTowerLevel1 } from './towers/trapTower/trapTowerLevel1.js';
import { setupUI } from './ui.js';
import { renderTowerSelectionHUD } from './ui/TowerSelectionHUD.js';
import { generateRandomPath } from './maps/randomPath.js';
import { loadConfig } from './config.js';
import { renderSidebarHUD } from './ui/SidebarHUD.js';
// import { setupUI } from './ui.js';

const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const modal = document.getElementById('modal-overlay');

let lastGridWidth = 16;
let lastGridHeight = 12;
let previewPath = null;
let previewWidth = 16;
let previewHeight = 12;

window.LaserTower = LaserTower;
window.SlowTower = SlowTower;
window.CannonTower = CannonTower;
window.MissileSilo = MissileSilo;
window.SniperTower = SniperTower;
window.TrapTowerLevel1 = TrapTowerLevel1;

// Register tower classes for selection UI
const TOWER_CLASSES = {
  cannon: CannonTower,
  laser: LaserTower,
  slow: SlowTower,
  missile: MissileSilo,
  sniper: SniperTower,
  trap: TrapTowerLevel1,
};

function showIntroMenu() {
  previewWidth = lastGridWidth;
  previewHeight = lastGridHeight;
  previewPath = generateRandomPath(previewWidth, previewHeight, 'horizontal');
  renderMenu();
}

function renderMenu() {
  modal.style.display = 'flex';
  modal.style.position = 'fixed';
  modal.style.top = '0';
  modal.style.left = '0';
  modal.style.width = '100vw';
  modal.style.height = '100vh';
  modal.style.alignItems = 'center';
  modal.style.justifyContent = 'center';
  modal.style.overflow = 'hidden';
  modal.style.background = 'rgba(30,32,36,0.92)';
  modal.innerHTML = `
    <div id="intro-menu" style="display: flex; flex-direction: row; align-items: stretch; justify-content: center; background:linear-gradient(135deg,#232526 0%,#414345 100%); color:#fff; border-radius: 2vw; box-shadow: 0 8px 48px #000b; min-width: 0; max-width: 80vw; max-height: 80vh; width: 80vw; height: 80vh; box-sizing: border-box; border: 0.4vw solid #4fc3f7; position:relative; overflow: hidden;">
      <div id="menu-map-col" style="flex: 1 1 0; display: flex; align-items: center; justify-content: center; background: none; min-width: 0; padding: 2vw 1vw;">
        <canvas id="map-preview" width="320" height="160" style="background:#222; border-radius:1vw; box-shadow:0 2px 12px #0006; max-width: 32vw; max-height: 60vh; width: 32vw; height: auto;"></canvas>
      </div>
      <div id="menu-controls-col" style="flex: 1 1 0; display: flex; flex-direction: column; align-items: center; justify-content: center; min-width: 0; padding: 2vw 2vw; gap: 2vw;">
        <div style="margin-bottom: 1vw;">
          <span style="font-family: 'Trebuchet MS', Impact, sans-serif; font-size: 2.8vw; letter-spacing: 0.2vw; color: #4fc3f7; text-shadow: 0 2px 12px #000a, 0 0 0 #fff; font-weight: bold; display: inline-block;">
            <span style='color:#fff; text-shadow: 0 2px 12px #4fc3f7;'>TOWER</span> <span style='color:#4fc3f7;'>DEFENSE</span>
          </span>
          <div style="font-size:1.2vw; color:#b3e5fc; margin-top: 0.5vw; letter-spacing:0.1vw;">Build. Defend. Survive.</div>
        </div>
        <button class="menu-btn" id="randomize-btn">Randomize</button>
        <button class="menu-btn" id="start-game-btn">Start Game</button>
        <div id="grid-size-select" style="margin-top: 1vw; display: flex; flex-direction: column; align-items: center; gap: 0.7vw;">
          <label style="font-size:1vw; color:#b3e5fc;">Grid Size: </label>
          <div style="display: flex; gap: 0.7vw; align-items: center;">
            <input id="grid-width" type="number" min="6" max="32" value="${previewWidth}" style="width: 4vw; font-size:1vw; border-radius:0.5vw; border:1px solid #4fc3f7; padding:0.3vw 0.7vw;"> x
            <input id="grid-height" type="number" min="6" max="32" value="${previewHeight}" style="width: 4vw; font-size:1vw; border-radius:0.5vw; border:1px solid #4fc3f7; padding:0.3vw 0.7vw;">
          </div>
          <button class="menu-btn" id="resize-btn" style="margin-top: 0.7vw;">Resize</button>
        </div>
      </div>
    </div>
    <style>
      .menu-btn {
        background: linear-gradient(90deg,#4fc3f7 0%,#1976d2 100%);
        color: #fff;
        font-size: 1.2vw;
        font-family: 'Trebuchet MS', Impact, sans-serif;
        font-weight: bold;
        border: none;
        border-radius: 0.7vw;
        padding: 0.8vw 2vw;
        margin: 0.5vw 0 0 0;
        box-shadow: 0 2px 12px #0006;
        cursor: pointer;
        transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
        outline: none;
        letter-spacing: 0.1vw;
        width: 100%;
        max-width: 220px;
        min-width: 80px;
      }
      .menu-btn:hover, .menu-btn:focus {
        background: linear-gradient(90deg,#1976d2 0%,#4fc3f7 100%);
        color: #fff;
        transform: translateY(-0.1vw) scale(1.03);
        box-shadow: 0 6px 24px #1976d2cc;
      }
      #intro-menu input[type=number]:focus {
        border: 0.3vw solid #1976d2;
        outline: none;
      }
      @media (max-width: 900px) {
        #intro-menu {
          flex-direction: column;
          max-width: 98vw;
          max-height: 98vh;
          width: 98vw;
          height: auto;
          padding: 2vw 1vw;
        }
        #menu-map-col {
          padding: 2vw 0.5vw;
        }
        #menu-controls-col {
          padding: 2vw 1vw;
        }
        .menu-btn {
          font-size: 2.5vw;
          padding: 1vw 2vw;
        }
      }
      @media (max-width: 700px) {
        #intro-menu {
          flex-direction: column;
          max-width: 100vw;
          max-height: 100vh;
          width: 100vw;
          height: auto;
          padding: 1vw 0.5vw;
        }
        #menu-map-col {
          padding: 1vw 0.2vw;
        }
        #menu-controls-col {
          padding: 1vw 0.5vw;
        }
        .menu-btn {
          font-size: 3vw;
          padding: 1vw 2vw;
        }
        #map-preview {
          max-width: 98vw;
          max-height: 18vh;
          width: 98vw;
          height: auto;
        }
      }
    </style>
  `;
  drawMapPreview();
  document.getElementById('randomize-btn').onclick = () => {
    previewPath = generateRandomPath(previewWidth, previewHeight, 'horizontal');
    drawMapPreview();
  };
  document.getElementById('start-game-btn').onclick = () => {
    lastGridWidth = previewWidth;
    lastGridHeight = previewHeight;
    hideModal();
    startGameWithPath('random', previewWidth, previewHeight, previewPath);
  };
  document.getElementById('resize-btn').onclick = () => {
    previewWidth = parseInt(document.getElementById('grid-width').value, 10);
    previewHeight = parseInt(document.getElementById('grid-height').value, 10);
    previewPath = generateRandomPath(previewWidth, previewHeight, 'horizontal');
    renderMenu();
  };
}

function drawMapPreview() {
  const canvas = document.getElementById('map-preview');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const w = previewWidth;
  const h = previewHeight;
  const tileW = canvas.width / w;
  const tileH = canvas.height / h;
  // Draw grid
  ctx.strokeStyle = '#444';
  ctx.lineWidth = 1;
  for (let x = 0; x <= w; x++) {
    ctx.beginPath();
    ctx.moveTo(x * tileW, 0);
    ctx.lineTo(x * tileW, canvas.height);
    ctx.stroke();
  }
  for (let y = 0; y <= h; y++) {
    ctx.beginPath();
    ctx.moveTo(0, y * tileH);
    ctx.lineTo(canvas.width, y * tileH);
    ctx.stroke();
  }
  // Draw path
  if (previewPath && previewPath.length > 1) {
    ctx.strokeStyle = '#ffe082';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(
      previewPath[0].x * tileW + tileW / 2,
      previewPath[0].y * tileH + tileH / 2
    );
    for (let i = 1; i < previewPath.length; i++) {
      ctx.lineTo(
        previewPath[i].x * tileW + tileW / 2,
        previewPath[i].y * tileH + tileH / 2
      );
    }
    ctx.stroke();
    // Draw start/end
    ctx.fillStyle = '#4fc3f7';
    ctx.beginPath();
    ctx.arc(
      previewPath[0].x * tileW + tileW / 2,
      previewPath[0].y * tileH + tileH / 2,
      Math.min(tileW, tileH) * 0.3,
      0,
      2 * Math.PI
    );
    ctx.fill();
    ctx.fillStyle = '#ff8f00';
    ctx.beginPath();
    ctx.arc(
      previewPath[previewPath.length - 1].x * tileW + tileW / 2,
      previewPath[previewPath.length - 1].y * tileH + tileH / 2,
      Math.min(tileW, tileH) * 0.3,
      0,
      2 * Math.PI
    );
    ctx.fill();
  }
}

function hideModal() {
  modal.style.display = 'none';
  modal.innerHTML = '';
}

// Utility to resize canvas to match its displayed size (CSS pixels)
function resizeCanvasToDisplaySize(canvas) {
  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  const width = Math.round(rect.width * dpr);
  const height = Math.round(rect.height * dpr);
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
    return true;
  }
  return false;
}

function startGameWithPath(mode, width, height, pathOverride) {
  let path = pathOverride;
  if (mode === 'random' && !path) {
    path = generateRandomPath(width, height, 'horizontal');
  }
  // Ensure canvas matches display size before starting game
  resizeCanvasToDisplaySize(canvas);
  // TODO: For 'draw', implement custom path drawing UI
  const config = { ...loadConfig(), map: { width, height } };
  const game = new Game(canvas, ctx, config, path);
  setupUI(game);
  renderSidebarHUD(game, document.getElementById('sidebar'));
  // Render the tower selection HUD in the sidebar
  const towerHudContainer = document.getElementById('tower-selection-hud');
  if (towerHudContainer) {
    renderTowerSelectionHUD(game, towerHudContainer);
    //console.log('[main.js] Rendered tower selection HUD in sidebar');
  }
  game.start(); 
  window.currentGame = game;
}

// Also update canvas size on window resize
window.addEventListener('resize', () => {
  resizeCanvasToDisplaySize(canvas);
});

showIntroMenu(); 

// Add tower selection logic to canvas click
const origHandleCanvasClick = Game.prototype.handleCanvasClick;
Game.prototype.handleCanvasClick = function(event) {
  // Only handle genuine mouse clicks (not touch or synthetic events)
  if (event.pointerType === 'touch' || event.type === 'touchend' || event.isSynthetic) {
    return;
  }
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
    if (typeof window.updateSidebarHUD === 'function') window.updateSidebarHUD(this, this.score, this.lives, this.currentWave, this.money);
    // Patch: Always update sidebar HUD after selection
    if (typeof renderSidebarHUD === 'function') {
      console.log('[main.js] Calling renderSidebarHUD after selecting tower');
      renderSidebarHUD(this, document.getElementById('sidebar'));
    }
    return;
  }
  if (this.selectedTower) {
    console.log('[Tower Selection] Deselected tower');
  }
  this.selectedTower = null;
  if (this.updateUpgradeSection) this.updateUpgradeSection();
  if (typeof window.updateSidebarHUD === 'function') window.updateSidebarHUD(this, this.score, this.lives, this.currentWave, this.money);
  // Patch: Always update sidebar HUD after deselection
  if (typeof renderSidebarHUD === 'function') {
    console.log('[main.js] Calling renderSidebarHUD after deselecting tower');
    renderSidebarHUD(this, document.getElementById('sidebar'));
  }
  // Otherwise, place tower as normal
  origHandleCanvasClick.call(this, event);
};

// Highlight selected tower in render
const origRender = Game.prototype.render;
Game.prototype.render = function() {
  if (this.selectedTower) {
    const ctx = this.ctx;
    const tileSize = Math.min(this.canvas.width / this.config.map.width, this.canvas.height / this.config.map.height);
    const cx = this.selectedTower.tileX * tileSize + tileSize / 2;
    const cy = this.selectedTower.tileY * tileSize + tileSize / 2;
    // Soft, bright-in-the-middle glow behind the tower
    const gradient = ctx.createRadialGradient(cx, cy, tileSize * 0.1, cx, cy, tileSize * 0.7);
    gradient.addColorStop(0, 'rgba(255, 224, 130, 0.85)'); // bright center
    gradient.addColorStop(1, 'rgba(255, 224, 130, 0)');    // fade out
    ctx.save();
    ctx.globalAlpha = 1.0;
    ctx.beginPath();
    ctx.arc(cx, cy, tileSize * 0.7, 0, 2 * Math.PI);
    ctx.fillStyle = gradient;
    ctx.fill();
    ctx.restore();
  }
  origRender.call(this);
};

// Patch Game to use TOWER_CLASSES
Game.prototype.TOWER_CLASSES = TOWER_CLASSES; 