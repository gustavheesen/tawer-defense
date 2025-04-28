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
        user-select: none;
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
        user-select: none;
      }
      .tower-preview * {
        user-select: none;
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

  // Helper to check if a point is over the canvas
  function isOverCanvas(x, y) {
    const rect = game.canvas.getBoundingClientRect();
    return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
  }

  let draggedTower = null;
  let dragOffset = { x: 0, y: 0 };
  let isTouch = false;
  let touchActive = false;

  // Helper to get tile position for preview (above finger on mobile)
  function getPreviewPosition(e) {
    if (isTouch && e.touches && e.touches.length > 0) {
      // On mobile, offset preview one tile above finger
      const touch = e.touches[0];
      const rect = game.canvas.getBoundingClientRect();
      const tileSize = Math.min(game.canvas.width / game.mapConfig.width, game.canvas.height / game.mapConfig.height);
      const x = (touch.clientX - rect.left) / (rect.width / game.canvas.width);
      const y = (touch.clientY - rect.top) / (rect.height / game.canvas.height) - tileSize; // 1 tile above
      return { x, y };
    } else if (e.clientX !== undefined) {
      // Desktop: use mouse position
      const rect = game.canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / (rect.width / game.canvas.width);
      const y = (e.clientY - rect.top) / (rect.height / game.canvas.height);
      return { x, y };
    }
    return null;
  }

  container.querySelectorAll('.tower-preview').forEach(preview => {
    preview.addEventListener('mousedown', (e) => {
      isTouch = false;
      const type = preview.dataset.tower;
      const cost = game.getTowerCost(type);
      if (game.money < cost) {
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
      setBodyUserSelect('none');
      e.preventDefault();
    });
    // Touch support
    preview.addEventListener('touchstart', (e) => {
      isTouch = true;
      touchActive = true;
      game.isTouchActive = true;
      const type = preview.dataset.tower;
      const cost = game.getTowerCost(type);
      if (game.money < cost) {
        preview.style.animation = 'shake 0.5s';
        setTimeout(() => preview.style.animation = '', 500);
        return;
      }
      draggedTower = type;
      preview.classList.add('dragging');
      setBodyUserSelect('none');
      game.isDragging = true;
      game.selectedTowerType = type;
      console.log('[touchstart] Dragging tower:', type, 'at', e.touches[0]?.clientX, e.touches[0]?.clientY);
      e.preventDefault();
    }, { passive: false });
  });

  document.addEventListener('mousemove', (e) => {
    if (!draggedTower || isTouch) return;
    game.selectedTowerType = draggedTower;
    game.isDragging = true;
  });
  document.addEventListener('touchmove', (e) => {
    if (!draggedTower || !isTouch) return;
    game.isTouchActive = true;
    if (e.touches && e.touches.length > 0) {
      const touch = e.touches[0];
      if (isOverCanvas(touch.clientX, touch.clientY)) {
        game.isDragging = true;
        game.selectedTowerType = draggedTower;
        // Update touch position in game (for preview)
        const rect = game.canvas.getBoundingClientRect();
        game.touchX = touch.clientX - rect.left;
        game.touchY = touch.clientY - rect.top;
        //console.log('[touchmove] Dragging tower:', draggedTower, 'at', touch.clientX, touch.clientY, 'canvas coords:', game.touchX, game.touchY);
      } else {
        game.touchX = null;
        game.touchY = null;
      }
    }
    e.preventDefault();
  }, { passive: false });

  document.addEventListener('mouseup', () => {
    if (draggedTower && !isTouch) {
      container.querySelector(`.tower-preview[data-tower="${draggedTower}"]`).classList.remove('dragging');
      draggedTower = null;
      game.isDragging = false;
      game.selectedTowerType = null;
      setBodyUserSelect('');
      game.isTouchActive = false;
    }
  });
  document.addEventListener('touchend', (e) => {
    if (draggedTower && isTouch) {
      // Place tower if released over canvas
      if (e.changedTouches && e.changedTouches.length > 0) {
        const touch = e.changedTouches[0];
        console.log('[touchend] Released at', touch.clientX, touch.clientY, 'draggedTower:', draggedTower);
        if (isOverCanvas(touch.clientX, touch.clientY)) {
          // Synthesize a mouse-like event for placement
          const fakeEvent = {
            clientX: touch.clientX,
            clientY: touch.clientY
          };
          console.log('[touchend] Placing tower on canvas at', fakeEvent.clientX, fakeEvent.clientY);
          game.handleTowerPlacement(fakeEvent);
        }
      }
      container.querySelector(`.tower-preview[data-tower="${draggedTower}"]`).classList.remove('dragging');
      draggedTower = null;
      game.isDragging = false;
      game.selectedTowerType = null;
      setBodyUserSelect('');
      touchActive = false;
      game.isTouchActive = false;
    }
  }, { passive: false });

  // Patch Game.renderTowerPreview to use getPreviewPosition for preview location
  const origRenderTowerPreview = game.renderTowerPreview;
  game.renderTowerPreview = function() {
    if (!draggedTower) return origRenderTowerPreview.call(this);
    let pos = null;
    if (isTouch && window.event && window.event.touches && window.event.touches.length > 0) {
      pos = getPreviewPosition(window.event);
    } else if (window.event) {
      pos = getPreviewPosition(window.event);
    }
    if (pos) {
      const tileSize = Math.min(this.canvas.width / this.config.map.width, this.canvas.height / this.config.map.height);
      const tileX = Math.floor(pos.x / tileSize);
      const tileY = Math.floor(pos.y / tileSize);
      const isValidPlacement = !this.pathTiles.has(`${tileX},${tileY}`) && !this.towers.some(t => t.tileX === tileX && t.tileY === tileY);
      const TowerClass = this.TOWER_CLASSES[this.selectedTowerType];
      const previewTower = new TowerClass(tileX, tileY, this.config.map, this.canvas, this.path);
      previewTower.renderPreview(this.ctx, tileX, tileY, isValidPlacement);
      return;
    }
    origRenderTowerPreview.call(this);
  };

  // Prevent text selection on body during drag
  function setBodyUserSelect(value) {
    document.body.style.userSelect = value;
    document.body.style.webkitUserSelect = value;
    document.body.style.msUserSelect = value;
    document.body.style.mozUserSelect = value;
  }
} 