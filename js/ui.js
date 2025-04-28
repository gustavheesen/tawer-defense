//console.log('[ui.js] File loaded/refreshed');
import { renderTowerSelectionHUD } from './ui/TowerSelectionHUD.js';
import { renderGameInfoBar } from './ui/GameInfoBar.js';

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
      /* Layout: top bar, sidebar, canvas */
      body {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        background: #232526;
      }
      #game-info-bar-container {
        width: 100vw;
        z-index: 1000;
        position: fixed;
        top: 0;
        left: 0;
      }
      #main-layout {
        display: flex;
        flex-direction: row;
        width: 100vw;
        min-height: 100vh;
        box-sizing: border-box;
        padding-top: 56px; /* Height of top bar */
      }
      #sidebar {
        width: 150px;
        min-width: 150px;
        max-width: 150px;
        background: rgba(30,32,36,0.98);
        box-shadow: 2px 0 16px #0004;
        z-index: 10;
        padding: 8px 4px;
        box-sizing: border-box;
        position: sticky;
        top: 56px;
        height: calc(100vh - 56px);
        overflow: hidden;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .tower-grid {
        display: flex;
        flex-direction: column;
        gap: 16px;
        align-items: center;
        padding: 12px 0;
        flex-wrap: wrap;
        max-height: 100%;
        overflow: hidden;
      }
      .tower-preview {
        width: 48px !important;
        height: 48px !important;
        margin: 0 0 12px 0;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 8px;
        background: rgba(255,255,255,0.08);
        box-sizing: border-box;
        flex-shrink: 1;
      }
      .tower-preview canvas {
        width: 36px !important;
        height: 36px !important;
        display: block;
      }
      .tower-cost {
        font-size: 0.8em;
        color: #fff;
        margin-top: 4px;
        text-align: center;
      }

      @media (max-width: 700px) {
        #main-layout {
          flex-direction: column;
          padding-top: 48px;
        }
        #sidebar {
          width: 100px;
          min-width: 100px;
          max-width: 100px;
        }
        #game-canvas {
          max-width: 100vw;
          max-height: calc(100vh - 48px);
        }
        .tower-preview {
          width: 32px !important;
          height: 32px !important;
        }
        .tower-preview canvas {
          width: 24px !important;
          height: 24px !important;
        }
        .tower-grid {
          gap: 10px;
          padding: 8px 0;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // Create or get the game info bar container
  let infoBarContainer = document.getElementById('game-info-bar-container');
  if (!infoBarContainer) {
    infoBarContainer = document.createElement('div');
    infoBarContainer.id = 'game-info-bar-container';
    document.body.prepend(infoBarContainer);
  }
  renderGameInfoBar(game, infoBarContainer);

  // Remove debug CSS: do not inject any forced styles
  const ui = document.getElementById('ui-container');
  //console.log('[setupUI] Called with game:', game);
  ui.innerHTML = `
    <div id="ui-bar">
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