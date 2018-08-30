import {PieceTypes} from '../models/PieceTypes';
import { PieceColor } from '../models/ChessPiece';
import BoardPoint from '../models/BoardPoint'
import { EventColor } from '../models/EventColor';
import { Pieces } from '../models/Pieces';
import { LowerBounds } from '../models/constants/BoardConstants';
import { GameRules } from './GameRules';

export class GameBoard {
    constructor(bounds = { x: 8, y: 8 }, customPlacement = false, customRules = new GameRules()) {
        this.currentTurn = PieceColor.White;
        this.pieces = new Pieces(bounds);
        this.rules = customRules
        this.rules.pieces = this.pieces;
        this.upperLimit = bounds;
        this.pieces.captureEvent.listeners.push(this.updatePiecesArray);
        this.checkEvent = new EventColor();
        this.checkMateEvent = new EventColor();
        this.turnChangeEvent = new EventColor();
        if (!customPlacement) this.pieces.setupPieces();
    }

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


    checkIfColorIsInCheckMate(color) {
        let isInCheckMate = false;
        if (color === PieceColor.White) {
            let theOneTrueKing = this.pieces.White.filter((w) => w.type === PieceTypes.King)[0];
            isInCheckMate = this.checkThePiecesAgainForCheckMate(theOneTrueKing, this.pieces.Black, this.pieces.White);
        } else {
            let theOneTrueKing = this.pieces.Black.filter((w) => w.type === PieceTypes.King)[0];
            isInCheckMate = this.checkThePiecesAgainForCheckMate(theOneTrueKing, this.pieces.White, this.pieces.Black);
        }
        return isInCheckMate;
    }

    checkThePiecesAgainForCheckMate(ogSkrillex, theHitMen, theGuardians){
        let ogPosition = ogSkrillex.getPosition();
        let ogMoves = this.getPossibleMovesFor(ogPosition);
        let isInCheckMate = true;
        for (let index = 0; index < ogMoves.length && isInCheckMate; index++) {
            const ogMove = ogMoves[index];
            let isInCheckInThatPosition = false;
            for (let i = 0; i < theHitMen.length && !isInCheckInThatPosition; i++) {
                const hitMan = theHitMen[i];
                let moves = this.getPossibleMovesFor(hitMan.getPosition());
                isInCheckInThatPosition = moves.filter(a => a.compareTo(ogMove) === 0).length > 0;
                if(isInCheckInThatPosition){
                    let canGuardAgainst = false;
                    for(let i = 0; i < theGuardians.length && !canGuardAgainst; i++){
                        const guardian = theGuardians[i];
                        let guardMoves = this.getPossibleMovesFor(guardian.getPosition());
                        canGuardAgainst = this.checkMoves(guardMoves, moves);
                        isInCheckMate = !canGuardAgainst;
                    }
                }
            }
            isInCheckMate = isInCheckInThatPosition;
        }
        return isInCheckMate;    
    }

    checkMoves(guardMoves, moves){
        let isAbleToCounter = !1;
        for (let i = 0; i < guardMoves.length && !isAbleToCounter; i++) {
            const guardMove = guardMoves[i];
            for(let j = 0; j < moves.length && !isAbleToCounter; j++){
                const move = moves[j];
                isAbleToCounter = guardMove.compareTo(move) === 0;
            }
        }
        return isAbleToCounter;
    }

    checkIfColorIsInCheck(color) {
        let isInCheck = null;
        if (color === PieceColor.White) {
            let theOneTrueKing = this.pieces.White.filter((w) => w.type === PieceTypes.King)[0];
            isInCheck = this.checkThePieces(theOneTrueKing, this.pieces.Black);
        } else {
            let theOneTrueKing = this.pieces.Black.filter((b) => b.type === PieceTypes.King)[0];
            isInCheck = this.checkThePieces(theOneTrueKing, this.pieces.White);
        }
        return isInCheck;
    }

    checkThePieces(theOgKing, hisTraitorusDisciples) {
        let gotChecked = false;
        let ogPosition = theOgKing.getPosition();
        for (let i = 0; i < hisTraitorusDisciples.length && !gotChecked; i++) {
            const traitor = hisTraitorusDisciples[i];
            let moves = this.getPossibleMovesFor(traitor.getPosition());
            gotChecked = moves.filter(e => e.compareTo(ogPosition) === 0).length > 0;
        }
        return gotChecked;
    }

