/* eslint-disable no-console */
import chalk from 'chalk';
import { PieceColor } from '../../lib/models/ChessPiece';
const ValueForA = 'A'.charCodeAt();
export class BoardDisplay {
    constructor(boardToDisplay) {
        this.piecesOnBoard = boardToDisplay.pieces;
        this.xSize = boardToDisplay.xLimit;
        this.ySize = boardToDisplay.yLimit;
    }
    displayBoard() {
        let output = 'white pieces: lowercase,\nBLACK PIECES: UPPERCASE\n';
        for (let i = 0; i < this.ySize; i++) {
            output += chalk.bgRedBright(`|${String.fromCharCode(ValueForA + i)}|`);
        }
        output += '\n'
        for (let y = this.ySize; y > 0; y--) {
            for (let x = 0; x <= this.xSize; x++) {
                let char = String.fromCharCode(ValueForA + x);
                let possiblePiece = this.piecesOnBoard[`${char}${y}`];
                if (possiblePiece != null) {
                    if (possiblePiece.color === PieceColor.White) {
                        output += chalk.bgWhiteBright('|' + (possiblePiece.type.name[0]).toLowerCase() + '|');
                    } else {
                        output += chalk.bgBlackBright('|' + (possiblePiece.type.name[0]) + '|');
                    }
                } else {
                    let yIsEven = y % 2 == 0;
                    let xIsEven = x % 2 == 0;
                    output += (yIsEven && xIsEven) || (!yIsEven && !xIsEven) ? (chalk.bgMagentaBright('|-|')) : (chalk.bgCyanBright('|-|'));
                }
            }
            output += chalk.bgRedBright(`|${y}|`);
            output += '\n';
        }
        console.log(output);
    }
}