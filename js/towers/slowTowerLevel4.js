export function drawSlowTowerLevel4Base(ctx, cx, cy, tileSize) {
  ctx.save();
  ctx.translate(cx, cy);
  // Main blocky base with reinforced gold edges
  ctx.fillStyle = '#ffb300';
  ctx.fillRect(-tileSize * 0.22, tileSize * 0.19, tileSize * 0.44, tileSize * 0.18);
  ctx.strokeStyle = '#111';
  ctx.lineWidth = 4;
  ctx.strokeRect(-tileSize * 0.22, tileSize * 0.19, tileSize * 0.44, tileSize * 0.18);
  // Reinforced gold edges
  ctx.strokeStyle = '#ffd600';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(-tileSize * 0.22, tileSize * 0.19);
  ctx.lineTo(tileSize * 0.22, tileSize * 0.19);
  ctx.moveTo(-tileSize * 0.22, tileSize * 0.37);
  ctx.lineTo(tileSize * 0.22, tileSize * 0.37);
  ctx.stroke();
  // Extra glowing lines
  ctx.strokeStyle = '#ffe082';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(-tileSize * 0.11, tileSize * 0.19);
  ctx.lineTo(-tileSize * 0.11, tileSize * 0.37);
  ctx.moveTo(tileSize * 0.11, tileSize * 0.19);
  ctx.lineTo(tileSize * 0.11, tileSize * 0.37);
  ctx.stroke();
  // Subtle gold glow
  ctx.save();
  ctx.globalAlpha = 0.18;
  ctx.shadowColor = '#ffe082';
  ctx.shadowBlur = 22;
  ctx.fillStyle = '#ffe082';
  ctx.beginPath();
  ctx.arc(0, tileSize * 0.28, tileSize * 0.29, 0, 2 * Math.PI);
  ctx.fill();
  ctx.restore();
  // Larger glowing core
  ctx.fillStyle = '#fff';
  ctx.globalAlpha = 0.9;
  ctx.beginPath();
  ctx.arc(0, tileSize * 0.28, tileSize * 0.13, 0, 2 * Math.PI);
  ctx.fill();
  ctx.globalAlpha = 1.0;
  ctx.restore();
}

export function drawSlowTowerLevel4Turret(ctx, cx, cy, tileSize, angle) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(angle);
  ctx.rotate(-Math.PI / 2);
  // Blocky barrel, with gold highlight
  ctx.fillStyle = '#ffd600';
  ctx.fillRect(-tileSize * 0.10, tileSize * 0.10, tileSize * 0.20, tileSize * 0.32);
  ctx.strokeStyle = '#ffb300';
  ctx.lineWidth = 3;
  ctx.strokeRect(-tileSize * 0.10, tileSize * 0.10, tileSize * 0.20, tileSize * 0.32);
  // Gold highlight line
  ctx.strokeStyle = '#fffde7';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(-tileSize * 0.10, tileSize * 0.26);
  ctx.lineTo(tileSize * 0.10, tileSize * 0.26);
  ctx.stroke();
  // Turret head (larger, with gold glow)
  ctx.save();
  ctx.shadowColor = '#ffe082';
  ctx.shadowBlur = 14;
  ctx.fillStyle = '#ffe082';
  ctx.beginPath();
  ctx.arc(0, tileSize * 0.10, tileSize * 0.18, 0, 2 * Math.PI);
  ctx.fill();
  ctx.restore();
  ctx.restore();
} 