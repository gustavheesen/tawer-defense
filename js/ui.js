//console.log('[ui.js] File loaded/refreshed');
import { renderTowerSelectionHUD } from './ui/TowerSelectionHUD.js';

export function setupUI(game) {
  // Inject global CSS to prevent text selection and improve sidebar responsiveness
  if (!document.getElementById('global-ui-style')) {
    const style = document.createElement('style');
    style.id = 'global-ui-style';
    style.innerHTML = `
      /* Prevent text selection everywhere */
      body, #ui-container, #ui-bar, #modal-overlay, .tower-grid, .tower-preview, .tower-preview *, .tower-cost, .hud, .sidebar, .sidebar * {
        user-select: none !important;
        -webkit-user-select: none !important;
        -ms-user-select: none !important;
        -moz-user-select: none !important;
      }
      /* Responsive sidebar for mobile landscape */
      #ui-bar {
        box-sizing: border-box;
        max-width: 100vw;
        width: 100%;
        min-width: 0;
        padding: 8px 4px;
        font-size: 1em;
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        justify-content: space-between;
        align-items: center;
      }
      @media (max-width: 700px) and (orientation: landscape) {
        #ui-bar {
          font-size: 0.9em;
          padding: 4px 2px;
          gap: 4px;
          min-width: 0;
          max-width: 100vw;
        }
        #ui-container {
          width: 100vw;
          min-width: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }
  // Remove debug CSS: do not inject any forced styles
  const ui = document.getElementById('ui-container');
  //console.log('[setupUI] Called with game:', game);
  ui.innerHTML = `
    <div id="ui-bar">
      <span>Score: <span id="score">0</span></span>
      <span>Lives: <span id="lives">${game.lives}</span></span>
      <button id="start-wave">Start Wave</button>
    </div>
  `;
  //console.log('[setupUI] Rendered UI bar');

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