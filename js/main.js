import { Game } from './game.js';
import { setupUI } from './ui.js';
import { generateRandomPath } from './maps/randomPath.js';

const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const modal = document.getElementById('modal-overlay');

let lastGridWidth = 16;
let lastGridHeight = 12;
let previewPath = null;
let previewWidth = 16;
let previewHeight = 12;

function showIntroMenu() {
  previewWidth = lastGridWidth;
  previewHeight = lastGridHeight;
  previewPath = generateRandomPath(previewWidth, previewHeight, 'horizontal');
  renderMenu();
}

function renderMenu() {
  modal.style.display = 'flex';
  modal.innerHTML = `
    <div id="intro-menu" style="background:linear-gradient(135deg,#232526 0%,#414345 100%); color:#fff; padding: 40px 56px; border-radius: 22px; box-shadow: 0 8px 48px #000b; text-align: center; min-width: 340px; border: 3px solid #4fc3f7; position:relative;">
      <div style="margin-bottom: 24px;">
        <span style="font-family: 'Trebuchet MS', Impact, sans-serif; font-size: 2.7em; letter-spacing: 2px; color: #4fc3f7; text-shadow: 0 2px 12px #000a, 0 0 0 #fff; font-weight: bold; display: inline-block;">
          <span style='color:#fff; text-shadow: 0 2px 12px #4fc3f7;'>TOWER</span> <span style='color:#4fc3f7;'>DEFENSE</span>
        </span>
        <div style="font-size:1.1em; color:#b3e5fc; margin-top: 6px; letter-spacing:1px;">Build. Defend. Survive.</div>
      </div>
      <div id="preview-area" style="margin: 0 auto 18px auto; display: flex; flex-direction: column; align-items: center;">
        <canvas id="map-preview" width="320" height="240" style="background:#222; border-radius:12px; box-shadow:0 2px 12px #0006; margin-bottom: 10px;"></canvas>
        <div>
          <button class="menu-btn" id="randomize-btn">Randomize</button>
          <button class="menu-btn" id="start-game-btn">Start Game</button>
        </div>
      </div>
      <div id="grid-size-select" style="margin-top: 28px;">
        <label style="font-size:1.1em; color:#b3e5fc;">Grid Size: </label>
        <input id="grid-width" type="number" min="6" max="32" value="${previewWidth}" style="width: 60px; font-size:1.1em; border-radius:6px; border:1px solid #4fc3f7; padding:2px 6px;"> x
        <input id="grid-height" type="number" min="6" max="32" value="${previewHeight}" style="width: 60px; font-size:1.1em; border-radius:6px; border:1px solid #4fc3f7; padding:2px 6px;">
        <button class="menu-btn" id="resize-btn" style="margin-left: 16px;">Resize</button>
      </div>
    </div>
    <style>
      .menu-btn {
        background: linear-gradient(90deg,#4fc3f7 0%,#1976d2 100%);
        color: #fff;
        font-size: 1.25em;
        font-family: 'Trebuchet MS', Impact, sans-serif;
        font-weight: bold;
        border: none;
        border-radius: 10px;
        padding: 14px 36px;
        margin: 12px 18px 0 18px;
        box-shadow: 0 2px 12px #0006;
        cursor: pointer;
        transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
        outline: none;
        letter-spacing: 1px;
      }
      .menu-btn:hover, .menu-btn:focus {
        background: linear-gradient(90deg,#1976d2 0%,#4fc3f7 100%);
        color: #fff;
        transform: translateY(-2px) scale(1.04);
        box-shadow: 0 6px 24px #1976d2cc;
      }
      #intro-menu input[type=number]:focus {
        border: 2px solid #1976d2;
        outline: none;
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
  const config = { ...Game.defaultConfig, map: { width, height } };
  const game = new Game(canvas, ctx, config, path);
  setupUI(game);
  setupSidebar(game);
  game.start();
  window.currentGame = game;
}

function setupSidebar(game) {
  const sidebar = document.getElementById('sidebar');
  sidebar.innerHTML = `
    <div class="hud-section">
      <div class="hud-title">Game Info</div>
      <div class="hud-info">Score: <span id="hud-score">0</span></div>
      <div class="hud-info">Lives: <span id="hud-lives">${game.lives}</span></div>
      <div class="hud-info">Wave: <span id="hud-wave">1</span></div>
    </div>
    <div class="hud-section">
      <div class="hud-title">Towers</div>
      <button class="hud-btn" id="hud-tower-cannon">Cannon</button>
      <button class="hud-btn" id="hud-tower-laser">Laser</button>
      <button class="hud-btn" id="hud-tower-slow">Slow</button>
      <button class="hud-btn" id="hud-start-wave">Start Wave</button>
    </div>
  `;
  document.getElementById('hud-tower-cannon').onclick = () => {
    game.selectedTowerType = 'cannon';
    updateTowerSelection();
  };
  document.getElementById('hud-tower-laser').onclick = () => {
    game.selectedTowerType = 'laser';
    updateTowerSelection();
  };
  document.getElementById('hud-tower-slow').onclick = () => {
    game.selectedTowerType = 'slow';
    updateTowerSelection();
  };
  document.getElementById('hud-start-wave').onclick = () => {
    game.startWave();
  };
  function updateTowerSelection() {
    ['cannon','laser','slow'].forEach(type => {
      document.getElementById('hud-tower-' + type).classList.remove('selected');
    });
    document.getElementById('hud-tower-' + game.selectedTowerType).classList.add('selected');
  }
  updateTowerSelection();
}

function updateSidebarHUD(game, score, lives, wave) {
  const s = document.getElementById('hud-score');
  const l = document.getElementById('hud-lives');
  const w = document.getElementById('hud-wave');
  if (s) s.textContent = score;
  if (l) l.textContent = lives;
  if (w) w.textContent = wave;
}

window.updateSidebarHUD = updateSidebarHUD;

// Also update canvas size on window resize
window.addEventListener('resize', () => {
  resizeCanvasToDisplaySize(canvas);
});

showIntroMenu(); 