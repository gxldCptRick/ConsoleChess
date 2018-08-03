import { GameBoard } from './controllers/GameBoard';
import { FileReader } from './controllers/FileInputParser';

let args = process.argv.slice(2);

if(args.length !== 1) throw "No Path Provided" 
