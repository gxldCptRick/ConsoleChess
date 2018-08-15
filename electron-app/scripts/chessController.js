/* eslint-disable no-undef*/
import { ChessBoardDisplayer, squareSize} from '../scripts/ChessBoardDisplayer';
import { GameBoard } from '../../lib-built/controllers/GameBoard';
let display = null;
let currentGame = null;
let currentPiece = null;
let isSelectingMove = null;
let possibleMoves = null;
window.addEventListener('load', () => {
    let canvas = document.getElementById('board');
    currentGame = new GameBoard();
    let piecesImage = document.getElementById('pieces');
    display = new ChessBoardDisplayer(canvas, currentGame, piecesImage);
    display.displayBoard();
    configureClicked(canvas);
});

let configureClicked = (canvas) => { 
    canvas.addEventListener('click', function(mouseEvent){
        display.displayBoard();
        let selectedPiece = getCurrentSeletedPiece(mouseEvent);
        if(!isSelectingMove){
            currentPiece = selectedPiece;
            let positionOnScreen = getPosititonOnScreen(mouseEvent);
            let ctx = canvas.getContext('2d');
            possibleMoves = currentGame.getPossibleMovesFor(currentPiece);
            if(possibleMoves !== null){
                possibleMoves.forEach(point => {
                    ctx.beginPath();
                    ctx.fillStyle = "rgba(192, 1, 175, .5)";
                    ctx.fillRect(point.x * squareSize, (8 - point.y) * squareSize, squareSize, squareSize);
                });
            }
            ctx.beginPath();
            ctx.fillStyle = "rgba(255,255,0,.5)";
            ctx.fillRect(positionOnScreen.xPos, positionOnScreen.yPos, squareSize, squareSize);
            isSelectingMove = true;
        }else {
            isSelectingMove = false;
            let found = false;
            if(possibleMoves && currentPiece){
                for(let i = 0; i < possibleMoves.length && !found; i++){
                    let possible = possibleMoves[i];
                    found = possible.x === currentPiece.x && possible.y === currentPiece.y;
                }
                currentGame.runMovementCommand(currentPiece, selectedPiece);
            }

            display.displayBoard();
        }
    });
}

let getPosititonOnScreen = (mouseEvent) => {
    let xPos = (mouseEvent.clientX - (mouseEvent.clientX % squareSize));
    let yPos = (mouseEvent.clientY - (mouseEvent.clientY % squareSize));
    return { xPos: xPos, yPos: yPos };
}

let getCurrentSeletedPiece = (mouseEvent) => {
    let character =  Math.floor(mouseEvent.clientX/squareSize);
    let number =  8 - Math.floor(mouseEvent.clientY/squareSize);
    let currentSelectedPiece = {
        x: character,
        y: number
    };
    return currentSelectedPiece;
}