    getPossibleMovesFor(point) {
        let selectedPoint = new BoardPoint(point.x, point.y);
        let piece = this.pieces[selectedPoint.Point];
        let moves = [];
        if (piece !== undefined && piece !== this.lastSelectedPattern) {
            moves = this.getAllPossiblePointsOnGrid();
            if (piece.type.isExemptFromRules) {
                moves = this.easierWay(moves, piece);
            } else {
                moves = this.hardWay(moves, piece) || [];
            }
            this.lastSelectedPiece = piece;
            this.lastSelectedPattern = moves;
        }else{
            moves = this.lastSelectedPattern;
        }
        return moves;
    }

    hardWay(moves, piece) {
        let piecePoint = piece.getPosition();
        let greaterThan = [[], [], [], []];
        let lessThan = [[], [], [], []];
        let validMoves = [];
        moves.forEach(point => {
            let comparisonValue = point.compareTo(piecePoint);
            if (comparisonValue > 0) {
                this.rules.processPoint(greaterThan, piecePoint, point);
            } else if (comparisonValue < 0) {
                this.rules.processPoint(lessThan, piecePoint, point);
            }
        });
        this.rules.proccessPointsInRelationToPiece(greaterThan, piece, validMoves);
        this.rules.proccessPointsInRelationToPiece(lessThan, piece, validMoves);
        return validMoves;
    }

    easierWay(moves, piece) {
        let validMoves = [];
        for (let i = 0; i < moves.length; i++) {
            let point = moves[i];
            if (this.pieces[point.Point] !== undefined) {
                if (piece.canCapture(this.pieces[point.Point])) {
                    validMoves.push(point);
                }
            } else if (piece.canMoveTo(point)) {
                validMoves.push(point);
            }
        }
        return validMoves;
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
        let pieceAtPoint = this.findPieceBasedOnPoint(originPoint);
        let message = `it is not your turn. it is currently ${this.currentTurn}`;
        if (!pieceAtPoint) throw `There is not a piece to move at (${originPoint.Point}).`;
        if (pieceAtPoint.color === this.currentTurn) {
            let isValidMove = this.isValidMoveBasedOnPoints(originPoint, destinationPoint);
            message = `${pieceAtPoint.type.name}(${pieceAtPoint.getPosition().Point})`;
            if (isValidMove) {
                let pieceAtDestination = this.findPieceBasedOnPoint(destinationPoint);
                if (pieceAtDestination) {
                    message += ` is capturing ${pieceAtDestination.type.name}(${pieceAtDestination.getPosition().Point}).`;
                } else {
                    message += ` is moving to (${destinationPoint.Point}).`;
                }
                pieceAtPoint.movePiece(destinationPoint);
                this.updatePositionInHash(originPoint, destinationPoint);
            } else {
                throw message += ` cannot to move to (${destinationPoint.Point}).`
            }
            let colorThatMightBeInCheck = this.currentTurn === PieceColor.White ? PieceColor.Black : PieceColor.White;
            this.tellIfColorIsInCheck(colorThatMightBeInCheck);
            this.currentTurn = this.currentTurn === PieceColor.White ? PieceColor.Black : PieceColor.White;
        }
        return message;
    }

    isValidMoveBasedOnPoints(originPoint, destinationPoint) {
        let isValidMove = false;
        let moves = this.getPossibleMovesFor(originPoint);
        for (let index = 0; index < moves.length && !isValidMove; index++) {
            const element = moves[index];
            isValidMove = element.compareTo(destinationPoint) === 0;
        }
        return isValidMove;
    }

    tellIfColorIsInCheck(colorThatMightBeInCheck) {
        let that = this;
        let check = this.checkIfColorIsInCheck(colorThatMightBeInCheck);
        if (check) {
            let checkMate = this.checkIfColorIsInCheckMate(colorThatMightBeInCheck);
            if (checkMate) this.checkMateEvent.invoke(that, colorThatMightBeInCheck);
            else this.checkEvent.invoke(that, colorThatMightBeInCheck);
        }
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
}