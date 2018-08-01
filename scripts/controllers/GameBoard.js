import { ChessPiece, PieceTypes, PieceColor } from '../models/ChessPiece'
import { BoardPoint } from '../models/BoardPoint'
export class GameBoard {
    constructor(){
        this.pieces = [];
        this.resetGameBoard();
    }

    resetGameBoard(){
        this.pieces = [];
        this.addWhitePawns();
        this.addBlackPawns();
    }

    addWhitePawns(){
        for (let index = 0; index < 7; index++) {
            const piece = new ChessPiece(PieceColor.White, PieceTypes.Pawn);
            piece.setPosition(new BoardPoint(index, 2));
            this.pieces.push(piece);
        }
    }
    addSpecialDoubles(color, type, letterPosition, numberPosition)
    {
        for(let i = 0; i < 2; i++){
            const piece = new ChessPiece(color, type);
            piece.setPosition(new BoardPoint(letterPosition))
        }
    }

    addBlackPawns(){
        for (let index = 0; index < 7; index++) {
            const piece = new ChessPiece(PieceColor.Black, PieceTypes.Pawn);
            piece.setPosition(new BoardPoint(index, 7));
            this.pieces.push(piece);
        }
    }
}