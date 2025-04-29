# Sniper Tower Plan

## Overview
The Sniper Tower is a new tower type designed to target and eliminate enemies from long range with high single-target damage. It fits into the existing tower system, supporting multiple upgrade levels, each with improved stats and effects. This plan outlines the implementation steps, level structure, and integration points.

---

## 1. Directory & File Structure
- Create a new directory: `js/towers/sniperTower/`
- Each level of the Sniper Tower should have its own file, e.g.:
  - `sniperTowerLevel1.js`
  - `sniperTowerLevel2.js`
  - `sniperTowerLevel3.js`
  - `sniperTowerLevel4.js`
  - `sniperTowerLevel5.js`
- Rendering logic for the Sniper Tower and its projectiles should be in separate files (e.g., `sniperTowerRender.js`, `sniperProjectileRender.js`).

---

## 2. Sniper Tower Core Features
- **Attack Type:** Fires a high-damage, long-range projectile at a single enemy.
- **Effect:** Deals massive damage, can pierce armor or shields (configurable per level).
- **Targeting:** Prioritizes the farthest or highest-health enemy in range.
- **Upgrade Path:** 5 levels, each increasing range, damage, fire rate, and possibly special effects (e.g., armor-piercing, critical hits).

---

## 3. Level Design
- **Level 1:**
  - Basic sniper shot, high damage, long cooldown.
  - Very long range, single target.
- **Level 2:**
  - Increased damage and range.
  - Slightly faster fire rate.
- **Level 3:**
  - Can pierce light armor or shields.
  - Even higher damage and range.
- **Level 4:**
  - Further increased range and damage.
  - Chance for critical hit (double damage).
- **Level 5:**
  - Maximum range and damage.
  - Guaranteed armor-piercing, higher crit chance, or special effect (e.g., instant kill chance on weak enemies).

---

## 4. Implementation Steps
1. **Create Directory & Files:**
   - `js/towers/sniperTower/`
   - Level files: `sniperTowerLevel1.js` ... `sniperTowerLevel5.js`
   - Rendering files: `sniperTowerRender.js`, `sniperProjectileRender.js`
2. **Base Class:**
   - Extend from the base tower class (as other towers do).
   - Implement core logic for targeting, firing, and applying sniper effects.
3. **Level Classes:**
   - Each level file should export a class or function with level-specific stats and behavior.
   - Use existing tower level files as templates.
4. **Rendering:**
   - Implement rendering for the Sniper Tower and its projectiles in their own files.
   - Ensure visuals are distinct (e.g., scope, barrel, bullet trail, color changes per level).
5. **Integration:**
   - Register the Sniper Tower in the tower selection UI and game logic.
   - Add upgrade paths and costs.
   - Ensure compatibility with enemy logic (e.g., armor, shields, crits).
6. **Testing:**
   - Test each level for correct behavior, balance, and rendering.
   - Adjust stats as needed for game balance.

---

## 5. Example Stats Table
| Level | Range | Fire Rate | Damage | Special | Targets |
|-------|-------|-----------|--------|---------|---------|
| 1     | 300   | 3.0s      | 100    | -       | 1       |
| 2     | 350   | 2.7s      | 150    | -       | 1       |
| 3     | 400   | 2.4s      | 200    | Pierce  | 1       |
| 4     | 450   | 2.0s      | 250    | Crit    | 1       |
| 5     | 500   | 1.7s      | 350    | Pierce+ | 1       |

---

## 6. Notes
- Ensure all rendering is in its own file.
- Each object (tower, projectile) should render from its own file.
- Follow conventions from other towers for consistency.
- Adjust stats and effects as needed for balance during playtesting. 