export function drawMissileSiloLevel2Base(ctx, cx, cy, tileSize) {
  ctx.save();
  ctx.translate(cx, cy);
  // Larger bunker base
  ctx.fillStyle = '#888';
  ctx.beginPath();
  ctx.arc(0, 0, tileSize * 0.36, 0, 2 * Math.PI);
  ctx.fill();
  // Two hatches
  ctx.strokeStyle = '#333';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(-tileSize * 0.10, 0, tileSize * 0.15, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(tileSize * 0.10, 0, tileSize * 0.15, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.restore();
}

export function drawMissileSiloLevel2Turret(ctx, cx, cy, tileSize, angle) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(angle);
  // Two missiles
  for (let i = -1; i <= 1; i += 2) {
    ctx.save();
    ctx.translate(i * tileSize * 0.07, 0);
    ctx.fillStyle = '#bdbdbd';
    ctx.beginPath();
    ctx.ellipse(tileSize * 0.18, 0, tileSize * 0.13, tileSize * 0.07, 0, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(tileSize * 0.28, 0, tileSize * 0.05, 0, 2 * Math.PI);
    ctx.fillStyle = '#ff9800';
    ctx.fill();
    ctx.restore();
  }
  ctx.restore();
} 