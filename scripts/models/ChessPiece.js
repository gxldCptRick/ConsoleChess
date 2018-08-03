export class ChessPiece{
    constructor(color, type) {
        this.color = color;
        this.type = type;
        var _position = null;
        this.getPosition = () => _position;
        this.setPosition = (value) => _position = value;
    } 

    moveTo(nextPosition){
        let success = this.type.canMoveTo(this.getPosition(), nextPosition);
        if(success) this.setPosition(nextPosition);
        return success;
    }

}

var PieceType = function(name, value)
{
    var typeOfPiece = {}
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
    Pawn: PieceType("Pawn", 1),
    Bishop: PieceType("Bishop", 2),
    Knight: PieceType("Knight", 3),
    Rook: PieceType("Rook", 4),
    Queen: PieceType("Queen", 5),
    King: PieceType("King", 6)
};
//Pawn Movement
PieceTypes.Pawn.canMoveTo = (currentPosition, nextPosition) => {
    var differenceInY = Math.abs(nextPosition.y - currentPosition.y);
    var isSameLetter = nextPosition.x == currentPosition.x;
    var isAbleToMove2Spaces = differenceInY < 3;
    var isMovingForward = differenceInY > 0;
    var result = isAbleToMove2Spaces && isSameLetter && isMovingForward;
    return result;
}
//Rook Movement
PieceTypes.Rook.canMoveTo = (currentPosition, nextPosition) => {
    var difInX = Math.abs(nextPosition.x - currentPosition.x);
    var difInY = Math.abs(nextPosition.y - currentPosition.y);
    var canMoveHorizontal = difInX > 0 && difInY == 0;
    var canMoveVertical = difInX == 0 && difInY > 0;
    return canMoveHorizontal || canMoveVertical;
}

//Bishop Movement
PieceTypes.Bishop.canMoveTo = (currentPosition, nextPosition) =>
{
var difInX = Math.abs(nextPosition.x - currentPosition.x);
var difInY = Math.abs(nextPosition.y - currentPosition.y);
var canMoveDiagonal = difInX > 0 && difInY > 0;
return canMoveDiagonal;
}
//Knight Movement
PieceTypes.Knight.canMoveTo = (currentPosition, nextPosition) =>{
    var difInX = Math.abs(nextPosition.x - currentPosition.x);
    var difInY = Math.abs(nextPosition.y - currentPosition.y);
    var canMoveInLShape = (difInX == 2 && difInY == 1) ? true : (difInY == 2 && difInX == 1) ? true : false;
    return canMoveInLShape;
}
//Queen Movement
PieceTypes.Queen.canMoveTo = (currentPosition, nextPosition) =>{
    var difInX = Math.abs(nextPosition.x - currentPosition.x);
    var difInY = Math.abs(nextPosition.y - currentPosition.y);
    var canMoveDiagonal = difInX > 0 && difInY > 0;
    var canMoveHorizontal = difInX > 0 && difInY == 0;
    var canMoveVertical = difInX == 0 && difInY > 0;
    var canMove = canMoveDiagonal || canMoveVertical || canMoveHorizontal;
    return canMove;
}
//King Movement
PieceTypes.King.canMoveTo = (currentPosition, nextPosition) => {

    var difInX = Math.abs(nextPosition.x - currentPosition.x);
    var difInY = Math.abs(nextPosition.y - currentPosition.y);
    var canMoveDiagonally = difInX == 1 && difInY == 1;
    var canMoveVertically = difInX == 0 && difInY > 0;
    var canMoveHorizontally = difInX > 0 && difInY == 0;
    var canMove = canMoveDiagonally || canMoveVertically || canMoveHorizontally;
    return canMove;
}

export const PieceColor = {
    White: "White",
    Black: "Black" 
};
export { PieceTypes }