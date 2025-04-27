export function drawSlowTowerLevel3Base(ctx, cx, cy, tileSize) {
  ctx.save();
  ctx.translate(cx, cy);
  // Main blocky base with extra plating
  ctx.fillStyle = '#388e3c';
  ctx.fillRect(-tileSize * 0.22, tileSize * 0.19, tileSize * 0.44, tileSize * 0.18);
  ctx.strokeStyle = '#111';
  ctx.lineWidth = 3;
  ctx.strokeRect(-tileSize * 0.22, tileSize * 0.19, tileSize * 0.44, tileSize * 0.18);
  // Extra metallic plating
  ctx.fillStyle = '#66bb6a';
  ctx.fillRect(-tileSize * 0.13, tileSize * 0.19, tileSize * 0.26, tileSize * 0.10);
  ctx.strokeStyle = '#b2ff59';
  ctx.lineWidth = 2;
  ctx.strokeRect(-tileSize * 0.13, tileSize * 0.19, tileSize * 0.26, tileSize * 0.10);
  // Panel lines
  ctx.strokeStyle = '#b2ff59';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(-tileSize * 0.11, tileSize * 0.19);
  ctx.lineTo(-tileSize * 0.11, tileSize * 0.37);
  ctx.moveTo(tileSize * 0.11, tileSize * 0.19);
  ctx.lineTo(tileSize * 0.11, tileSize * 0.37);
  ctx.stroke();
  // Subtle green energy glow
  ctx.save();
  ctx.globalAlpha = 0.18;
  ctx.shadowColor = '#b2ff59';
  ctx.shadowBlur = 18;
  ctx.fillStyle = '#b2ff59';
  ctx.beginPath();
  ctx.arc(0, tileSize * 0.28, tileSize * 0.26, 0, 2 * Math.PI);
  ctx.fill();
  ctx.restore();
  // Larger glowing core
  ctx.fillStyle = '#fff';
  ctx.globalAlpha = 0.8;
  ctx.beginPath();
  ctx.arc(0, tileSize * 0.28, tileSize * 0.10, 0, 2 * Math.PI);
  ctx.fill();
  ctx.globalAlpha = 1.0;
  ctx.restore();
}

export function drawSlowTowerLevel3Turret(ctx, cx, cy, tileSize, angle) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(angle);
  ctx.rotate(-Math.PI / 2);
  // Blocky barrel, with green highlight
  ctx.fillStyle = '#66bb6a';
  ctx.fillRect(-tileSize * 0.10, tileSize * 0.10, tileSize * 0.20, tileSize * 0.32);
  ctx.strokeStyle = '#388e3c';
  ctx.lineWidth = 2;
  ctx.strokeRect(-tileSize * 0.10, tileSize * 0.10, tileSize * 0.20, tileSize * 0.32);
  // Green highlight line
  ctx.strokeStyle = '#b2ff59';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(-tileSize * 0.10, tileSize * 0.26);
  ctx.lineTo(tileSize * 0.10, tileSize * 0.26);
  ctx.stroke();
  // Turret head (larger, with green glow)
  ctx.save();
  ctx.shadowColor = '#b2ff59';
  ctx.shadowBlur = 10;
  ctx.fillStyle = '#b2ff59';
  ctx.beginPath();
  ctx.arc(0, tileSize * 0.10, tileSize * 0.15, 0, 2 * Math.PI);
  ctx.fill();
  ctx.restore();
  ctx.restore();
} 