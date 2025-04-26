// Pixel-art tile renderer for Tower Defense
// Draws a layered, dark square with border effect, closer to the provided image

let tileImage = null;
let tileImageLoaded = false;
let pathTileImage = null;
let pathTileImageLoaded = false;

function loadTileImage() {
  if (!tileImage) {
    tileImage = new window.Image();
    tileImage.src = 'assetes/lodestone.png';
    tileImage.onload = () => { tileImageLoaded = true; };
  }
}

function loadPathTileImage() {
  if (!pathTileImage) {
    pathTileImage = new window.Image();
    pathTileImage.src = 'assetes/palth blok.png';
    pathTileImage.onload = () => { pathTileImageLoaded = true; };
  }
}

export function drawTile(ctx, x, y, size) {
  loadTileImage();
  if (tileImageLoaded) {
    ctx.drawImage(tileImage, x, y, size, size);
  } else {
    // fallback: gray square
    ctx.fillStyle = '#444';
    ctx.fillRect(x, y, size, size);
  }
}

export function drawPathTile(ctx, x, y, size, rotation = 0) {
  loadPathTileImage();
  if (pathTileImageLoaded) {
    ctx.save();
    ctx.translate(x + size / 2, y + size / 2);
    ctx.rotate(rotation);
    ctx.drawImage(pathTileImage, -size / 2, -size / 2, size, size);
    ctx.restore();
  } else {
    // fallback: yellowish square
    ctx.fillStyle = '#bba94a';
    ctx.fillRect(x, y, size, size);
  }
} 