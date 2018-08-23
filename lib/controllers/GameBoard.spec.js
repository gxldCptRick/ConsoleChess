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
        pieces.A2.color.should.equal("White", "Pawn is not white at A2");
        
        pieces.should.have.property("G2");
        pieces.G2.type.name.should.equal("Pawn", "Pawn is not at G2");
        
        pieces.should.have.property("H2");
        pieces.H2.type.name.should.equal("Pawn", "Pawn is not at H2");

        pieces.should.have.property("A7");
        pieces.A7.type.name.should.equal("Pawn", "Pawn is not at A7");
        
        pieces.should.have.property("G7");
        pieces.G7.type.name.should.equal("Pawn", "Pawn is not at G7");
        
        pieces.should.have.property("H7");
        pieces.H7.type.name.should.equal("Pawn", "Pawn is not at H7");


    });

    mocha.it('Rook Spawned Properly', function(){
        let board = new GameBoard({x:8, y:8});
        let pieces = board.pieces;
        should.exist(pieces);
        
        pieces.should.have.property("A1");
        pieces.A1.type.name.should.equal("Rook", "Rook is not on A1");
        
        pieces.should.have.property("H1");
        pieces.H1.type.name.should.equal("Rook", "Rook is not on H1");

        pieces.should.have.property("A8");
        pieces.A8.type.name.should.equal("Rook", "Rook is not on A8");
        
        pieces.should.have.property("H8");
        pieces.H8.type.name.should.equal("Rook", "Rook is not on H8");
    });

    mocha.it('Knight Spawned Properly', function(){
        let board = new GameBoard({x:8, y:8});
        let pieces = board.pieces;
        should.exist(pieces);
        
        pieces.should.have.property("B1");
        pieces.B1.type.name.should.equal("Knight", "Knight is not on B1");
        
        pieces.should.have.property("G1");
        pieces.G1.type.name.should.equal("Knight", "Knight is not on G1");

        pieces.should.have.property("B8");
        pieces.B8.type.name.should.equal("Knight", "Knight is not on B8");
        
        pieces.should.have.property("G8");
        pieces.G8.type.name.should.equal("Knight", "Knight is not on G8");
    });

    mocha.it('Bishop Spawned Properly', function(){
        let board = new GameBoard({x:8, y:8});
        let pieces = board.pieces;
        should.exist(pieces);
        
        pieces.should.have.property("C1");
        pieces.C1.type.name.should.equal("Bishop", "Bishop is not on C1");
        
        pieces.should.have.property("F1");
        pieces.F1.type.name.should.equal("Bishop", "Bishop is not on F1");

        pieces.should.have.property("C8");
        pieces.C8.type.name.should.equal("Bishop", "Bishop is not on C8");
        
        pieces.should.have.property("F8");
        pieces.F8.type.name.should.equal("Bishop", "Bishop is not on F8");
    });

    mocha.it('Queen Spawned Properly', function(){
        let board = new GameBoard({x:8, y:8});
        let pieces = board.pieces;
        should.exist(pieces);
        
        pieces.should.have.property("D1");
        pieces.D1.type.name.should.equal("Queen", "Queen is not on D1");
        
        pieces.should.have.property("D8");
        pieces.D8.type.name.should.equal("Queen", "Queen is not on D8");
        
    });

    mocha.it('King Spawned Properly', function(){
        let board = new GameBoard({x:8, y:8});
        let pieces = board.pieces;
        should.exist(pieces);
        
        pieces.should.have.property("E1");
        pieces.E1.type.name.should.equal("King", "King is not on E1");
        
        pieces.should.have.property("E8");
        pieces.E8.type.name.should.equal("King", "King is not on E8");
        
    });
    
});

mocha.describe('GameBoard Commands Works Correctly', function(){
    mocha.it('GameBoard Single Point Command Actually Moves Valid Piece to New Position', function(){
        let board = new GameBoard({x:8, y:8});
        let command = [["a",2], ["a",3]];
        board.runSinglePointCommand(command);
        board.pieces.should.have.property('A3');
        board.pieces.should.not.have.property('A2');
    });

    
    mocha.it('GameBoard Single Point Command throws exception when moving piece on a spot where there is another.', function(){
        let board = new GameBoard();
        let command = [["a",1], ["a",2]];
        let pieces = board.pieces;
        try
        {
            board.runSinglePointCommand(command)
            should.fail();
        }catch (e){
            should.exist(e);
        }
        pieces.should.have.property("A2");
        pieces.should.have.property("A1");
    });

});