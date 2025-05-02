import { drawTrapSpike } from './trapSpikeRender.js';

export function drawTrapTowerBaseLevel1(ctx, cx, cy, tileSize) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.beginPath();
  ctx.arc(0, 0, tileSize * 0.35, 0, 2 * Math.PI);
  ctx.fillStyle = '#b8860b'; // dark gold
  ctx.fill();
  ctx.strokeStyle = '#333';
  ctx.lineWidth = 3;
  ctx.stroke();
  for (let i = 0; i < 8; i++) {
    const angle = (Math.PI * 2 * i) / 8;
    ctx.save();
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(0, -tileSize * 0.35);
    ctx.lineTo(-tileSize * 0.07, -tileSize * 0.48);
    ctx.lineTo(tileSize * 0.07, -tileSize * 0.48);
    ctx.closePath();
    ctx.fillStyle = '#ffd700';
    ctx.fill();
    ctx.restore();
  }
  ctx.restore();
}

export function drawTrapTowerBaseLevel2(ctx, cx, cy, tileSize) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.beginPath();
  ctx.arc(0, 0, tileSize * 0.37, 0, 2 * Math.PI);
  ctx.fillStyle = '#c0c0c0'; // silver
  ctx.fill();
  ctx.strokeStyle = '#444';
  ctx.lineWidth = 3;
  ctx.stroke();
  for (let i = 0; i < 10; i++) {
    const angle = (Math.PI * 2 * i) / 10;
    ctx.save();
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(0, -tileSize * 0.37);
    ctx.lineTo(-tileSize * 0.06, -tileSize * 0.52);
    ctx.lineTo(tileSize * 0.06, -tileSize * 0.52);
    ctx.closePath();
    ctx.fillStyle = '#e0e0e0';
    ctx.fill();
    ctx.restore();
  }
  ctx.restore();
}

export function drawTrapTowerBaseLevel3(ctx, cx, cy, tileSize) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.beginPath();
  ctx.arc(0, 0, tileSize * 0.39, 0, 2 * Math.PI);
  ctx.fillStyle = '#8b0000'; // dark red
  ctx.fill();
  ctx.strokeStyle = '#222';
  ctx.lineWidth = 4;
  ctx.stroke();
  for (let i = 0; i < 12; i++) {
    const angle = (Math.PI * 2 * i) / 12;
    ctx.save();
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(0, -tileSize * 0.39);
    ctx.lineTo(-tileSize * 0.08, -tileSize * 0.56);
    ctx.lineTo(tileSize * 0.08, -tileSize * 0.56);
    ctx.closePath();
    ctx.fillStyle = '#ff6666';
    ctx.fill();
    ctx.restore();
  }
  ctx.restore();
}

export function drawTrapTowerBaseLevel4(ctx, cx, cy, tileSize) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.beginPath();
  ctx.arc(0, 0, tileSize * 0.41, 0, 2 * Math.PI);
  ctx.fillStyle = '#006400'; // dark green
  ctx.fill();
  ctx.strokeStyle = '#111';
  ctx.lineWidth = 5;
  ctx.stroke();
  for (let i = 0; i < 14; i++) {
    const angle = (Math.PI * 2 * i) / 14;
    ctx.save();
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(0, -tileSize * 0.41);
    ctx.lineTo(-tileSize * 0.09, -tileSize * 0.60);
    ctx.lineTo(tileSize * 0.09, -tileSize * 0.60);
    ctx.closePath();
    ctx.fillStyle = '#66ff66';
    ctx.fill();
    ctx.restore();
  }
  ctx.restore();
}

export function drawTrapTowerBaseLevel5(ctx, cx, cy, tileSize) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.beginPath();
  ctx.arc(0, 0, tileSize * 0.44, 0, 2 * Math.PI);
  ctx.fillStyle = '#191970'; // midnight blue
  ctx.fill();
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 6;
  ctx.stroke();
  for (let i = 0; i < 16; i++) {
    const angle = (Math.PI * 2 * i) / 16;
    ctx.save();
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(0, -tileSize * 0.44);
    ctx.lineTo(-tileSize * 0.10, -tileSize * 0.66);
    ctx.lineTo(tileSize * 0.10, -tileSize * 0.66);
    ctx.closePath();
    ctx.fillStyle = '#b0c4de';
    ctx.fill();
    ctx.restore();
  }
  ctx.restore();
}

// For compatibility, keep the original as Level1
export { drawTrapTowerBaseLevel1 as drawTrapTowerBase };

export function drawTrapSpikes(ctx, spikes, tileSize) {
  for (const spike of spikes) {
    const cx = spike.x * tileSize + tileSize / 2;
    const cy = spike.y * tileSize + tileSize / 2;
    drawTrapSpike(ctx, cx, cy, tileSize);
  }
} 