const ValueForAMinusOne = 64;
export default class BoardPoint {
    constructor(alphaCharacter, numberedPosition){
        if(typeof alphaCharacter === 'string'){
            var alphalpha = alphaCharacter.toUpperCase();
            this.x = alphalpha.charCodeAt(0) - ValueForAMinusOne;
        }
        else this.x = alphaCharacter + 1;
        if(typeof numberedPosition === 'string') numberedPosition = parseInt(numberedPosition);
        this.y = numberedPosition;
    }
    
    get Point(){
        return String.fromCharCode(this.x + ValueForAMinusOne) + this.y.toString();
    }
}