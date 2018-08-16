import { PieceTypes } from '../models/PieceTypes';
import { ChessPiece, PieceColor } from '../models/ChessPiece'
import BoardPoint from '../models/BoardPoint'
const LowerBounds = {
    x: 0,
    y: 1
};

export class GameBoard {
    constructor(bounds = { x: 8, y: 8 }, customPlacement = false) {
        this.pieces = {};
        this.xLimit = bounds.x;
        this.yLimit = bounds.y;
        if (!customPlacement) {
            this.setupBoard();
        }
    }
    setupBoard() {
        this.setUpColoredPieces(PieceColor.White);
        this.setUpColoredPieces(PieceColor.Black);
    }

    setUpColoredPieces(color) {
        this.addPawns(color);
        this.addRooks(color);
        this.addKnight(color);
        this.addBishop(color);
        this.addKingAndQueen(color);
    }

    getPossibleMovesFor(point) {
        let boardPoint = new BoardPoint(point.x, point.y);
        let piece = this.pieces[boardPoint.Point];
        let moves = null;
        if (piece != null) {
            moves = this.getAllPossiblePointsOnGrid(boardPoint);
            moves = moves.filter((value) => piece.canMoveTo(value));
        }
        return moves;
    }

    getAllPossiblePointsOnGrid() {
        if (!this.points) {
            this.points = [];
            for (let x = 0; x < this.xLimit; x++) {
                for (let y = 1; y <= this.yLimit; y++) {
                    this.points.push(new BoardPoint(x, y));
                }
            }
        }

        return this.points;
    }

    addKingAndQueen(color) {
        let position = color === PieceColor.White ? LowerBounds.y : this.yLimit;
        let king = new ChessPiece(color, PieceTypes.King);
        let queen = new ChessPiece(color, PieceTypes.Queen);
        king.setPosition(new BoardPoint(this.xLimit - 4, position));
        queen.setPosition(new BoardPoint(this.xLimit - 5, position));
        this.pieces[king.getPosition().Point] = king;
        this.pieces[queen.getPosition().Point] = queen;
    }

    addBishop(color) {
        let location = color === PieceColor.White ? LowerBounds.y : this.yLimit;
        let rightBishop = new ChessPiece(color, PieceTypes.Bishop);
        let leftBishop = new ChessPiece(color, PieceTypes.Bishop);
        leftBishop.setPosition(new BoardPoint(LowerBounds.x + 2, location));
        rightBishop.setPosition(new BoardPoint(this.xLimit - 3, location));
        this.pieces[rightBishop.getPosition().Point] = rightBishop;
        this.pieces[leftBishop.getPosition().Point] = leftBishop;
    }

    addKnight(color) {
        let location = color === PieceColor.White ? LowerBounds.y : this.yLimit;
        let rightKnight = new ChessPiece(color, PieceTypes.Knight);
        let leftKnight = new ChessPiece(color, PieceTypes.Knight);
        leftKnight.setPosition(new BoardPoint(LowerBounds.x + 1, location));
        rightKnight.setPosition(new BoardPoint(this.xLimit - 2, location));
        this.pieces[rightKnight.getPosition().Point] = rightKnight;
        this.pieces[leftKnight.getPosition().Point] = leftKnight;
    }

    addRooks(color) {
        let location = color == PieceColor.White ? LowerBounds.y : this.yLimit;
        let rightRook = new ChessPiece(color, PieceTypes.Rook);
        let leftRook = new ChessPiece(color, PieceTypes.Rook);
        leftRook.setPosition(new BoardPoint(LowerBounds.x, location));
        rightRook.setPosition(new BoardPoint(this.xLimit - 1, location));
        this.pieces[rightRook.getPosition().Point] = rightRook;
        this.pieces[leftRook.getPosition().Point] = leftRook;
    }

    addPawns(color) {
        for (let i = LowerBounds.x; i < this.xLimit; i++) {
            let pawn = new ChessPiece(color, PieceTypes.Pawn);
            let position = color === PieceColor.White ? LowerBounds.y + 1 : this.yLimit - 1;
            pawn.setPosition(new BoardPoint(i, position));
            this.pieces[pawn.getPosition().Point] = pawn;
        }
    }


