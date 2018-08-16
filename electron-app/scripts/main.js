/* eslint-disable */

import { ChessController  } from "../scripts/ChessController";
var thing = new ChessController();

window.addEventListener('load', () =>{
    thing.windowLoadEvent();
    thing.display.displayBoard();
    thing.canvasOnPage.addEventListener('click', (mouseEvent) => {
        thing.canvasClickedEvent(mouseEvent);
    })
});