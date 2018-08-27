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
        if(type === null || type === undefined) throw new Error("Type must not be Null.");
        if(typeof type !== 'object') throw new Error("Type must be an object.");
        if(!type.canMoveTo || typeof type.canMoveTo !== 'function') throw new Error("Type must have a canMoveTo function.");
        if(!type.name) throw new Error("Type must have a name property.");
    }

    moveTo(nextPosition){
        let success = this.type.canMoveTo(this.getPosition(), nextPosition, this.color, this.hasMoved);
        if(success) {
            this.setPosition(nextPosition);
            if(!this.hasMoved) this.hasMoved = true;
        }
        return success;
    }

    canCapture(possiblePieces, point){
        let isAbleToCapture = false;
        let possiblePiece = null;
        if(point && possiblePieces[point.Point]) {
            possiblePiece = possiblePieces[point.Point];
        }else {
            possiblePiece = possiblePieces
        }
        
        if(possiblePiece !== undefined && possiblePiece.color && possiblePiece.getPosition && this.color !== possiblePiece.color){
            if(point) isAbleToCapture = this.type.canCapture(this.getPosition(), point, this.color);
            else isAbleToCapture = this.type.canCapture(this.getPosition(), possiblePiece.getPosition(), this.color);
        }
        return isAbleToCapture;
    }

    canMoveTo(nextPosition){
        return this.type.canMoveTo(this.getPosition(), nextPosition, this.color, this.hasMoved);
    }
}

export const PieceColor = {
    White: "White",
    Black: "Black" 
};