    runMovementCommand(pieceUno, pieceDos) {
        return this.movePiece(new BoardPoint(pieceUno.x, pieceUno.y), new BoardPoint(pieceDos.x, pieceDos.y));
    }

    movePiece(originPoint, destinationPoint) {
        let pieceAtPoint = this.findPieceBasedOnPoint(originPoint);
        let pieceAtDestination = this.findPieceBasedOnPoint(destinationPoint);
        let isPieceAtPoint = pieceAtDestination != null;
        let isAbleToCapture = false;
        let message = "unable to move non existant piece";
        if (isPieceAtPoint && !isAbleToCapture) throw `${pieceAtPoint.type.name} at ${originPoint.Point} cannot move on to same position as ${pieceAtDestination.type.name} at ${destinationPoint.Point}`
        if (pieceAtPoint) {
            let isAbleToMove = pieceAtPoint.moveTo(destinationPoint);
            message = `${pieceAtPoint.type.name}`;
            if (!isAbleToMove && !isAbleToCapture) throw `${pieceAtPoint.type.name} at ${originPoint.Point} is not able to move to ${destinationPoint.Point}`;
            else if (isAbleToCapture) message += ` has captured ${pieceAtDestination.type.name}`;
            else message += ` has moved to point`;
            message += ` at ${destinationPoint.Point}`;
            isAbleToMove = this.AdjustPositionInHash(originPoint, destinationPoint);
        }
        return message;
    }

    runSinglePointCommand(commandArgs) {
        let firstPosition = commandArgs[0];
        let secondPosition = commandArgs[1];
        let originPoint = this.validateInRange(firstPosition);
        let destinationPoint = this.validateInRange(secondPosition);
        return this.movePiece(originPoint, destinationPoint);
    }

    runPlacementCommand(command) {
        let parts = command.split('');
        if (parts.length > 4) throw "command to long";
        let pieceType = parts[0];
        let pieceColor = parts[1];
        let location = this.validateInRange(parts.slice(2));
        let pieceAtLocation = this.findPieceBasedOnPoint(location);
        if (pieceAtLocation != null) throw `${pieceAtLocation.type.name} is already on ${location.Point}`
        let piecePlaced = new ChessPiece(this.processColor(pieceColor), this.proccessType(pieceType));
        piecePlaced.setPosition(location);
        this.pieces[location.Point] = piecePlaced;
        return `Placing ${piecePlaced.color} ${piecePlaced.type.name} on ${location.Point}`;
    }

    processColor(colorName) {
        if (colorName !== 'l' && colorName !== 'd') throw 'Not a valid color option'
        let color = colorName === 'l' ? PieceColor.White : PieceColor.Black;
        return color;
    }

    proccessType(typeName) {
        let type = null;
        switch (typeName) {
            case 'P':
                type = PieceTypes.Pawn;
                break;
            case 'R':
                type = PieceTypes.Rook;
                break;
            case 'N':
                type = PieceTypes.Knight;
                break;
            case 'B':
                type = PieceTypes.Bishop;
                break;
            case 'Q':
                type = PieceTypes.Queen;
                break;
            case 'K':
                type = PieceTypes.King;
                break;
            default:
                throw 'Not a valid Type';
        }
        return type;
    }

    AdjustPositionInHash(originalPosition, newPosition) {
        this.pieces[newPosition.Point] = this.pieces[originalPosition.Point];
        this.pieces[originalPosition.Point] = null;
    }

    findPieceBasedOnPoint(originPoint) {
        let piece = this.pieces[originPoint.Point];
        return piece;
    }

    validateInRange(positionToCheck) {
        if (positionToCheck.length > 2) throw "pass in a position"
        let point = new BoardPoint(positionToCheck[0], positionToCheck[1]);
        if (point.x < LowerBounds.x || point.x > this.xLimit) throw `${point.Point} is not on the board`
        if (point.y < LowerBounds.y || point.y > this.yLimit) throw `${point.Point} is not on the Board`
        return point
    }
}