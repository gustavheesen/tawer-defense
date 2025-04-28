import { Enemy } from './enemy.js';
import { loadConfig } from '../config.js';
import { getTileSize } from '../utils.js';

export class SplitterEnemy extends Enemy {
  constructor(path, mapConfig, canvas) {
    super(path, mapConfig, canvas);
    const config = loadConfig();
    this.speed = config.enemySpeed * 0.8;
    this.maxHealth = 18 * config.difficulty;
    this.health = this.maxHealth;
    this.split = true; // for logic: splits on death
  }

  update(delta) {
    super.update(delta);
    // Splitting logic handled externally on death
  }

  render(ctx) {
    const tileSize = getTileSize(this.canvas, this.mapConfig);
    const px = this.x * tileSize + tileSize / 2;
    const py = this.y * tileSize + tileSize / 2;
    ctx.save();
    ctx.translate(px, py);
    // Body
    ctx.fillStyle = '#3cb371';
    ctx.beginPath();
    ctx.arc(0, 0, tileSize * 0.19, 0, 2 * Math.PI);
    ctx.fill();
    // Crack
    ctx.strokeStyle = '#222';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(-tileSize * 0.09, -tileSize * 0.13);
    ctx.lineTo(0, 0);
    ctx.lineTo(tileSize * 0.09, tileSize * 0.13);
    ctx.stroke();
    ctx.restore();
    // Health bar
    ctx.save();
    ctx.fillStyle = 'black';
    ctx.fillRect(px - tileSize * 0.19, py - tileSize * 0.38 - 10, tileSize * 0.38, 6);
    ctx.fillStyle = 'lime';
    ctx.fillRect(px - tileSize * 0.19, py - tileSize * 0.38 - 10, tileSize * 0.38 * (this.health / this.maxHealth), 6);
    ctx.strokeStyle = '#222';
    ctx.strokeRect(px - tileSize * 0.19, py - tileSize * 0.38 - 10, tileSize * 0.38, 6);
    ctx.restore();
  }
}

export class MiniSplitterEnemy extends Enemy {
  constructor(path, mapConfig, canvas) {
    super(path, mapConfig, canvas);
    const config = loadConfig();
    this.speed = config.enemySpeed * 1.5;
    this.maxHealth = 5 * config.difficulty;
    this.health = this.maxHealth;
  }

  update(delta) {
    super.update(delta);
  }

  render(ctx) {
    const tileSize = getTileSize(this.canvas, this.mapConfig);
    const px = this.x * tileSize + tileSize / 2;
    const py = this.y * tileSize + tileSize / 2;
    ctx.save();
    ctx.translate(px, py);
    // Body
    ctx.fillStyle = '#7ee081';
    ctx.beginPath();
    ctx.arc(0, 0, tileSize * 0.11, 0, 2 * Math.PI);
    ctx.fill();
    // Crack
    ctx.strokeStyle = '#222';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-tileSize * 0.05, -tileSize * 0.07);
    ctx.lineTo(0, 0);
    ctx.lineTo(tileSize * 0.05, tileSize * 0.07);
    ctx.stroke();
    ctx.restore();
    // Health bar
    ctx.save();
    ctx.fillStyle = 'black';
    ctx.fillRect(px - tileSize * 0.11, py - tileSize * 0.22 - 10, tileSize * 0.22, 6);
    ctx.fillStyle = 'lime';
    ctx.fillRect(px - tileSize * 0.11, py - tileSize * 0.22 - 10, tileSize * 0.22 * (this.health / this.maxHealth), 6);
    ctx.strokeStyle = '#222';
    ctx.strokeRect(px - tileSize * 0.11, py - tileSize * 0.22 - 10, tileSize * 0.22, 6);
    ctx.restore();
  }
} 