// Sniper Tower rendering
import { getTileSize } from '../../utils.js';

export function renderSniperTower(ctx, tower) {
  ctx.save();
  let px, py;
  if (tower.position && typeof tower.position.x === 'number' && typeof tower.position.y === 'number') {
    px = tower.position.x;
    py = tower.position.y;
  } else if (typeof tower.tileX === 'number' && typeof tower.tileY === 'number' && tower.canvas && tower.mapConfig) {
    const tileSize = getTileSize(tower.canvas, tower.mapConfig);
    px = tower.tileX * tileSize + tileSize / 2;
    py = tower.tileY * tileSize + tileSize / 2;
  } else {
    px = 0;
    py = 0;
  }
  ctx.translate(px, py);

  // Draw blue octagonal base
  ctx.save();
  ctx.rotate(tower.turretAngle || 0);
  ctx.beginPath();
  for (let i = 0; i < 8; i++) {
    const angle = (Math.PI / 4) * i;
    const r = 18;
    ctx.lineTo(Math.cos(angle) * r, Math.sin(angle) * r);
  }
  ctx.closePath();
  ctx.fillStyle = '#1e355e';
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = '#0ff';
  ctx.stroke();

  // Draw spikes
  for (let i = 0; i < 8; i++) {
    const angle = (Math.PI / 4) * i;
    const r1 = 20;
    const r2 = 28;
    ctx.beginPath();
    ctx.moveTo(Math.cos(angle) * r1, Math.sin(angle) * r1);
    ctx.lineTo(Math.cos(angle) * r2, Math.sin(angle) * r2);
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#3cf';
    ctx.stroke();
  }

  // Draw central core
  ctx.beginPath();
  ctx.arc(0, 0, 8, 0, 2 * Math.PI);
  ctx.fillStyle = '#3cf';
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#0ff';
  ctx.stroke();

  // Draw inner core highlight
  ctx.beginPath();
  ctx.arc(0, 0, 4, 0, 2 * Math.PI);
  ctx.fillStyle = '#7ffcff';
  ctx.fill();

  // Draw barrel
  ctx.fillStyle = '#1e355e';
  ctx.fillRect(8, -4, 18, 8);
  ctx.strokeStyle = '#0ff';
  ctx.lineWidth = 2;
  ctx.strokeRect(8, -4, 18, 8);

  // Barrel highlight
  ctx.fillStyle = '#3cf';
  ctx.fillRect(14, -2, 8, 4);

  ctx.restore();
  ctx.restore();
} 