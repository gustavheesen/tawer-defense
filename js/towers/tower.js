import { loadConfig } from '../config.js';
import { getTileSize } from '../utils.js';

export class Tower {
  constructor(tileX, tileY, mapConfig, canvas, path) {
    const config = loadConfig();
    this.tileX = tileX;
    this.tileY = tileY;
    this.mapConfig = mapConfig;
    this.canvas = canvas;
    this.fireRate = config.towerFireRate;
    this.rangeTiles = config.baseTowerRange; // Range in tiles
    this.cooldown = 0;
    this.turretAngle = 0; // radians
    this.turretTurnSpeed = Math.PI; // radians per second (180 deg/sec)
    // Store path start point for idle aiming
    this.pathStart = path?.[0] || null;
  }

  update(delta, enemies, projectiles) {
    this.cooldown -= delta;
    // Center of tower in tile units
    const cx = this.tileX + 0.5;
    const cy = this.tileY + 0.5;
    const rangeTiles = this.rangeTiles;

    let nearest = null;
    let nearestDist = Infinity;
    let targetAngle = this.turretAngle;
    for (const enemy of enemies) {
      // Enemy x/y are in tile units
      const dx = enemy.x - cx;
      const dy = enemy.y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < rangeTiles && dist < nearestDist) {
        nearest = enemy;
        nearestDist = dist;
        targetAngle = Math.atan2(dy, dx);
      }
    }

    // If no enemy in range, aim at path start point
    if (!nearest && this.pathStart) {
      const startX = this.pathStart.x + 0.5;
      const startY = this.pathStart.y + 0.5;
      targetAngle = Math.atan2(startY - cy, startX - cx);
    }

    // Rotate turret toward target
    function angleDiff(a, b) {
      let d = a - b;
      while (d > Math.PI) d -= 2 * Math.PI;
      while (d < -Math.PI) d += 2 * Math.PI;
      return d;
    }
    let diff = angleDiff(targetAngle, this.turretAngle);
    const maxTurn = this.turretTurnSpeed * delta;
    if (Math.abs(diff) < maxTurn) {
      this.turretAngle = targetAngle;
    } else {
      this.turretAngle += Math.sign(diff) * maxTurn;
    }

    // Only fire if aimed within 5 degrees
    if (nearest && this.cooldown <= 0 && Math.abs(angleDiff(targetAngle, this.turretAngle)) < 0.087) {
      this.fireProjectile(cx, cy, projectiles);
      this.cooldown = 1 / this.fireRate;
    }
  }

  fireProjectile(cx, cy, projectiles) {
    // To be implemented by subclasses
    // cx, cy are in tile units
  }

  render(ctx) {
    // Convert tile coordinates to pixel coordinates for rendering
    const tileSize = getTileSize(this.canvas, this.mapConfig);
    const px = this.tileX * tileSize + tileSize / 2;
    const py = this.tileY * tileSize + tileSize / 2;
    ctx.save();
    // Draw range (for debugging)
    ctx.globalAlpha = 0.1;
    ctx.beginPath();
    ctx.arc(px, py, this.rangeTiles * tileSize, 0, 2 * Math.PI);
    ctx.fillStyle = 'blue';
    ctx.fill();
    ctx.globalAlpha = 1.0;
    // Draw tower base
    ctx.fillStyle = '#888';
    ctx.beginPath();
    ctx.arc(px, py, tileSize * 0.4, 0, 2 * Math.PI);
    ctx.fill();
    ctx.strokeStyle = '#222';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();
  }

  renderPreview(ctx, tileX, tileY, isValidPlacement) {
    const tileSize = getTileSize(this.canvas, this.mapConfig);
    const cx = tileX * tileSize + tileSize / 2;
    const cy = tileY * tileSize + tileSize / 2;

    ctx.save();
    if (isValidPlacement) {
      // Draw transparent tower preview
      ctx.globalAlpha = 0.5;
      this.render(ctx);
    } else {
      // Draw no-entry sign
      ctx.globalAlpha = 0.7;
      ctx.fillStyle = '#ff0000';
      ctx.beginPath();
      ctx.arc(cx, cy, tileSize * 0.4, 0, 2 * Math.PI);
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(cx - tileSize * 0.2, cy - tileSize * 0.2);
      ctx.lineTo(cx + tileSize * 0.2, cy + tileSize * 0.2);
      ctx.moveTo(cx + tileSize * 0.2, cy - tileSize * 0.2);
      ctx.lineTo(cx - tileSize * 0.2, cy + tileSize * 0.2);
      ctx.stroke();
    }
    ctx.restore();
  }
} 