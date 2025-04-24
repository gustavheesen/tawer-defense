// Game configuration file
// Edit these values to tweak gameplay balance and difficulty

export function loadConfig() {
  return {
    // Base speed for all enemies (pixels per second)
    enemySpeed: 60,
    // Base fire rate for all towers (shots per second)
    towerFireRate: 1,
    // Difficulty multiplier (affects enemy health, spawn rate, etc.)
    difficulty: 50,
    // Starting money for the player
    startingMoney: 100,
    // Number of lives at the start
    lives: 20,
    // Map config (can be expanded)
    map: {
      width: 16,
      height: 12,
      tileSize: 40
    }
  };
} 