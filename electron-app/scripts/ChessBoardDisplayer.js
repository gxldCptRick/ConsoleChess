/* eslint-disable no-undef */
export class ChessBoardDisplayer {
    constructor(canvas, gameBoard){
        this.canvas = canvas;
        this.gameBoard = gameBoard;
    }

    drawBoard(){
        let context = this.canvas.getContext("2d");
        let squareSize = 50;
        for(let x = 0; x < 8; x++){
        
            for(let y = 0; y < 8; y++){
                let A = (y % 2 == 0);
                let B = (x % 2 == 0);
                context.fillStyle = (A && B) || (!A && !B)? "green" : "red";
                context.beginPath();
                context.rect((squareSize * x) , (squareSize * y), squareSize, squareSize);
                context.fill();
            }
        }
    }

    drawPieces(){

    }

}
