export class EMPMissileProjectile {
  constructor(x, y, vx, vy, damage, target, tileSize) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.damage = damage; // Not used, but kept for interface
    this.target = target;
    this.tileSize = tileSize;
    this.radius = tileSize * 0.18;
    this.speed = Math.sqrt(vx * vx + vy * vy);
    this.alive = true;
    this.exploded = false;
    this.explosionRadius = tileSize * 1.2;
    this.explosionDuration = 18;
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
        const turnRate = 0.05;
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
        this.explode(enemies);
        break;
      }
    }
  }

  explode(enemies) {
    if (this.exploded) return;
    this.exploded = true;
    this.alive = false;
    // EMP disables all enemies in radius for 2 seconds and deals damage
    for (const enemy of enemies) {
      if (!enemy.alive) continue;
      const dx = enemy.x - this.x;
      const dy = enemy.y - this.y;
      if (Math.hypot(dx, dy) < this.explosionRadius) {
        enemy.disabled = 2;
        enemy.empStunned = 0.5; // For visual effect
        enemy.takeDamage(30);
      }
    }
  }

  render(ctx, tileSize) {
    // Use tileSize from argument if provided, else fallback to this.tileSize
    tileSize = tileSize || this.tileSize;
    if (this.exploded) {
      ctx.save();
      // Blue glowing expanding ring
      const progress = this.explosionFrame / this.explosionDuration;
      const outerRadius = this.explosionRadius * (0.7 + 0.6 * progress);
      const innerRadius = outerRadius * 0.7;
      const alpha = 0.45 * (1 - progress);
      // Glowing ring using radial gradient
      const grad = ctx.createRadialGradient(this.x, this.y, innerRadius, this.x, this.y, outerRadius);
      grad.addColorStop(0, 'rgba(129,212,250,0.15)');
      grad.addColorStop(0.7, 'rgba(33,150,243,0.25)');
      grad.addColorStop(0.95, 'rgba(2,136,209,0.7)');
      grad.addColorStop(1, 'rgba(2,136,209,0.0)');
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.arc(this.x, this.y, outerRadius, 0, 2 * Math.PI);
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.restore();
      // Optionally, draw a sharper blue edge
      ctx.save();
      ctx.globalAlpha = alpha * 0.7;
      ctx.strokeStyle = '#81d4fa';
      ctx.lineWidth = tileSize * 0.18 + tileSize * 0.24 * (1 - progress);
      ctx.beginPath();
      ctx.arc(this.x, this.y, outerRadius, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.restore();
      return;
    }
    // Missile body (blue tip)
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(Math.atan2(this.vy, this.vx));
    ctx.fillStyle = '#bdbdbd';
    ctx.strokeStyle = '#222';
    ctx.lineWidth = tileSize * 0.06;
    ctx.beginPath();
    ctx.ellipse(0, 0, tileSize * 0.25, tileSize * 0.10, 0, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    // Blue tip
    ctx.beginPath();
    ctx.arc(tileSize * 0.20, 0, tileSize * 0.09, 0, 2 * Math.PI);
    ctx.fillStyle = '#0288d1';
    ctx.fill();
    ctx.stroke();
    ctx.restore();
    // Trail
    for (let i = 0; i < this.trail.length; i++) {
      const t = this.trail[i];
      ctx.save();
      ctx.globalAlpha = t.alpha * 0.3;
      ctx.beginPath();
      ctx.arc(t.x, t.y, tileSize * 0.13, 0, 2 * Math.PI);
      ctx.fillStyle = '#81d4fa';
      ctx.fill();
      ctx.restore();
    }
  }
} 