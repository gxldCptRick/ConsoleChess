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
        if (pieceCurrentlySelected.color !== this.currentGame.currentTurn) {
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