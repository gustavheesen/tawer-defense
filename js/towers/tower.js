import { loadConfig } from '../config.js';

export class Tower {
  constructor(tileX, tileY, mapConfig, canvas) {
    const config = loadConfig();
    this.tileX = tileX;
    this.tileY = tileY;
    this.mapConfig = mapConfig;
    this.canvas = canvas;
    this.fireRate = config.towerFireRate;
    this.range = 80;
    this.cooldown = 0;
    this.turretAngle = 0; // radians
    this.turretTurnSpeed = Math.PI; // radians per second (180 deg/sec)
  }

  update(delta, enemies, projectiles) {
    this.cooldown -= delta;
    const tileSize = Math.min(this.canvas.width / this.mapConfig.width, this.canvas.height / this.mapConfig.height);
    const cx = this.tileX * tileSize + tileSize / 2;
    const cy = this.tileY * tileSize + tileSize / 2;
    let nearest = null;
    let nearestDist = Infinity;
    let targetAngle = this.turretAngle;
    for (const enemy of enemies) {
      const dx = enemy.x - cx;
      const dy = enemy.y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < this.range && dist < nearestDist) {
        nearest = enemy;
        nearestDist = dist;
        targetAngle = Math.atan2(dy, dx);
      }
    }
    // Rotate turret toward target
    function angleDiff(a, b) {
      let d = a - b;
      while (d > Math.PI) d -= 2 * Math.PI;
      while (d < -Math.PI) d += 2 * Math.PI;
      return d;
    }
    let diff = angleDiff(targetAngle, this.turretAngle);
    const maxTurn = this.turretTurnSpeed * delta;
    if (Math.abs(diff) < maxTurn) {
      this.turretAngle = targetAngle;
    } else {
      this.turretAngle += Math.sign(diff) * maxTurn;
    }
    // Only fire if aimed within 5 degrees
    if (nearest && this.cooldown <= 0 && Math.abs(angleDiff(targetAngle, this.turretAngle)) < 0.087) {
      this.fireProjectile(cx, cy, projectiles);
      this.cooldown = 1 / this.fireRate;
    }
  }

  fireProjectile(cx, cy, projectiles) {
    // To be implemented by subclasses
  }

  // No render here; subclasses must implement their own render method
} 