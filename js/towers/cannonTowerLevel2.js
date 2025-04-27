export function drawCannonTowerLevel2Base(ctx, cx, cy, tileSize) {
  ctx.save();
  ctx.translate(cx, cy);
  // Main X-shaped base (like level 1, but with more detail)
  ctx.strokeStyle = '#111';
  ctx.lineWidth = 3;
  for (let i = 0; i < 4; i++) {
    ctx.save();
    ctx.rotate((Math.PI / 2) * i);
    ctx.beginPath();
    ctx.moveTo(-tileSize * 0.08, -tileSize * 0.18);
    ctx.lineTo(-tileSize * 0.18, -tileSize * 0.28);
    ctx.lineTo(-tileSize * 0.08, -tileSize * 0.38);
    ctx.lineTo(tileSize * 0.08, -tileSize * 0.38);
    ctx.lineTo(tileSize * 0.18, -tileSize * 0.28);
    ctx.lineTo(tileSize * 0.08, -tileSize * 0.18);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }
  // Fill arms with a brighter green
  ctx.fillStyle = '#43a047';
  for (let i = 0; i < 4; i++) {
    ctx.save();
    ctx.rotate((Math.PI / 2) * i);
    ctx.beginPath();
    ctx.moveTo(-tileSize * 0.08, -tileSize * 0.18);
    ctx.lineTo(-tileSize * 0.18, -tileSize * 0.28);
    ctx.lineTo(-tileSize * 0.08, -tileSize * 0.38);
    ctx.lineTo(tileSize * 0.08, -tileSize * 0.38);
    ctx.lineTo(tileSize * 0.18, -tileSize * 0.28);
    ctx.lineTo(tileSize * 0.08, -tileSize * 0.18);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
  // Extra panel lines
  ctx.strokeStyle = '#b2ff59';
  ctx.lineWidth = 2;
  for (let i = 0; i < 4; i++) {
    ctx.save();
    ctx.rotate((Math.PI / 2) * i);
    ctx.beginPath();
    ctx.moveTo(0, -tileSize * 0.18);
    ctx.lineTo(0, -tileSize * 0.38);
    ctx.stroke();
    ctx.restore();
  }
  // Subtle blue-green glow
  ctx.save();
  ctx.globalAlpha = 0.18;
  ctx.shadowColor = '#4fc3f7';
  ctx.shadowBlur = 16;
  ctx.fillStyle = '#4fc3f7';
  ctx.beginPath();
  ctx.arc(0, 0, tileSize * 0.28, 0, 2 * Math.PI);
  ctx.fill();
  ctx.restore();
  // Small glowing core
  ctx.fillStyle = '#fff';
  ctx.globalAlpha = 0.7;
  ctx.beginPath();
  ctx.arc(0, 0, tileSize * 0.09, 0, 2 * Math.PI);
  ctx.fill();
  ctx.globalAlpha = 1.0;
  // White 'X' in the center
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(-tileSize * 0.07, -tileSize * 0.07);
  ctx.lineTo(tileSize * 0.07, tileSize * 0.07);
  ctx.moveTo(tileSize * 0.07, -tileSize * 0.07);
  ctx.lineTo(-tileSize * 0.07, tileSize * 0.07);
  ctx.stroke();
  ctx.restore();
}

export function drawCannonTowerLevel2Turret(ctx, cx, cy, tileSize, angle) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(angle);
  // Barrel outline
  ctx.beginPath();
  ctx.ellipse(tileSize * 0.28, 0, tileSize * 0.13, tileSize * 0.09, 0, 0, 2 * Math.PI);
  ctx.strokeStyle = '#111';
  ctx.lineWidth = 5;
  ctx.stroke();
  // Barrel fill (brighter)
  ctx.beginPath();
  ctx.ellipse(tileSize * 0.28, 0, tileSize * 0.13, tileSize * 0.09, 0, 0, 2 * Math.PI);
  ctx.fillStyle = '#388e3c';
  ctx.fill();
  // Barrel tip outline
  ctx.beginPath();
  ctx.arc(tileSize * 0.38, 0, tileSize * 0.06, 0, 2 * Math.PI);
  ctx.strokeStyle = '#111';
  ctx.lineWidth = 3;
  ctx.stroke();
  // Barrel tip fill (brighter)
  ctx.beginPath();
  ctx.arc(tileSize * 0.38, 0, tileSize * 0.06, 0, 2 * Math.PI);
  ctx.fillStyle = '#b2ff59';
  ctx.fill();
  // Barrel highlight
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(tileSize * 0.18, -tileSize * 0.03);
  ctx.lineTo(tileSize * 0.38, -tileSize * 0.03);
  ctx.stroke();
  ctx.restore();
} 