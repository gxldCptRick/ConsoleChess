/* eslint-disable no-console */
import { BoardDisplay } from '../views/BoardDisplay';
import { GameBoard } from '../../lib/controllers/GameBoard';
import { FileReader } from '../../lib/controllers/FileReader';
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
        this.currentGame.checkEvent.listeners.push((sender, color) => console.log(color, "is Checked"));
        this.currentGame.checkMateEvent.listeners.push((sender, color)=> console.log(color, "Has Been Check Mated"))
    }

    start() {
        this.proccessFilePaths(this.filePaths);
    }

    proccessFilePaths(movements) {
        let movementFilePath = this.generatePath(movements[0]);
        if (movements.length > 1 && movements.length < 2) {
            let placementPath = this.generatePath(movements[0]);
            this.fileReader.processFile(placementPath, this.processTheInput(this));
        }

        this.fileReader.processFile(movementFilePath, this.processTheInput(this));
    }

    generatePath(roughPath) {
        let fullPath = null;
        if (roughPath.includes(':\\') || roughPath.includes(':/')) fullPath = roughPath;
        else fullPath = path.join(process.cwd(), roughPath);
        return fullPath;
    }

    processTheInput(context) {
        context.display = new BoardDisplay(this.currentGame);
        return (processedInput) => {
            if (processedInput.length === 2) {
                try {
                    let output = context.currentGame.runSinglePointCommand(processedInput);
                    console.log(output);
                } catch (e) {
                    console.error(e);
                }
            } else if (processedInput.length === 1) {
                let output = context.currentGame.runPlacementCommand(processedInput[0]);
                console.log(output);
            }
            else {
                console.log(processedInput);
            }
            context.display.displayBoard();
        }
    }
}