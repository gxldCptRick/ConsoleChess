/* eslint-disable no-undef, no-alert, capitalized-comments, multiline-comment-style, no-new*/
import { ChessBoardDisplayer, squareSize } from '../scripts/ChessBoardDisplayer';
import { GameBoard } from '../../lib-built/controllers/GameBoard';
export class ChessController {
    constructor() {
        this.initGame();
    }

    initGame(){
        this.possibleMovesForCurrentPiece = null;
        this.currentPiece = null;
        this.isSelectingMove = false;
        this.currentTurn = 'White';
        this.currentGame = new GameBoard();
        this.currentGame.checkEvent.listeners.push((sender, color) =>  alert(color, 'King Is In Check'));
    }

    windowLoadEvent() {
        this.canvasOnPage = document.getElementById('board');
        let imageOfPieces = document.getElementById('pieces');
        this.display = new ChessBoardDisplayer(this.canvasOnPage, this.currentGame, imageOfPieces);
        this.display.displayBoard();
    }

    getPosititonOnScreen(mouseEvent) {
        let xPos = (mouseEvent.clientX - (mouseEvent.clientX % squareSize));
        let yPos = (mouseEvent.clientY - (mouseEvent.clientY % squareSize));
        return { xPos: xPos, yPos: yPos };
    }

    getCurrentlySelectedPiece(mouseEvent) {
        let character = Math.floor(mouseEvent.clientX / squareSize);
        let number = 8 - Math.floor(mouseEvent.clientY / squareSize);
        let currentlySelectedPiece = {
            x: character,
            y: number
        };
        return currentlySelectedPiece;
    }

    displayMovementPattern(mouseEvent, pieceCurrentlySelected) {
        let positionOnScreen = this.getPosititonOnScreen(mouseEvent);
        let ctx = this.canvasOnPage.getContext('2d');
        if (pieceCurrentlySelected.color !== this.currentTurn) {
            alert("It is not your turn.... GOD... rude");
        } else {
            this.possibleMovesForCurrentPiece = this.currentGame.getPossibleMovesFor(this.currentPiece);
            if (this.possibleMovesForCurrentPiece !== null) {
                this.possibleMovesForCurrentPiece.forEach(point => {
                    ctx.beginPath();
                    ctx.fillStyle = "rgba(192, 1, 175, .5)";
                    ctx.fillRect(point.x * squareSize, (8 - point.y) * squareSize, squareSize, squareSize);
                });
            }
            ctx.beginPath();
            ctx.fillStyle = "rgba(255, 255, 0, 0.3)";
            ctx.fillRect(positionOnScreen.xPos, positionOnScreen.yPos, squareSize, squareSize);
            this.isSelectingMove = true;
        }
    }

    movePiece(selectedPiece) {
        this.isSelectingMove = false;
        let found = false;
        if (this.possibleMovesForCurrentPiece && this.currentPiece) {
            for (let i = 0; i < this.possibleMovesForCurrentPiece.length && !found; i++) {
                let possible = this.possibleMovesForCurrentPiece[i];
                found = possible.x === selectedPiece.x && possible.y === selectedPiece.y;
            }
            if (found) {
                this.currentGame.runMovementCommand(this.currentPiece, selectedPiece);
                this.currentTurn = this.currentTurn === 'White' ? 'Black' : 'White';
                this.display.displayBoard();
            }
        }
    }

    reset() {
        this.initGame();
        this.display.gameBoard = this.currentGame;
        this.display.displayBoard();
    }

    canvasClickedEvent(mouseEvent) {
        this.display.displayBoard();
        let selectedPiece = this.getCurrentlySelectedPiece(mouseEvent);
        let pieceCurrentlySelected = this.currentGame.getSelectedPiece(selectedPiece);
        if (!this.isSelectingMove && pieceCurrentlySelected) {
            this.currentPiece = selectedPiece;
            this.displayMovementPattern(mouseEvent, pieceCurrentlySelected);
        } else {
            this.movePiece(selectedPiece);
        }
    }
}


// let display = null;
// let currentGame = null;
// let currentPiece = null;
// let isSelectingMove = null;
// let possibleMoves = null;
// let currentTurn = 'White';
// window.addEventListener('load', () => {
//     let canvas = document.getElementById('board');
//     currentGame = new GameBoard();
//     let piecesImage = document.getElementById('pieces');
//     display = new ChessBoardDisplayer(canvas, currentGame, piecesImage);
//     display.displayBoard();
//     configureClicked(canvas);
//     let resetButton = document.getElementById('reset');
//     resetButton.addEventListener('click', () => );
// });

// let configureClicked = (canvas) => {
//     canvas.addEventListener('click', (mouseEvent) => {
//         display.displayBoard();
//         let selectedPiece = getCurrentSeletedPiece(mouseEvent);
//         let pieceCurrentlySelected = currentGame.getSelectedPiece(selectedPiece);
//         if (!isSelectingMove && pieceCurrentlySelected) {
//             currentPiece = selectedPiece;
//             let positionOnScreen = getPosititonOnScreen(mouseEvent);
//             let ctx = canvas.getContext('2d');
//             if (pieceCurrentlySelected.color !== currentTurn) {
//                 alert("It is not your turn.... GOD... rude");
//             } else {
//                 possibleMoves = currentGame.getPossibleMovesFor(currentPiece);
//                 if (possibleMoves !== null) {
//                     possibleMoves.forEach(point => {
//                         ctx.beginPath();
//                         ctx.fillStyle = "rgba(192, 1, 175, .5)";
//                         ctx.fillRect(point.x * squareSize, (8 - point.y) * squareSize, squareSize, squareSize);
//                     });
//                 }
//                 ctx.beginPath();
//                 ctx.fillStyle = "rgba(255,255,0,.5)";
//                 ctx.fillRect(positionOnScreen.xPos, positionOnScreen.yPos, squareSize, squareSize);
//                 isSelectingMove = true;
//             }

//         } else {
//             isSelectingMove = false;
//             let found = false;
//             if (possibleMoves && currentPiece) {
//                 for (let i = 0; i < possibleMoves.length && !found; i++) {
//                     let possible = possibleMoves[i];
//                     found = possible.x === currentPiece.x && possible.y === currentPiece.y;
//                 }
//                 currentGame.runMovementCommand(currentPiece, selectedPiece);
//                 currentTurn = currentTurn === 'White' ? 'Black' : 'White';
//             }

//             display.displayBoard();
//         }
//     });
// }

// let getPosititonOnScreen = (mouseEvent) => {
//     let xPos = (mouseEvent.clientX - (mouseEvent.clientX % squareSize));
//     let yPos = (mouseEvent.clientY - (mouseEvent.clientY % squareSize));
//     return { xPos: xPos, yPos: yPos };
// }

// let getCurrentSeletedPiece = (mouseEvent) => {
//     let character = Math.floor(mouseEvent.clientX / squareSize);
//     let number = 8 - Math.floor(mouseEvent.clientY / squareSize);
//     let currentSelectedPiece = {
//         x: character,
//         y: number
//     };
//     return currentSelectedPiece;
// }
