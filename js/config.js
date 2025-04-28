// Game configuration file
// Edit these values to tweak gameplay balance and difficulty

export function loadConfig() {
  return {
    // Base speed for all enemies (tiles per second)
    enemySpeed: 1.5,
    // Base fire rate for all towers (shots per second)
    towerFireRate: 1,
    // Difficulty multiplier (affects enemy health, spawn rate, etc.)
    difficulty: 1,
    // Starting money for the player
    startingMoney: 300,
    // Number of lives at the start
    lives: 20,
    // Default map config (can be overridden by menu)
    map: {
      width: 16,
      height: 12,
    },
    // Default tower range in tiles
    baseTowerRange: 3,
    // Default projectile speed in tiles per second
    baseProjectileSpeed: 5,
  };
} 