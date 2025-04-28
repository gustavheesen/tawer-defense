// GameInfoBar.js
// Renders the game info (score, lives, wave, money) as a responsive top bar

export function renderGameInfoBar(game, container) {
  if (!document.getElementById('game-info-bar-style')) {
    const style = document.createElement('style');
    style.id = 'game-info-bar-style';
    style.innerHTML = `
      #game-info-bar {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        z-index: 1000;
        background: linear-gradient(90deg, #232526 0%, #414345 100%);
        color: #fff;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 16px;
        font-size: 1.1em;
        box-shadow: 0 2px 12px #0006;
        user-select: none !important;
      }
      #game-info-bar span {
        margin: 0 10px;
        font-weight: 500;
        user-select: none !important;
      }
      @media (max-width: 700px) {
        #game-info-bar {
          font-size: 0.95em;
          padding: 6px 4px;
        }
        #game-info-bar span {
          margin: 0 4px;
        }
      }
      body { padding-top: 48px !important; }
    `;
    document.head.appendChild(style);
  }
  container.innerHTML = `
    <div id="game-info-bar">
      <span>Score: <span id="info-score">${game.score}</span></span>
      <span>Lives: <span id="info-lives">${game.lives}</span></span>
      <span>Wave: <span id="info-wave">${game.currentWave}</span></span>
      <span>Money: <span id="info-money">$${game.money}</span></span>
    </div>
  `;
}

export function updateGameInfoBar(game) {
  const score = document.getElementById('info-score');
  const lives = document.getElementById('info-lives');
  const wave = document.getElementById('info-wave');
  const money = document.getElementById('info-money');
  if (score) score.textContent = game.score;
  if (lives) lives.textContent = game.lives;
  if (wave) wave.textContent = game.currentWave;
  if (money) money.textContent = `$${game.money}`;
} 