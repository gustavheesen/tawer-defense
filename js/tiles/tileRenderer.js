// Pixel-art tile renderer for Tower Defense
// Draws a layered, dark square with border effect, closer to the provided image

let tileImage = null;
let tileImageLoaded = false;

function loadTileImage() {
  if (!tileImage) {
    tileImage = new window.Image();
    tileImage.src = 'assetes/lodestone.png';
    tileImage.onload = () => { tileImageLoaded = true; };
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