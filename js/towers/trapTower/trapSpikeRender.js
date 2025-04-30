export function drawTrapSpike(ctx, cx, cy, tileSize) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.lineJoin = 'miter';

  // Colors
  const bladeColor = '#6b7a8f'; // dark blue-gray
  const outlineColor = '#000';
  const tipColor = '#fff';
  const centerColor = '#b0bec5';

  // Pixel-art style sizes
  const rOuter = tileSize * 0.25;
  const rTip = tileSize * 0.32;
  const rInner = tileSize * 0.13;
  const rHole = tileSize * 0.09;

  // Draw 4 pixel-art blades
  for (let i = 0; i < 4; i++) {
    ctx.save();
    ctx.rotate((Math.PI / 2) * i);
    ctx.beginPath();
    // Blade shape (blocky, pixel style)
    ctx.moveTo(0, -rInner);
    ctx.lineTo(tileSize * 0.04, -rInner - tileSize * 0.04);
    ctx.lineTo(tileSize * 0.09, -rOuter + tileSize * 0.04);
    ctx.lineTo(tileSize * 0.11, -rOuter);
    ctx.lineTo(tileSize * 0.09, -rTip + tileSize * 0.01);
    ctx.lineTo(0, -rTip);
    ctx.lineTo(-tileSize * 0.09, -rTip + tileSize * 0.01);
    ctx.lineTo(-tileSize * 0.11, -rOuter);
    ctx.lineTo(-tileSize * 0.09, -rOuter + tileSize * 0.04);
    ctx.lineTo(-tileSize * 0.04, -rInner - tileSize * 0.04);
    ctx.closePath();
    ctx.fillStyle = bladeColor;
    ctx.fill();
    ctx.strokeStyle = outlineColor;
    ctx.lineWidth = 2.5;
    ctx.stroke();
    // White tip (blocky)
    ctx.beginPath();
    ctx.moveTo(0, -rTip);
    ctx.lineTo(tileSize * 0.09, -rTip + tileSize * 0.01);
    ctx.lineTo(tileSize * 0.11, -rOuter);
    ctx.lineTo(-tileSize * 0.11, -rOuter);
    ctx.lineTo(-tileSize * 0.09, -rTip + tileSize * 0.01);
    ctx.closePath();
    ctx.fillStyle = tipColor;
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  // Draw center hole (pixel style)
  ctx.beginPath();
  ctx.arc(0, 0, rHole, 0, 2 * Math.PI);
  ctx.fillStyle = centerColor;
  ctx.globalAlpha = 1.0;
  ctx.fill();
  ctx.strokeStyle = outlineColor;
  ctx.lineWidth = 2.2;
  ctx.stroke();

  ctx.restore();
} 