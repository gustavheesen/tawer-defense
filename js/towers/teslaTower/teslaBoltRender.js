// Tesla Bolt rendering
export function renderTeslaBolt(ctx, bolt) {
  if (!bolt.chainTargets || bolt.chainTargets.length === 0) return;
  const tileSize = bolt.tileSize || 32;
  let prev = { x: bolt.position.x, y: bolt.position.y };

  function drawLightningSegment(ctx, x1, y1, x2, y2, color, width, glow) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const steps = Math.max(7, Math.floor(dist / 10));
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.shadowColor = color;
    ctx.shadowBlur = glow;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    for (let i = 1; i < steps; i++) {
      const t = i / steps;
      const strength = Math.sin(Math.PI * t);
      const offset = (Math.random() - 0.5) * 32 * strength;
      const nx = -dy / dist;
      const ny = dx / dist;
      const px = x1 + dx * t + nx * offset;
      const py = y1 + dy * t + ny * offset;
      ctx.lineTo(px, py);
    }
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.restore();
  }

  for (const enemy of bolt.chainTargets) {
    if (!enemy || !enemy.alive) continue;
    const ex = (enemy.x * tileSize) + tileSize / 2;
    const ey = (enemy.y * tileSize) + tileSize / 2;
    drawLightningSegment(ctx, prev.x, prev.y, ex, ey, '#00eaff', 9, 32);
    drawLightningSegment(ctx, prev.x, prev.y, ex, ey, '#ffffff', 4, 6);
    prev = { x: ex, y: ey };
  }
} 