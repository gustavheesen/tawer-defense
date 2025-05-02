// Tesla Tower rendering
export function renderTeslaTower(ctx, tower) {
  ctx.save();
  let px, py;
  if (typeof tower.tileX === 'number' && typeof tower.tileY === 'number' && tower.canvas && tower.mapConfig) {
    const tileSize = Math.min(tower.canvas.width / tower.mapConfig.width, tower.canvas.height / tower.mapConfig.height);
    px = tower.tileX * tileSize + tileSize / 2;
    py = tower.tileY * tileSize + tileSize / 2;
  } else if (tower.position && typeof tower.position.x === 'number' && typeof tower.position.y === 'number') {
    px = tower.position.x;
    py = tower.position.y;
  } else {
    px = 0;
    py = 0;
  }
  ctx.translate(px, py);
  // Draw base circle
  ctx.beginPath();
  ctx.arc(0, 0, 18, 0, 2 * Math.PI);
  ctx.fillStyle = '#222a44';
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.strokeStyle = '#00eaff';
  ctx.stroke();
  // Draw electric orb
  ctx.beginPath();
  ctx.arc(0, 0, 10, 0, 2 * Math.PI);
  ctx.fillStyle = '#00eaff';
  ctx.shadowColor = '#00eaff';
  ctx.shadowBlur = 12;
  ctx.fill();
  ctx.shadowBlur = 0;
  // Draw tower rods
  for (let i = 0; i < 3; i++) {
    const angle = (Math.PI * 2 / 3) * i;
    ctx.save();
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -22);
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#b3f0ff';
    ctx.stroke();
    ctx.restore();
  }
  ctx.restore();
}

export function renderTeslaTowerLevel1(ctx, tower) {
  ctx.save();
  let px, py;
  const tileSize = Math.min(tower.canvas.width / tower.mapConfig.width, tower.canvas.height / tower.mapConfig.height);
  px = tower.tileX * tileSize + tileSize / 2;
  py = tower.tileY * tileSize + tileSize / 2;
  ctx.translate(px, py);
  ctx.beginPath();
  ctx.arc(0, 0, 18, 0, 2 * Math.PI);
  ctx.fillStyle = '#222a44';
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.strokeStyle = '#00eaff';
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, 10, 0, 2 * Math.PI);
  ctx.fillStyle = '#00eaff';
  ctx.shadowColor = '#00eaff';
  ctx.shadowBlur = 12;
  ctx.fill();
  ctx.shadowBlur = 0;
  for (let i = 0; i < 3; i++) {
    const angle = (Math.PI * 2 / 3) * i;
    ctx.save();
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -22);
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#b3f0ff';
    ctx.stroke();
    ctx.restore();
  }
  ctx.restore();
}

export function renderTeslaTowerLevel2(ctx, tower) {
  ctx.save();
  let px, py;
  const tileSize = Math.min(tower.canvas.width / tower.mapConfig.width, tower.canvas.height / tower.mapConfig.height);
  px = tower.tileX * tileSize + tileSize / 2;
  py = tower.tileY * tileSize + tileSize / 2;
  ctx.translate(px, py);
  ctx.beginPath();
  ctx.arc(0, 0, 20, 0, 2 * Math.PI);
  ctx.fillStyle = '#444488';
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.strokeStyle = '#00ffea';
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, 12, 0, 2 * Math.PI);
  ctx.fillStyle = '#00ffea';
  ctx.shadowColor = '#00ffea';
  ctx.shadowBlur = 14;
  ctx.fill();
  ctx.shadowBlur = 0;
  for (let i = 0; i < 4; i++) {
    const angle = (Math.PI * 2 / 4) * i;
    ctx.save();
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -24);
    ctx.lineWidth = 6;
    ctx.strokeStyle = '#b3fff0';
    ctx.stroke();
    ctx.restore();
  }
  ctx.restore();
}

export function renderTeslaTowerLevel3(ctx, tower) {
  ctx.save();
  let px, py;
  const tileSize = Math.min(tower.canvas.width / tower.mapConfig.width, tower.canvas.height / tower.mapConfig.height);
  px = tower.tileX * tileSize + tileSize / 2;
  py = tower.tileY * tileSize + tileSize / 2;
  ctx.translate(px, py);
  ctx.beginPath();
  ctx.arc(0, 0, 22, 0, 2 * Math.PI);
  ctx.fillStyle = '#222266';
  ctx.fill();
  ctx.lineWidth = 5;
  ctx.strokeStyle = '#00ffb3';
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, 14, 0, 2 * Math.PI);
  ctx.fillStyle = '#00ffb3';
  ctx.shadowColor = '#00ffb3';
  ctx.shadowBlur = 16;
  ctx.fill();
  ctx.shadowBlur = 0;
  for (let i = 0; i < 5; i++) {
    const angle = (Math.PI * 2 / 5) * i;
    ctx.save();
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -26);
    ctx.lineWidth = 7;
    ctx.strokeStyle = '#b3ffd9';
    ctx.stroke();
    ctx.restore();
  }
  ctx.restore();
}

export function renderTeslaTowerLevel4(ctx, tower) {
  ctx.save();
  let px, py;
  const tileSize = Math.min(tower.canvas.width / tower.mapConfig.width, tower.canvas.height / tower.mapConfig.height);
  px = tower.tileX * tileSize + tileSize / 2;
  py = tower.tileY * tileSize + tileSize / 2;
  ctx.translate(px, py);
  ctx.beginPath();
  ctx.arc(0, 0, 24, 0, 2 * Math.PI);
  ctx.fillStyle = '#333399';
  ctx.fill();
  ctx.lineWidth = 6;
  ctx.strokeStyle = '#00ff66';
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, 16, 0, 2 * Math.PI);
  ctx.fillStyle = '#00ff66';
  ctx.shadowColor = '#00ff66';
  ctx.shadowBlur = 18;
  ctx.fill();
  ctx.shadowBlur = 0;
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI * 2 / 6) * i;
    ctx.save();
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -28);
    ctx.lineWidth = 8;
    ctx.strokeStyle = '#b3ffb3';
    ctx.stroke();
    ctx.restore();
  }
  ctx.restore();
}

export function renderTeslaTowerLevel5(ctx, tower) {
  ctx.save();
  let px, py;
  const tileSize = Math.min(tower.canvas.width / tower.mapConfig.width, tower.canvas.height / tower.mapConfig.height);
  px = tower.tileX * tileSize + tileSize / 2;
  py = tower.tileY * tileSize + tileSize / 2;
  ctx.translate(px, py);
  ctx.beginPath();
  ctx.arc(0, 0, 27, 0, 2 * Math.PI);
  ctx.fillStyle = '#000080';
  ctx.fill();
  ctx.lineWidth = 8;
  ctx.strokeStyle = '#fff700';
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, 20, 0, 2 * Math.PI);
  ctx.fillStyle = '#fff700';
  ctx.shadowColor = '#fff700';
  ctx.shadowBlur = 22;
  ctx.fill();
  ctx.shadowBlur = 0;
  for (let i = 0; i < 8; i++) {
    const angle = (Math.PI * 2 / 8) * i;
    ctx.save();
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -32);
    ctx.lineWidth = 10;
    ctx.strokeStyle = '#fffbe0';
    ctx.stroke();
    ctx.restore();
  }
  ctx.restore();
} 