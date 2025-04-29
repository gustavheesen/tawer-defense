// Sniper Tower rendering
import { getTileSize } from '../../utils.js';

const LEVEL_COLORS = [
  // Level 1 (default, blue)
  { base: '#18304a', inner: '#225c7a', spike: '#3cf', core: '#3cf', coreInner: '#7ffcff', barrel: '#18304a', band1: '#225c7a', band2: '#3cf', band3: '#7ffcff', tip: '#0ff' },
  // Level 2 (green)
  { base: '#1a3a1a', inner: '#2e7d32', spike: '#00e676', core: '#00e676', coreInner: '#b9ffb0', barrel: '#1a3a1a', band1: '#388e3c', band2: '#69f0ae', band3: '#b9ffb0', tip: '#00e676' },
  // Level 3 (blue)
  { base: '#18304a', inner: '#225c7a', spike: '#3cf', core: '#3cf', coreInner: '#7ffcff', barrel: '#18304a', band1: '#225c7a', band2: '#3cf', band3: '#7ffcff', tip: '#0ff' },
  // Level 4 (purple)
  { base: '#2a184a', inner: '#7c2fa0', spike: '#d500f9', core: '#d500f9', coreInner: '#f3baff', barrel: '#2a184a', band1: '#7c2fa0', band2: '#ea80fc', band3: '#f3baff', tip: '#d500f9' },
  // Level 5 (orange)
  { base: '#4a2a18', inner: '#ff6f00', spike: '#ff9100', core: '#ff9100', coreInner: '#fff59d', barrel: '#4a2a18', band1: '#ff6f00', band2: '#ffb300', band3: '#fff59d', tip: '#ff9100' },
];

export function renderSniperTower(ctx, tower) {
  ctx.save();
  let px, py;
  if (tower.position && typeof tower.position.x === 'number' && typeof tower.position.y === 'number') {
    px = tower.position.x;
    py = tower.position.y;
  } else if (typeof tower.tileX === 'number' && typeof tower.tileY === 'number' && tower.canvas && tower.mapConfig) {
    const tileSize = getTileSize(tower.canvas, tower.mapConfig);
    px = tower.tileX * tileSize + tileSize / 2;
    py = tower.tileY * tileSize + tileSize / 2;
  } else {
    px = 0;
    py = 0;
  }
  ctx.translate(px, py);

  const lvl = Math.max(0, Math.min((tower.level || 1) - 1, 4));
  const c = LEVEL_COLORS[lvl];

  // Shadow
  ctx.save();
  ctx.globalAlpha = 0.18;
  ctx.beginPath();
  for (let i = 0; i < 8; i++) {
    const angle = (Math.PI / 4) * i;
    const r = 22;
    ctx.lineTo(Math.cos(angle) * r, Math.sin(angle) * r);
  }
  ctx.closePath();
  ctx.fillStyle = '#000';
  ctx.translate(2, 2);
  ctx.fill();
  ctx.restore();

  // Octagonal base (outer)
  ctx.beginPath();
  for (let i = 0; i < 8; i++) {
    const angle = (Math.PI / 4) * i;
    const r = 20;
    ctx.lineTo(Math.cos(angle) * r, Math.sin(angle) * r);
  }
  ctx.closePath();
  ctx.fillStyle = c.base;
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.strokeStyle = c.tip;
  ctx.stroke();

  // Octagonal base (inner)
  ctx.beginPath();
  for (let i = 0; i < 8; i++) {
    const angle = (Math.PI / 4) * i;
    const r = 14;
    ctx.lineTo(Math.cos(angle) * r, Math.sin(angle) * r);
  }
  ctx.closePath();
  ctx.fillStyle = c.inner;
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = c.band2;
  ctx.stroke();

  // Spikes
  for (let i = 0; i < 8; i++) {
    const angle = (Math.PI / 4) * i;
    const r1 = 20;
    const r2 = 32;
    ctx.beginPath();
    ctx.moveTo(Math.cos(angle) * r1, Math.sin(angle) * r1);
    ctx.lineTo(Math.cos(angle) * r2, Math.sin(angle) * r2);
    ctx.lineWidth = 5;
    ctx.strokeStyle = c.spike;
    ctx.shadowColor = c.tip;
    ctx.shadowBlur = 6;
    ctx.stroke();
    ctx.shadowBlur = 0;
  }

  // Central core (outer)
  ctx.beginPath();
  ctx.arc(0, 0, 9, 0, 2 * Math.PI);
  ctx.fillStyle = c.core;
  ctx.shadowColor = c.tip;
  ctx.shadowBlur = 8;
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.lineWidth = 2;
  ctx.strokeStyle = c.tip;
  ctx.stroke();

  // Central core (inner)
  ctx.beginPath();
  ctx.arc(0, 0, 5, 0, 2 * Math.PI);
  ctx.fillStyle = c.coreInner;
  ctx.fill();
  ctx.lineWidth = 1.5;
  ctx.strokeStyle = '#fff';
  ctx.stroke();

  // Barrel (with color bands), only this rotates
  ctx.save();
  ctx.rotate(tower.turretAngle || 0);
  ctx.fillStyle = c.barrel;
  ctx.fillRect(9, -6, 26, 12);
  ctx.strokeStyle = c.tip;
  ctx.lineWidth = 2;
  ctx.strokeRect(9, -6, 26, 12);
  ctx.fillStyle = c.band1;
  ctx.fillRect(13, -5, 5, 10);
  ctx.fillStyle = c.band2;
  ctx.fillRect(20, -4, 5, 8);
  ctx.fillStyle = c.band3;
  ctx.fillRect(27, -3, 5, 6);
  ctx.beginPath();
  ctx.arc(38, 0, 6, 0, 2 * Math.PI);
  ctx.fillStyle = c.tip;
  ctx.globalAlpha = 0.8;
  ctx.fill();
  ctx.globalAlpha = 1.0;
  ctx.lineWidth = 2;
  ctx.strokeStyle = c.band2;
  ctx.stroke();
  ctx.restore();

  ctx.restore();
} 