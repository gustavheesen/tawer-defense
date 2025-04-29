import { drawTrapSpike } from './trapSpikeRender.js';

export function drawTrapTowerBase(ctx, cx, cy, tileSize) {
  ctx.save();
  ctx.translate(cx, cy);
  // Draw a spiky base (circle with spikes)
  ctx.beginPath();
  ctx.arc(0, 0, tileSize * 0.35, 0, 2 * Math.PI);
  ctx.fillStyle = '#b8860b'; // dark gold
  ctx.fill();
  ctx.strokeStyle = '#333';
  ctx.lineWidth = 3;
  ctx.stroke();
  // Draw spikes around the base
  for (let i = 0; i < 8; i++) {
    const angle = (Math.PI * 2 * i) / 8;
    ctx.save();
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(0, -tileSize * 0.35);
    ctx.lineTo(-tileSize * 0.07, -tileSize * 0.48);
    ctx.lineTo(tileSize * 0.07, -tileSize * 0.48);
    ctx.closePath();
    ctx.fillStyle = '#ffd700'; // gold
    ctx.fill();
    ctx.restore();
  }
  ctx.restore();
}

export function drawTrapSpikes(ctx, spikes, tileSize) {
  for (const spike of spikes) {
    const cx = spike.x * tileSize + tileSize / 2;
    const cy = spike.y * tileSize + tileSize / 2;
    drawTrapSpike(ctx, cx, cy, tileSize);
  }
} 