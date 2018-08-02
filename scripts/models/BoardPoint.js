const ValueForA = 65;
export class BoardPoint{
    constructor(alphaCharacter, numberedPosition){
        var alphalpha = alphaCharacter.toUpperCase();
        this.x = alphalpha.charCodeAt(0) - ValueForA;
        if(this.x > 7 || this.x < 0) throw "Character Is out of bounds";
        this.y = numberedPosition;
    }

    get Point(){
        return String.fromCharCode(this.x + ValueForA) + this.y.toString();
    }
}