import { PieceColor } from '../models/ChessPiece';
import { GameBoard } from './GameBoard';
import { PieceTypes } from '../models/PieceTypes';

/*
 * USER INTERFACE COMMENT BITCHES
 * prompt(string) returns string 
 * the strings need to be in point to point notation EX. "D4 D3"
 * and Yeet if anything goes wrong blame obama
 * thats all the UI Needs To Do
 * error(error) returns undefined
 * this takes in an error to the display and yes so that if something went south we can handle it accordingly and yeet
 */

 let currentGame = null;
export class TurnTaker {
    constructor(userInterface){
        this.userInterface = userInterface;
    }
    get
        CurrentGame() {
            return currentGame;
        }
    set 
        CurrentGame(game){
            currentGame = game;
        }

    runTurn(){
        let isGolden = false;
        do
        {
            try{
                let nigaHiga = this.userInterface.prompt(`${this.currentTurn} Make Your Move.... \n Do A Flip`);
                this.currentGame.runSinglePointCommand(nigaHiga);
                isGolden = true;
            } catch(e){
                this.userInterface.error(e);
                isGolden = false;
            }
        }while(!isGolden);
        this.changeTurns();
    }
    startGame(){
        this.currentTurn = PieceColor.White;
        if(currentGame === null) currentGame = new GameBoard();
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

    checkIfKingIsInCheck(){
        let isCurrentKing = PieceTypes.King === this.PieceTypes;
        let isSameColor = PieceColor !=  this.PieceColor;


    }

}