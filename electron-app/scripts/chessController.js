import { ChessBoardDisplayer } from '../scripts/ChessBoardDisplayer';
import { GameBoard } from '../../lib-built/controllers/GameBoard';

window.addEventListener('load', () => {
    let canvas = document.getElementById('board');
    let currentGame = new GameBoard({x: 8, y: 8});
    let display = new ChessBoardDisplayer(canvas, currentGame);

    display.drawBoard();
});