// SidebarHUD.js
// Renders the sidebar UI (excluding game info, which is now in the top bar)

import { renderTowerSelectionHUD } from './TowerSelectionHUD.js';

export function renderSidebarHUD(game, container) {
  console.log('[SidebarHUD] game.selectedTower:', game.selectedTower);
  container.innerHTML = `
    <style>
      .upgrade-block {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 80px;
        height: 90px;
        margin: 18px auto 0 auto;
        background: rgba(255,255,255,0.08);
        border-radius: 8px;
        box-shadow: 0 2px 8px #0004;
        border: 2px solid #ff5252;
        transition: border 0.2s, background 0.2s;
        cursor: pointer;
        position: relative;
      }
      .upgrade-block.affordable {
        border: 2px solid #2196f3;
        background: rgba(33,150,243,0.10);
      }
      .upgrade-block.unaffordable {
        border: 2px solid #ff5252;
        background: rgba(255,82,82,0.10);
      }
      .upgrade-block .upgrade-label {
        font-size: 1.1em;
        font-weight: bold;
        color: #4fc3f7;
        margin-bottom: 2px;
        letter-spacing: 1px;
        text-align: center;
      }
      .upgrade-block .upgrade-cost {
        font-size: 1em;
        color: #ffe082;
        margin-bottom: 2px;
        text-align: center;
      }
      .upgrade-block .upgrade-level {
        font-size: 0.95em;
        color: #fff;
        margin-bottom: 2px;
        text-align: center;
      }
      .upgrade-block .upgrade-preview {
        width: 36px;
        height: 36px;
        margin: 0 auto 0 auto;
        display: block;
        background: #222;
        border-radius: 6px;
      }
      @media (max-width: 700px) {
        .upgrade-block {
          width: 64px;
          height: 74px;
          margin: 10px auto 0 auto;
        }
        .upgrade-block .upgrade-label {
          font-size: 1em;
        }
        .upgrade-block .upgrade-cost {
          font-size: 0.95em;
        }
        .upgrade-block .upgrade-level {
          font-size: 0.9em;
        }
        .upgrade-block .upgrade-preview {
          width: 28px;
          height: 28px;
        }
      }
    </style>
    ${!game.selectedTower ? `
    <div class=\"hud-section\">\n      <div class=\"hud-title\">Towers</div>\n      <div id=\"tower-selection-hud\"></div>\n    </div>\n    ` : ''}
    <div id=\"hud-upgrade-section\" style=\"display:none;\">\n      <div id=\"upgrade-block\" class=\"upgrade-block\">\n        <div class=\"upgrade-label\">Upgrade</div>\n        <div class=\"upgrade-cost\"></div>\n        <div class=\"upgrade-level\"></div>\n        <canvas class=\"upgrade-preview\" width=\"36\" height=\"36\"></canvas>\n      </div>\n    </div>\n    <div class=\"hud-section\">\n      <div class=\"hud-title\">Missile Silo</div>\n      <div class=\"hud-info\">Fires powerful homing missiles. Upgrades increase range, fire rate, and missile type.</div>\n    </div>\n  `;

  // Render the tower selection HUD
  const towerHudContainer = container.querySelector('#tower-selection-hud');
  if (towerHudContainer && !game.selectedTower) {
    renderTowerSelectionHUD(game, towerHudContainer);
  } else if (towerHudContainer) {
    towerHudContainer.style.display = 'none';
  }

  // Upgrade block logic
  const upgradeSection = container.querySelector('#hud-upgrade-section');
  const upgradeBlock = container.querySelector('#upgrade-block');
  if (upgradeBlock) {
    function updateUpgradeBlock() {
      if (game.selectedTower) {
        upgradeSection.style.display = '';
        const nextLevel = Math.min((game.selectedTower.level || 1) + 1, 5);
        const cost = game.getTowerCost(game.selectedTower.type || game.selectedTower.constructor.name.toLowerCase().replace('tower','')) * (game.selectedTower.level);
        const affordable = game.money >= cost && game.selectedTower.level < 5;
        upgradeBlock.classList.toggle('affordable', affordable);
        upgradeBlock.classList.toggle('unaffordable', !affordable);
        upgradeBlock.querySelector('.upgrade-cost').textContent = game.selectedTower.level < 5 ? `$${cost}` : 'MAX';
        upgradeBlock.querySelector('.upgrade-level').textContent = `Lvl: ${nextLevel}`;
        // Render next level preview
        const previewCanvas = upgradeBlock.querySelector('.upgrade-preview');
        const ctx = previewCanvas.getContext('2d');
        ctx.clearRect(0, 0, previewCanvas.width, previewCanvas.height);
        const TowerClass = game.selectedTower.constructor;
        const dummyMap = { width: 1, height: 1 };
        const previewTower = new TowerClass(0, 0, dummyMap, previewCanvas, []);
        previewTower.level = nextLevel;
        if (typeof previewTower.renderPreview === 'function') {
          previewTower.renderPreview(ctx, 0, 0, true);
        } else if (typeof previewTower.render === 'function') {
          previewTower.render(ctx);
        }
        // Click to upgrade
        upgradeBlock.onclick = () => {
          if (game.selectedTower && game.selectedTower.level < 5 && game.money >= cost) {
            game.money -= cost;
            game.selectedTower.upgrade();
            updateUpgradeBlock();
            if (game.updateUpgradeSection) game.updateUpgradeSection();
          }
        };
      } else {
        upgradeSection.style.display = 'none';
      }
    }
    game.updateUpgradeSection = updateUpgradeBlock;
    updateUpgradeBlock();
  }
} 