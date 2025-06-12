import { getTileSize } from '../utils.js';

export function renderBossSpiderEnemy(enemy, ctx) {
  const tileSize = getTileSize(enemy.canvas, enemy.mapConfig);
  const bossScale = 1.4;
  const px = enemy.x * tileSize + tileSize / 2;
  const py = enemy.y * tileSize + tileSize / 2;
  ctx.save();
  ctx.translate(px, py);
  ctx.scale(bossScale, bossScale);
  // Draw boss spider body centered at (0,0)
  ctx.fillStyle = '#263238';
  ctx.beginPath();
  ctx.arc(0, 0, tileSize * 0.13, 0, 2 * Math.PI);
  ctx.fill();
  // Face
  ctx.fillStyle = '#fff';
  ctx.beginPath();
  ctx.arc(-tileSize * 0.04, -tileSize * 0.04, tileSize * 0.02, 0, 2 * Math.PI);
  ctx.arc(tileSize * 0.04, -tileSize * 0.04, tileSize * 0.02, 0, 2 * Math.PI);
  ctx.fill();
  ctx.restore();
  // Health bar
  ctx.save();
  ctx.fillStyle = 'black';
  ctx.fillRect(px - tileSize * 0.35, py - tileSize * 0.5 - 10, tileSize * 0.7, 10);
  ctx.fillStyle = '#263238';
  ctx.fillRect(px - tileSize * 0.35, py - tileSize * 0.5 - 10, tileSize * 0.7 * (enemy.health / enemy.maxHealth), 10);
  ctx.strokeStyle = '#222';
  ctx.strokeRect(px - tileSize * 0.35, py - tileSize * 0.5 - 10, tileSize * 0.7, 10);
  ctx.restore();
} 