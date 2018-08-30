import { Direction } from '../models/constants/BoardConstants';
import { PieceTypes } from '../models/PieceTypes';

export class GameRules {
    constructor(pieces){
        this.pieces = pieces;
    }
    
    generateMovePathBasedOnKingPosition(moves, traitorPosition, ogPosition) {
        let predicate = null;
        let equalityCheck = (PossibleMove,KingPosition,AttackerPosition) => 
        PossibleMove === KingPosition && PossibleMove === AttackerPosition;
        
        let greaterThanCheck = (PossibleMove, KingPosition, AttackerPosition) => 
        PossibleMove > KingPosition && PossibleMove <= AttackerPosition;
        
        let lessThanCheck = (PossibleMove,KingPosition,AttackerPosition) => 
        PossibleMove < KingPosition && PossibleMove >= AttackerPosition;
        
        if (traitorPosition.y === ogPosition.y) {
            if(traitorPosition.x > ogPosition.x){
                predicate = (a) => greaterThanCheck(a.x, ogPosition.x, traitorPosition.x) && 
                                    equalityCheck(a.y, ogPosition.y, traitorPosition.y);
            }
            else if(traitorPosition.x < ogPosition.x){
                predicate = (a) => lessThanCheck(a.x, ogPosition.x, traitorPosition.x) &&
                                    equalityCheck(a.y, ogPosition.y, traitorPosition.y);
            }else  {
                predicate = (a) => equalityCheck(a.x, ogPosition.x, traitorPosition.x) && 
                                    equalityCheck(a.y, ogPosition.y, traitorPosition.y);
            } 
        }else if(traitorPosition.y > ogPosition.y){
            if(traitorPosition.x > ogPosition.x){
                predicate = (a) => greaterThanCheck(a.x, ogPosition.x, traitorPosition.x) && 
                                    lessThanCheck(a.y, ogPosition.y, traitorPosition.y);
            }
            else if(traitorPosition.x < ogPosition.x){
                predicate = (a) => lessThanCheck(a.x, ogPosition.x, traitorPosition.x) &&
                                    lessThanCheck(a.y, ogPosition.y, traitorPosition.y);
            }else  {
                predicate = (a) => equalityCheck(a.x, ogPosition.x, traitorPosition.x) && 
                                    lessThanCheck(a.y, ogPosition.y, traitorPosition.y);
            } 
        }else{
            if(traitorPosition.x > ogPosition.x){
                predicate = (a) => greaterThanCheck(a.x, ogPosition.x, traitorPosition.x) && 
                                    greaterThanCheck(a.y, ogPosition.y, traitorPosition.y);
            }
            else if(traitorPosition.x < ogPosition.x){
                predicate = (a) => lessThanCheck(a.x, ogPosition.x, traitorPosition.x) &&
                                    greaterThanCheck(a.y, ogPosition.y, traitorPosition.y);
            }else  {
                predicate = (a) => equalityCheck(a.x, ogPosition.x, traitorPosition.x) && 
                                    greaterThanCheck(a.y, ogPosition.y, traitorPosition.y);
            }
        }
        return moves.filter(predicate);
    }

    proccessPointsInRelationToPiece(collection, pieceInQuestion, validMoves) {
        let position = pieceInQuestion.getPosition();
        let directions = [];
        collection.forEach(directions => directions.sort((a, b) => a.distanceFrom(position) > b.distanceFrom(position)))
        if (pieceInQuestion.type === PieceTypes.Pawn) {
            directions = [Direction.Vertical, Direction.DiagonalLeft, Direction.DiagonalRight]; 
        } else if (pieceInQuestion.type === PieceTypes.Bishop) {
            directions = [Direction.DiagonalLeft, Direction.DiagonalRight];
        } else if (pieceInQuestion.type === PieceTypes.Rook) {
            directions = [Direction.Vertical, Direction.Horizontal];
        } else if (pieceInQuestion.type === PieceTypes.Queen) {
            directions = [Direction.Vertical, Direction.DiagonalLeft, Direction.DiagonalRight, Direction.Horizontal];
        }
        this.proccessMultipleDirections(collection, directions, pieceInQuestion, validMoves);
    }

    proccessMultipleDirections(collection, directions, pieceInQuestion, validMoves){
        directions.forEach(direction => this.processSingleDirection(collection[direction], pieceInQuestion, validMoves))
    }

    processSingleDirection(directionCollection, pieceInQuestion, validMoves) {
        let reachedTheLimit = false;
        for (let i = 0; i < directionCollection.length && !reachedTheLimit; i++) {
            let possiblePoint = directionCollection[i];
            if (this.pieces[possiblePoint.Point]) {
                if (pieceInQuestion.canCapture(this.pieces, possiblePoint)) {
                    validMoves.push(possiblePoint);
                }
                reachedTheLimit = true;
            } else if (pieceInQuestion.canMoveTo(possiblePoint)) {
                validMoves.push(possiblePoint);
            }
        }
    }

    processPoint(collection, ogPoint, nextPoint) {
        if (nextPoint.y === ogPoint.y) {
            collection[Direction.Horizontal].push(nextPoint);
        } else {
            let adjustedY = nextPoint.y - ogPoint.y;
            let adjustedX = nextPoint.x - ogPoint.x;
            if (Math.abs(adjustedY / adjustedX) === 1) {
                if (nextPoint.x > ogPoint.x) {
                    collection[Direction.DiagonalRight].push(nextPoint);
                } else if (nextPoint.x < ogPoint.x) {
                    collection[Direction.DiagonalLeft].push(nextPoint);
                }
            } else if (nextPoint.x === ogPoint.x) {
                collection[Direction.Vertical].push(nextPoint);
            }
        }

    }
}