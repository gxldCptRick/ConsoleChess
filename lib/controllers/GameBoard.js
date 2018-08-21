import { PieceTypes } from '../models/PieceTypes';
import { ChessPiece, PieceColor } from '../models/ChessPiece'
import BoardPoint from '../models/BoardPoint'
import { EventColor } from '../models/EventColor';
const LowerBounds = {
    x: 0,
    y: 1
};
export class GameBoard {
    constructor(bounds = { x: 8, y: 8 }, customPlacement = false) {
        this.pieces = {};
        this.xLimit = bounds.x;
        this.yLimit = bounds.y;
        this.captureEvent = new EventColor();
        this.captureEvent.listeners.push(this.updatePiecesArray);
        this.checkEvent = new EventColor();
        this.checkMateEvent = new EventColor();
        if (!customPlacement) {
            this.setupBoard();
        }
    }

    updatePiecesArray(sender, color){
        if(color === 'White'){
            sender.whitePieces = [];
            for (const key in sender.pieces) {
                if(sender.pieces[key] !== undefined){
                    let piece = sender.pieces[key];
                    if(piece.color === 'White') sender.whitePieces.push(piece);
                }
            }
        }else{
            sender.bertPieces = [];
            for (const key in sender.pieces) {
                if(sender.pieces[key] !== undefined){
                    let piece = sender.pieces[key];
                    if(piece.color === 'Black') sender.bertPieces.push(piece);
                }
            }
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
        let that = this;
        this.captureEvent.invoke(that, color);
    }

    getSelectedPiece(point){
        let boardPoint = new BoardPoint(point.x, point.y);
        let piece = this.pieces[boardPoint.Point]
        return piece;
    }

    getPossibleMovesFor(point) {
        let boardPoint = new BoardPoint(point.x, point.y);
        let piece = this.pieces[boardPoint.Point];
        let moves = null;
        if (piece !== undefined) {
            let that = this;
            moves = this.getAllPossiblePointsOnGrid(boardPoint);
            moves = moves.filter((value) => piece.canMoveTo(value) || piece.canCapture(that.pieces, value));
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
        let that = this;
        let pieceAtPoint = this.findPieceBasedOnPoint(originPoint);
        if(!pieceAtPoint) throw `There is not a piece to move at (${originPoint.Point}).`;
        let pieceAtDestination = this.findPieceBasedOnPoint(destinationPoint);
        let isPieceAtPoint = pieceAtDestination !== undefined;
        let isAbleToCapture = pieceAtPoint.canCapture(pieceAtDestination);
        let message = "unable to move non existant piece";
        if (isPieceAtPoint && !isAbleToCapture) throw `${pieceAtPoint.type.name}(${originPoint.Point}) cannot move on to same position as ${pieceAtDestination.type.name}(${destinationPoint.Point}).`
        if (pieceAtPoint) {
            let isAbleToMove = pieceAtPoint.moveTo(destinationPoint);
            message = `${pieceAtPoint.type.name}(${originPoint.Point})`;
            if (!isAbleToMove && !isAbleToCapture) throw `${pieceAtPoint.type.name}(${originPoint.Point}) is not able to move to (${destinationPoint.Point}).`;
            else if (isAbleToCapture){
                message += ` has captured ${pieceAtDestination.type.name}`;
                if(this.captureEvent) this.captureEvent.invoke(that, pieceAtDestination.color);
                pieceAtPoint.setPosition(destinationPoint);
            }    
            else message += ` has moved to`;
            message += `(${destinationPoint.Point}).`;
            isAbleToMove = this.updatePositionInHash(originPoint, destinationPoint);
        }
        let colorThatMightBeInCheck = pieceAtPoint.color === 'White'? 'Black': 'White'
        let check = this.checkIfColorIsInCheck(colorThatMightBeInCheck);
        if(check){
            let checkMate = this.checkIfColorIsInCheckMate(colorThatMightBeInCheck);
            if(checkMate) this.checkMateEvent.invoke(that, colorThatMightBeInCheck); 
            else this.checkEvent.invoke(that, colorThatMightBeInCheck);
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
        if (parts.length > 4) throw "Command is too long to be valid.";
        let pieceType = parts[0];
        let pieceColor = parts[1];
        let location = this.validateInRange(parts.slice(2));
        let pieceAtLocation = this.findPieceBasedOnPoint(location);
        if (pieceAtLocation !== undefined) throw `Cannot place because (${pieceAtLocation.type.name})(${location.Point}) is already there.`
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

    updatePositionInHash(originalPosition, newPosition) {
        this.pieces[newPosition.Point] = this.pieces[originalPosition.Point];
        delete this.pieces[originalPosition.Point];
    }

    findPieceBasedOnPoint(originPoint) {
        let piece = this.pieces[originPoint.Point];
        return piece;
    }

    validateInRange(positionToCheck) {
        if (positionToCheck.length > 2) throw "pass in a position"
        let point = new BoardPoint(positionToCheck[0], positionToCheck[1]);
        if ((point.x < LowerBounds.x || point.x > this.xLimit) || (point.y < LowerBounds.y || point.y > this.yLimit)){
            throw `(${point.Point}) is not on a valid point on the board.`
        } 
        return point
    }

    checkIfColorIsInCheckMate(color){
        let isInCheckMate = true;
        let movement = null;
        if(color === 'White'){
            let theOneTrueKing = this.whitePieces.filter((w) => w.type === PieceTypes.King)[0];
            movement = this.getAllPossiblePointsOnGrid().filter(p => theOneTrueKing.canMoveTo(p));
            for (let i = 0; i < this.bertPieces.length && isInCheckMate; i++) {
                const e = this.bertPieces[i];
                for(let j = 0; j < movement.length && isInCheckMate; j++){
                    isInCheckMate = e.canCapture(theOneTrueKing, movement[j]);  
                }
            } 
        }else {
            let theOneTrueKing = this.whitePieces.filter((w) => w.type === PieceTypes.King)[0];
            movement = this.getAllPossiblePointsOnGrid().filter(p => theOneTrueKing.canMoveTo(p));
            for (let i = 0; i < this.bertPieces.length && isInCheckMate; i++) {
                const e = this.bertPieces[i];
                for(let j = 0; j < movement.length && isInCheckMate; j++){
                    isInCheckMate = e.canCapture(theOneTrueKing, movement[j]);  
                }
            } 
        }
        return isInCheckMate;
    }

    checkIfColorIsInCheck(color){
        let isInCheck = null;
        if(color === 'White'){
            let theOneTrueKing = this.whitePieces.filter((w) => w.type === PieceTypes.King)[0];
            isInCheck = this.bertPieces.filter((b) => b.canCapture(theOneTrueKing)).length > 0;
        }else {
            let theOneTrueKing = this.bertPieces.filter((b) => b.type === PieceTypes.King)[0] > 0;
            isInCheck = this.whitePieces.filter((w) => w.canCapture(theOneTrueKing)).length;
        }
        return isInCheck;
    }
}