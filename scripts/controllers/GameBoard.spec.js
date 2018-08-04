import { GameBoard } from './GameBoard';
import { PieceTypes } from '../models/PieceTypes';
import  mocha  from 'mocha';
import  chai  from 'chai';
const should = chai.should();

mocha.describe('GameBoard Spawns Pieces Correctly', function(){
    mocha.it('Pawn Spawned Properly', function(){
        let board = new GameBoard({x:8, y:8});
        let pieces = board.pieces;
        should.exist(pieces);
        pieces.should.have.property("A2");
        pieces.should.have.property("G2");
        pieces.should.have.property("H2");
    });

    mocha.it('Rook Spawned Properly', function(){
        let board = new GameBoard({x:8, y:8});
        let pieces = board.pieces;
        should.exist(pieces);
        
        pieces.should.have.property("A1");
        let pieceAtA1 = pieces.A1;
        pieceAtA1.type.should.equal(PieceTypes.Rook);
        
        pieces.should.have.property("H1");
        let pieceAtH1 = pieces.H1;
        pieceAtH1.type.should.equal(PieceTypes.Rook);
    });
});

mocha.describe('GameBoard single Point Command Works Correctly', function(){

});