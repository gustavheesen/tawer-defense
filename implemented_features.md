# Implemented Features

This file lists all features that have already been implemented in the Tower Defense Game project, based on the current codebase.

## Core Structure
- Modular file structure using ES6 modules
- Main HTML file with canvas and UI container (`index.html`)
- Central game loop and state management (`js/main.js`, `js/game.js`)
- Configurable game parameters via `js/config.js`
- Utility functions in `js/utils.js`
- Basic CSS styling (`css/styles.css`)

## Maps
- Base Map class (`js/maps/map.js`)
- Example map layout (`js/maps/map1.js`)

## Towers
- Base Tower class (`js/towers/tower.js`)
- Cannon Tower (`js/towers/cannonTower.js`)
- Laser Tower (`js/towers/laserTower.js`)
- Slow Tower (`js/towers/slowTower.js`)

## Enemies
- Base Enemy class (`js/enemies/enemy.js`)
- Tank Enemy (`js/enemies/tankEnemy.js`)
- Infantry Enemy (`js/enemies/infantryEnemy.js`)
- Spider Enemy (`js/enemies/spiderEnemy.js`)

## Projectiles
- Base Projectile class (`js/projectiles/projectile.js`)
- Bullet (`js/projectiles/bullet.js`)
- Laser Projectile (`js/projectiles/laserProjectile.js`)
- Slow Projectile (`js/projectiles/slowProjectile.js`)

## UI & Game Flow
- UI management and tower selection (`js/ui.js`)
- Score and lives display
- Start wave button
- Placing towers by clicking on the map
- Prevent placing towers on path or on top of each other
- Basic enemy wave spawning (Tank, Infantry, Spider)
- Projectiles damage and kill enemies
- Money and lives system (configurable)

## Other
- Dynamic reading of config values
- Modular, extensible code structure

## Partial/Planned (Not Fully Implemented)
- TODO: Tower targeting and shooting logic in base Tower class
- TODO: Collision detection in base Projectile class (partially handled in game.js)
- TODO: UI overlays (game over, pause, etc.) 