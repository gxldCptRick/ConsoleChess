import { PieceColor } from "./ChessPiece";

let PieceType = function(name, value)
{
    var typeOfPiece = {
        canCapture: function(origin, destination){
            let isAbleToCapture = false;
            isAbleToCapture = this.canMoveTo(origin, destination);
            return isAbleToCapture;
        }
    }
    Object.defineProperty(typeOfPiece, "name", {
        value: name,
        writeable: false
    })
    Object.defineProperty(typeOfPiece, "value",
    {
        value: value,
        writable: false
    });
    
    return typeOfPiece;
}

const PieceTypes = {
    Pawn:  PieceType("Pawn", 1),
    Bishop:  PieceType("Bishop", 2),
    Knight:  PieceType("Knight", 3),
    Rook:  PieceType("Rook", 4),
    Queen:  PieceType("Queen", 5),
    King:  PieceType("King", 6)
};

PieceTypes.King.isExemptFromRules = true;
PieceTypes.Knight.isExemptFromRules = true;

PieceTypes.Pawn.canCapture = (currentPosition, nextPosition, color) => {
    let isAboveThePieceByOne = color === PieceColor.White ? (nextPosition.y - currentPosition.y) === 1
    : (currentPosition.y - nextPosition.y) === 1;
    let isToLeftOrRightOfPieceByOne = Math.abs(currentPosition.x - nextPosition.x) === 1;
    return isAboveThePieceByOne && isToLeftOrRightOfPieceByOne;
}
 

//Pawn Movement
PieceTypes.Pawn.canMoveTo = (currentPosition, nextPosition, color, hasMoved) => {
    let differenceInY = color  === 'White'? nextPosition.y - currentPosition.y : currentPosition.y - nextPosition.y;
    let isSameLetter =  nextPosition.x == currentPosition.x;
    let maxRange = hasMoved ? 2: 3;
    let isAbleToMove2Spaces = differenceInY < maxRange;
    let isMovingForward = differenceInY > 0;
    let isTryingToGoBackward = nextPosition.y < currentPosition;
    return isAbleToMove2Spaces && isSameLetter && isMovingForward && !isTryingToGoBackward;
}

//Rook Movement
PieceTypes.Rook.canMoveTo = (currentPosition, nextPosition) => {
    let difInX = Math.abs(nextPosition.x - currentPosition.x);
    let difInY = Math.abs(nextPosition.y - currentPosition.y);
    let canMoveHorizontal = difInX > 0 && difInY == 0;
    let canMoveVertical = difInX == 0 && difInY > 0;
    return canMoveHorizontal || canMoveVertical;
}

//Bishop Movement
PieceTypes.Bishop.canMoveTo = (currentPosition, nextPosition) =>
{
    let difInX = Math.abs(nextPosition.x - currentPosition.x);
    let difInY = Math.abs(nextPosition.y - currentPosition.y);
    let canMoveDiagonal = difInX > 0 && difInY > 0;
    let isDifOne = difInX / difInY == 1 || difInY / difInX == 1;
    return canMoveDiagonal && isDifOne;
}
//Knight Movement
PieceTypes.Knight.canMoveTo = (currentPosition, nextPosition) =>{
    let difInX = Math.abs(nextPosition.x - currentPosition.x);
    let difInY = Math.abs(nextPosition.y - currentPosition.y);
    let canMoveInLShape = (difInX == 2 && difInY == 1) ? true : (difInY == 2 && difInX == 1) ? true : false;
    return canMoveInLShape;
}
//Queen Movement
PieceTypes.Queen.canMoveTo = (currentPosition, nextPosition) => 
 PieceTypes.Bishop.canMoveTo(currentPosition, nextPosition) || PieceTypes.Rook.canMoveTo(currentPosition, nextPosition);

 //King Movement
PieceTypes.King.canMoveTo = (currentPosition, nextPosition) => {
    let difInX = Math.abs(nextPosition.x - currentPosition.x);
    let difInY = Math.abs(nextPosition.y - currentPosition.y);
    let canMoveDiagonally = difInX == 1 && difInY == 1;
    let canMoveVertically = difInX == 0 && difInY == 1;
    let canMoveHorizontally = difInX == 1 && difInY == 0;
    return canMoveDiagonally || canMoveVertically || canMoveHorizontally;
}

export 
{
    PieceTypes
}