export function drawMissileSiloLevel5Base(ctx, cx, cy, tileSize) {
  ctx.save();
  ctx.translate(cx, cy);
  // Massive armored base
  ctx.fillStyle = '#616161';
  ctx.beginPath();
  ctx.arc(0, 0, tileSize * 0.5, 0, 2 * Math.PI);
  ctx.fill();
  // Five hatches in a pentagon/star
  ctx.strokeStyle = '#222';
  ctx.lineWidth = 4;
  for (let i = 0; i < 5; i++) {
    const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
    ctx.beginPath();
    ctx.arc(Math.cos(angle) * tileSize * 0.18, Math.sin(angle) * tileSize * 0.18, tileSize * 0.12, 0, 2 * Math.PI);
    ctx.stroke();
  }
  // Extra armor ring
  ctx.strokeStyle = '#ff5252';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(0, 0, tileSize * 0.42, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.restore();
}

export function drawMissileSiloLevel5Turret(ctx, cx, cy, tileSize, angle) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(angle);
  // Five missiles in a star
  for (let i = 0; i < 5; i++) {
    ctx.save();
    const missileAngle = (i * 2 * Math.PI) / 5;
    ctx.rotate(missileAngle);
    ctx.translate(0, -tileSize * 0.13);
    // Glow
    ctx.save();
    ctx.globalAlpha = 0.22;
    ctx.shadowColor = '#ff5252';
    ctx.shadowBlur = 18;
    ctx.beginPath();
    ctx.arc(tileSize * 0.18, 0, tileSize * 0.10, 0, 2 * Math.PI);
    ctx.fillStyle = '#ff5252';
    ctx.fill();
    ctx.restore();
    // Missile body
    ctx.fillStyle = '#bdbdbd';
    ctx.beginPath();
    ctx.ellipse(tileSize * 0.18, 0, tileSize * 0.17, tileSize * 0.10, 0, 0, 2 * Math.PI);
    ctx.fill();
    // Missile tip
    ctx.beginPath();
    ctx.arc(tileSize * 0.28, 0, tileSize * 0.07, 0, 2 * Math.PI);
    ctx.fillStyle = '#ff5252';
    ctx.fill();
    ctx.restore();
  }
  ctx.restore();
} 