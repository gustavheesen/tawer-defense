// Sniper Projectile rendering
export function renderSniperProjectile(ctx, projectile) {
  ctx.save();
  ctx.translate(projectile.position.x, projectile.position.y);
  ctx.rotate(projectile.angle);

  // Draw black outline (smaller, pixel-art style)
  ctx.save();
  ctx.lineWidth = 2.5;
  ctx.strokeStyle = '#111';
  ctx.strokeRect(-1, -3, 11, 6);
  ctx.restore();

  // Draw main yellow body (smaller)
  ctx.fillStyle = '#ffe600';
  ctx.fillRect(-1, -3, 7, 6);

  // Draw lighter yellow tip
  ctx.fillStyle = '#ffff99';
  ctx.fillRect(6, -3, 3, 6);

  // Draw black cone tip (triangle)
  ctx.beginPath();
  ctx.moveTo(9, -3); // left base
  ctx.lineTo(9, 3);  // right base
  ctx.lineTo(13, 0); // tip
  ctx.closePath();
  ctx.fillStyle = '#111';
  ctx.fill();

  ctx.restore();
} 