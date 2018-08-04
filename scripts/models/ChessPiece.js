export class ChessPiece {
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

export const PieceColor = {
    White: "White",
    Black: "Black" 
};