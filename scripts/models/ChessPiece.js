export class ChessPiece{
    constructor(color, type) {
        this.color = color;
        this.type = type;
        var _position = null;
        this.getPosition = () => _position;
        this.setPosition = (value) => _position = value;
    } 

    moveTo(nextPosition){
      return this.type.canMoveTo(this.getPosition(), nextPosition);
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

PieceTypes.Pawn.canMoveTo = (currentPosition, nextPosition) => {
    var differenceInY = Math.abs(nextPosition.y - currentPosition.y);
    var isSameLetter = nextPosition.x == currentPosition.x;
    var isAbleToMove2Spaces = differenceInY < 3;
    var isMovingForward = differenceInY > 0;
    var result = isAbleToMove2Spaces && isSameLetter && isMovingForward;
    return result;
}
PieceTypes.Rook.canMoveTo = (currentPosition, nextPosition) => {
    return true;
}

PieceTypes.Bishop.canMoveTo = (currentPosition, nextPosition) =>{
var difInX = (nextPosition.x - currentPosition.x);
var difInY = Math.abs(nextPosition.y - currentPosition.y);
//C1 >> D2
var canMoveForward = difInX > 0 && difInY > 0;
//C1 >> B2
// var canMoveForwardR = 
return true;
}

PieceTypes.Knight.canMoveTo = (currentPosition, nextPosition) =>{
    return true;
}

export const PieceColor = {
    White: "White",
    Black: "Black" 
};
export { PieceTypes }