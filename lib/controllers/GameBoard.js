import { PieceTypes } from '../models/PieceTypes';
import { PieceColor } from '../models/ChessPiece';
import BoardPoint from '../models/BoardPoint'
import { EventColor } from '../models/EventColor';
import { Pieces } from '../models/Pieces';
import { LowerBounds } from '../models/constants/BoardConstants';

export class GameBoard {
    constructor(bounds = { x: 8, y: 8 }, customPlacement = false) {
        this.currentTurn = PieceColor.White;
        this.pieces = new Pieces(bounds);
        this.upperLimit = bounds;
        this.pieces.captureEvent.listeners.push(this.updatePiecesArray);
        this.checkEvent = new EventColor();
        this.checkMateEvent = new EventColor();
        this.turnChangeEvent = new EventColor();
        if(!customPlacement) this.pieces.setupPieces();
    }
    /* eslint-disable */
    updatePiecesArray(pieces) {
        for (const key in pieces) {
            if (pieces[key] !== undefined && typeof pieces[key] === 'object' && pieces[key].color) {
                let piece = pieces[key];
                if (!pieces[piece.color]) {
                    pieces[piece.color] = [];
                }
                pieces[piece.color].push(piece);
            }
        }
    }

    getSelectedPiece(point) {
        let boardPoint = new BoardPoint(point.x, point.y);
        let piece = this.pieces[boardPoint.Point]
        return piece;
    }

    getPossibleMovesFor(point) {
        let boardPoint = new BoardPoint(point.x, point.y);
        let piece = this.pieces[boardPoint.Point];
        let moves = null;
        if (piece !== undefined) {
            moves = this.getAllPossiblePointsOnGrid();
            let that = this;
            moves = moves.filter((value) => {
                return piece.canMoveTo(value) || piece.canCapture(that.pieces, value);
            });
        }
        return moves;
    }

    getAllPossiblePointsOnGrid() {
        if (!this.points) {
            this.points = [];
            for (let x = 0; x < this.upperLimit.x; x++) {
                for (let y = 1; y <= this.upperLimit.y; y++) {
                    this.points.push(new BoardPoint(x, y));
                }
            }
        }
        return this.points;
    }

    runMovementCommand(pieceUno, pieceDos) {
        return this.movePiece(new BoardPoint(pieceUno.x, pieceUno.y), new BoardPoint(pieceDos.x, pieceDos.y));
    }

    movePiece(originPoint, destinationPoint) {
        let that = this;
        let pieceAtPoint = this.findPieceBasedOnPoint(originPoint);
        let message = `it is not your turn. it is currently ${this.currentTurn}`;
        if (!pieceAtPoint) throw `There is not a piece to move at (${originPoint.Point}).`;
        if (pieceAtPoint.color === this.currentTurn) {
            let pieceAtDestination = this.findPieceBasedOnPoint(destinationPoint);
            let isPieceAtPoint = pieceAtDestination !== undefined;
            let isAbleToCapture = pieceAtPoint.canCapture(pieceAtDestination);
            if (isPieceAtPoint && !isAbleToCapture) throw `${pieceAtPoint.type.name}(${originPoint.Point}) cannot move on to same position as ${pieceAtDestination.type.name}(${destinationPoint.Point}).`
            if (pieceAtPoint) {
                let isAbleToMove = pieceAtPoint.moveTo(destinationPoint);
                message = `${pieceAtPoint.type.name}(${originPoint.Point})`;
                if (!isAbleToMove && !isAbleToCapture) throw `${pieceAtPoint.type.name}(${originPoint.Point}) is not able to move to (${destinationPoint.Point}).`;
                else if (isAbleToCapture) {
                    message += ` has captured ${pieceAtDestination.type.name}`;
                    if (this.captureEvent) this.captureEvent.invoke(that, pieceAtDestination.color);
                    pieceAtPoint.setPosition(destinationPoint);
                }
                else message += ` has moved to `;
                message += `(${destinationPoint.Point}).`;
                this.updatePositionInHash(originPoint, destinationPoint);
            }
            let colorThatMightBeInCheck = pieceAtPoint.color === 'White' ? 'Black' : 'White'
            let check = this.checkIfColorIsInCheck(colorThatMightBeInCheck);
            if (check) {
                let checkMate = this.checkIfColorIsInCheckMate(colorThatMightBeInCheck);
                if (checkMate) this.checkMateEvent.invoke(that, colorThatMightBeInCheck);
                else this.checkEvent.invoke(that, colorThatMightBeInCheck);
            }
            this.currentTurn =  this.currentTurn === PieceColor.White ? PieceColor.Black: PieceColor.White;
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
        let piecePlaced = this.pieces.addPiece(pieceColor, pieceType, location);
        return `Placing ${piecePlaced.color} ${piecePlaced.type.name} on ${location.Point}`;
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
        if (positionToCheck.length !== 2) throw "A valid position of two elements must be passed in."
        let point = new BoardPoint(positionToCheck[0], positionToCheck[1]);
        if ((point.x < LowerBounds.x || point.x > this.xLimit) || (point.y < LowerBounds.y || point.y > this.yLimit)) {
            throw `(${point.Point}) is not on a valid point on the board.`
        }
        return point
    }

    checkIfColorIsInCheckMate(color) {
        let isInCheckMate = true;
        let movement = null;
        if (color === 'White') {
            let theOneTrueKing = this.pieces.White.filter((w) => w.type === PieceTypes.King)[0];
            movement = this.getAllPossiblePointsOnGrid().filter(p => theOneTrueKing.canMoveTo(p));
            for (let i = 0; i < this.pieces.Black.length && isInCheckMate; i++) {
                const e = this.pieces.Black[i];
                for (let j = 0; j < movement.length && isInCheckMate; j++) {
                    isInCheckMate = e.canCapture(theOneTrueKing, movement[j]);
                }
            }
        } else {
            let theOneTrueKing = this.pieces.White.filter((w) => w.type === PieceTypes.King)[0];
            movement = this.getAllPossiblePointsOnGrid().filter(p => theOneTrueKing.canMoveTo(p));
            for (let i = 0; i < this.pieces.Black.length && isInCheckMate; i++) {
                const e = this.pieces.Black[i];
                for (let j = 0; j < movement.length && isInCheckMate; j++) {
                    isInCheckMate = e.canCapture(theOneTrueKing, movement[j]);
                }
            }
        }
        return isInCheckMate;
    }

    checkIfColorIsInCheck(color) {
        let isInCheck = null;
        if (color === 'White') {
            let theOneTrueKing = this.pieces.White.filter((w) => w.type === PieceTypes.King)[0];
            isInCheck = this.pieces.Black.filter((b) => b.canCapture(theOneTrueKing)).length > 0;
        } else {
            let theOneTrueKing = this.pieces.Black.filter((b) => b.type === PieceTypes.King)[0] > 0;
            isInCheck = this.pieces.White.filter((w) => w.canCapture(theOneTrueKing)).length;
        }
        return isInCheck;
    }
}