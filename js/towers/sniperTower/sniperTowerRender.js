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

  // --- PIXEL ART STYLE ---
  // Draw shadow for depth
  ctx.save();
  ctx.globalAlpha = 0.18;
  ctx.beginPath();
  for (let i = 0; i < 8; i++) {
    const angle = (Math.PI / 4) * i;
    const r = 22;
    ctx.lineTo(Math.cos(angle) * r, Math.sin(angle) * r);
  }
  ctx.closePath();
  ctx.fillStyle = '#000';
  ctx.translate(2, 2);
  ctx.fill();
  ctx.restore();

  // Draw octagonal base (outer layer)
  ctx.beginPath();
  for (let i = 0; i < 8; i++) {
    const angle = (Math.PI / 4) * i;
    const r = 20;
    ctx.lineTo(Math.cos(angle) * r, Math.sin(angle) * r);
  }
  ctx.closePath();
  ctx.fillStyle = '#18304a';
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.strokeStyle = '#0ff';
  ctx.stroke();

  // Draw octagonal base (inner layer)
  ctx.beginPath();
  for (let i = 0; i < 8; i++) {
    const angle = (Math.PI / 4) * i;
    const r = 14;
    ctx.lineTo(Math.cos(angle) * r, Math.sin(angle) * r);
  }
  ctx.closePath();
  ctx.fillStyle = '#225c7a';
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#3cf';
  ctx.stroke();

  // Draw spikes (longer, sharper)
  for (let i = 0; i < 8; i++) {
    const angle = (Math.PI / 4) * i;
    const r1 = 20;
    const r2 = 32;
    ctx.beginPath();
    ctx.moveTo(Math.cos(angle) * r1, Math.sin(angle) * r1);
    ctx.lineTo(Math.cos(angle) * r2, Math.sin(angle) * r2);
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#3cf';
    ctx.shadowColor = '#0ff';
    ctx.shadowBlur = 6;
    ctx.stroke();
    ctx.shadowBlur = 0;
  }

  // Draw central core (outer)
  ctx.beginPath();
  ctx.arc(0, 0, 9, 0, 2 * Math.PI);
  ctx.fillStyle = '#3cf';
  ctx.shadowColor = '#0ff';
  ctx.shadowBlur = 8;
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#0ff';
  ctx.stroke();

  // Draw central core (inner)
  ctx.beginPath();
  ctx.arc(0, 0, 5, 0, 2 * Math.PI);
  ctx.fillStyle = '#7ffcff';
  ctx.fill();
  ctx.lineWidth = 1.5;
  ctx.strokeStyle = '#fff';
  ctx.stroke();

  // Draw barrel (with color bands), only this rotates
  ctx.save();
  ctx.rotate(tower.turretAngle || 0);
  // Barrel body
  ctx.fillStyle = '#18304a';
  ctx.fillRect(9, -6, 26, 12);
  ctx.strokeStyle = '#0ff';
  ctx.lineWidth = 2;
  ctx.strokeRect(9, -6, 26, 12);
  // Barrel bands
  ctx.fillStyle = '#225c7a';
  ctx.fillRect(13, -5, 5, 10);
  ctx.fillStyle = '#3cf';
  ctx.fillRect(20, -4, 5, 8);
  ctx.fillStyle = '#7ffcff';
  ctx.fillRect(27, -3, 5, 6);
  // Barrel tip
  ctx.beginPath();
  ctx.arc(38, 0, 6, 0, 2 * Math.PI);
  ctx.fillStyle = '#0ff';
  ctx.globalAlpha = 0.8;
  ctx.fill();
  ctx.globalAlpha = 1.0;
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#3cf';
  ctx.stroke();
  ctx.restore();

  ctx.restore();
} 