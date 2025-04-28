console.log('[ui.js] File loaded/refreshed');
import { renderTowerSelectionHUD } from './ui/TowerSelectionHUD.js';

export function setupUI(game) {
  // DEBUG: Force #ui-container to be visible and on top
  const style = document.createElement('style');
  style.innerHTML = `
    #ui-container {
      position: absolute !important;
      top: 20px !important;
      left: 220px !important;
      z-index: 9999 !important;
      background: rgba(0,0,0,0.7) !important;
      border: 3px solid yellow !important;
      color: #fff !important;
      min-width: 200px !important;
      min-height: 200px !important;
      pointer-events: auto !important;
    }
  `;
  document.head.appendChild(style);

  const ui = document.getElementById('ui-container');
  console.log('[setupUI] Called with game:', game);
  ui.innerHTML = `
    <style>
      .tower-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
        padding: 10px;
        background: rgba(0, 0, 0, 0.5);
        border-radius: 8px;
        margin: 10px 0;
      }
      .tower-preview {
        width: 60px;
        height: 60px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 6px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        cursor: grab;
        position: relative;
        transition: transform 0.2s;
      }
      .tower-preview:hover {
        transform: scale(1.05);
      }
      .tower-preview.dragging {
        cursor: grabbing;
        opacity: 0.8;
      }
      .tower-preview canvas {
        width: 40px;
        height: 40px;
      }
      .tower-cost {
        font-size: 0.8em;
        color: #fff;
        margin-top: 4px;
      }
      #ui-bar {
        display: flex;
        align-items: center;
        gap: 18px;
      }
      #score, #lives {
        font-weight: bold;
      }
      #start-wave {
        background: #22c55e;
        color: #fff;
        border: none;
        border-radius: 6px;
        padding: 8px 18px;
        font-size: 1em;
        font-weight: bold;
        margin-left: 16px;
        cursor: pointer;
        box-shadow: 0 2px 6px #0006;
      }
      #start-wave:hover {
        background: #16a34a;
      }
    </style>
    <div id="ui-bar">
      <span>Score: <span id="score">0</span></span>
      <span>Lives: <span id="lives">${game.lives}</span></span>
      <div class="tower-grid">
        <div class="tower-preview" data-tower="cannon">
          <canvas id="cannon-preview"></canvas>
          <div class="tower-cost">$100</div>
        </div>
        <div class="tower-preview" data-tower="laser">
          <canvas id="laser-preview"></canvas>
          <div class="tower-cost">$150</div>
        </div>
        <div class="tower-preview" data-tower="slow">
          <canvas id="slow-preview"></canvas>
          <div class="tower-cost">$200</div>
        </div>
        <div class="tower-preview" data-tower="missile">
          <canvas id="missile-preview"></canvas>
          <div class="tower-cost">$300</div>
        </div>
      </div>
      <button id="start-wave">Start Wave</button>
    </div>
  `;
  console.log('[setupUI] Rendered UI bar');

  // Create preview canvases
  const previews = {
    cannon: document.getElementById('cannon-preview'),
    laser: document.getElementById('laser-preview'),
    slow: document.getElementById('slow-preview'),
    missile: document.getElementById('missile-preview')
  };

  // Set up preview canvases
  Object.entries(previews).forEach(([type, canvas]) => {
    canvas.width = 40;
    canvas.height = 40;
    const ctx = canvas.getContext('2d');
    const TowerClass = game.TOWER_CLASSES[type];
    const previewTower = new TowerClass(0, 0, game.config.map, canvas, game.path);
    previewTower.render(ctx);
  });

  // Set up drag and drop
  let draggedTower = null;
  let dragOffset = { x: 0, y: 0 };

  document.querySelectorAll('.tower-preview').forEach(preview => {
    preview.addEventListener('mousedown', (e) => {
      const type = preview.dataset.tower;
      const cost = game.getTowerCost(type);
      if (game.money < cost) {
        // Show feedback that player can't afford
        preview.style.animation = 'shake 0.5s';
        setTimeout(() => preview.style.animation = '', 500);
        return;
      }

      draggedTower = type;
      preview.classList.add('dragging');
      dragOffset = {
        x: e.clientX - preview.getBoundingClientRect().left,
        y: e.clientY - preview.getBoundingClientRect().top
      };
    });
  });

  document.addEventListener('mousemove', (e) => {
    if (!draggedTower) return;
    game.selectedTowerType = draggedTower;
    game.isDragging = true;
  });

  document.addEventListener('mouseup', () => {
    if (draggedTower) {
      document.querySelector(`.tower-preview[data-tower="${draggedTower}"]`).classList.remove('dragging');
      draggedTower = null;
      game.isDragging = false;
      game.selectedTowerType = null;
    }
  });

  document.getElementById('start-wave').onclick = () => {
    game.startWave();
  };
}

export function showGameOverScreen() {
  const overlay = document.getElementById('modal-overlay');
  overlay.innerHTML = `
    <div style="
      background: linear-gradient(135deg, #232526 0%, #414345 100%);
      padding: 56px 80px;
      border-radius: 28px;
      box-shadow: 0 12px 48px #000b;
      text-align: center;
      color: #fff;
      display: flex;
      flex-direction: column;
      align-items: center;
      min-width: 340px;
      border: 4px solid #ff5252;
    ">
      <h1 style="font-size: 3.5em; margin-bottom: 0.3em; letter-spacing: 2px; color: #ff5252; text-shadow: 0 2px 16px #000a;">Game Over</h1>
      <div style="font-size: 1.3em; color: #ffe082; margin-bottom: 2em;">You ran out of lives!</div>
      <button id="restart-btn" style="
        font-size: 1.5em;
        padding: 18px 48px;
        border-radius: 12px;
        border: none;
        background: linear-gradient(90deg,#ff5252 0%,#ff1744 100%);
        color: #fff;
        cursor: pointer;
        font-weight: bold;
        box-shadow: 0 4px 18px #0006;
        letter-spacing: 1px;
        transition: background 0.2s, transform 0.15s;
      ">Restart</button>
    </div>
  `;
  overlay.style.display = 'flex';
  overlay.style.justifyContent = 'center';
  overlay.style.alignItems = 'center';
  document.getElementById('restart-btn').onclick = () => {
    window.location.reload();
  };
}

window.showGameOverScreen = showGameOverScreen; 