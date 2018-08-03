import { ChessPiece, PieceTypes, PieceColor } from '../models/ChessPiece'
import { BoardPoint } from '../models/BoardPoint'
const LowerBounds = {
    x: 1,
    y: 1
};

export class GameBoard {
    constructor(bounds){
        this.pieces = [];
        this.xLimit = bounds.x;
        this.yLimit = bounds.y;
        this.setupBoard();
    }

    setupBoard(){
        this.addPawns(PieceColor.White);
        this.addPawns(PieceColor.Black);
    }

    addRooks(color){
        let location = color == PieceColor.White? 1: 8;
        let rightRook = new ChessPiece(color, PieceTypes.Rook);
        this.pieces.push(rightRook);
        rightRook.setPosition(new BoardPoint(1,location));
        let leftRook = new ChessPiece(color, PieceTypes.Rook);
        this.pieces.push(leftRook);
        leftRook.setPosition(new BoardPoint(8, location));
    }

    addPawns(color){
        for(let i = 0; i < this.xLimit; i++){
            let pawn = new ChessPiece(color, PieceTypes.Pawn);
            this.pieces.push(pawn);
            let position = color === PieceColor.White ? 2 : 7; 
            pawn.setPosition(new BoardPoint(i, position));
        }
    }

    runSinglePointCommand(commandArgs){
        let firstPosition = commandArgs[0];
        let secondPosition = commandArgs[0];
        let originPoint = this.validateInRange(firstPosition);
        let destinationPoint = this.validateInRange(secondPosition);
        let pieceAtPoint = this.findPieceBasedOnPoint(originPoint);
        let success = pieceAtPoint.moveTo(destinationPoint);
        if(!success) throw `${pieceAtPoint.type.name} is not able to move there`
        return `${pieceAtPoint.type.name} moved to ${destinationPoint.Point}`
    }

    findPieceBasedOnPoint(originPoint){
        let piecesFound = this.pieces.filter((element) => element.getPosition().x == originPoint.x && element.getPosition().y == originPoint.y);
        if(piecesAtPoint.length > 1) throw "too many pieces to decide which one";
        if(piecesAtPoint.length < 1) throw "no piece at the selected point";
        return piecesFound[0];
    }

    validateInRange(positionToCheck){
        if(positionToCheck.length > 2) throw "Command To Long"
        let point = new Point(positionToCheck[0], positionToCheck[1]);
        if(point.x < LowerBounds.x || point.x > this.xLimit) throw "X point out of bounds"
        if(point.y < LowerBounds.y || point.y > this.yLimit) throw "Y point out of bounds"
        return point
    }
}