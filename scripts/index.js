import { GameBoard } from './controllers/GameBoard';
import { FileReader } from './controllers/FileInputParser';
import { cursorTo } from 'readline';
import { callbackify } from 'util';
let path = require('path');
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
        }else {
            console.log(index);
        }
    });
};

let args = process.argv.slice(2);

if(args.length !== 1) throw "No Path Provided" 
let filePath = args[0];
if(filePath.substring(1, 3) == ':\\' || filePath.substring(1, 3) == ':/') FileReader.processFile(filePath, callBack);
else FileReader.processFile(path.normalize(path.join(process.cwd(), filePath)), callBack);

