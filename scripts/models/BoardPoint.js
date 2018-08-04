const ValueForA = 65;
export default class BoardPoint {
    constructor(alphaCharacter, numberedPosition){
        if(typeof alphaCharacter === 'string'){
            var alphalpha = alphaCharacter.toUpperCase();
            this.x = alphalpha.charCodeAt(0) - ValueForA;
        }
        else{
            this.x = alphaCharacter;  
        } 

        if(typeof numberedPosition === 'string') numberedPosition = parseInt(numberedPosition);
        this.y = numberedPosition;
    }
    
    get Point(){
        return String.fromCharCode(this.x + ValueForA) + this.y.toString();
    }
}