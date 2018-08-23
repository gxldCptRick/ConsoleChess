import { ChessConsoleProccessor } from './controllers/ChessConsoleProccessor';

let args = process.argv.slice(2);

if (args.length === 1){
    let controller = new ChessConsoleProccessor(args[0]);
    controller.start();
}else if (args.length === 2){
    let controller = new ChessConsoleProccessor(args[0], args[1]);
    controller.start();
}else throw new Error('Too Many Args. Please Pass In only a movementfile and optionally a placement file');