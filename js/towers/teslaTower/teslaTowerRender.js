// Tesla Tower rendering
export function renderTeslaTower(ctx, tower) {
  ctx.save();
  let px, py;
  if (typeof tower.tileX === 'number' && typeof tower.tileY === 'number' && tower.canvas && tower.mapConfig) {
    const tileSize = Math.min(tower.canvas.width / tower.mapConfig.width, tower.canvas.height / tower.mapConfig.height);
    px = tower.tileX * tileSize + tileSize / 2;
    py = tower.tileY * tileSize + tileSize / 2;
  } else if (tower.position && typeof tower.position.x === 'number' && typeof tower.position.y === 'number') {
    px = tower.position.x;
    py = tower.position.y;
  } else {
    px = 0;
    py = 0;
  }
  ctx.translate(px, py);
  // Draw base circle
  ctx.beginPath();
  ctx.arc(0, 0, 18, 0, 2 * Math.PI);
  ctx.fillStyle = '#222a44';
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.strokeStyle = '#00eaff';
  ctx.stroke();
  // Draw electric orb
  ctx.beginPath();
  ctx.arc(0, 0, 10, 0, 2 * Math.PI);
  ctx.fillStyle = '#00eaff';
  ctx.shadowColor = '#00eaff';
  ctx.shadowBlur = 12;
  ctx.fill();
  ctx.shadowBlur = 0;
  // Draw tower rods
  for (let i = 0; i < 3; i++) {
    const angle = (Math.PI * 2 / 3) * i;
    ctx.save();
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -22);
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#b3f0ff';
    ctx.stroke();
    ctx.restore();
  }
  ctx.restore();
} 