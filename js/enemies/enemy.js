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
    this.speed = config.enemySpeed; // tiles per second
    this.maxHealth = 10 * config.difficulty;
    this.health = this.maxHealth;
    this.alive = true;
    this.mapConfig = mapConfig;
    this.canvas = canvas;
    // Tile-based position
    this.tileX = path[0].x;
    this.tileY = path[0].y;
    this.x = this.tileX; // float, in tile units
    this.y = this.tileY; // float, in tile units
    this.reachedEnd = false;
  }

  takeDamage(amount, type = 'projectile') {
    this.health -= amount;
    if (isNaN(this.health)) {
      console.warn('Enemy health became NaN!', this, amount, type);
      this.health = 0;
    }
    if (this.health < 0) this.health = 0;
    if (this.health > this.maxHealth) this.health = this.maxHealth;
    if (this.health <= 0) {
      this.alive = false;
    }
  }

  update(delta) {
    if (this.stunned && this.stunned > 0) {
      this.stunned -= delta;
      if (this.stunned < 0) this.stunned = 0;
      return; // Skip movement and actions while stunned
    }
    if (this.slowed && this.slowed > 0) {
      this.slowed -= delta;
      if (this.slowed <= 0) {
        this.slowed = 0;
        if (this._originalSpeed) this.speed = this._originalSpeed;
      }
    }
    if (this.disabled && this.disabled > 0) {
      this.disabled -= delta;
      if (this.disabled < 0) this.disabled = 0;
      return; // Skip movement and actions while disabled
    }
    // Move along path (tile-based)
    if (this.pathIndex < this.path.length - 1) {
      const targetTile = this.path[this.pathIndex + 1];
      const targetX = targetTile.x;
      const targetY = targetTile.y;
      const dx = targetX - this.x;
      const dy = targetY - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const moveDist = this.speed * delta; // speed (tiles/sec) * delta
      if (dist < moveDist) {
        this.x = targetX;
        this.y = targetY;
        this.tileX = targetX;
        this.tileY = targetY;
        this.pathIndex++;
      } else {
        this.x += (dx / dist) * moveDist;
        this.y += (dy / dist) * moveDist;
        this.tileX = Math.round(this.x);
        this.tileY = Math.round(this.y);
      }
    } else {
      // Reached end of path
      this.alive = false;
      this.reachedEnd = true;
    }
  }

  render(ctx) {
    // Convert tile coordinates to pixel coordinates for rendering
    const tileSize = getTileSize(this.canvas, this.mapConfig);
    const px = this.x * tileSize + tileSize / 2;
    const py = this.y * tileSize + tileSize / 2;
    ctx.save();
    if (this.stunned && this.stunned > 0) {
      ctx.shadowColor = '#81d4fa';
      ctx.shadowBlur = 24;
    }
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(px, py, tileSize * 0.3, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();
    // Health bar
    ctx.save();
    ctx.fillStyle = 'black';
    ctx.fillRect(px - tileSize * 0.3, py - tileSize * 0.6 - 10, tileSize * 0.6, 6);
    ctx.fillStyle = 'lime';
    ctx.fillRect(px - tileSize * 0.3, py - tileSize * 0.6 - 10, tileSize * 0.6 * (this.health / this.maxHealth), 6);
    ctx.strokeStyle = '#222';
    ctx.strokeRect(px - tileSize * 0.3, py - tileSize * 0.6 - 10, tileSize * 0.6, 6);
    ctx.restore();
  }

  // Add this method to prevent Tesla Tower from breaking enemies
  stun(duration) {
    // Default: set a stun timer, but do not affect health or invulnerability
    this.stunned = duration;
  }

  // Add this method to prevent Tesla Tower from breaking enemies
  slow(factor, duration) {
    // Default: reduce speed for a short time, then restore
    if (!this._originalSpeed) this._originalSpeed = this.speed;
    this.speed = this._originalSpeed * factor;
    this.slowed = duration;
  }
} 