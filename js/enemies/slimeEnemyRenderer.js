// Renderer for SlimeEnemy only
export function renderSlimeEnemy(slime, ctx) {
  const tileSize = Math.min(slime.canvas.width / slime.mapConfig.width, slime.canvas.height / slime.mapConfig.height);
  const px = slime.x * tileSize + tileSize / 2;
  const py = slime.y * tileSize + tileSize / 2;
  if (slime.wrapping && slime.targetTower) {
    // Draw at the tower's center, not the slime's
    const towerPx = slime.targetTower.tileX * tileSize + tileSize / 2;
    const towerPy = slime.targetTower.tileY * tileSize + tileSize / 2;
    ctx.save();
    ctx.translate(towerPx, towerPy);
    ctx.strokeStyle = '#43e043';
    ctx.lineWidth = 8;
    ctx.globalAlpha = 0.7;
    ctx.beginPath();
    ctx.arc(0, 0, tileSize * 0.32, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.globalAlpha = 1.0;
    // Draw gooey drips
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * 2 * Math.PI;
      ctx.beginPath();
      ctx.arc(Math.cos(angle) * tileSize * 0.32, Math.sin(angle) * tileSize * 0.32, tileSize * 0.07, 0, 2 * Math.PI);
      ctx.fillStyle = '#43e043';
      ctx.globalAlpha = 0.5 + 0.5 * Math.sin(Date.now() / 200 + i);
      ctx.fill();
    }
    ctx.globalAlpha = 1.0;
    ctx.restore();
  } else {
    ctx.save();
    ctx.translate(px, py);
    // Fast gooey blob
    ctx.fillStyle = '#43e043';
    ctx.beginPath();
    ctx.ellipse(0, 0, tileSize * 0.18 + Math.sin(Date.now() / 120) * tileSize * 0.03, tileSize * 0.15, 0, 0, 2 * Math.PI);
    ctx.shadowColor = '#aaffaa';
    ctx.shadowBlur = 16;
    ctx.fill();
    ctx.shadowBlur = 0;
    // Gooey drips
    for (let i = 0; i < 4; i++) {
      const angle = (i / 4) * 2 * Math.PI;
      ctx.beginPath();
      ctx.arc(Math.cos(angle) * tileSize * 0.18, Math.sin(angle) * tileSize * 0.18, tileSize * 0.05, 0, 2 * Math.PI);
      ctx.fillStyle = '#43e043';
      ctx.globalAlpha = 0.5 + 0.5 * Math.sin(Date.now() / 200 + i);
      ctx.fill();
    }
    ctx.globalAlpha = 1.0;
    ctx.restore();
  }
  // Health bar always at slime's position
  ctx.save();
  ctx.fillStyle = 'black';
  ctx.fillRect(px - tileSize * 0.18, py - tileSize * 0.34 - 10, tileSize * 0.36, 6);
  ctx.fillStyle = 'lime';
  ctx.fillRect(px - tileSize * 0.18, py - tileSize * 0.34 - 10, tileSize * 0.36 * (slime.health / slime.maxHealth), 6);
  ctx.strokeStyle = '#222';
  ctx.strokeRect(px - tileSize * 0.18, py - tileSize * 0.34 - 10, tileSize * 0.36, 6);
  ctx.restore();
} 