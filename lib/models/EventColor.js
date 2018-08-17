export class EventColor{
    constructor(){
        this.listeners = [];
    }

    invoke(sender, args){
        this.listeners.forEach(element => {
            element(sender, args);
        });
    }
}