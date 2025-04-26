import { Game } from './game.js';
import { setupUI } from './ui.js';

const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const modal = document.getElementById('modal-overlay');

function showIntroMenu() {
  modal.style.display = 'flex';
  modal.innerHTML = `
    <div id="intro-menu" style="background:linear-gradient(135deg,#232526 0%,#414345 100%); color:#fff; padding: 40px 56px; border-radius: 22px; box-shadow: 0 8px 48px #000b; text-align: center; min-width: 340px; border: 3px solid #4fc3f7; position:relative;">
      <div style="margin-bottom: 24px;">
        <span style="font-family: 'Trebuchet MS', Impact, sans-serif; font-size: 2.7em; letter-spacing: 2px; color: #4fc3f7; text-shadow: 0 2px 12px #000a, 0 0 0 #fff; font-weight: bold; display: inline-block;">
          <span style='color:#fff; text-shadow: 0 2px 12px #4fc3f7;'>TOWER</span> <span style='color:#4fc3f7;'>DEFENSE</span>
        </span>
        <div style="font-size:1.1em; color:#b3e5fc; margin-top: 6px; letter-spacing:1px;">Build. Defend. Survive.</div>
      </div>
      <button class="menu-btn" id="random-path-btn">Random Path</button>
      <button class="menu-btn" id="draw-path-btn">Draw Your Own Path</button>
      <div id="grid-size-select" style="margin-top: 28px; display: none;">
        <label style="font-size:1.1em; color:#b3e5fc;">Grid Size: </label>
        <input id="grid-width" type="number" min="6" max="32" value="16" style="width: 60px; font-size:1.1em; border-radius:6px; border:1px solid #4fc3f7; padding:2px 6px;"> x
        <input id="grid-height" type="number" min="6" max="32" value="12" style="width: 60px; font-size:1.1em; border-radius:6px; border:1px solid #4fc3f7; padding:2px 6px;">
        <button class="menu-btn" id="start-draw-btn" style="margin-left: 16px;">Start Drawing</button>
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
  document.getElementById('random-path-btn').onclick = () => {
    hideModal();
    startGameWithPath('random');
  };
  document.getElementById('draw-path-btn').onclick = () => {
    document.getElementById('grid-size-select').style.display = 'block';
  };
  document.getElementById('start-draw-btn').onclick = () => {
    const width = parseInt(document.getElementById('grid-width').value, 10);
    const height = parseInt(document.getElementById('grid-height').value, 10);
    hideModal();
    startGameWithPath('draw', width, height);
  };
}

function hideModal() {
  modal.style.display = 'none';
  modal.innerHTML = '';
}

function startGameWithPath(mode, width, height) {
  // TODO: Implement random path or draw path logic
  // For now, just use default config and path
  const config = { width: width || 16, height: height || 12 };
  // You would generate or let the user draw a path here
  const game = new Game(canvas, ctx); // Pass config/path as needed
  setupUI(game);
  game.start();
}

showIntroMenu(); 