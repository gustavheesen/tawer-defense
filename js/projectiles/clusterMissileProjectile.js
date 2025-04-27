import { GuidedMissileProjectile } from './guidedMissileProjectile.js';

export class ClusterMissileProjectile {
  constructor(x, y, vx, vy, damage, target, tileSize = 32) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.damage = damage;
    this.target = target;
    this.tileSize = tileSize;
    this.radius = tileSize * 0.18;
    this.speed = Math.sqrt(vx * vx + vy * vy);
    this.alive = true;
    this.exploded = false;
    this.explosionRadius = tileSize * 0.75;
    this.explosionDuration = 14;
    this.explosionFrame = 0;
    this.trail = [];
    this.spawned = false;
  }

  update(delta, enemies, projectiles) {
    if (!this.alive) {
      if (this.exploded) {
        this.explosionFrame++;
        if (this.explosionFrame > this.explosionDuration) this.alive = false;
      }
      return;
    }
    // Homing logic (like GuidedMissileProjectile)
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
    if (closest) this.target = closest;
    if (this.target && this.target.alive) {
      const dx = this.target.x - this.x;
      const dy = this.target.y - this.y;
      const dist = Math.hypot(dx, dy);
      if (dist > 2) {
        const desiredAngle = Math.atan2(dy, dx);
        let angleDiff = desiredAngle - Math.atan2(this.vy, this.vx);
        while (angleDiff > Math.PI) angleDiff -= 2 * Math.PI;
        while (angleDiff < -Math.PI) angleDiff += 2 * Math.PI;
        const turnRate = 0.06;
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
    // Collision
    for (const enemy of enemies) {
      if (!enemy.alive) continue;
      const dx = enemy.x - this.x;
      const dy = enemy.y - this.y;
      if (Math.hypot(dx, dy) < this.radius + (enemy.radius || this.tileSize * 0.15)) {
        this.explode(enemies, projectiles);
        break;
      }
    }
  }

  explode(enemies, projectiles) {
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
    // Spawn 3 small homing missiles
    if (!this.spawned && projectiles) {
      for (let i = 0; i < 3; i++) {
        const angle = (i * 2 * Math.PI) / 3;
        const speed = this.speed * 0.9;
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed;
        projectiles.push(new GuidedMissileProjectile(this.x, this.y, vx, vy, Math.round(this.damage * 0.5), null, true, this.tileSize));
      }
      this.spawned = true;
    }
  }

  render(ctx, tileSize) {
    tileSize = tileSize || this.tileSize;
    if (this.exploded) {
      ctx.save();
      ctx.globalAlpha = 0.7 * (1 - this.explosionFrame / this.explosionDuration);
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.explosionRadius * (this.explosionFrame / this.explosionDuration), 0, 2 * Math.PI);
      ctx.fillStyle = '#c8e6c9';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.explosionRadius * 0.5 * (this.explosionFrame / this.explosionDuration), 0, 2 * Math.PI);
      ctx.fillStyle = '#43a047';
      ctx.fill();
      ctx.restore();
      return;
    }
    // Missile body (green tip)
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(Math.atan2(this.vy, this.vx));
    ctx.fillStyle = '#bdbdbd';
    ctx.strokeStyle = '#222';
    ctx.lineWidth = tileSize * 0.06;
    ctx.beginPath();
    ctx.ellipse(0, 0, tileSize * 0.20, tileSize * 0.08, 0, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    // Green tip
    ctx.beginPath();
    ctx.arc(tileSize * 0.16, 0, tileSize * 0.07, 0, 2 * Math.PI);
    ctx.fillStyle = '#43a047';
    ctx.fill();
    ctx.stroke();
    ctx.restore();
    // Trail
    for (let i = 0; i < this.trail.length; i++) {
      const t = this.trail[i];
      ctx.save();
      ctx.globalAlpha = t.alpha * 0.3;
      ctx.beginPath();
      ctx.arc(t.x, t.y, tileSize * 0.10, 0, 2 * Math.PI);
      ctx.fillStyle = '#c8e6c9';
      ctx.fill();
      ctx.restore();
    }
  }
} 