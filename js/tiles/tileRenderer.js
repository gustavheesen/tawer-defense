// Pixel-art tile renderer for Tower Defense
// Draws a layered, dark square with border effect

export function drawTile(ctx, x, y, size) {
  // Outer border
  ctx.save();
  ctx.fillStyle = '#49505a'; // outermost
  ctx.fillRect(x, y, size, size);

  // Middle border
  ctx.fillStyle = '#3a3d43';
  ctx.fillRect(x + size * 0.08, y + size * 0.08, size * 0.84, size * 0.84);

  // Inner border
  ctx.fillStyle = '#32343a';
  ctx.fillRect(x + size * 0.18, y + size * 0.18, size * 0.64, size * 0.64);

  // Center
  ctx.fillStyle = '#232428';
  ctx.fillRect(x + size * 0.28, y + size * 0.28, size * 0.44, size * 0.44);

  ctx.restore();
} 