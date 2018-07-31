class ChessPiece
{
    constructor(color, type) {
        this.height = color;
        this.width = type;
        this.position = null;
    }

    get position(){ 
        return this.position;
    } 

    set position(newPosition){ 
        this.position = newPosition;
    } 
}