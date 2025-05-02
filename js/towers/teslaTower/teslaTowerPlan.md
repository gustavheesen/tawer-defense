# Tesla Tower Plan

## Overview
The Tesla Tower is a new tower type that attacks by firing electric bolts that chain between enemies. It fits into the existing tower system, supporting multiple upgrade levels, each with improved stats and effects. This plan outlines the implementation steps, level structure, and integration points.

---

## 1. Directory & File Structure
- Create a new directory: `js/towers/teslaTower/`
- Each level of the Tesla Tower should have its own file, e.g.:
  - `teslaTowerLevel1.js`
  - `teslaTowerLevel2.js`
  - `teslaTowerLevel3.js`
  - `teslaTowerLevel4.js`
  - `teslaTowerLevel5.js`
- Rendering logic for the Tesla Tower and its projectiles should be in separate files (e.g., `teslaTowerRender.js`, `teslaBoltRender.js`).

---

## 2. Tesla Tower Core Features
- **Attack Type:** Fires electric bolts that chain between multiple enemies within range.
- **Effect:** Deals damage and can stun or slow enemies briefly.
- **Targeting:** Prioritizes the nearest enemy, then chains to others within a certain radius.
- **Upgrade Path:** 5 levels, each increasing range, chain length, damage, and stun/slow duration.

---

## 3. Level Design
- **Level 1:**
  - Basic electric bolt, chains to 1 additional enemy.
  - Low range, moderate fire rate.
- **Level 2:**
  - Increased range and damage.
  - Chains to 2 enemies.
- **Level 3:**
  - Further increased range and damage.
  - Chains to 3 enemies, longer stun/slow.
- **Level 4:**
  - Chains to 4 enemies, higher damage.
  - Longer stun/slow duration.
- **Level 5:**
  - Maximum range, damage, and chain length (5+ enemies).
  - Special effect: bolts can split or double-chain.

---

## 4. Implementation Steps
1. **Create Directory & Files:**
   - `js/towers/teslaTower/`
   - Level files: `teslaTowerLevel1.js` ... `teslaTowerLevel5.js`
   - Rendering files: `teslaTowerRender.js`, `teslaBoltRender.js`
2. **Base Class:**
   - Extend from the base tower class (as other towers do).
   - Implement core logic for targeting, firing, and chaining bolt effects.
3. **Level Classes:**
   - Each level file should export a class or function with level-specific stats and behavior.
   - Use existing tower level files as templates.
4. **Rendering:**
   - Implement rendering for the Tesla Tower and its bolts in their own files.
   - Ensure visuals are distinct (e.g., electric arcs, color changes per level).
5. **Integration:**
   - Register the Tesla Tower in the tower selection UI and game logic.
   - Add upgrade paths and costs.
   - Ensure compatibility with enemy logic (e.g., enemies can be stunned/slowed).
6. **Testing:**
   - Test each level for correct behavior, balance, and rendering.
   - Adjust stats as needed for game balance.

---

## 5. Example Stats Table
| Level | Range | Fire Rate | Damage | Chain Length | Stun/Slow Duration | Special |
|-------|-------|-----------|--------|--------------|--------------------|---------|
| 1     | 100   | 1.2s      | 30     | 2            | 0.5s               | -       |
| 2     | 120   | 1.1s      | 40     | 3            | 0.7s               | -       |
| 3     | 140   | 1.0s      | 55     | 4            | 0.9s               | -       |
| 4     | 160   | 0.9s      | 70     | 5            | 1.1s               | -       |
| 5     | 180   | 0.8s      | 90     | 6            | 1.3s               | Split   |

---

## 6. Notes
- Ensure all rendering is in its own file.
- Each object (tower, bolt) should render from its own file.
- Follow conventions from other towers for consistency.
- Adjust stats and effects as needed for balance during playtesting. 