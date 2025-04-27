export function drawMissileSiloLevel3Base(ctx, cx, cy, tileSize) {
  ctx.save();
  ctx.translate(cx, cy);
  // Even larger bunker base
  ctx.fillStyle = '#888';
  ctx.beginPath();
  ctx.arc(0, 0, tileSize * 0.40, 0, 2 * Math.PI);
  ctx.fill();
  // Three hatches in a triangle
  ctx.strokeStyle = '#333';
  ctx.lineWidth = 3;
  const r = tileSize * 0.16;
  for (let i = 0; i < 3; i++) {
    const angle = (i * 2 * Math.PI) / 3 - Math.PI / 2;
    ctx.beginPath();
    ctx.arc(Math.cos(angle) * tileSize * 0.13, Math.sin(angle) * tileSize * 0.13, r, 0, 2 * Math.PI);
    ctx.stroke();
  }
  ctx.restore();
}

export function drawMissileSiloLevel3Turret(ctx, cx, cy, tileSize, angle) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(angle);
  // Three missiles in triangle
  const positions = [
    [0, -tileSize * 0.08],
    [-tileSize * 0.09, tileSize * 0.07],
    [tileSize * 0.09, tileSize * 0.07]
  ];
  for (const [dx, dy] of positions) {
    ctx.save();
    ctx.translate(dx, dy);
    ctx.fillStyle = '#bdbdbd';
    ctx.beginPath();
    ctx.ellipse(tileSize * 0.18, 0, tileSize * 0.14, tileSize * 0.08, 0, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(tileSize * 0.28, 0, tileSize * 0.055, 0, 2 * Math.PI);
    ctx.fillStyle = '#2196f3';
    ctx.fill();
    ctx.restore();
  }
  ctx.restore();
} 