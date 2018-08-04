import { PieceTypes } from '../models/PieceTypes';
import { ChessPiece, PieceColor } from '../models/ChessPiece'
import { BoardPoint } from '../models/BoardPoint'
const LowerBounds = {
    x: 1,
    y: 1
};

export class GameBoard {
    constructor(bounds){
        this.pieces = {};
        this.xLimit = bounds.x;
        this.yLimit = bounds.y;
        this.setupBoard();
    }

    setupBoard(){
        this.setUpColoredPieces(PieceColor.White);
        this.setUpColoredPieces(PieceColor.Black);
    }

    setUpColoredPieces(color){
        this.addPawns(color);
        this.addRooks(color);
        this.addKnight(color);
        this.addBishop(color);
        this.addKingAndQueen(color);
    }

    addKingAndQueen(color){
        let position = color === PieceColor.White? LowerBounds.y: this.yLimit;
        let king = new ChessPiece(color, PieceTypes.King);
        let queen = new ChessPiece(color, PieceTypes.Queen);
        king.setPosition(new BoardPoint(this.xLimit - 3, position));
        queen.setPosition(new BoardPoint(LowerBounds.x + 3, position));
        this.pieces[king.getPosition().Point] = king;
        this.pieces[queen.getPosition().Point] = queen;
    }

    addBishop(color){
        let location = color === PieceColor.White ? LowerBounds.y:  this.yLimit;
        let rightBishop = new ChessPiece(color, PieceTypes.Bishop);
        let leftBishop = new ChessPiece(color, PieceTypes.Bishop);
        leftBishop.setPosition(new BoardPoint(LowerBounds.x + 2, location));
        rightBishop.setPosition(new BoardPoint(this.xLimit  - 2, location));
        this.pieces[rightBishop.getPosition().Point] = rightBishop;
        this.pieces[leftBishop.getPosition().Point] = leftBishop;
    }

    addKnight(color){
        let location = color === PieceColor.White ? LowerBounds.y: this.yLimit;
        let rightKnight = new ChessPiece(color, PieceTypes.Knight);
        let leftKnight = new ChessPiece(color, PieceTypes.Knight);
        leftKnight.setPosition(new BoardPoint(LowerBounds.x + 1, location));
        rightKnight.setPosition(new BoardPoint(this.yLimit - 1, location));
        this.pieces[rightKnight.getPosition().Point] = rightKnight;
        this.pieces[leftKnight.getPosition().Point] = leftKnight;
    }

    addRooks(color){
        let location = color == PieceColor.White? LowerBounds.y: this.yLimit;
        let rightRook = new ChessPiece(color, PieceTypes.Rook);
        let leftRook = new ChessPiece(color, PieceTypes.Rook);
        leftRook.setPosition(new BoardPoint(LowerBounds.x,location));
        rightRook.setPosition(new BoardPoint(this.xLimit, location));
        this.pieces[rightRook.getPosition().Point];
        this.pieces[leftRook.getPosition().Point];
    }

    addPawns(color){
        for(let i = 0; i < this.xLimit; i++){
            let pawn = new ChessPiece(color, PieceTypes.Pawn);
            let position = color === PieceColor.White ? LowerBounds.y + 1 : this.yLimit - 1; 
            pawn.setPosition(new BoardPoint(i, position));
            this.pieces[pawn.getPosition().Point] = pawn;
        }
    }

    runSinglePointCommand(commandArgs){
        let firstPosition = commandArgs[0];
        let secondPosition = commandArgs[1];
        let originPoint = this.validateInRange(firstPosition);
        let destinationPoint = this.validateInRange(secondPosition);
        let pieceAtPoint = this.findPieceBasedOnPoint(originPoint); 
        let pieceAtDestination = this.findPieceBasedOnPoint(destinationPoint); 
        let isPieceAtPoint = pieceAtDestination != null;
        if(isPieceAtPoint) throw `${pieceAtPoint.type.name} at ${originPoint.Point} cannot move on to same position as ${pieceAtDestination.type.name} at ${destinationPoint.Point}`
        let wasAbleToMove = pieceAtPoint.moveTo(destinationPoint);
        if(!wasAbleToMove) throw `${pieceAtPoint.type.name} at ${originPoint.Point} is not able to move to ${destinationPoint.Point}`
        wasAbleToMove = this.AdjustPositionInHash(pieceAtPoint, destinationPoint);
        return `${pieceAtPoint.type.name} moved to ${destinationPoint.Point}`
    }

    AdjustPositionInHash(piece, point){
        this.pieces[piece.getPosition().Point] = null;
        this.pieces[point.Point] = piece; 
    }

    findPieceBasedOnPoint(originPoint){
        console.log(originPoint.Point);
        let piece = this.pieces[originPoint.Point];
        return piece;
    }

    validateInRange(positionToCheck){
        if(positionToCheck.length > 2) throw "pass in a position"
        let point = new BoardPoint(positionToCheck[0], positionToCheck[1]);
        if(point.x < LowerBounds.x || point.x > this.xLimit) throw `${point.Point} is not on the board`
        if(point.y < LowerBounds.y || point.y > this.yLimit) throw `${point.Point} is not on the Board`
        return point
    }
}