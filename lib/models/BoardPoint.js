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

    distanceFrom(destinationPoint){
        let aSquared = Math.pow((this.x - destinationPoint.x), 2);
        let bSquared = Math.pow((this.y - destinationPoint.y), 2);
        let cSquared = aSquared + bSquared;
        return Math.sqrt(cSquared);
    }
    compareTo(otherPoint){
        if(!otherPoint.x && !otherPoint.y) throw new Error("You need to pass in a point with an x and a y property.");
        let comparisonValue = this.y - otherPoint.y;
        if(comparisonValue === 0) {
             comparisonValue = this.x - otherPoint.x;
        }

        return comparisonValue;

    }
}