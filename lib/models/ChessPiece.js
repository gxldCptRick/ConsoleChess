export class ChessPiece {
    constructor(color, type) {
        if(typeof color !== 'string') throw new Error("color must be a string");
        this.validateType(type);
        this.color = color;
        this.type = type;
        var _position = null;
        this.getPosition = () => _position;
        this.setPosition = (value) => _position = value;
    } 

    validateType(type){
        if(typeof type !== 'object') throw new Error("type must be an object");
        if(!type.canMoveTo || typeof type.canMoveTo !== 'function') throw new Error("type must have a canMoveTo function");
        if(!type.name) throw new Error("type must have a name property");
    }

    moveTo(nextPosition){
        let success = this.type.canMoveTo(this.getPosition(), nextPosition);
        if(success) this.setPosition(nextPosition);
        return success;
    }

    canMoveTo(nextPosition){
        return this.type.canMoveTo(this.getPosition(), nextPosition);
    }
}

export const PieceColor = {
    White: "White",
    Black: "Black" 
};