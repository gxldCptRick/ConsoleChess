import mocha  from 'mocha';
import chai from 'chai';
import { PieceTypes } from './PieceTypes' 
import  BoardPoint  from './BoardPoint';

const should = chai.should();

mocha.describe("Bishop Moves Correctly",function(){
    mocha.it("Bishop Can Move Diagonally Forward Left", function(){
        let originalPoint = new BoardPoint('D', 4);
        let nextPoint = new BoardPoint('C', 5);
        let result = PieceTypes.Bishop.canMoveTo(originalPoint, nextPoint);
        should.exist(result);
        result.should.equal(true);
    });

    // mocha.it("Bishop Can Move Diagonally Forward Right", function(){
    //     var chessPiece = new ChessPiece(PieceColor.White, PieceTypes.Bishop);
    //     chessPiece.setPosition(new BoardPoint('D', 4));
    //     assert.equal(chessPiece.moveTo(new BoardPoint('E', 5)), true);
    // });

    // mocha.it("Bishop Can Move Diagonally Backward Left", function(){
    //     var chessPiece = new ChessPiece(PieceColor.White, PieceTypes.Bishop);
    //     chessPiece.setPosition(new BoardPoint('D', 4));
    //     assert.equal(chessPiece.moveTo(new BoardPoint('C', 3)), true);
    // });

    
    // mocha.it("Bishop Can Move Diagonally Backward Right", function(){
    //     var chessPiece = new ChessPiece(PieceColor.White, PieceTypes.Bishop);
    //     chessPiece.setPosition(new BoardPoint('D', 4));
    //     assert.equal(chessPiece.moveTo(new BoardPoint('E', 3)), true);
    // });

    // mocha.it("Bishop Can't Move Horizontally", function(){
    //     var chessPiece = new ChessPiece(PieceColor.White, PieceTypes.Bishop);
    //     chessPiece.setPosition(new BoardPoint('C', 1));
    //     assert.equal(chessPiece.moveTo(new BoardPoint('D', 1)), false);
    // });

    // mocha.it("Bishop Can't Move Vertically", function(){
    //     var chessPiece = new ChessPiece(PieceColor.White, PieceTypes.Bishop);
    //     chessPiece.setPosition(new BoardPoint('C', 1));
    //     assert.equal(chessPiece.moveTo(new BoardPoint('C', 2)), false);
    // });

    // mocha.it("Bishop Can't Move To Space Its Currently On", function(){
    //     var chessPiece = new ChessPiece(PieceColor.White, PieceTypes.Bishop);
    //     chessPiece.setPosition(new BoardPoint('C', 1));
    //     assert.equal(chessPiece.moveTo(new BoardPoint('C', 1)), false);
    // });

})

    
