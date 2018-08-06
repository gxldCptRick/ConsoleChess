/* eslint-disable no-undef*/
import { ChessBoardDisplayer } from '../scripts/ChessBoardDisplayer';
import { GameBoard } from '../../lib-built/controllers/GameBoard';

window.addEventListener('load', () => {
    let canvas = document.getElementById('board');
    let currentGame = new GameBoard({x: 8, y: 8});
    let piecesImage = document.getElementById('pieces');
    let display = new ChessBoardDisplayer(canvas, currentGame, piecesImage);
    display.drawBoard();
    display.drawPieces();
    configureClicked(canvas);
});

let configureClicked = (canvas) => {
    canvas.addEventListener('click', function(){

    });
}