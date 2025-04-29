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
  // Draw base
  ctx.fillStyle = '#444';
  ctx.fillRect(-8, -8, 16, 16); // base
  // Draw barrel and scope, rotated by turretAngle
  ctx.save();
  ctx.rotate(tower.turretAngle || 0);
  ctx.fillStyle = '#222';
  ctx.fillRect(0, -3, 20, 6); // barrel
  ctx.strokeStyle = '#88f';
  ctx.beginPath();
  ctx.arc(12, 0, 4 + (tower.level || 1), 0, 2 * Math.PI);
  ctx.stroke(); // scope
  ctx.restore();
  ctx.restore();
} 