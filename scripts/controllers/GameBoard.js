import { ChessPiece, PieceTypes, PieceColor } from '../models/ChessPiece'
import { BoardPoint } from '../models/BoardPoint'
const LowerBounds = {
    x: 1,
    y: 1
};

export class GameBoard {
    constructor(bounds){
        this.pieces = [];
        this.xLimit = bounds.x
        this.yLimit = bounds.y
    }

    runSinglePointCommand(commandArgs){
        var firstPosition = commandArgs[0];
        var secondPosition = commandArgs[0];
        if(firstPosition.length > 2) throw "Command Too Long"
    
        var firstPoint = new BoardPoint(firstPosition[0], firstPosition[1])
        var secondPoint = new BoardPoint(secondPosition[0], secondPosition[1]);
        
    }
}