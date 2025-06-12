import { getTileSize } from '../utils.js';

export function renderBossInfantryEnemy(enemy, ctx) {
  const tileSize = getTileSize(enemy.canvas, enemy.mapConfig) * 1.3; // Boss is larger
  const px = enemy.x * tileSize + tileSize / 2;
  const py = enemy.y * tileSize + tileSize / 2;
  ctx.save();
  ctx.translate(px, py);
  ctx.rotate(enemy.angle);
  // Floating shadow
  ctx.save();
  ctx.globalAlpha = 0.25;
  ctx.fillStyle = '#222';
  ctx.ellipse(0, tileSize * 0.32, tileSize * 0.22, tileSize * 0.09, 0, 0, 2 * Math.PI);
  ctx.fill();
  ctx.restore();
  // Tattered robe (body, boss color)
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(-tileSize * 0.22, tileSize * 0.22);
  ctx.lineTo(-tileSize * 0.16, tileSize * 0.07);
  ctx.lineTo(-tileSize * 0.12, tileSize * 0.26);
  ctx.lineTo(-tileSize * 0.05, tileSize * 0.10);
  ctx.lineTo(0, tileSize * 0.26);
  ctx.lineTo(tileSize * 0.05, tileSize * 0.10);
  ctx.lineTo(tileSize * 0.12, tileSize * 0.26);
  ctx.lineTo(tileSize * 0.16, tileSize * 0.07);
  ctx.lineTo(tileSize * 0.22, tileSize * 0.22);
  ctx.lineTo(0, tileSize * 0.38);
  ctx.closePath();
  ctx.fillStyle = '#b71c1c'; // Boss color
  ctx.fill();
  // Belt
  ctx.fillStyle = '#ffd600';
  ctx.fillRect(-tileSize * 0.12, tileSize * 0.17, tileSize * 0.24, tileSize * 0.05);
  ctx.beginPath();
  ctx.arc(0, tileSize * 0.19, tileSize * 0.03, 0, 2 * Math.PI);
  ctx.fillStyle = '#ffeb3b';
  ctx.fill();
  ctx.restore();
  // Spear (held out front)
  ctx.save();
  ctx.rotate(-Math.PI / 6);
  ctx.strokeStyle = '#2d2d38';
  ctx.lineWidth = tileSize * 0.08;
  ctx.beginPath();
  ctx.moveTo(tileSize * 0.12, tileSize * 0.07);
  ctx.lineTo(tileSize * 0.46, -tileSize * 0.06);
  ctx.stroke();
  ctx.lineWidth = tileSize * 0.04;
  ctx.strokeStyle = '#444';
  ctx.beginPath();
  ctx.moveTo(tileSize * 0.46, -tileSize * 0.06);
  ctx.lineTo(tileSize * 0.58, -tileSize * 0.13);
  ctx.stroke();
  ctx.restore();
  // Head/hood
  ctx.save();
  ctx.beginPath();
  ctx.ellipse(0, -tileSize * 0.12, tileSize * 0.20, tileSize * 0.22, 0, 0, 2 * Math.PI);
  ctx.fillStyle = '#b71c1c';
  ctx.fill();
  // Horns
  ctx.strokeStyle = '#ffd600';
  ctx.lineWidth = tileSize * 0.05;
  ctx.beginPath();
  ctx.moveTo(-tileSize * 0.09, -tileSize * 0.26);
  ctx.lineTo(-tileSize * 0.17, -tileSize * 0.34);
  ctx.moveTo(tileSize * 0.09, -tileSize * 0.26);
  ctx.lineTo(tileSize * 0.17, -tileSize * 0.34);
  ctx.stroke();
  // Face
  ctx.beginPath();
  ctx.ellipse(0, -tileSize * 0.12, tileSize * 0.11, tileSize * 0.12, 0, 0, 2 * Math.PI);
  ctx.fillStyle = '#fffde7';
  ctx.fill();
  // Eye
  ctx.beginPath();
  ctx.arc(tileSize * 0.05, -tileSize * 0.13, tileSize * 0.03, 0, 2 * Math.PI);
  ctx.fillStyle = '#ff6f00';
  ctx.fill();
  // Fangs
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = tileSize * 0.016;
  ctx.beginPath();
  ctx.moveTo(-tileSize * 0.04, -tileSize * 0.05);
  ctx.lineTo(-tileSize * 0.05, -tileSize * 0.01);
  ctx.moveTo(tileSize * 0.04, -tileSize * 0.05);
  ctx.lineTo(tileSize * 0.05, -tileSize * 0.01);
  ctx.stroke();
  // Mouth
  ctx.strokeStyle = '#b71c1c';
  ctx.lineWidth = tileSize * 0.012;
  ctx.beginPath();
  ctx.arc(0, -tileSize * 0.04, tileSize * 0.04, 0, Math.PI);
  ctx.stroke();
  ctx.restore();
  ctx.restore();
  // Health bar
  ctx.save();
  ctx.fillStyle = 'black';
  ctx.fillRect(px - tileSize * 0.4, py - tileSize * 0.7 - 10, tileSize * 0.8, 8);
  ctx.fillStyle = '#ff1744';
  ctx.fillRect(px - tileSize * 0.4, py - tileSize * 0.7 - 10, tileSize * 0.8 * (enemy.health / enemy.maxHealth), 8);
  ctx.strokeStyle = '#222';
  ctx.strokeRect(px - tileSize * 0.4, py - tileSize * 0.7 - 10, tileSize * 0.8, 8);
  ctx.restore();
} 