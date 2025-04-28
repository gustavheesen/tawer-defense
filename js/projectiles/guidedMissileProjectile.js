import { Enemy } from '../enemies/enemy.js';

export class GuidedMissileProjectile {
  constructor(x, y, vx, vy, damage, target, small = false, tileSize = 32) {
    // x, y, vx, vy are in tile units
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.damage = damage;
    this.target = target;
    this.small = small;
    this.tileSize = tileSize;
    this.radius = small ? 0.13 : 0.23; // in tile units
    this.speed = Math.sqrt(vx * vx + vy * vy);
    this.alive = true;
    this.exploded = false;
    this.explosionRadius = small ? 0.45 : 0.9; // in tile units
    this.explosionDuration = 12;
    this.explosionFrame = 0;
    this.trail = [];
  }

  update(delta, enemies) {
    if (!this.alive) {
      if (this.exploded) {
        this.explosionFrame++;
        if (this.explosionFrame > this.explosionDuration) this.alive = false;
      }
      return;
    }
    // Always find the closest alive enemy
    let closest = null;
    let minDist = Infinity;
    for (const enemy of enemies) {
      if (!enemy.alive) continue;
      const dx = enemy.x - this.x;
      const dy = enemy.y - this.y;
      const dist = Math.hypot(dx, dy);
      if (dist < minDist) {
        minDist = dist;
        closest = enemy;
      }
    }
    if (closest) {
      this.target = closest;
    } else {
      this.target = null;
    }
    // Homing logic
    if (this.target && this.target.alive) {
      const dx = this.target.x - this.x;
      const dy = this.target.y - this.y;
      const dist = Math.hypot(dx, dy);
      if (dist > 0.2) { // 0.2 tiles minimum distance
        const desiredAngle = Math.atan2(dy, dx);
        let angleDiff = desiredAngle - Math.atan2(this.vy, this.vx);
        while (angleDiff > Math.PI) angleDiff -= 2 * Math.PI;
        while (angleDiff < -Math.PI) angleDiff += 2 * Math.PI;
        // Turn missile gradually
        const turnRate = 0.07;
        const newAngle = Math.atan2(this.vy, this.vx) + Math.sign(angleDiff) * Math.min(Math.abs(angleDiff), turnRate);
        this.vx = Math.cos(newAngle) * this.speed;
        this.vy = Math.sin(newAngle) * this.speed;
      }
    }
    // Move
    this.x += this.vx * delta;
    this.y += this.vy * delta;
    // Trail
    this.trail.push({ x: this.x, y: this.y, alpha: 1 });
    if (this.trail.length > 16) this.trail.shift();
    // Collision with target or any enemy
    for (const enemy of enemies) {
      if (!enemy.alive) continue;
      const dx = enemy.x - this.x;
      const dy = enemy.y - this.y;
      if (Math.hypot(dx, dy) < this.radius + 0.15) { // 0.15 tiles is enemy radius
        this.explode(enemies);
        break;
      }
    }
  }

  explode(enemies) {
    if (this.exploded) return;
    this.exploded = true;
    this.alive = false;
    // Area damage
    for (const enemy of enemies) {
      if (!enemy.alive) continue;
      const dx = enemy.x - this.x;
      const dy = enemy.y - this.y;
      if (Math.hypot(dx, dy) < this.explosionRadius) {
        enemy.takeDamage(this.damage);
      }
    }
  }

  render(ctx, tileSize, canvas, mapConfig) {
    // Convert tile coordinates to pixel coordinates for rendering
    if (!tileSize && canvas && mapConfig) {
      tileSize = Math.min(canvas.width / mapConfig.width, canvas.height / mapConfig.height);
    }
    // Default fallback
    tileSize = tileSize || this.tileSize;
    const px = this.x * tileSize;
    const py = this.y * tileSize;
    if (this.exploded) {
      ctx.save();
      ctx.globalAlpha = 0.7 * (1 - this.explosionFrame / this.explosionDuration);
      ctx.beginPath();
      ctx.arc(px, py, this.explosionRadius * tileSize * (this.explosionFrame / this.explosionDuration), 0, 2 * Math.PI);
      ctx.fillStyle = this.small ? '#b3e5fc' : '#ffecb3';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(px, py, (this.explosionRadius * 0.5) * tileSize * (this.explosionFrame / this.explosionDuration), 0, 2 * Math.PI);
      ctx.fillStyle = this.small ? '#0288d1' : '#ff9800';
      ctx.fill();
      ctx.restore();
      return;
    }
    // Missile body
    ctx.save();
    ctx.translate(px, py);
    ctx.rotate(Math.atan2(this.vy, this.vx));
    ctx.fillStyle = this.small ? '#b3e5fc' : '#bdbdbd';
    ctx.strokeStyle = '#222';
    ctx.lineWidth = tileSize * 0.06;
    ctx.beginPath();
    ctx.ellipse(0, 0, this.small ? tileSize * 0.13 : tileSize * 0.23, this.small ? tileSize * 0.05 : tileSize * 0.09, 0, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    // Nose
    ctx.beginPath();
    ctx.arc(this.small ? tileSize * 0.10 : tileSize * 0.18, 0, this.small ? tileSize * 0.04 : tileSize * 0.08, 0, 2 * Math.PI);
    ctx.fillStyle = this.small ? '#0288d1' : '#ff9800';
    ctx.fill();
    ctx.stroke();
    // Fins
    ctx.fillStyle = this.small ? '#4fc3f7' : '#607d8b';
    ctx.beginPath();
    ctx.moveTo(this.small ? -tileSize * 0.08 : -tileSize * 0.16, this.small ? -tileSize * 0.05 : -tileSize * 0.09);
    ctx.lineTo(this.small ? -tileSize * 0.15 : -tileSize * 0.29, this.small ? -tileSize * 0.10 : -tileSize * 0.18);
    ctx.lineTo(this.small ? -tileSize * 0.07 : -tileSize * 0.13, 0);
    ctx.lineTo(this.small ? -tileSize * 0.15 : -tileSize * 0.29, this.small ? tileSize * 0.10 : tileSize * 0.18);
    ctx.lineTo(this.small ? -tileSize * 0.08 : -tileSize * 0.16, this.small ? tileSize * 0.05 : tileSize * 0.09);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
    // Trail
    for (let i = 0; i < this.trail.length; i++) {
      const t = this.trail[i];
      ctx.save();
      ctx.globalAlpha = t.alpha * 0.3;
      ctx.beginPath();
      ctx.arc(t.x * tileSize, t.y * tileSize, this.small ? tileSize * 0.07 : tileSize * 0.14, 0, 2 * Math.PI);
      ctx.fillStyle = this.small ? '#b3e5fc' : '#90caf9';
      ctx.fill();
      ctx.restore();
    }
  }
}

// Make available globally for CannonTower
if (typeof window !== 'undefined') {
  window.GuidedMissileProjectile = GuidedMissileProjectile;
} 