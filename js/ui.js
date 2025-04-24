export function setupUI(game) {
  const ui = document.getElementById('ui-container');
  ui.innerHTML = `
    <style>
      .tower-btn { font-weight: bold; color: #fff; border: none; border-radius: 6px; margin: 0 4px; padding: 8px 16px; cursor: pointer; font-size: 1em; transition: box-shadow 0.2s; box-shadow: 0 2px 6px #0006; outline: none; }
      .tower-btn.selected { box-shadow: 0 0 0 3px #fff, 0 2px 6px #0006; }
      .tower-cannon { background: #1e3a8a; }
      .tower-laser { background: #a21caf; }
      .tower-slow { background: #0891b2; }
      #ui-bar { display: flex; align-items: center; gap: 18px; }
      #score, #lives { font-weight: bold; }
      #start-wave { background: #22c55e; color: #fff; border: none; border-radius: 6px; padding: 8px 18px; font-size: 1em; font-weight: bold; margin-left: 16px; cursor: pointer; box-shadow: 0 2px 6px #0006; }
      #start-wave:hover { background: #16a34a; }
    </style>
    <div id="ui-bar">
      <span>Score: <span id="score">0</span></span>
      <span>Lives: <span id="lives">${game.lives}</span></span>
      <span><b>Select Tower:</b>
        <button id="tower-cannon" class="tower-btn tower-cannon">Cannon</button>
        <button id="tower-laser" class="tower-btn tower-laser">Laser</button>
        <button id="tower-slow" class="tower-btn tower-slow">Slow</button>
      </span>
      <button id="start-wave">Start Wave</button>
    </div>
  `;
  function updateSelected() {
    document.querySelectorAll('.tower-btn').forEach(btn => btn.classList.remove('selected'));
    document.getElementById(`tower-${game.selectedTowerType}`).classList.add('selected');
  }
  document.getElementById('start-wave').onclick = () => {
    game.startWave();
  };
  document.getElementById('tower-cannon').onclick = () => {
    game.selectedTowerType = 'cannon';
    updateSelected();
  };
  document.getElementById('tower-laser').onclick = () => {
    game.selectedTowerType = 'laser';
    updateSelected();
  };
  document.getElementById('tower-slow').onclick = () => {
    game.selectedTowerType = 'slow';
    updateSelected();
  };
  // Default selection
  game.selectedTowerType = 'cannon';
  updateSelected();
} 