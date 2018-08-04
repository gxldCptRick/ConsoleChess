import { GameBoard } from './GameBoard';
import { mocha } from 'mocha';
import  chai  from 'chai';
chai.should();

mocha.describe('GameBoard Spawns Pieces Correctly', function(){
    mocha.it('Pawn Spawned Properly', function(){
        let board = new GameBoard({x:8, y:8});
        board.should.have.property("A1");
        board.should.have.property("A4");
        board.should.have.property("A5");
    });
});

mocha.describe('GameBoard single Point Command Works Correctly', function(){

});