import { getTileSize } from '../utils.js';

export function renderBossHealerEnemy(enemy, ctx) {
  const tileSize = getTileSize(enemy.canvas, enemy.mapConfig) * 1.3; // Boss is larger
  const px = enemy.x * tileSize + tileSize / 2;
  const py = enemy.y * tileSize + tileSize / 2;
  ctx.save();
  ctx.translate(px, py);
  // Body (boss color)
  ctx.fillStyle = '#00bcd4';
  ctx.beginPath();
  ctx.arc(0, 0, tileSize * 0.22, 0, 2 * Math.PI);
  ctx.fill();
  // Healing aura
  ctx.save();
  ctx.globalAlpha = 0.18 + 0.12 * Math.sin(Date.now() / 200);
  ctx.strokeStyle = '#b2ebf2';
  ctx.lineWidth = 7;
  ctx.beginPath();
  ctx.arc(0, 0, tileSize * 0.32, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.restore();
  // Face
  ctx.fillStyle = '#222';
  ctx.beginPath();
  ctx.arc(-tileSize * 0.06, -tileSize * 0.06, tileSize * 0.03, 0, 2 * Math.PI);
  ctx.arc(tileSize * 0.06, -tileSize * 0.06, tileSize * 0.03, 0, 2 * Math.PI);
  ctx.fill();
  // Health bar
  ctx.save();
  ctx.fillStyle = 'black';
  ctx.fillRect(px - tileSize * 0.28, py - tileSize * 0.44 - 10, tileSize * 0.56, 8);
  ctx.fillStyle = '#00bcd4';
  ctx.fillRect(px - tileSize * 0.28, py - tileSize * 0.44 - 10, tileSize * 0.56 * (enemy.health / enemy.maxHealth), 8);
  ctx.strokeStyle = '#222';
  ctx.strokeRect(px - tileSize * 0.28, py - tileSize * 0.44 - 10, tileSize * 0.56, 8);
  ctx.restore();
  ctx.restore();
} 