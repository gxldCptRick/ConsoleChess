import mocha from 'mocha';
import assert from 'assert';
import { PieceTypes } from './PieceTypes';
import { ChessPiece, PieceColor } from './ChessPiece'; 
import BoardPoint  from './BoardPoint';


mocha.describe("Rook Moves Correctly",function(){
    mocha.it("Rook Can Move Horizontally", function(){
        var chessPiece = new ChessPiece(PieceColor.White, PieceTypes.Rook);
        chessPiece.setPosition(new BoardPoint('A', 1));
        assert.equal(chessPiece.moveTo(new BoardPoint('B',1)), true);
        assert.equal(chessPiece.moveTo(new BoardPoint('C',1)), true);
        assert.equal(chessPiece.moveTo(new BoardPoint('D',1)), true);
        assert.equal(chessPiece.moveTo(new BoardPoint('E',1)), true);
        assert.equal(chessPiece.moveTo(new BoardPoint('F',1)), true);
        assert.equal(chessPiece.moveTo(new BoardPoint('G',1)), true);
        assert.equal(chessPiece.moveTo(new BoardPoint('H',1)), true);
    });

    mocha.it("Rook Can't Move Diagonally", function(){
        var chessPiece = new ChessPiece(PieceColor.White, PieceTypes.Rook);
        chessPiece.setPosition(new BoardPoint("A",1));
        assert.equal(chessPiece.moveTo(new BoardPoint('B',2)), false);
        assert.equal(chessPiece.moveTo(new BoardPoint('C',3)), false);
        assert.equal(chessPiece.moveTo(new BoardPoint('D', 4)), false);
        assert.equal(chessPiece.moveTo(new BoardPoint('E', 5)), false);
        assert.equal(chessPiece.moveTo(new BoardPoint('F',6)), false);
        assert.equal(chessPiece.moveTo(new BoardPoint('G',7)), false);
        assert.equal(chessPiece.moveTo(new BoardPoint('H', 8)), false);
    });

    mocha.it("Rook Can Move Vertically", function(){
        var chessPiece = new ChessPiece(PieceColor.White, PieceTypes.Rook);
        chessPiece.setPosition(new BoardPoint("A",1));
        assert.equal(chessPiece.moveTo(new BoardPoint('A',2)), true);
        assert.equal(chessPiece.moveTo(new BoardPoint('A',3)), true);
        assert.equal(chessPiece.moveTo(new BoardPoint('A',4)), true);
        assert.equal(chessPiece.moveTo(new BoardPoint('A',5)), true);
        assert.equal(chessPiece.moveTo(new BoardPoint('A',6)), true);
        assert.equal(chessPiece.moveTo(new BoardPoint('A',7)), true);
        assert.equal(chessPiece.moveTo(new BoardPoint('A',8)), true);

    });

    mocha.it("Rook Can't Move Into It's Same Spot", function(){
        var chessPiece = new ChessPiece(PieceColor.White, PieceTypes.Rook);
        chessPiece.setPosition(new BoardPoint("A",1));
        assert.equal(chessPiece.moveTo(new BoardPoint('A',1)), false);

    });

});