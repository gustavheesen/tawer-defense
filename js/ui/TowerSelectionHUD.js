// TowerSelectionHUD.js
// Renders the tower selection grid and handles drag-and-drop logic


export function renderTowerSelectionHUD(game, container) {
  //console.log('[TowerSelectionHUD] Rendering HUD for game:', game);
  container.innerHTML = `
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
        transition: transform 0.2s, border 0.2s, opacity 0.2s;
        border: 2px solid #ff5252 !important; /* Default: red border */
        opacity: 1;
      }
      .tower-preview.affordable {
        border: 2px solid #2196f3 !important; /* Blue border */
        opacity: 1;
      }
      .tower-preview.unaffordable {
        border: 2px solid #ff5252 !important; /* Red border */
        opacity: 0.4;
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
    </style>
    <div class="tower-grid">
      <div class="tower-preview" data-tower="cannon">
        <canvas id="cannon-preview"></canvas>
        <div class="tower-cost">$${game.getTowerCost('cannon')}</div>
      </div>
      <div class="tower-preview" data-tower="laser">
        <canvas id="laser-preview"></canvas>
        <div class="tower-cost">$${game.getTowerCost('laser')}</div>
      </div>
      <div class="tower-preview" data-tower="slow">
        <canvas id="slow-preview"></canvas>
        <div class="tower-cost">$${game.getTowerCost('slow')}</div>
      </div>
      <div class="tower-preview" data-tower="missile">
        <canvas id="missile-preview"></canvas>
        <div class="tower-cost">$${game.getTowerCost('missile')}</div>
      </div>
    </div>
  `;

  // Use each tower's renderPreview method for the HUD preview
  const previewTypes = ['cannon', 'laser', 'slow', 'missile'];
  previewTypes.forEach(type => {
    const canvas = document.getElementById(`${type}-preview`);
    const previewDiv = canvas.parentElement;
    canvas.width = 40;
    canvas.height = 40;
    const ctx = canvas.getContext('2d');
    const TowerClass = game.TOWER_CLASSES[type];
    // Create a dummy tower at (0,0) with a dummy map config and canvas
    const dummyMap = { width: 1, height: 1 };
    const previewTower = new TowerClass(0, 0, dummyMap, canvas, []);
    const cost = game.getTowerCost(type);
    const affordable = game.money >= cost;
    if (affordable) {
      previewDiv.classList.add('affordable');
      previewDiv.classList.remove('unaffordable');
    } else {
      previewDiv.classList.add('unaffordable');
      previewDiv.classList.remove('affordable');
    }
    if (typeof previewTower.renderPreview === 'function') {
      ctx.save();
      if (!affordable) ctx.globalAlpha = 0.4;
      previewTower.renderPreview(ctx, 0, 0, true); // Always valid placement for HUD
      ctx.restore();
    } else {
      ctx.save();
      if (!affordable) ctx.globalAlpha = 0.4;
      previewTower.render(ctx);
      ctx.restore();
    }
  });

  // Set up drag and drop
  let draggedTower = null;
  let dragOffset = { x: 0, y: 0 };

  container.querySelectorAll('.tower-preview').forEach(preview => {
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
      container.querySelector(`.tower-preview[data-tower="${draggedTower}"]`).classList.remove('dragging');
      draggedTower = null;
      game.isDragging = false;
      game.selectedTowerType = null;
    }
  });
} 