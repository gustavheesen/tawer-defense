import { getTileSize } from '../utils.js';

export function renderBossStealthEnemy(enemy, ctx) {
  const tileSize = getTileSize(enemy.canvas, enemy.mapConfig) * 1.3; // Boss is larger
  const px = enemy.x * tileSize + tileSize / 2;
  const py = enemy.y * tileSize + tileSize / 2;
  ctx.save();
  ctx.globalAlpha = 0.35 + 0.15 * Math.sin(Date.now() / 200); // Stealth shimmer
  ctx.translate(px, py);
  // Body (boss color)
  ctx.fillStyle = '#ab47bc';
  ctx.beginPath();
  ctx.arc(0, 0, tileSize * 0.22, 0, 2 * Math.PI);
  ctx.fill();
  // Face
  ctx.fillStyle = '#222';
  ctx.beginPath();
  ctx.arc(-tileSize * 0.06, -tileSize * 0.06, tileSize * 0.03, 0, 2 * Math.PI);
  ctx.arc(tileSize * 0.06, -tileSize * 0.06, tileSize * 0.03, 0, 2 * Math.PI);
  ctx.fill();
  ctx.restore();
  // Health bar
  ctx.save();
  ctx.fillStyle = 'black';
  ctx.fillRect(px - tileSize * 0.28, py - tileSize * 0.44 - 10, tileSize * 0.56, 8);
  ctx.fillStyle = '#ab47bc';
  ctx.fillRect(px - tileSize * 0.28, py - tileSize * 0.44 - 10, tileSize * 0.56 * (enemy.health / enemy.maxHealth), 8);
  ctx.strokeStyle = '#222';
  ctx.strokeRect(px - tileSize * 0.28, py - tileSize * 0.44 - 10, tileSize * 0.56, 8);
  ctx.restore();
} 