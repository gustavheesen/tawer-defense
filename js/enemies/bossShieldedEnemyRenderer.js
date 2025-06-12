import { getTileSize } from '../utils.js';

export function renderBossShieldedEnemy(enemy, ctx) {
  const tileSize = getTileSize(enemy.canvas, enemy.mapConfig) * 1.35; // Boss is larger
  const px = enemy.x * tileSize + tileSize / 2;
  const py = enemy.y * tileSize + tileSize / 2;
  ctx.save();
  ctx.translate(px, py);
  // Body (boss color)
  ctx.fillStyle = '#00b8d4';
  ctx.beginPath();
  ctx.arc(0, 0, tileSize * 0.26, 0, 2 * Math.PI);
  ctx.fill();
  // Shield aura
  ctx.save();
  ctx.globalAlpha = 0.22 + 0.12 * Math.sin(Date.now() / 200);
  ctx.strokeStyle = '#80d8ff';
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.arc(0, 0, tileSize * 0.34, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.restore();
  // Face
  ctx.fillStyle = '#222';
  ctx.beginPath();
  ctx.arc(-tileSize * 0.08, -tileSize * 0.08, tileSize * 0.04, 0, 2 * Math.PI);
  ctx.arc(tileSize * 0.08, -tileSize * 0.08, tileSize * 0.04, 0, 2 * Math.PI);
  ctx.fill();
  // Health bar
  ctx.save();
  ctx.fillStyle = 'black';
  ctx.fillRect(px - tileSize * 0.35, py - tileSize * 0.5 - 10, tileSize * 0.7, 10);
  ctx.fillStyle = '#00b8d4';
  ctx.fillRect(px - tileSize * 0.35, py - tileSize * 0.5 - 10, tileSize * 0.7 * (enemy.health / enemy.maxHealth), 10);
  ctx.strokeStyle = '#222';
  ctx.strokeRect(px - tileSize * 0.35, py - tileSize * 0.5 - 10, tileSize * 0.7, 10);
  ctx.restore();
  ctx.restore();
} 