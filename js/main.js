import { Game } from './game.js';
import { setupUI } from './ui.js';

const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

const game = new Game(canvas, ctx);
setupUI(game);

game.start(); 