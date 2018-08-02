export class ChessPiece{
    constructor(color, type) {
        this.color = color;
        this.type = type;
        var _position = null;
        this.getPosition = () => _position;
        this.setPosition = (value) => _position = value;
    } 

    moveTo(nextPosition){
      return this.type.moveTo(this.getPosition(), nextPosition);
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

PieceTypes.Pawn.moveTo = (currentPosition, nextPosition) => {
    var differenceInY = Math.abs(nextPosition.y - currentPosition.y);
    var isSameLetter = nextPosition.x == currentPosition.x;
    var result = differenceInY < 3 && isSameLetter && differenceInY > 0;
    return result;
}
PieceTypes.Rook.moveTo = (currentPosition, nextPosition) => {
    return true;
}

export const PieceColor = {
    White: "White",
    Black: "Black" 
};
export { PieceTypes }