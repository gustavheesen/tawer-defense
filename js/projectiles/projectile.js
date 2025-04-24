export class Projectile {
  constructor(x, y, vx, vy) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.radius = 5;
    this.alive = true;
  }

  update(delta) {
    this.x += this.vx * delta;
    this.y += this.vy * delta;
    // TODO: Collision detection
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