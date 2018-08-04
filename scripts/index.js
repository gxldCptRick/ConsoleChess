import { GameBoard } from './controllers/GameBoard';
import { FileReader } from './controllers/FileInputParser';

let path = require('path');
let movementReader = new FileReader();
let placementReader = new FileReader();
let callBack = () => {
    let processedInputs = FileReader.readInputs;
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
    if(placementFilePath.substring(1, 3) == ':\\' || movementFilePath.substring(1, 3) == ':/') placementReader.processFile(placementFilePath, callBack);
    else placementReader.processFile(path.normalize(path.join(process.cwd(), placementFilePath)), callBack);
}

if(movementFilePath.substring(1, 3) == ':\\' || movementFilePath.substring(1, 3) == ':/') movementReader.processFile(movementFilePath, callBack);
else movementReader.processFile(path.normalize(path.join(process.cwd(), movementFilePath)), callBack);

