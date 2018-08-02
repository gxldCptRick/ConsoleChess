import { ChessPiece, PieceTypes, PieceColor } from '../models/ChessPiece'
import { BoardPoint } from '../models/BoardPoint'
export class GameBoard {
    constructor(){
        this.pieces = [];
        this.resetGameBoard();
    }
}