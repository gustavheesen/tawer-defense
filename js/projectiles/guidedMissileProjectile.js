                                                  import { Enemy } from '../enemies/enemy.js';

export class GuidedMissileProjectile {
  constructor(x, y, vx, vy, damage, target, small = false) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.damage = damage;
    this.target = target;
    this.radius = small ? 7 : 12; // For collision/explosion
    this.speed = Math.sqrt(vx * vx + vy * vy);
    this.alive = true;
    this.exploded = false;
    this.explosionRadius = small ? 24 : 48;
    this.explosionDuration = 12;
    this.explosionFrame = 0;
    this.trail = [];
    this.small = small;
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
      if (dist > 2) {
        const desiredAngle = Math.atan2(dy, dx);
        const currentAngle = Math.atan2(this.vx, this.vy);
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
      if (Math.hypot(dx, dy) < this.radius + (enemy.radius || 12)) {
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

  render(ctx) {
    if (this.exploded) {
      // Explosion effect
      ctx.save();
      ctx.globalAlpha = 0.7 * (1 - this.explosionFrame / this.explosionDuration);
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.explosionRadius * (this.explosionFrame / this.explosionDuration), 0, 2 * Math.PI);
      ctx.fillStyle = this.small ? '#b3e5fc' : '#ffecb3';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(this.x, this.y, (this.explosionRadius * 0.5) * (this.explosionFrame / this.explosionDuration), 0, 2 * Math.PI);
      ctx.fillStyle = this.small ? '#0288d1' : '#ff9800';
      ctx.fill();
      ctx.restore();
      return;
    }
    // Missile body
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(Math.atan2(this.vy, this.vx));
    ctx.fillStyle = this.small ? '#b3e5fc' : '#bdbdbd';
    ctx.strokeStyle = '#222';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(0, 0, this.small ? 8 : 16, this.small ? 3 : 6, 0, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    // Nose
    ctx.beginPath();
    ctx.arc(this.small ? 6 : 12, 0, this.small ? 2.5 : 5, 0, 2 * Math.PI);
    ctx.fillStyle = this.small ? '#0288d1' : '#ff9800';
    ctx.fill();
    ctx.stroke();
    // Fins
    ctx.fillStyle = this.small ? '#4fc3f7' : '#607d8b';
    ctx.beginPath();
    ctx.moveTo(this.small ? -5 : -10, this.small ? -3 : -6);
    ctx.lineTo(this.small ? -9 : -18, this.small ? -6 : -12);
    ctx.lineTo(this.small ? -4 : -8, 0);
    ctx.lineTo(this.small ? -9 : -18, this.small ? 6 : 12);
    ctx.lineTo(this.small ? -5 : -10, this.small ? 3 : 6);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
    // Trail
    for (let i = 0; i < this.trail.length; i++) {
      const t = this.trail[i];
      ctx.save();
      ctx.globalAlpha = t.alpha * 0.3;
      ctx.beginPath();
      ctx.arc(t.x, t.y, this.small ? 4 : 8, 0, 2 * Math.PI);
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