import { PieceTypes } from './PieceTypes';
import { ChessPiece, PieceColor } from './ChessPiece';
import { EventColor } from './EventColor';
import  BoardPoint  from './BoardPoint';
import { LowerBounds } from './constants/BoardConstants';

export class Pieces {
    constructor(upperBounds){
        this.upperBounds = upperBounds;
        this.captureEvent = new EventColor();
    }

    setupPieces() {
        this.setUpPiecesByColor(PieceColor.White);
        this.setUpPiecesByColor(PieceColor.Black);
        let that = this;
        this.captureEvent.invoke(that, PieceColor.White || PieceColor.Black);
    }
    
    setUpPiecesByColor(color) {
        this.addPawns(color);
        this.addRooks(color);
        this.addKnight(color);
        this.addBishop(color);
        this.addKingAndQueen(color);
    }

    addKingAndQueen(color) {
        let position = color === PieceColor.White ? LowerBounds.y : this.upperBounds.y;
        let king = new ChessPiece(color, PieceTypes.King);
        let queen = new ChessPiece(color, PieceTypes.Queen);
        king.setPosition(new BoardPoint(this.upperBounds.x - 4, position));
        queen.setPosition(new BoardPoint(this.upperBounds.x - 5, position));
        this[king.getPosition().Point] = king;
        this[queen.getPosition().Point] = queen;
    }

    addBishop(color) {
        let location = color === PieceColor.White ? LowerBounds.y : this.upperBounds.y;
        let rightBishop = new ChessPiece(color, PieceTypes.Bishop);
        let leftBishop = new ChessPiece(color, PieceTypes.Bishop);
        leftBishop.setPosition(new BoardPoint(LowerBounds.x + 2, location));
        rightBishop.setPosition(new BoardPoint(this.upperBounds.x - 3, location));
        this[rightBishop.getPosition().Point] = rightBishop;
        this[leftBishop.getPosition().Point] = leftBishop;
    }

    addKnight(color) {
        let location = color === PieceColor.White ? LowerBounds.y : this.upperBounds.y;
        let rightKnight = new ChessPiece(color, PieceTypes.Knight);
        let leftKnight = new ChessPiece(color, PieceTypes.Knight);
        leftKnight.setPosition(new BoardPoint(LowerBounds.x + 1, location));
        rightKnight.setPosition(new BoardPoint(this.upperBounds.x - 2, location));
        this[rightKnight.getPosition().Point] = rightKnight;
        this[leftKnight.getPosition().Point] = leftKnight;
    }

    addRooks(color) {
        let location = color == PieceColor.White ? LowerBounds.y : this.upperBounds.y;
        let rightRook = new ChessPiece(color, PieceTypes.Rook);
        let leftRook = new ChessPiece(color, PieceTypes.Rook);
        leftRook.setPosition(new BoardPoint(LowerBounds.x, location));
        rightRook.setPosition(new BoardPoint(this.upperBounds.x - 1, location));
        this[rightRook.getPosition().Point] = rightRook;
        this[leftRook.getPosition().Point] = leftRook;
    }

    addPawns(color) {
        for (let i = LowerBounds.x; i < this.upperBounds.x; i++) {
            let pawn = new ChessPiece(color, PieceTypes.Pawn);
            let position = color === PieceColor.White ? LowerBounds.y + 1 : this.upperBounds.y - 1;
            pawn.setPosition(new BoardPoint(i, position));
            this[pawn.getPosition().Point] = pawn;
        }
    }

    processColor(colorName) {
        if (colorName !== 'l' && colorName !== 'd') throw 'Not a valid color option'
        let color = colorName === 'l' ? PieceColor.White : PieceColor.Black;
        return color;
    }

    
    proccessType(typeName) {
        let type = null;
        if(typeName === 'P') type = PieceTypes.Pawn;
        else if(typeName === 'R') type = PieceTypes.Rook;
        else if(typeName === 'N') type = PieceTypes.Knight;
        else if(typeName === 'B') type = PieceTypes.Bishop;
        else if(typeName === 'Q') type = PieceTypes.Queen;
        else if(typeName === 'K') type = PieceTypes.King;
        else throw 'No valid type name provided.';
        return type;
    }

    addPiece(color, type, location){
        let piecePlaced = new ChessPiece(this.processColor(color), this.proccessType(type));
        piecePlaced.setPosition(location);
        this[location.Point] = piecePlaced;
        return piecePlaced;
    }

}