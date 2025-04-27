export function drawCannonTowerLevel4Base(ctx, cx, cy, tileSize) {
  ctx.save();
  ctx.translate(cx, cy);
  // Main X-shaped base, even more plating and detail
  ctx.strokeStyle = '#082406';
  ctx.lineWidth = 5;
  for (let i = 0; i < 4; i++) {
    ctx.save();
    ctx.rotate((Math.PI / 2) * i);
    ctx.beginPath();
    ctx.moveTo(-tileSize * 0.11, -tileSize * 0.22);
    ctx.lineTo(-tileSize * 0.25, -tileSize * 0.36);
    ctx.lineTo(-tileSize * 0.11, -tileSize * 0.48);
    ctx.lineTo(tileSize * 0.11, -tileSize * 0.48);
    ctx.lineTo(tileSize * 0.25, -tileSize * 0.36);
    ctx.lineTo(tileSize * 0.11, -tileSize * 0.22);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }
  // Fill arms with a rich green
  ctx.fillStyle = '#1b5e20';
  for (let i = 0; i < 4; i++) {
    ctx.save();
    ctx.rotate((Math.PI / 2) * i);
    ctx.beginPath();
    ctx.moveTo(-tileSize * 0.11, -tileSize * 0.22);
    ctx.lineTo(-tileSize * 0.25, -tileSize * 0.36);
    ctx.lineTo(-tileSize * 0.11, -tileSize * 0.48);
    ctx.lineTo(tileSize * 0.11, -tileSize * 0.48);
    ctx.lineTo(tileSize * 0.25, -tileSize * 0.36);
    ctx.lineTo(tileSize * 0.11, -tileSize * 0.22);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
  // Extra blue-green and yellow highlights
  ctx.strokeStyle = '#4fc3f7';
  ctx.lineWidth = 3;
  for (let i = 0; i < 4; i++) {
    ctx.save();
    ctx.rotate((Math.PI / 2) * i);
    ctx.beginPath();
    ctx.moveTo(0, -tileSize * 0.22);
    ctx.lineTo(0, -tileSize * 0.48);
    ctx.stroke();
    ctx.restore();
  }
  ctx.strokeStyle = '#fffde7';
  ctx.lineWidth = 2;
  for (let i = 0; i < 4; i++) {
    ctx.save();
    ctx.rotate((Math.PI / 2) * i + Math.PI / 4);
    ctx.beginPath();
    ctx.moveTo(0, -tileSize * 0.18);
    ctx.lineTo(0, -tileSize * 0.38);
    ctx.stroke();
    ctx.restore();
  }
  // More plating: add two rings
  ctx.strokeStyle = '#b2ff59';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.arc(0, 0, tileSize * 0.27, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.strokeStyle = '#fffde7';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(0, 0, tileSize * 0.19, 0, 2 * Math.PI);
  ctx.stroke();
  // Even larger, brighter glowing core
  ctx.save();
  ctx.globalAlpha = 0.28;
  ctx.shadowColor = '#4fc3f7';
  ctx.shadowBlur = 28;
  ctx.fillStyle = '#4fc3f7';
  ctx.beginPath();
  ctx.arc(0, 0, tileSize * 0.39, 0, 2 * Math.PI);
  ctx.fill();
  ctx.restore();
  ctx.fillStyle = '#fffde7';
  ctx.globalAlpha = 0.9;
  ctx.beginPath();
  ctx.arc(0, 0, tileSize * 0.15, 0, 2 * Math.PI);
  ctx.fill();
  ctx.globalAlpha = 1.0;
  // White 'X' in the center, thickest
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(-tileSize * 0.11, -tileSize * 0.11);
  ctx.lineTo(tileSize * 0.11, tileSize * 0.11);
  ctx.moveTo(tileSize * 0.11, -tileSize * 0.11);
  ctx.lineTo(-tileSize * 0.11, tileSize * 0.11);
  ctx.stroke();
  ctx.restore();
}

export function drawCannonTowerLevel4Turret(ctx, cx, cy, tileSize, angle) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(angle);
  // Barrel outline, even larger
  ctx.beginPath();
  ctx.ellipse(tileSize * 0.37, 0, tileSize * 0.18, tileSize * 0.13, 0, 0, 2 * Math.PI);
  ctx.strokeStyle = '#082406';
  ctx.lineWidth = 7;
  ctx.stroke();
  // Barrel fill (rich green)
  ctx.beginPath();
  ctx.ellipse(tileSize * 0.37, 0, tileSize * 0.18, tileSize * 0.13, 0, 0, 2 * Math.PI);
  ctx.fillStyle = '#1b5e20';
  ctx.fill();
  // Barrel tip outline
  ctx.beginPath();
  ctx.arc(tileSize * 0.51, 0, tileSize * 0.08, 0, 2 * Math.PI);
  ctx.strokeStyle = '#082406';
  ctx.lineWidth = 5;
  ctx.stroke();
  // Barrel tip fill (bright yellow-green)
  ctx.beginPath();
  ctx.arc(tileSize * 0.51, 0, tileSize * 0.08, 0, 2 * Math.PI);
  ctx.fillStyle = '#fffde7';
  ctx.fill();
  // Barrel highlight
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(tileSize * 0.26, -tileSize * 0.05);
  ctx.lineTo(tileSize * 0.51, -tileSize * 0.05);
  ctx.stroke();
  // Extra blue-green highlight
  ctx.strokeStyle = '#4fc3f7';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(tileSize * 0.26, 0.05);
  ctx.lineTo(tileSize * 0.51, 0.05);
  ctx.stroke();
  // Intricate mechanical detail: add a small vent
  ctx.fillStyle = '#b2ff59';
  ctx.beginPath();
  ctx.ellipse(tileSize * 0.37, 0, tileSize * 0.03, tileSize * 0.012, 0, 0, 2 * Math.PI);
  ctx.fill();
  ctx.restore();
} 