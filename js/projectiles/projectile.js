export class Projectile {
  constructor(x, y, vx, vy) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.radius = 5;
    this.alive = true;
  }

  update(delta, enemies) {
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
    return 16; // Default, can be overridden by subclasses
  }

  applyEffect(enemy) {
    // Default: do nothing, subclasses override
  }

  render(ctx) {
    ctx.save();
    ctx.fillStyle = 'yellow';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();
  }
} 