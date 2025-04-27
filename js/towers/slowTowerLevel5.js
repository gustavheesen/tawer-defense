export function drawSlowTowerLevel5Base(ctx, cx, cy, tileSize) {
  ctx.save();
  ctx.translate(cx, cy);
  // Main blocky base with multiple reinforced layers
  ctx.fillStyle = '#fffde7';
  ctx.fillRect(-tileSize * 0.26, tileSize * 0.15, tileSize * 0.52, tileSize * 0.24);
  ctx.strokeStyle = '#9c27b0';
  ctx.lineWidth = 6;
  ctx.strokeRect(-tileSize * 0.26, tileSize * 0.15, tileSize * 0.52, tileSize * 0.24);
  // Inner purple layer
  ctx.fillStyle = '#ba68c8';
  ctx.fillRect(-tileSize * 0.18, tileSize * 0.19, tileSize * 0.36, tileSize * 0.16);
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 3;
  ctx.strokeRect(-tileSize * 0.18, tileSize * 0.19, tileSize * 0.36, tileSize * 0.16);
  // Animated/glowing effect (pulsing aura)
  ctx.save();
  ctx.globalAlpha = 0.22 + 0.10 * Math.sin(Date.now() / 200);
  ctx.shadowColor = '#fff';
  ctx.shadowBlur = 32;
  ctx.fillStyle = '#fff';
  ctx.beginPath();
  ctx.arc(0, tileSize * 0.28, tileSize * 0.38, 0, 2 * Math.PI);
  ctx.fill();
  ctx.restore();
  // Huge glowing core
  ctx.save();
  ctx.shadowColor = '#fff';
  ctx.shadowBlur = 18;
  ctx.globalAlpha = 0.95;
  ctx.fillStyle = '#fff';
  ctx.beginPath();
  ctx.arc(0, tileSize * 0.28, tileSize * 0.17, 0, 2 * Math.PI);
  ctx.fill();
  ctx.restore();
  ctx.globalAlpha = 1.0;
  ctx.restore();
}

export function drawSlowTowerLevel5Turret(ctx, cx, cy, tileSize, angle) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(angle);
  ctx.rotate(-Math.PI / 2);
  // Blocky, ultimate turret with glowing and reinforced details
  ctx.fillStyle = '#fffde7';
  ctx.fillRect(-tileSize * 0.10, tileSize * 0.10, tileSize * 0.20, tileSize * 0.32);
  ctx.strokeStyle = '#9c27b0';
  ctx.lineWidth = 5;
  ctx.strokeRect(-tileSize * 0.10, tileSize * 0.10, tileSize * 0.20, tileSize * 0.32);
  // Purple highlight
  ctx.strokeStyle = '#ba68c8';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(-tileSize * 0.10, tileSize * 0.26);
  ctx.lineTo(tileSize * 0.10, tileSize * 0.26);
  ctx.stroke();
  // Turret head (huge, glowing)
  ctx.save();
  ctx.shadowColor = '#fff';
  ctx.shadowBlur = 18;
  ctx.fillStyle = '#fff';
  ctx.beginPath();
  ctx.arc(0, tileSize * 0.10, tileSize * 0.22, 0, 2 * Math.PI);
  ctx.fill();
  ctx.restore();
  ctx.restore();
} 