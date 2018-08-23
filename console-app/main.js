/* eslint-disable no-console */
import { BoardDisplay } from './views/BoardDisplay';
import { GameBoard } from '../lib/controllers/GameBoard';
import { FileReader } from '../lib/controllers/FileReader';
import path from 'path';

export class ChessConsoleProccessor {
    constructor(pathMovement, pathPlacement) {
        this.fileReader = new FileReader();
        this.filePaths = [pathMovement];
        if (pathPlacement) {
            this.currentGame = new GameBoard({ x: 8, y: 8 }, true);
            this.filePaths.push(pathPlacement);
        } else {
            this.currentGame = new GameBoard();
        }
    }
    
    start(){
        this.proccessFilePaths(this.filePaths);
    }

    proccessFilePaths(movements) {
        let movementFilePath = this.generatePath(movements[0]);
        if (movements.length > 1 && movements.length < 2) {
            let placementPath = this.generatePath(movements[0]);
            this.fileReader.processFile(placementPath, this.processTheInputs(this));
        }

        this.fileReader.processFile(movementFilePath, this.processTheInputs(this));
    }

    generatePath(roughPath) {
        let fullPath = null;
        if (roughPath.includes(':\\') || roughPath.includes(':/')) fullPath = roughPath;
        else fullPath = path.join(process.cwd(), roughPath);
        return fullPath;
    }

    processTheInputs(context) {
        return (processedInputs) => {
            let display = new BoardDisplay(this.currentGame);
            processedInputs.forEach((input, index) => {
                if (input.length === 2) {
                    try {
                        let output = context.currentGame.runSinglePointCommand(input);
                        console.log(output);
                    } catch (e) {
                        console.error(e);
                    }
                } else if (input.length === 1) {
                    let output = context.currentGame.runPlacementCommand(input[0]);
                    console.log(output);
                }
                else {
                    console.log(input);
                    console.log(index);
                }
                display.displayBoard();
            });
        }
    }
}

let args = process.argv.slice(2);

if (args.length === 1){
    let controller = new ChessConsoleProccessor(args[0]);
    controller.start();
}else if (args.length === 2){
    let controller = new ChessConsoleProccessor(args[0], args[1]);
    controller.start();
}else throw new Error('Too Many Args. Please Pass In only a movementfile and optionally a placement file');