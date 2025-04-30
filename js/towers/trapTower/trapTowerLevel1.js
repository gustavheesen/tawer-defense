import { Tower } from '../tower.js';
import { drawTrapTowerBase, drawTrapSpikes } from './trapTowerRender.js';
import { drawTrapSpike } from './trapSpikeRender.js';

export class TrapTowerLevel1 extends Tower {
  constructor(tileX, tileY, mapConfig, canvas, path) {
    super(tileX, tileY, mapConfig, canvas, path);
    this.rangeTiles = 2; // Short range for placing spikes
    this.fireRate = 0.5; // Places spikes every 2 seconds
    this.spikeDuration = 2.5; // Spikes last 2.5 seconds
    this.spikeDamage = 30; // Damage dealt to enemies
    this.activeSpikes = [];
    this.type = 'trap';
    this.level = 1;
  }

  update(delta, enemies, projectiles, pathTiles) {
    this.cooldown -= delta;
    // Only place spikes if pathTiles is provided and iterable
    if (pathTiles && typeof pathTiles[Symbol.iterator] === 'function') {
      // Find all path tiles within range
      let inRangeTiles = [];
      for (const tile of pathTiles) {
        const dx = tile.x - (this.tileX + 0.5);
        const dy = tile.y - (this.tileY + 0.5);
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < this.rangeTiles) {
          inRangeTiles.push({tile, dist});
        }
      }
      // Sort by distance
      inRangeTiles.sort((a, b) => a.dist - b.dist);
      // Try to place on the closest tile with < 3 spikes
      if (this.cooldown <= 0 && inRangeTiles.length > 0) {
        for (const {tile} of inRangeTiles) {
          const spikesOnTile = this.activeSpikes.filter(s => s.x === tile.x && s.y === tile.y);
          if (spikesOnTile.length < 3) {
            this.activeSpikes.push({
              x: tile.x,
              y: tile.y
            });
            this.cooldown = 1 / this.fireRate;
            break;
          }
        }
      }
    }
    // Update spikes and damage enemies
    let spikesToRemove = [];
    for (let i = 0; i < this.activeSpikes.length; i++) {
      const spike = this.activeSpikes[i];
      let damaged = false;
      for (const enemy of enemies) {
        if (Math.abs(enemy.x - spike.x) < 0.3 && Math.abs(enemy.y - spike.y) < 0.3) {
          enemy.takeDamage(this.spikeDamage, 'trap');
          damaged = true;
          break;
        }
      }
      if (damaged) {
        spikesToRemove.push(i);
      }
    }
    // Remove spikes that have damaged an enemy
    this.activeSpikes = this.activeSpikes.filter((_, idx) => !spikesToRemove.includes(idx));
  }

  fireProjectile() {
    // Not used for trap tower
  }

  render(ctx, selected = false) {
    const tileSize = Math.min(this.canvas.width / this.mapConfig.width, this.canvas.height / this.mapConfig.height);
    const cx = this.tileX * tileSize + tileSize / 2;
    const cy = this.tileY * tileSize + tileSize / 2;
    if (selected) {
      // Soft, bright-in-the-middle glow behind the tower
      const gradient = ctx.createRadialGradient(cx, cy, tileSize * 0.1, cx, cy, tileSize * 0.7);
      gradient.addColorStop(0, 'rgba(255, 224, 130, 0.85)');
      gradient.addColorStop(1, 'rgba(255, 224, 130, 0)');
      ctx.save();
      ctx.globalAlpha = 1.0;
      ctx.beginPath();
      ctx.arc(cx, cy, tileSize * 0.7, 0, 2 * Math.PI);
      ctx.fillStyle = gradient;
      ctx.fill();
      ctx.restore();
    }
    ctx.save();
    drawTrapTowerBase(ctx, cx, cy, tileSize);
    ctx.restore();
    // Draw spikes
    this.renderSpikes(ctx, tileSize);
  }

  renderSpikes(ctx, tileSize) {
    // Group spikes by tile
    const spikeMap = {};
    for (const spike of this.activeSpikes) {
      const key = `${spike.x},${spike.y}`;
      if (!spikeMap[key]) spikeMap[key] = [];
      spikeMap[key].push(spike);
    }
    for (const key in spikeMap) {
      const [x, y] = key.split(',').map(Number);
      const spikes = spikeMap[key];
      // Draw up to 3 spikes, offset visually
      for (let i = 0; i < spikes.length; i++) {
        const angle = (i / 3) * 2 * Math.PI;
        const cx = x * tileSize + tileSize / 2 + Math.cos(angle) * tileSize * 0.12;
        const cy = y * tileSize + tileSize / 2 + Math.sin(angle) * tileSize * 0.12;
        drawTrapSpike(ctx, cx, cy, tileSize * 0.5);
      }
    }
  }

  renderPreview(ctx, tileX, tileY, isValidPlacement) {
    const tileSize = Math.min(this.canvas.width / this.mapConfig.width, this.canvas.height / this.mapConfig.height);
    const cx = tileX * tileSize + tileSize / 2;
    const cy = tileY * tileSize + tileSize / 2;
    ctx.save();
    if (isValidPlacement) {
      ctx.globalAlpha = 0.5;
      drawTrapTowerBase(ctx, cx, cy, tileSize);
    } else {
      ctx.globalAlpha = 0.7;
      ctx.fillStyle = '#ff0000';
      ctx.beginPath();
      ctx.arc(cx, cy, tileSize * 0.4, 0, 2 * Math.PI);
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(cx - tileSize * 0.2, cy - tileSize * 0.2);
      ctx.lineTo(cx + tileSize * 0.2, cy + tileSize * 0.2);
      ctx.moveTo(cx + tileSize * 0.2, cy - tileSize * 0.2);
      ctx.lineTo(cx - tileSize * 0.2, cy + tileSize * 0.2);
      ctx.stroke();
    }
    ctx.restore();
  }

  upgrade() {
    if (this.level < 5) {
      this.level++;
      // Optionally: scale stats for higher levels here
    }
  }
} 