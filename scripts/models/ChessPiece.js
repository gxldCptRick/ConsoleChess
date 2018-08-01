export class ChessPiece{
    constructor(color, type) {
        this.color = color;
        this.type = type;
        var _position = null;
        this.getPosition = () => _position;
        this.setPosition = (value) => _position = value;
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
export const PieceColor = {
    White: "White",
    Black: "Black" 
};
export { PieceTypes }