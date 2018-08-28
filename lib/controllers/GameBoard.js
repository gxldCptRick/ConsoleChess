import { PieceTypes } from '../models/PieceTypes';
import { PieceColor } from '../models/ChessPiece';
import BoardPoint from '../models/BoardPoint'
import { EventColor } from '../models/EventColor';
import { Pieces } from '../models/Pieces';
import { LowerBounds, Direction } from '../models/constants/BoardConstants';
// Import _ from 'lodash';

export class GameBoard {
    constructor(bounds = { x: 8, y: 8 }, customPlacement = false) {
        this.currentTurn = PieceColor.White;
        this.pieces = new Pieces(bounds);
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

    getPossibleMovesFor(point) {
        let selectedPoint = new BoardPoint(point.x, point.y);
        let piece = this.pieces[selectedPoint.Point];
        let moves = [];
        if (piece !== undefined) {
            moves = this.getAllPossiblePointsOnGrid();
            if (piece.type.isExemptFromRules) {
                moves = this.easierWay(moves, piece);
            } else {
                moves = this.hardWay(moves, piece) || [];
            }
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
                this.processPoint(greaterThan, piecePoint, point);
            } else if (comparisonValue < 0) {
                this.processPoint(lessThan, piecePoint, point);
            }
        });
        this.proccessPointsInRelationToPiece(greaterThan, piece, validMoves);
        this.proccessPointsInRelationToPiece(lessThan, piece, validMoves);
        return validMoves;
    }

    proccessPointsInRelationToPiece(collection, pieceInQuestion, validMoves){
        let position = pieceInQuestion.getPosition();
        for (let i = 0; i < collection.length; i++) {
            collection[i] = collection[i].sort((a, b) => a.distanceFrom(position) > b.distanceFrom(position));
            console.log(collection[i]);
        }

        if(pieceInQuestion.type === PieceTypes.Pawn){
            this.processSingleDirection(collection[Direction.Vertical], pieceInQuestion, validMoves);
            this.processSingleDirection(collection[Direction.DiagonalLeft], pieceInQuestion, validMoves);
            this.processSingleDirection(collection[Direction.DiagonalRight], pieceInQuestion, validMoves);
        }else if(pieceInQuestion.type === PieceTypes.Bishop){
            this.processSingleDirection(collection[Direction.DiagonalLeft], pieceInQuestion, validMoves);
            this.processSingleDirection(collection[Direction.DiagonalRight], pieceInQuestion, validMoves);
        }else if(pieceInQuestion.type === PieceTypes.Rook){
            this.processSingleDirection(collection[Direction.Vertical], pieceInQuestion, validMoves);
            this.processSingleDirection(collection[Direction.Horizontal], pieceInQuestion, validMoves);
        }else if(pieceInQuestion.type === PieceTypes.Queen){
            this.processSingleDirection(collection[Direction.Horizontal], pieceInQuestion, validMoves);
            this.processSingleDirection(collection[Direction.Vertical], pieceInQuestion, validMoves);
            this.processSingleDirection(collection[Direction.DiagonalLeft], pieceInQuestion, validMoves);
            this.processSingleDirection(collection[Direction.DiagonalRight], pieceInQuestion, validMoves);
        }
    }

    processSingleDirection(directionCollection, pieceInQuestion, validMoves){
        let reachedTheLimit = false;
        for(let i = 0; i < directionCollection.length && !reachedTheLimit; i++){
            let possiblePoint = directionCollection[i];
            if(this.pieces[possiblePoint.Point]){
                if(pieceInQuestion.canCapture(this.pieces, possiblePoint)){
                    validMoves.push(possiblePoint);
                    console.log("Capture");
                }
                console.log("Friend In The Way");
                reachedTheLimit = true;
            }else if(pieceInQuestion.canMoveTo(possiblePoint)){
                console.log("Movement");
                validMoves.push(possiblePoint);
            }else {
                console.log("What!!");
            }
        }
    }

    processPoint(collection, ogPoint, nextPoint){
        if(nextPoint.y === ogPoint.y){
            collection[Direction.Horizontal].push(nextPoint);
            console.log("Horizontal");
        }else{
            let adjustedY = nextPoint.y - ogPoint.y;
            let adjustedX = nextPoint.x - ogPoint.x;
            if(adjustedY/adjustedX === 1){
                if(nextPoint.x > ogPoint.x){
                    collection[Direction.DiagonalRight].push(nextPoint);
                    console.log("DiagonalRight");
                }else if(nextPoint.x < ogPoint.x){
                    collection[Direction.DiagonalLeft].push(nextPoint);
                    console.log("DiagonalLeft");
                }
            }else if(nextPoint.x === ogPoint.x) {
                console.log("Vertical");
                collection[Direction.Vertical].push(nextPoint);
            }
        }

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
            let isValidMove = this.IsValidMoveBasedOnPoints(originPoint, destinationPoint);
            message = `${pieceAtPoint.type.name}(${pieceAtPoint.getPosition().Point})`;
            if (isValidMove) {
                let pieceAtDestination = this.findPieceBasedOnPoint(destinationPoint);
                if (pieceAtDestination) {
                    message += ` is capturing ${pieceAtDestination.type.name}(${pieceAtDestination.getPosition().Point}).`;
                } else {
                    message += ` is moving to (${destinationPoint.Point}).`;
                }
                pieceAtPoint.moveTo(destinationPoint);
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

    IsValidMoveBasedOnPoints(originPoint, destinationPoint) {
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