const ValueForA = 65;
export class BoardPoint {
    constructor(alphaCharacter, numberedPosition){
        if(typeof alphaCharacter === 'string'){
            var alphalpha = alphaCharacter.toUpperCase();
            this.x = alphalpha.charCodeAt(0) - ValueForA;
        }else this.x = alphaCharacter;
        
        this.y = numberedPosition;
    }
    
    get Point(){
        return String.fromCharCode(this.x + ValueForA) + this.y.toString();
    }
}