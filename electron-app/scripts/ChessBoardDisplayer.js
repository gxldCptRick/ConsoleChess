import PieceDrawer from '../scripts/PieceDrawer';
export const squareSize = 50;
const ValueForA = 'A'.charCodeAt();
export class ChessBoardDisplayer {
    constructor(canvas, gameBoard, piecesImage){
        this.canvas = canvas;
        this.gameBoard = gameBoard;
        this.pieceDrawer = new PieceDrawer(piecesImage, canvas);
    }

    displayBoard(){
        this.drawBoard();
        this.drawPieces();
    }

    drawBoard(){
        let context = this.canvas.getContext("2d");
        for(let x = 0; x < 8; x++){
            for(let y = 0; y < 8; y++){
                let yIsEven = (y % 2 == 0);
                let xIsEven = (x % 2 == 0);
                context.fillStyle = (!yIsEven || !xIsEven) && (yIsEven || xIsEven)?  "#5ad157":  "#c0ffee";
                context.beginPath();
                context.rect((squareSize * x) , (squareSize * y), squareSize, squareSize);
                context.fill();
            }
        }
    }

    drawPieces(){
        let pieces = this.gameBoard.pieces;
        let xSize = this.gameBoard.xLimit;
        let ySize = this.gameBoard.yLimit;
        for (let y = ySize; y > 0; y--) {
            for (let x = 0; x <= xSize; x++) {
                let char = String.fromCharCode(ValueForA + x);
                let possiblePiece = pieces[`${char}${y}`];
                if (possiblePiece != null) {
                    this.pieceDrawer.drawPiece(possiblePiece, {x: ((7 - x) * squareSize), y: (((8 - y)) * squareSize)});
                } 
            }
        }
    }
}
