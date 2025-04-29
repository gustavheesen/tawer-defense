export function drawTrapSpike(ctx, cx, cy, tileSize) {
  ctx.save();
  ctx.translate(cx, cy);
  // Draw a sharp spike on the ground
  ctx.beginPath();
  ctx.moveTo(0, -tileSize * 0.18);
  ctx.lineTo(-tileSize * 0.09, tileSize * 0.18);
  ctx.lineTo(tileSize * 0.09, tileSize * 0.18);
  ctx.closePath();
  ctx.fillStyle = '#c62828'; // red
  ctx.globalAlpha = 0.85;
  ctx.fill();
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.restore();
} 