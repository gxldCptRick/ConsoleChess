/* eslint-disable max-classes-per-file*/
class Event{
    constructor(){
        this.listeners = [];
    }
}

export class EventColor extends Event{
    invoke(sender, Colorname){
        this.listeners.forEach(listener => {
            listener(sender, Colorname);
        });
    }
}

export class EventPromotion extends Event{
    invoke(sender, PieceToBePromoted, PromotionTypes){
        this.listeners.forEach(listener => {
            listener(sender, PieceToBePromoted, PromotionTypes)
        });
    }
}