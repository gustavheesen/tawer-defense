import { getTileSize } from '../utils.js';

export function renderBossArmoredEnemy(enemy, ctx) {
  const tileSize = getTileSize(enemy.canvas, enemy.mapConfig) * 1.35; // Boss is larger
  const px = enemy.x * tileSize + tileSize / 2;
  const py = enemy.y * tileSize + tileSize / 2;
  ctx.save();
  ctx.translate(px, py);
  // Body (boss color)
  ctx.fillStyle = '#607d8b';
  ctx.beginPath();
  ctx.arc(0, 0, tileSize * 0.24, 0, 2 * Math.PI);
  ctx.fill();
  // Metal plates (boss style)
  ctx.strokeStyle = '#263238';
  ctx.lineWidth = 7;
  for (let i = 0; i < 6; i++) {
    ctx.beginPath();
    ctx.arc(0, 0, tileSize * 0.24, (i * Math.PI) / 3, ((i + 1) * Math.PI) / 3);
    ctx.stroke();
  }
  // Face
  ctx.fillStyle = '#222';
  ctx.beginPath();
  ctx.arc(-tileSize * 0.07, -tileSize * 0.07, tileSize * 0.035, 0, 2 * Math.PI);
  ctx.arc(tileSize * 0.07, -tileSize * 0.07, tileSize * 0.035, 0, 2 * Math.PI);
  ctx.fill();
  ctx.restore();
  // Health bar
  ctx.save();
  ctx.fillStyle = 'black';
  ctx.fillRect(px - tileSize * 0.35, py - tileSize * 0.5 - 10, tileSize * 0.7, 10);
  ctx.fillStyle = '#607d8b';
  ctx.fillRect(px - tileSize * 0.35, py - tileSize * 0.5 - 10, tileSize * 0.7 * (enemy.health / enemy.maxHealth), 10);
  ctx.strokeStyle = '#222';
  ctx.strokeRect(px - tileSize * 0.35, py - tileSize * 0.5 - 10, tileSize * 0.7, 10);
  ctx.restore();
} 