const ValueForA = 65;
export default class BoardPoint {
    constructor(alphaCharacter, numberedPosition){
        if(alphaCharacter === undefined || numberedPosition === undefined) throw new Error("A Point cannot have a null or undefined value");
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