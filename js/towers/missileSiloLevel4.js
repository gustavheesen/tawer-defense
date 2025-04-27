export function drawMissileSiloLevel4Base(ctx, cx, cy, tileSize) {
  ctx.save();
  ctx.translate(cx, cy);
  // Reinforced bunker base
  ctx.fillStyle = '#757575';
  ctx.beginPath();
  ctx.arc(0, 0, tileSize * 0.44, 0, 2 * Math.PI);
  ctx.fill();
  // Four hatches in a square
  ctx.strokeStyle = '#333';
  ctx.lineWidth = 3;
  const offset = tileSize * 0.13;
  for (let dx of [-offset, offset]) {
    for (let dy of [-offset, offset]) {
      ctx.beginPath();
      ctx.arc(dx, dy, tileSize * 0.13, 0, 2 * Math.PI);
      ctx.stroke();
    }
  }
  ctx.restore();
}

export function drawMissileSiloLevel4Turret(ctx, cx, cy, tileSize, angle) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(angle);
  // Four missiles in a square
  const positions = [
    [-tileSize * 0.08, -tileSize * 0.08],
    [tileSize * 0.08, -tileSize * 0.08],
    [-tileSize * 0.08, tileSize * 0.08],
    [tileSize * 0.08, tileSize * 0.08]
  ];
  for (const [dx, dy] of positions) {
    ctx.save();
    ctx.translate(dx, dy);
    // Glow
    ctx.save();
    ctx.globalAlpha = 0.18;
    ctx.shadowColor = '#ffe082';
    ctx.shadowBlur = 16;
    ctx.beginPath();
    ctx.arc(tileSize * 0.18, 0, tileSize * 0.09, 0, 2 * Math.PI);
    ctx.fillStyle = '#ffe082';
    ctx.fill();
    ctx.restore();
    // Missile body
    ctx.fillStyle = '#bdbdbd';
    ctx.beginPath();
    ctx.ellipse(tileSize * 0.18, 0, tileSize * 0.15, tileSize * 0.09, 0, 0, 2 * Math.PI);
    ctx.fill();
    // Missile tip
    ctx.beginPath();
    ctx.arc(tileSize * 0.28, 0, tileSize * 0.06, 0, 2 * Math.PI);
    ctx.fillStyle = '#ffe082';
    ctx.fill();
    ctx.restore();
  }
  ctx.restore();
} 