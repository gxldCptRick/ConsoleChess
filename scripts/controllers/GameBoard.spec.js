import { GameBoard } from './GameBoard';
import  mocha  from 'mocha';
import  chai  from 'chai';
const should = chai.should();

mocha.describe('GameBoard Spawns Pieces Correctly', function(){
    mocha.it('Pawn Spawned Properly', function(){
        let board = new GameBoard({x:8, y:8});
        let pieces = board.pieces;
        should.exist(pieces);

        pieces.should.have.property("A2");
        pieces.A2.type.name.should.equal("Pawn", "Pawn is not at A2");
        
        pieces.should.have.property("G2");
        pieces.G2.type.name.should.equal("Pawn", "Pawn is not at G2");
        
        pieces.should.have.property("H2");
        pieces.H2.type.name.should.equal("Pawn", "Pawn is not at H2");

    });

    mocha.it('Rook Spawned Properly', function(){
        let board = new GameBoard({x:8, y:8});
        let pieces = board.pieces;
        should.exist(pieces);
        
        pieces.should.have.property("A1");
        pieces.A1.type.name.should.equal("Rook", "Rook is not on A1");
        
        pieces.should.have.property("H1");
        pieces.H1.type.name.should.equal("Rook", "Rook is not on H1");
    });

    mocha.it('Knight Spawned Properly', function(){
        let board = new GameBoard({x:8, y:8});
        let pieces = board.pieces;
        should.exist(pieces);
        
        pieces.should.have.property("B1");
        pieces.B1.type.name.should.equal("Knight", "Knight is not on B1");
        
        pieces.should.have.property("G1");
        pieces.G1.type.name.should.equal("Knight", "Knight is not on G1");
    });

    mocha.it('Bishop Spawned Properly', function(){
        let board = new GameBoard({x:8, y:8});
        let pieces = board.pieces;
        should.exist(pieces);
        
        pieces.should.have.property("C1");
        pieces.C1.type.name.should.equal("Bishop", "Bishop is not on C1");
        
        pieces.should.have.property("F1");
        pieces.F1.type.name.should.equal("Bishop", "Bishop is not on F1");
    });

    mocha.it('Queen Spawned Properly', function(){
        let board = new GameBoard({x:8, y:8});
        let pieces = board.pieces;
        should.exist(pieces);
        
        pieces.should.have.property("D1");
        pieces.D1.type.name.should.equal("Queen", "Queen is not on D1");
        
    });

    mocha.it('King Spawned Properly', function(){
        let board = new GameBoard({x:8, y:8});
        let pieces = board.pieces;
        should.exist(pieces);
        
        pieces.should.have.property("E1");
        pieces.E1.type.name.should.equal("King", "King is not on E1");
        
    });
    
});

mocha.describe('GameBoard Commands Works Correctly', function(){
    
});