import { getTileSize } from '../utils.js';

export function renderBossTankEnemy(enemy, ctx) {
  const tileSize = getTileSize(enemy.canvas, enemy.mapConfig);
  const px = enemy.x * tileSize + tileSize / 2;
  const py = enemy.y * tileSize + tileSize / 2;
  ctx.save();
  ctx.translate(px, py);
  ctx.rotate(enemy.angle);
  ctx.rotate(Math.PI / 2);
  // Draw massive tracks (animated)
  const trackW = tileSize * 0.20;
  const trackH = tileSize * 0.8;
  for (let side = -1; side <= 1; side += 2) {
    ctx.save();
    ctx.translate(side * tileSize * 0.22, 0);
    ctx.fillStyle = '#6d4c41';
    ctx.fillRect(-trackW / 2, -trackH / 2, trackW, trackH);
    // Animate treads
    const treadH = tileSize * 0.10;
    for (let i = 0; i < 5; i++) {
      const offset = ((i * treadH + enemy.trackAnimOffset * tileSize * 0.2) % trackH) - trackH / 2;
      ctx.fillStyle = i % 2 === 0 ? '#3e2723' : '#bdbdbd';
      ctx.fillRect(-trackW / 2, offset, trackW, treadH * 0.7);
    }
    ctx.restore();
  }
  // Draw armored body (unique boss color)
  ctx.fillStyle = '#ff9800';
  ctx.beginPath();
  ctx.ellipse(0, 0, tileSize * 0.25, tileSize * 0.32, 0, 0, 2 * Math.PI);
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.strokeStyle = '#ff5722';
  ctx.stroke();
  // Draw huge cannon
  ctx.save();
  ctx.rotate(0);
  ctx.fillStyle = '#ff5722';
  ctx.fillRect(-tileSize * 0.04, -tileSize * 0.32, tileSize * 0.08, tileSize * 0.22);
  ctx.fillStyle = '#ff9800';
  ctx.fillRect(-tileSize * 0.03, -tileSize * 0.44, tileSize * 0.06, tileSize * 0.14);
  ctx.restore();
  ctx.restore();
  // Health bar (thicker)
  ctx.save();
  ctx.fillStyle = 'black';
  ctx.fillRect(px - tileSize * 0.4, py - tileSize * 0.6 - 10, tileSize * 0.8, 8);
  ctx.fillStyle = '#ff1744';
  ctx.fillRect(px - tileSize * 0.4, py - tileSize * 0.6 - 10, tileSize * 0.8 * (enemy.health / enemy.maxHealth), 8);
  ctx.strokeStyle = '#222';
  ctx.lineWidth = 2;
  ctx.strokeRect(px - tileSize * 0.4, py - tileSize * 0.6 - 10, tileSize * 0.8, 8);
  ctx.restore();
} 