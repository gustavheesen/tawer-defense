# Tower Defense Game: Enhanced Modular File Plan

## Project Structure

This file describes the intended modular structure and organization of the Tower Defense Game project. For a list of implemented features and the current development backlog, see:
- `implemented_features.md` (what's done)
- `dev_backlog.md` (what's next/ideas)

## 1. **index.html**
- Main HTML file.
- Loads the canvas, UI, and all JS modules.

---

## 2. **/js/main.js**
- Entry point for the game.
- Handles game loop, initialization, and high-level state management.

---

## 3. **/js/game.js**
- Manages the overall game state (waves, score, lives, etc).
- Coordinates between objects (towers, enemies, projectiles).

---

## 4. **/js/maps/**
- **Purpose:** Contains all map-related files.
- **/js/maps/map.js**: Base Map class.
- **/js/maps/map1.js, map2.js, ...**: Specific map layouts and logic.

---

## 5. **/js/towers/**
- **Purpose:** Contains all tower-related files.
- **/js/towers/tower.js**: Base Tower class.
- **/js/towers/cannonTower.js, laserTower.js, ...**: Specific tower types, each with unique properties, textures, and behaviors.

---

## 6. **/js/enemies/**
- **Purpose:** Contains all enemy-related files.
- **/js/enemies/enemy.js**: Base Enemy class.
- **/js/enemies/fastEnemy.js, tankEnemy.js, ...**: Specific enemy types, each with unique properties, textures, and behaviors.

---

## 7. **/js/projectiles/**
- **Purpose:** Contains all projectile-related files.
- **/js/projectiles/projectile.js**: Base Projectile class.
- **/js/projectiles/bullet.js, missile.js, ...**: Specific projectile types.

---

## 8. **/js/ui.js**
- Manages user interface elements (buttons, score display, etc).
- Handles user input (placing towers, starting waves).

---

## 9. **/js/utils.js**
- Utility functions (collision detection, random number generation, etc).

---

## 10. **/js/config.js**
- Stores game configuration (global settings, default stats, etc).
- **Should be easily editable to adjust gameplay parameters such as enemy speed, tower fire rate, difficulty, and more.**
- The game should read these values dynamically so changes take effect without code modification.
- **Example parameters:**
  - `enemySpeed`: Controls base speed of enemies.
  - `towerFireRate`: Controls how fast towers shoot.
  - `difficulty`: Affects enemy health, spawn rate, or other scaling factors.
  - `startingMoney`, `lives`, etc.
- **Consider providing comments or documentation in the config file for each parameter.**

---

## 11. **/css/styles.css**
- Basic styling for the game canvas and UI.

---

# **Enhanced File Structure Example**
```
/index.html
/js/
  main.js
  game.js
  config.js
  utils.js
  ui.js
  /maps/
    map.js
    map1.js
    map2.js
  /towers/
    tower.js
    cannonTower.js
    laserTower.js
  /enemies/
    enemy.js
    fastEnemy.js
    tankEnemy.js
  /projectiles/
    projectile.js
    bullet.js
    missile.js
/css/
  styles.css
```

---

# **Notes**
- Each type (tower, enemy, projectile, map) gets its own file for easy customization and extension.
- Use ES6 modules for imports/exports.
- Keep each file focused on a single responsibility.
- Use clear, consistent naming conventions.
- You can add textures, properties, and behaviors per type by editing their respective files.
- **The config.js file is the main place to tweak gameplay balance and difficulty.**

---

**For progress tracking and backlog, see `implemented_features.md` and `dev_backlog.md`.** 