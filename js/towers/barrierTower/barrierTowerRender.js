import { getTileSize } from '../../utils.js';

// Renders the Barrier Tower as a barricade
export function renderBarrierTower(ctx, tower) {
  const tileSize = getTileSize(tower.canvas, tower.mapConfig);
  const cx = tower.tileX * tileSize + tileSize / 2;
  const cy = tower.tileY * tileSize + tileSize / 2;
  const width = tileSize * 0.8;
  const height = tileSize * 0.3;
  const postWidth = tileSize * 0.12;
  const postHeight = tileSize * 0.5;

  ctx.save();
  ctx.globalAlpha = 0.95;

  // Draw side posts
  ctx.fillStyle = '#444';
  ctx.fillRect(cx - width / 2, cy - postHeight / 2, postWidth, postHeight);
  ctx.fillRect(cx + width / 2 - postWidth, cy - postHeight / 2, postWidth, postHeight);

  // Draw main plank
  ctx.fillStyle = '#FFD600'; // yellow
  ctx.fillRect(cx - width / 2 + postWidth, cy - height / 2, width - 2 * postWidth, height);
  ctx.strokeStyle = '#222';
  ctx.lineWidth = 2;
  ctx.strokeRect(cx - width / 2 + postWidth, cy - height / 2, width - 2 * postWidth, height);

  // Draw diagonal black stripes
  ctx.save();
  ctx.beginPath();
  ctx.rect(cx - width / 2 + postWidth, cy - height / 2, width - 2 * postWidth, height);
  ctx.clip();
  ctx.strokeStyle = '#222';
  ctx.lineWidth = 3;
  for (let x = cx - width / 2 + postWidth - height; x < cx + width / 2 - postWidth; x += height * 0.8) {
    ctx.beginPath();
    ctx.moveTo(x, cy + height / 2);
    ctx.lineTo(x + height, cy - height / 2);
    ctx.strokeStyle = '#222';
    ctx.stroke();
  }
  ctx.restore();

  // Draw level number
  ctx.fillStyle = '#fff';
  ctx.font = `${Math.floor(tileSize * 0.35)}px Arial Black, Arial, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(tower.level, cx, cy - height);

  ctx.restore();
} 