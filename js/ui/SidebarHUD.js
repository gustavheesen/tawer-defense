// SidebarHUD.js
// Renders the sidebar UI (excluding game info, which is now in the top bar)

import { renderTowerSelectionHUD } from './TowerSelectionHUD.js';

export function renderSidebarHUD(game, container) {
  container.innerHTML = `
    <div class="hud-section">
      <div class="hud-title">Towers</div>
      <div id="tower-selection-hud"></div>
    </div>
    <div class="hud-section" id="hud-upgrade-section" style="display:none;">
      <div class="hud-title">Selected Tower</div>
      <div class="hud-info">Level: <span id="hud-tower-level"></span></div>
      <div class="hud-info">Upgrade Cost: <span id="hud-upgrade-cost"></span></div>
      <button class="hud-btn" id="hud-upgrade-btn">Upgrade</button>
    </div>
    <div class="hud-section">
      <div class="hud-title">Missile Silo</div>
      <div class="hud-info">Fires powerful homing missiles. Upgrades increase range, fire rate, and missile type.</div>
    </div>
  `;

  // Render the tower selection HUD
  const towerHudContainer = container.querySelector('#tower-selection-hud');
  if (towerHudContainer) {
    renderTowerSelectionHUD(game, towerHudContainer);
  }

  // Add upgrade button logic
  const upgradeSection = container.querySelector('#hud-upgrade-section');
  const upgradeBtn = container.querySelector('#hud-upgrade-btn');
  const towerLevelSpan = container.querySelector('#hud-tower-level');
  const upgradeCostSpan = container.querySelector('#hud-upgrade-cost');
  upgradeBtn.onclick = () => {
    if (game.selectedTower && game.selectedTower.level < 5) {
      const cost = game.getTowerCost(game.selectedTower.type || game.selectedTower.constructor.name.toLowerCase().replace('tower','')) * (game.selectedTower.level);
      if (game.money >= cost) {
        game.money -= cost;
        game.selectedTower.upgrade();
        updateUpgradeSection();
      }
    }
  };
  function updateUpgradeSection() {
    if (game.selectedTower) {
      upgradeSection.style.display = '';
      towerLevelSpan.textContent = game.selectedTower.level;
      const cost = game.getTowerCost(game.selectedTower.type || game.selectedTower.constructor.name.toLowerCase().replace('tower','')) * (game.selectedTower.level);
      upgradeCostSpan.textContent = game.selectedTower.level < 5 ? cost : 'MAX';
      upgradeBtn.disabled = game.selectedTower.level >= 5 || game.money < cost;
    } else {
      upgradeSection.style.display = 'none';
    }
  }
  game.updateUpgradeSection = updateUpgradeSection;
} 