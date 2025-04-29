// Sniper Projectile rendering
export function renderSniperProjectile(ctx, projectile) {
  ctx.save();
  ctx.translate(projectile.position.x, projectile.position.y);
  ctx.rotate(projectile.angle);
  ctx.fillStyle = '#f00';
  ctx.fillRect(-2, -1, 12, 2);
  ctx.restore();
} 