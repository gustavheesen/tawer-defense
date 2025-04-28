# Tower Defense Game

This is a modular HTML/JS tower defense game. To run the game locally and avoid CORS issues, use a static file server.

## Getting Started

### 1. Install dependencies

If you haven't already, run:

```
npm install
```

### 2. Start the development server

You can use the included npm script to run a static server:

```
npm run start
```

This will start a local server (by default on http://localhost:3000).

### 3. Open the game in your browser

Go to:

```
http://localhost:3000
```

and you should see the Tower Defense game.

---

## Notes
- Make sure you are running the server from the project root (where `index.html` is located).
- If you change the port or use a different server, adjust the URL accordingly.

---

## Upcoming Redesign: Tile-Based Coordinate System

### Current State
- The game currently uses a coordinate system where many calculations (positions, distances, ranges, speeds) are directly tied to pixel values, with conversions to and from tile coordinates for some logic.
- Rendering and logic are often mixed, with some game logic (e.g., range, speed) depending on pixel-based calculations.

### New Plan: Integer Tile-Based System
- **All game logic will use a pure integer tile-based coordinate system.**
  - The map is a 16x16 grid of tiles (customizable size). All positions, ranges, distances, and speeds are defined in terms of tile units (integers or floats for sub-tile movement).
  - No game logic (enemy movement, tower range, projectile speed, etc.) will depend on pixel values.
  - Only the rendering layer will convert tile coordinates to pixel coordinates, based on the current canvas size and tile size.
- **Rendering will be handled in separate files for each object.**
  - Each game object (tower, enemy, projectile, etc.) will have its own rendering file, which will be responsible for converting tile coordinates to pixel positions for drawing.
- **Transition Plan:**
  1. Refactor all game logic to use tile-based coordinates and units.
  2. Remove all pixel-based logic from non-rendering code.
  3. Update rendering code to handle conversion from tile to pixel coordinates.
  4. Ensure all tiles, positions, and movement are integer-based (or floats for smooth movement, but always in tile units).
  5. Maintain a strict separation between game logic (tile-based) and rendering (pixel-based). 