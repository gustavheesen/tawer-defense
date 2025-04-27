import { loadConfig } from '../config.js';
import { getTileSize } from '../utils.js';

// function getTileSize(canvas, mapWidth, mapHeight) {
//   return Math.min(canvas.width / mapWidth, canvas.height / mapHeight);
// }

export class Enemy {
  constructor(path, mapConfig, canvas) {
    const config = loadConfig();
    this.path = path;
    this.pathIndex = 0;
    this.speed = config.enemySpeed; // Now in tiles per second
    this.maxHealth = 10 * config.difficulty;
    this.health = this.maxHealth;
    this.alive = true;
    this.mapConfig = mapConfig;
    this.canvas = canvas;
    // Set initial position
    const tileSize = getTileSize(canvas, mapConfig);
    this.x = path[0].x * tileSize + tileSize / 2;
    this.y = path[0].y * tileSize + tileSize / 2;
    this.reachedEnd = false;
  }

  takeDamage(amount, type = 'projectile') {
    this.health -= amount;
    if (this.health <= 0) {
      this.alive = false;
    }
  }

  update(delta) {
    if (this.empStunned && this.empStunned > 0) {
      this.empStunned -= delta;
      if (this.empStunned < 0) this.empStunned = 0;
    }
    if (this.disabled && this.disabled > 0) {
      this.disabled -= delta;
      if (this.disabled < 0) this.disabled = 0;
      return; // Skip movement and actions while disabled
    }
    // Move along path
    if (this.pathIndex < this.path.length - 1) {
      const tileSize = getTileSize(this.canvas, this.mapConfig);
      const targetTile = this.path[this.pathIndex + 1];
      const targetX = targetTile.x * tileSize + tileSize / 2;
      const targetY = targetTile.y * tileSize + tileSize / 2;
      const dx = targetX - this.x;
      const dy = targetY - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const moveDist = this.speed * tileSize * delta; // speed (tiles/sec) * tileSize * delta
      if (dist < moveDist) {
        this.x = targetX;
        this.y = targetY;
        this.pathIndex++;
      } else {
        this.x += (dx / dist) * moveDist;
        this.y += (dy / dist) * moveDist;
      }
    } else {
      // Reached end of path
      this.alive = false;
      this.reachedEnd = true;
    }
  }

  renderHealthBar(ctx, size) {
    ctx.save();
    ctx.fillStyle = 'black';
    ctx.fillRect(this.x - size / 2, this.y - size - 10, size, 6);
    ctx.fillStyle = 'lime';
    ctx.fillRect(this.x - size / 2, this.y - size - 10, size * (this.health / this.maxHealth), 6);
    ctx.strokeStyle = '#222';
    ctx.strokeRect(this.x - size / 2, this.y - size - 10, size, 6);
    ctx.restore();
  }

  render(ctx) {
    ctx.save();
    if (this.empStunned && this.empStunned > 0) {
      ctx.shadowColor = '#81d4fa';
      ctx.shadowBlur = 24;
    }
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(this.x, this.y, 12, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();
  }
} 