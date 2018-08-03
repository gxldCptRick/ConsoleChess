const ValueForAMinusOne = 64;
export class BoardPoint {
    constructor(alphaCharacter, numberedPosition){
        if(typeof alphaCharacter === 'string'){
            var alphalpha = alphaCharacter.toUpperCase();
            this.x = alphalpha.charCodeAt(0) - ValueForAMinusOne;
        }
        else this.x = alphaCharacter + 1;
        
        this.y = numberedPosition;
    }
    
    get Point(){
        return String.fromCharCode(this.x + ValueForAMinusOne) + this.y.toString();
    }
}