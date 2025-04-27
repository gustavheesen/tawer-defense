export class NuclearMissileProjectile {
  constructor(x, y, vx, vy, damage, target, tileSize = 32) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.damage = damage;
    this.target = target;
    this.tileSize = tileSize;
    this.radius = tileSize * 0.28;
    this.speed = Math.sqrt(vx * vx + vy * vy);
    this.alive = true;
    this.exploded = false;
    this.explosionRadius = tileSize * 2.2;
    this.explosionDuration = 28;
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
    // Homing logic
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
        const turnRate = 0.04;
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
    if (this.trail.length > 24) this.trail.shift();
    // Collision
    for (const enemy of enemies) {
      if (!enemy.alive) continue;
      const dx = enemy.x - this.x;
      const dy = enemy.y - this.y;
      if (Math.hypot(dx, dy) < this.radius + (enemy.radius || this.tileSize * 0.15)) {
        this.explode(enemies);
        break;
      }
    }
  }

  explode(enemies) {
    if (this.exploded) return;
    this.exploded = true;
    this.alive = false;
    // Massive area damage and stun
    for (const enemy of enemies) {
      if (!enemy.alive) continue;
      const dx = enemy.x - this.x;
      const dy = enemy.y - this.y;
      if (Math.hypot(dx, dy) < this.explosionRadius) {
        enemy.takeDamage(this.damage * 2);
        enemy.disabled = 3;
      }
    }
  }

  render(ctx, tileSize) {
    tileSize = tileSize || this.tileSize;
    if (this.exploded) {
      ctx.save();
      ctx.globalAlpha = 0.8 * (1 - this.explosionFrame / this.explosionDuration);
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.explosionRadius * (this.explosionFrame / this.explosionDuration), 0, 2 * Math.PI);
      ctx.fillStyle = '#ffeb3b';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.explosionRadius * 0.7 * (this.explosionFrame / this.explosionDuration), 0, 2 * Math.PI);
      ctx.fillStyle = '#ff5252';
      ctx.fill();
      ctx.restore();
      return;
    }
    // Missile body (red tip)
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(Math.atan2(this.vy, this.vx));
    ctx.fillStyle = '#bdbdbd';
    ctx.strokeStyle = '#222';
    ctx.lineWidth = tileSize * 0.09;
    ctx.beginPath();
    ctx.ellipse(0, 0, tileSize * 0.36, tileSize * 0.15, 0, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    // Red tip
    ctx.beginPath();
    ctx.arc(tileSize * 0.28, 0, tileSize * 0.13, 0, 2 * Math.PI);
    ctx.fillStyle = '#ff5252';
    ctx.fill();
    ctx.stroke();
    ctx.restore();
    // Trail
    for (let i = 0; i < this.trail.length; i++) {
      const t = this.trail[i];
      ctx.save();
      ctx.globalAlpha = t.alpha * 0.2;
      ctx.beginPath();
      ctx.arc(t.x, t.y, tileSize * 0.18, 0, 2 * Math.PI);
      ctx.fillStyle = '#ffeb3b';
      ctx.fill();
      ctx.restore();
    }
  }
} 