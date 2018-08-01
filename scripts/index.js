import { GameBoard } from './controllers/GameBoard';
import { ChessPiece, PieceColor, PieceTypes } from './models/ChessPiece';
var queen = new ChessPiece(PieceColor.White, PieceTypes.Queen);
console.log(queen.type.value)
var Board = new GameBoard();
console.log(Board)