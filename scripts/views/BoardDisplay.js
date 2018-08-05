/* eslint-disable no-console */
import chalk from 'chalk'
import { PieceColor } from '../models/ChessPiece'
const ValueForA = 'A'.charCodeAt();
export class BoardDisplay{
    constructor(boardToDisplay){
        this.piecesOnBoard = boardToDisplay.pieces;
        this.xSize = boardToDisplay.xLimit;
        this.ySize = boardToDisplay.yLimit;
    }
    displayBoard(){
        let output = '_'.repeat((this.xSize * 3) + 3) + '\n';
        for(let i = 1; i <= this.ySize; i++){
            for(let j = 0; j <= this.xSize; j++)
            {
                let char = String.fromCharCode(ValueForA + j);
                let possiblePiece = this.piecesOnBoard[`${char}${i}`];
                if(possiblePiece != null){
                    if(possiblePiece.color === PieceColor.White){
                        output += chalk.bgBlackBright('|'+ (possiblePiece.type.name[0]).toLowerCase() +'|');
                    }else
                    {
                        output += chalk.bgCyan('|' + (possiblePiece.type.name[0]) +'|');
                    }
                }else{
                    output += chalk.bgGreen('|_|');
                }
            }
            output += '\n';
        }
        output += '_'.repeat((this.xSize*3) + 3);
        console.log(output);
    }
}