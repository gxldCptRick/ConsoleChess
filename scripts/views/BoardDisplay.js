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
        let output = 'white pieces: lowercase,\nBLACK PIECES: UPPERCASE\n';
        for(let i = 0; i < this.ySize; i++)
        {
            output += chalk.bgRedBright(`|${String.fromCharCode(ValueForA + i)}|`);
        }
        output += '\n'
        for(let i = this.ySize; i > 0; i--){
            for(let j = 0; j <= this.xSize; j++)
            {
                let char = String.fromCharCode(ValueForA + j);
                let possiblePiece = this.piecesOnBoard[`${char}${i}`];
                if(possiblePiece != null){
                    if(possiblePiece.color === PieceColor.White){
                        output += chalk.bgWhiteBright('|'+ (possiblePiece.type.name[0]).toLowerCase() +'|');
                    }else
                    {
                        output += chalk.bgBlackBright('|' + (possiblePiece.type.name[0]) +'|');
                    }
                }else{
                    output += chalk.bgMagentaBright('|-|');
                }
            }
            output += chalk.bgRedBright(`|${i}|`);
            output += '\n';
        }
        console.log(output);
    }
}