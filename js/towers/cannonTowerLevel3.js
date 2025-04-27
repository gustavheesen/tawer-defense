export function drawCannonTowerLevel3Base(ctx, cx, cy, tileSize) {
  ctx.save();
  ctx.translate(cx, cy);
  // Main X-shaped base, more plating and detail
  ctx.strokeStyle = '#0d1b0d';
  ctx.lineWidth = 4;
  for (let i = 0; i < 4; i++) {
    ctx.save();
    ctx.rotate((Math.PI / 2) * i);
    ctx.beginPath();
    ctx.moveTo(-tileSize * 0.09, -tileSize * 0.19);
    ctx.lineTo(-tileSize * 0.21, -tileSize * 0.32);
    ctx.lineTo(-tileSize * 0.09, -tileSize * 0.41);
    ctx.lineTo(tileSize * 0.09, -tileSize * 0.41);
    ctx.lineTo(tileSize * 0.21, -tileSize * 0.32);
    ctx.lineTo(tileSize * 0.09, -tileSize * 0.19);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }
  // Fill arms with a deeper green
  ctx.fillStyle = '#2e7d32';
  for (let i = 0; i < 4; i++) {
    ctx.save();
    ctx.rotate((Math.PI / 2) * i);
    ctx.beginPath();
    ctx.moveTo(-tileSize * 0.09, -tileSize * 0.19);
    ctx.lineTo(-tileSize * 0.21, -tileSize * 0.32);
    ctx.lineTo(-tileSize * 0.09, -tileSize * 0.41);
    ctx.lineTo(tileSize * 0.09, -tileSize * 0.41);
    ctx.lineTo(tileSize * 0.21, -tileSize * 0.32);
    ctx.lineTo(tileSize * 0.09, -tileSize * 0.19);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
  // Extra blue-green highlights
  ctx.strokeStyle = '#4fc3f7';
  ctx.lineWidth = 2.5;
  for (let i = 0; i < 4; i++) {
    ctx.save();
    ctx.rotate((Math.PI / 2) * i);
    ctx.beginPath();
    ctx.moveTo(0, -tileSize * 0.19);
    ctx.lineTo(0, -tileSize * 0.41);
    ctx.stroke();
    ctx.restore();
  }
  // More plating: add a ring
  ctx.strokeStyle = '#b2ff59';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(0, 0, tileSize * 0.23, 0, 2 * Math.PI);
  ctx.stroke();
  // Larger glowing core
  ctx.save();
  ctx.globalAlpha = 0.22;
  ctx.shadowColor = '#4fc3f7';
  ctx.shadowBlur = 22;
  ctx.fillStyle = '#4fc3f7';
  ctx.beginPath();
  ctx.arc(0, 0, tileSize * 0.33, 0, 2 * Math.PI);
  ctx.fill();
  ctx.restore();
  ctx.fillStyle = '#fff';
  ctx.globalAlpha = 0.8;
  ctx.beginPath();
  ctx.arc(0, 0, tileSize * 0.12, 0, 2 * Math.PI);
  ctx.fill();
  ctx.globalAlpha = 1.0;
  // White 'X' in the center, thicker
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(-tileSize * 0.09, -tileSize * 0.09);
  ctx.lineTo(tileSize * 0.09, tileSize * 0.09);
  ctx.moveTo(tileSize * 0.09, -tileSize * 0.09);
  ctx.lineTo(-tileSize * 0.09, tileSize * 0.09);
  ctx.stroke();
  ctx.restore();
}

export function drawCannonTowerLevel3Turret(ctx, cx, cy, tileSize, angle) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(angle);
  // Barrel outline, larger
  ctx.beginPath();
  ctx.ellipse(tileSize * 0.32, 0, tileSize * 0.15, tileSize * 0.11, 0, 0, 2 * Math.PI);
  ctx.strokeStyle = '#0d1b0d';
  ctx.lineWidth = 6;
  ctx.stroke();
  // Barrel fill (deeper green)
  ctx.beginPath();
  ctx.ellipse(tileSize * 0.32, 0, tileSize * 0.15, tileSize * 0.11, 0, 0, 2 * Math.PI);
  ctx.fillStyle = '#2e7d32';
  ctx.fill();
  // Barrel tip outline
  ctx.beginPath();
  ctx.arc(tileSize * 0.44, 0, tileSize * 0.07, 0, 2 * Math.PI);
  ctx.strokeStyle = '#0d1b0d';
  ctx.lineWidth = 4;
  ctx.stroke();
  // Barrel tip fill (bright)
  ctx.beginPath();
  ctx.arc(tileSize * 0.44, 0, tileSize * 0.07, 0, 2 * Math.PI);
  ctx.fillStyle = '#b2ff59';
  ctx.fill();
  // Barrel highlight
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(tileSize * 0.22, -tileSize * 0.04);
  ctx.lineTo(tileSize * 0.44, -tileSize * 0.04);
  ctx.stroke();
  // Extra blue-green highlight
  ctx.strokeStyle = '#4fc3f7';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(tileSize * 0.22, 0.04);
  ctx.lineTo(tileSize * 0.44, 0.04);
  ctx.stroke();
  ctx.restore();
} 