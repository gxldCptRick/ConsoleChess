import  { BoardDisplay } from './views/BoardDisplay'
import { GameBoard } from './controllers/GameBoard'
let boardToBeDisplayed = new GameBoard({x: 8, y:8});
let boardDisplayer = new BoardDisplay(boardToBeDisplayed);

boardDisplayer.displayBoard();