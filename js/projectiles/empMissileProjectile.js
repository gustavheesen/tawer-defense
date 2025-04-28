export class EMPMissileProjectile {
  constructor(x, y, vx, vy, damage, target, tileSize) {
    // x, y, vx, vy are in tile units
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.damage = damage; // Not used, but kept for interface
    this.target = target;
    this.tileSize = tileSize;
    this.radius = 0.18; // in tile units
    this.speed = Math.sqrt(vx * vx + vy * vy);
    this.alive = true;
    this.exploded = false;
    this.explosionRadius = 1.2; // in tile units
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
      if (dist > 0.2) { // 0.2 tiles minimum distance
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
      ctx.fillStyle = '#e1f5fe';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(px, py, this.explosionRadius * 0.5 * tileSize * (this.explosionFrame / this.explosionDuration), 0, 2 * Math.PI);
      ctx.fillStyle = '#0288d1';
      ctx.fill();
      ctx.restore();
      return;
    }
    // Missile body
    ctx.save();
    ctx.translate(px, py);
    ctx.rotate(Math.atan2(this.vy, this.vx));
    ctx.fillStyle = '#b3e5fc';
    ctx.strokeStyle = '#222';
    ctx.lineWidth = tileSize * 0.06;
    ctx.beginPath();
    ctx.ellipse(0, 0, tileSize * 0.20, tileSize * 0.08, 0, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    // Blue tip
    ctx.beginPath();
    ctx.arc(tileSize * 0.16, 0, tileSize * 0.07, 0, 2 * Math.PI);
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
      ctx.arc(t.x * tileSize, t.y * tileSize, tileSize * 0.10, 0, 2 * Math.PI);
      ctx.fillStyle = '#e1f5fe';
      ctx.fill();
      ctx.restore();
    }
  }
} 