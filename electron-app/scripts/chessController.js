/* eslint-disable no-alert, no-undef, no-unused-vars*/
import { ChessBoardDisplayer, squareSize } from '../scripts/ChessBoardDisplayer';
import { GameBoard } from '../../lib-built/controllers/GameBoard';
export class ChessController {
    constructor() {
        this.initGame();
    }

    initGame() {
        this.possibleMovesForCurrentPiece = null;
        this.currentPiece = null;
        this.isSelectingMove = false;
        this.currentGame = new GameBoard();
        let that = this;
        this.currentGame.checkEvent.listeners.push((sender, color) => {
            alert(color, 'King Is In Check');
            that.display.displayCheckFor(color);
        });
        this.currentGame.checkMateEvent.listeners.push((sender, color) => {
            alert(color, 'King has Been Check Mated');
            that.gameIsOver = true;
            setTimeout(() => that.display.displayGameOver(), 100);
        });
        this.currentGame.promotionEvent.listeners.push((sender, piece, promotions) => {
            alert('What Would You Like To Be Promoted To????', "Promotion");
        });
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

    checkIfRightColor(pieceCurrentlySelected) {
        return pieceCurrentlySelected.color === this.currentGame.currentTurn
    }

    displayMovementPattern(mouseEvent, pieceCurrentlySelected) {
        let positionOnScreen = this.getPosititonOnScreen(mouseEvent);
        let ctx = this.canvasOnPage.getContext('2d');
        if (!this.checkIfRightColor(pieceCurrentlySelected)) {
            alert("It is not your turn.... GODAAA... rude...", "Not Even Trying To Play By The Rules");
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
                this.display.displayCheckFor("Black");
                this.display.displayCheckFor("White");
            }
        }
    }

    reset() {
        this.initGame();
        this.display.gameBoard = this.currentGame;
        this.display.displayBoard();
        this.display.hideChecks();
        this.gameIsOver = false;
    }

    canvasClickedEvent(mouseEvent) {
        if (!this.gameIsOver) {
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
}