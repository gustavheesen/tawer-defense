export function drawMissileSiloLevel1Base(ctx, cx, cy, tileSize) {
  ctx.save();
  ctx.translate(cx, cy);
  // Bunker base
  ctx.fillStyle = '#888';
  ctx.beginPath();
  ctx.arc(0, 0, tileSize * 0.32, 0, 2 * Math.PI);
  ctx.fill();
  // Hatch
  ctx.strokeStyle = '#333';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(0, 0, tileSize * 0.18, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.restore();
}

export function drawMissileSiloLevel1Turret(ctx, cx, cy, tileSize, angle) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(angle);
  // Missile body
  ctx.fillStyle = '#bdbdbd';
  ctx.beginPath();
  ctx.ellipse(tileSize * 0.18, 0, tileSize * 0.13, tileSize * 0.07, 0, 0, 2 * Math.PI);
  ctx.fill();
  // Missile tip
  ctx.beginPath();
  ctx.arc(tileSize * 0.28, 0, tileSize * 0.05, 0, 2 * Math.PI);
  ctx.fillStyle = '#ff9800';
  ctx.fill();
  ctx.restore();
} 