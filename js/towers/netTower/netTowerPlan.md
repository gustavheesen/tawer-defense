# Net Tower Plan

## Overview
The Net Tower is a new tower type designed to trap or slow down enemies by launching nets. It fits into the existing tower system, supporting multiple upgrade levels, each with improved stats and effects. This plan outlines the implementation steps, level structure, and integration points.

---

## 1. Directory & File Structure
- Create a new directory: `js/towers/netTower/`
- Each level of the Net Tower should have its own file, e.g.:
  - `netTowerLevel1.js`
  - `netTowerLevel2.js`
  - `netTowerLevel3.js`
  - `netTowerLevel4.js`
  - `netTowerLevel5.js`
- Rendering logic for the Net Tower and its projectiles should be in separate files (e.g., `netTowerRender.js`, `netProjectileRender.js`).

---

## 2. Net Tower Core Features
- **Attack Type:** Launches a net projectile at enemies within range.
- **Effect:** Nets trap or slow enemies for a duration.
- **Targeting:** Single or multiple enemies (configurable per level).
- **Upgrade Path:** 5 levels, each increasing range, net size, slow/trap duration, and possibly number of targets.

---

## 3. Level Design
- **Level 1:**
  - Basic net, traps/slows 1 enemy for a short duration.
  - Low range, low fire rate.
- **Level 2:**
  - Increased range and duration.
  - Slightly faster fire rate.
- **Level 3:**
  - Can trap/slow 2 enemies at once.
  - Larger net, longer duration.
- **Level 4:**
  - Further increased range and duration.
  - Traps/slows 3 enemies.
- **Level 5:**
  - Maximum range, duration, and net size.
  - Can trap/slow 4+ enemies.
  - Special effect: e.g., nets can chain to nearby enemies.

---

## 4. Implementation Steps
1. **Create Directory & Files:**
   - `js/towers/netTower/`
   - Level files: `netTowerLevel1.js` ... `netTowerLevel5.js`
   - Rendering files: `netTowerRender.js`, `netProjectileRender.js`
2. **Base Class:**
   - Extend from the base tower class (as other towers do).
   - Implement core logic for targeting, firing, and applying net effects.
3. **Level Classes:**
   - Each level file should export a class or function with level-specific stats and behavior.
   - Use existing tower level files as templates.
4. **Rendering:**
   - Implement rendering for the Net Tower and its projectiles in their own files.
   - Ensure visuals are distinct (e.g., net graphics, color changes per level).
5. **Integration:**
   - Register the Net Tower in the tower selection UI and game logic.
   - Add upgrade paths and costs.
   - Ensure compatibility with enemy logic (e.g., enemies can be trapped/slowed).
6. **Testing:**
   - Test each level for correct behavior, balance, and rendering.
   - Adjust stats as needed for game balance.

---

## 5. Example Stats Table
| Level | Range | Fire Rate | Net Size | Trap/Slow Duration | Targets |
|-------|-------|-----------|----------|--------------------|---------|
| 1     | 100   | 1.5s      | Small    | 1.5s               | 1       |
| 2     | 120   | 1.3s      | Small    | 2.0s               | 1       |
| 3     | 140   | 1.1s      | Medium   | 2.5s               | 2       |
| 4     | 160   | 1.0s      | Medium   | 3.0s               | 3       |
| 5     | 180   | 0.8s      | Large    | 3.5s               | 4+      |

---

## 6. Notes
- Ensure all rendering is in its own file.
- Each object (tower, projectile) should render from its own file.
- Follow conventions from other towers for consistency.
- Adjust stats and effects as needed for balance during playtesting. 