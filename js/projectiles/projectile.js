export class Projectile {
  constructor(x, y, vx, vy) {
    // x, y, vx, vy are in tile units
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.radius = 0.3; // 0.3 tiles
    this.alive = true;
  }

  update(delta, enemies) {
    // Move in tile units
    this.x += this.vx * delta;
    this.y += this.vy * delta;
    this.checkCollision(enemies);
  }

  checkCollision(enemies) {
    for (const enemy of enemies) {
      const dx = enemy.x - this.x;
      const dy = enemy.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const hitRadius = this.getHitRadius();
      if (dist < hitRadius) {
        this.applyEffect(enemy);
        this.alive = false;
        if (enemy.health <= 0) {
          enemy.alive = false;
        }
        break;
      }
    }
  }

  getHitRadius() {
    return 0.3; // Default hit radius in tile units
  }

  applyEffect(enemy) {
    // Default: do nothing, subclasses override
  }

  render(ctx, tileSize, canvas, mapConfig) {
    // Convert tile coordinates to pixel coordinates for rendering
    if (!tileSize && canvas && mapConfig) {
      tileSize = Math.min(canvas.width / mapConfig.width, canvas.height / mapConfig.height);
    }
    // Default fallback
    tileSize = tileSize || 32;
    const px = this.x * tileSize;
    const py = this.y * tileSize;
    ctx.save();
    ctx.fillStyle = 'yellow';
    ctx.beginPath();
    ctx.arc(px, py, tileSize * 0.15, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();
  }
} 