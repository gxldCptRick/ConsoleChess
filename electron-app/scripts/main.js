/* eslint-disable */

import { ChessController  } from "../scripts/ChessController";
var thing = new ChessController();

window.addEventListener('load', () =>{
    thing.windowLoadEvent();
    thing.canvasOnPage.addEventListener('click', (mouseEvent) => {
        thing.canvasClickedEvent(mouseEvent);
    });
    
    document.getElementById('reset').addEventListener('click', () => {
        thing.reset();
    });
});