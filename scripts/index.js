/* eslint-disable no-console */

import { GameBoard } from './controllers/GameBoard';
import { FileReader } from './controllers/FileReader';

let path = require('path');
let fileReader = new FileReader();
let callBack = (processedInputs) => {
    let CurrentGame = new GameBoard({ 
        x: 8,
        y: 8
    });
    processedInputs.forEach((input, index) => {
        if(input.length === 2) {
            try {
               let output =  CurrentGame.runSinglePointCommand(input);
               console.log(output);
            } catch (e) {
                console.error(e);
            }
        }else if(input.length === 1){
            let output = CurrentGame.runPlacementCommand(input[0]);
            console.log(output);
        }
        else {
            console.log(input);
            console.log(index);
        }
    });
};

let args = process.argv.slice(2);

if(args.length < 1) throw "No Path Provided";
if(args.lenght > 2) throw "Too many arguments passed"; 
let movementFilePath = args[0];
if(args.length > 1){
    let placementFilePath = args[1];
    if(placementFilePath.substring(1, 3) == ':\\' || movementFilePath.substring(1, 3) == ':/') fileReader.processFile(placementFilePath, callBack);
    else fileReader.processFile(path.normalize(path.join(process.cwd(), placementFilePath)), callBack);
}

if(movementFilePath.substring(1, 3) == ':\\' || movementFilePath.substring(1, 3) == ':/') fileReader.processFile(movementFilePath, callBack);
else fileReader.processFile(path.normalize(path.join(process.cwd(), movementFilePath)), callBack);

