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
    // TODO: Target enemies and shoot
  }

  // No render here; subclasses must implement their own render method
} 