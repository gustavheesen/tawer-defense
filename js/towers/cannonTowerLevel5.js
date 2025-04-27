export function drawCannonTowerLevel5Base(ctx, cx, cy, tileSize) {
  ctx.save();
  ctx.translate(cx, cy);
  // Main X-shaped base, maximum plating and detail
  ctx.strokeStyle = '#02110a';
  ctx.lineWidth = 6;
  for (let i = 0; i < 4; i++) {
    ctx.save();
    ctx.rotate((Math.PI / 2) * i);
    ctx.beginPath();
    ctx.moveTo(-tileSize * 0.13, -tileSize * 0.26);
    ctx.lineTo(-tileSize * 0.31, -tileSize * 0.44);
    ctx.lineTo(-tileSize * 0.13, -tileSize * 0.58);
    ctx.lineTo(tileSize * 0.13, -tileSize * 0.58);
    ctx.lineTo(tileSize * 0.31, -tileSize * 0.44);
    ctx.lineTo(tileSize * 0.13, -tileSize * 0.26);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }
  // Fill arms with a deep emerald
  ctx.fillStyle = '#145a32';
  for (let i = 0; i < 4; i++) {
    ctx.save();
    ctx.rotate((Math.PI / 2) * i);
    ctx.beginPath();
    ctx.moveTo(-tileSize * 0.13, -tileSize * 0.26);
    ctx.lineTo(-tileSize * 0.31, -tileSize * 0.44);
    ctx.lineTo(-tileSize * 0.13, -tileSize * 0.58);
    ctx.lineTo(tileSize * 0.13, -tileSize * 0.58);
    ctx.lineTo(tileSize * 0.31, -tileSize * 0.44);
    ctx.lineTo(tileSize * 0.13, -tileSize * 0.26);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
  // Extra blue-green and gold highlights
  ctx.strokeStyle = '#4fc3f7';
  ctx.lineWidth = 3.5;
  for (let i = 0; i < 4; i++) {
    ctx.save();
    ctx.rotate((Math.PI / 2) * i);
    ctx.beginPath();
    ctx.moveTo(0, -tileSize * 0.26);
    ctx.lineTo(0, -tileSize * 0.58);
    ctx.stroke();
    ctx.restore();
  }
  ctx.strokeStyle = '#ffe082';
  ctx.lineWidth = 2.5;
  for (let i = 0; i < 4; i++) {
    ctx.save();
    ctx.rotate((Math.PI / 2) * i + Math.PI / 4);
    ctx.beginPath();
    ctx.moveTo(0, -tileSize * 0.22);
    ctx.lineTo(0, -tileSize * 0.48);
    ctx.stroke();
    ctx.restore();
  }
  // Multiple glowing rings
  ctx.strokeStyle = '#b2ff59';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(0, 0, tileSize * 0.33, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.strokeStyle = '#ffe082';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(0, 0, tileSize * 0.25, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(0, 0, tileSize * 0.16, 0, 2 * Math.PI);
  ctx.stroke();
  // Huge radiant core
  ctx.save();
  ctx.globalAlpha = 0.35;
  ctx.shadowColor = '#4fc3f7';
  ctx.shadowBlur = 36;
  ctx.fillStyle = '#4fc3f7';
  ctx.beginPath();
  ctx.arc(0, 0, tileSize * 0.48, 0, 2 * Math.PI);
  ctx.fill();
  ctx.restore();
  ctx.fillStyle = '#ffe082';
  ctx.globalAlpha = 0.95;
  ctx.beginPath();
  ctx.arc(0, 0, tileSize * 0.19, 0, 2 * Math.PI);
  ctx.fill();
  ctx.globalAlpha = 1.0;
  // White 'X' in the center, thickest and longest
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(-tileSize * 0.13, -tileSize * 0.13);
  ctx.lineTo(tileSize * 0.13, tileSize * 0.13);
  ctx.moveTo(tileSize * 0.13, -tileSize * 0.13);
  ctx.lineTo(-tileSize * 0.13, tileSize * 0.13);
  ctx.stroke();
  // Intricate mechanical details: add small bolts
  ctx.fillStyle = '#fff';
  for (let i = 0; i < 8; i++) {
    const angle = (Math.PI / 4) * i;
    ctx.beginPath();
    ctx.arc(Math.cos(angle) * tileSize * 0.29, Math.sin(angle) * tileSize * 0.29, tileSize * 0.012, 0, 2 * Math.PI);
    ctx.fill();
  }
  ctx.restore();
}

export function drawCannonTowerLevel5Turret(ctx, cx, cy, tileSize, angle) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(angle);
  // Barrel outline, largest and most detailed
  ctx.beginPath();
  ctx.ellipse(tileSize * 0.44, 0, tileSize * 0.22, tileSize * 0.16, 0, 0, 2 * Math.PI);
  ctx.strokeStyle = '#02110a';
  ctx.lineWidth = 8;
  ctx.stroke();
  // Barrel fill (deep emerald)
  ctx.beginPath();
  ctx.ellipse(tileSize * 0.44, 0, tileSize * 0.22, tileSize * 0.16, 0, 0, 2 * Math.PI);
  ctx.fillStyle = '#145a32';
  ctx.fill();
  // Barrel tip outline
  ctx.beginPath();
  ctx.arc(tileSize * 0.62, 0, tileSize * 0.10, 0, 2 * Math.PI);
  ctx.strokeStyle = '#02110a';
  ctx.lineWidth = 6;
  ctx.stroke();
  // Barrel tip fill (radiant gold)
  ctx.beginPath();
  ctx.arc(tileSize * 0.62, 0, tileSize * 0.10, 0, 2 * Math.PI);
  ctx.fillStyle = '#ffe082';
  ctx.fill();
  // Barrel highlight
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 3.5;
  ctx.beginPath();
  ctx.moveTo(tileSize * 0.32, -tileSize * 0.07);
  ctx.lineTo(tileSize * 0.62, -tileSize * 0.07);
  ctx.stroke();
  // Extra blue-green highlight
  ctx.strokeStyle = '#4fc3f7';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(tileSize * 0.32, 0.07);
  ctx.lineTo(tileSize * 0.62, 0.07);
  ctx.stroke();
  // Intricate mechanical detail: add two small vents
  ctx.fillStyle = '#b2ff59';
  ctx.beginPath();
  ctx.ellipse(tileSize * 0.44, -tileSize * 0.04, tileSize * 0.04, tileSize * 0.016, 0, 0, 2 * Math.PI);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(tileSize * 0.44,  tileSize * 0.04, tileSize * 0.04, tileSize * 0.016, 0, 0, 2 * Math.PI);
  ctx.fill();
  ctx.restore();
} 