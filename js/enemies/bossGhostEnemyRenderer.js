import { getTileSize } from '../utils.js';

export function renderBossGhostEnemy(enemy, ctx) {
  const tileSize = getTileSize(enemy.canvas, enemy.mapConfig);
  const bossScale = 1.4;
  const px = (enemy.x + 0.5) * tileSize;
  const py = (enemy.y + 0.5) * tileSize;
  ctx.save();
  ctx.translate(px, py);
  ctx.scale(bossScale, bossScale);
  // Draw boss ghost body centered at (0,0)
  ctx.globalAlpha = 0.7;
  ctx.fillStyle = '#7e57c2';
  ctx.beginPath();
  ctx.arc(0, 0, tileSize * 0.16, 0, 2 * Math.PI);
  ctx.fill();
  ctx.globalAlpha = 1.0;
  // Face
  ctx.fillStyle = '#222';
  ctx.beginPath();
  ctx.arc(-tileSize * 0.05, -tileSize * 0.05, tileSize * 0.025, 0, 2 * Math.PI);
  ctx.arc(tileSize * 0.05, -tileSize * 0.05, tileSize * 0.025, 0, 2 * Math.PI);
  ctx.fill();
  ctx.restore();
  // Health bar
  ctx.save();
  ctx.fillStyle = 'black';
  ctx.fillRect(px - tileSize * 0.35, py - tileSize * 0.5 - 10, tileSize * 0.7, 10);
  ctx.fillStyle = '#7e57c2';
  ctx.fillRect(px - tileSize * 0.35, py - tileSize * 0.5 - 10, tileSize * 0.7 * (enemy.health / enemy.maxHealth), 10);
  ctx.strokeStyle = '#222';
  ctx.strokeRect(px - tileSize * 0.35, py - tileSize * 0.5 - 10, tileSize * 0.7, 10);
  ctx.restore();
} 