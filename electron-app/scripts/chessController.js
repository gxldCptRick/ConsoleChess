/* eslint-disable no-undef*/
import { ChessBoardDisplayer, squareSize} from '../scripts/ChessBoardDisplayer';
import { GameBoard } from '../../lib-built/controllers/GameBoard';
let display = null;
let currentGame = null;
let pieceSelected = null;

window.addEventListener('load', () => {
    let canvas = document.getElementById('board');
    currentGame = new GameBoard({x: 8, y: 8});
    let piecesImage = document.getElementById('pieces');
    display = new ChessBoardDisplayer(canvas, currentGame, piecesImage);
    display.displayBoard();
    configureClicked(canvas);
});

let configureClicked = (canvas) => {
    canvas.addEventListener('click', function(mouseEvent){
        display.displayBoard();
        let positionOnScreen = getPosititonOnScreen(mouseEvent);
        updateCurrentPiece(mouseEvent);
        let ctx = canvas.getContext('2d');
        let possibleMoves = currentGame.getPossibleMovesFor(pieceSelected);
        if(possibleMoves !== null){
            possibleMoves.forEach(array => {
                ctx.beginPath();
                ctx.fillStyle = "rgba(192, 1, 175, .5)";
                ctx.fillRect(array[0], array[1], squareSize, squareSize);
            });
        }

        ctx.beginPath();
        ctx.fillStyle = "rgba(255,255,0,.5)";
    
        ctx.fillRect(positionOnScreen.xPos, positionOnScreen.yPos, squareSize, squareSize);
    });
}

let getPosititonOnScreen = (mouseEvent) => {
    let xPos = (mouseEvent.clientX - (mouseEvent.clientX % squareSize));
    let yPos = (mouseEvent.clientY - (mouseEvent.clientY % squareSize));
    
    return { xPos: xPos, yPos: yPos };
}

let updateCurrentPiece = (mouseEvent) => {
    let character = Math.floor(mouseEvent.clientX/squareSize);
    let number = Math.floor(mouseEvent.clientY/squareSize) + 1;
    pieceSelected = {
        character: character,
        number: number
    };
}