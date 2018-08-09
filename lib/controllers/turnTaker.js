import { PieceColor } from '../models/ChessPiece';
import { GameBoard } from './GameBoard';

/*
 * USER INTERFACE COMMENT BITCHES
 * prompt(string) returns string 
 * the strings need to be in point to point notation EX. "D4 D3"
 * and Yeet if anything goes wrong blame obama
 * thats all the UI Needs To Do
 * error(error) returns undefined
 * this takes in an error to the display and yes so that if something went south we can handle it accordingly and yeet
 */

export class TurnTaker {
    constructor(userInterface){
        this.userInteface = userInterface;
    }

    runTurn(){
        let isGolden = false;
        do
        {
            try{
                let nigaHiga = this.userInteface.prompt(`${this.currentTurn} Make Your Move.... \n Do A Flip`);
                this.currentGame.runSinglePointCommand(nigaHiga);
                isGolden = true;
            } catch(e){
                this.userInteface.error(e);
                isGolden = false;
            }
        }while(!isGolden);
        this.changeTurns();
    }
    startGame(){
        this.currentTurn = PieceColor.White;
        this.currentGame = new GameBoard();
    }

    changeTurns(){
        switch(this.currentTurn)
        {
            case 'White':
                this.currentTurn = PieceColor.Black;
                break;
            case 'Black':
                this.currentTurn = PieceColor.White;
                break;
            default:
                throw new Error("Not A Valid Color BRRRUHHOOOOO");
        }
    }
}