export function drawSlowTowerLevel2Base(ctx, cx, cy, tileSize) {
  ctx.save();
  ctx.translate(cx, cy);
  // Main blocky base (like level 1, but with more detail)
  ctx.fillStyle = '#1976d2';
  ctx.fillRect(-tileSize * 0.22, tileSize * 0.19, tileSize * 0.44, tileSize * 0.18);
  ctx.strokeStyle = '#111';
  ctx.lineWidth = 3;
  ctx.strokeRect(-tileSize * 0.22, tileSize * 0.19, tileSize * 0.44, tileSize * 0.18);
  // Extra panel lines
  ctx.strokeStyle = '#64b5f6';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(-tileSize * 0.11, tileSize * 0.19);
  ctx.lineTo(-tileSize * 0.11, tileSize * 0.37);
  ctx.moveTo(tileSize * 0.11, tileSize * 0.19);
  ctx.lineTo(tileSize * 0.11, tileSize * 0.37);
  ctx.stroke();
  // Subtle blue glow
  ctx.save();
  ctx.globalAlpha = 0.18;
  ctx.shadowColor = '#4fc3f7';
  ctx.shadowBlur = 16;
  ctx.fillStyle = '#4fc3f7';
  ctx.beginPath();
  ctx.arc(0, tileSize * 0.28, tileSize * 0.23, 0, 2 * Math.PI);
  ctx.fill();
  ctx.restore();
  // Small glowing core
  ctx.fillStyle = '#fff';
  ctx.globalAlpha = 0.7;
  ctx.beginPath();
  ctx.arc(0, tileSize * 0.28, tileSize * 0.07, 0, 2 * Math.PI);
  ctx.fill();
  ctx.globalAlpha = 1.0;
  ctx.restore();
}

export function drawSlowTowerLevel2Turret(ctx, cx, cy, tileSize, angle) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(angle);
  ctx.rotate(-Math.PI / 2);
  // Blocky barrel, with blue highlight
  ctx.fillStyle = '#4fc3f7';
  ctx.fillRect(-tileSize * 0.10, tileSize * 0.10, tileSize * 0.20, tileSize * 0.32);
  ctx.strokeStyle = '#1976d2';
  ctx.lineWidth = 2;
  ctx.strokeRect(-tileSize * 0.10, tileSize * 0.10, tileSize * 0.20, tileSize * 0.32);
  // Blue highlight line
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(-tileSize * 0.10, tileSize * 0.26);
  ctx.lineTo(tileSize * 0.10, tileSize * 0.26);
  ctx.stroke();
  // Turret head (slightly larger, with glow)
  ctx.save();
  ctx.shadowColor = '#4fc3f7';
  ctx.shadowBlur = 8;
  ctx.fillStyle = '#2196f3';
  ctx.beginPath();
  ctx.arc(0, tileSize * 0.10, tileSize * 0.12, 0, 2 * Math.PI);
  ctx.fill();
  ctx.restore();
  ctx.restore();
} 