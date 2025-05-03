// Placeholder: Barrier Tower does not shoot projectiles, but this file is for consistency
export function renderBarrierProjectile(ctx, projectile) {
  // Optionally, draw a faint shield effect at the projectile location
  ctx.save();
  ctx.globalAlpha = 0.2;
  ctx.beginPath();
  ctx.arc(projectile.x, projectile.y, 18, 0, 2 * Math.PI);
  ctx.fillStyle = '#4CAF50';
  ctx.fill();
  ctx.restore();
} 