import mocha from 'mocha';
import assert from 'assert';
import { PieceTypes } from './PieceTypes';
import { ChessPiece, PieceColor } from './ChessPiece'; 
import  BoardPoint from './BoardPoint';

mocha.describe('Queen Moves Correctly', function(){
    mocha.it('Queen Can Move Up One Space', function(){
        var chessPiece = new ChessPiece(PieceColor.White, PieceTypes.Queen);
        chessPiece.setPosition(new BoardPoint('D',4));
        assert.equal(chessPiece.moveTo(new BoardPoint('D', 5)), true);
    });

    mocha.it('Queen Can Move Up To The Max of The Board', function(){
        var chessPiece = new ChessPiece(PieceColor.White, PieceTypes.Queen);
        chessPiece.setPosition(new BoardPoint('D',4));
        assert.equal(chessPiece.moveTo(new BoardPoint('D', 7)), true);
    });

    mocha.it('Queen Can Move Down One Space', function(){
        var chessPiece = new ChessPiece(PieceColor.White, PieceTypes.Queen);
        chessPiece.setPosition(new BoardPoint('D',4));
        assert.equal(chessPiece.moveTo(new BoardPoint('D', 3)), true);
    });

    mocha.it('Queen Can Move Down to the limit of the board', function(){
        var chessPiece = new ChessPiece(PieceColor.White, PieceTypes.Queen);
        chessPiece.setPosition(new BoardPoint('D',4));
        assert.equal(chessPiece.moveTo(new BoardPoint('D', 0)), true);
    });

    mocha.it('Queen Can Move Diagonally Right One Step', function(){
        var chessPiece = new ChessPiece(PieceColor.White, PieceTypes.Queen);
        chessPiece.setPosition(new BoardPoint('D',4));
        assert.equal(chessPiece.moveTo(new BoardPoint('E', 5)), true);
    });

    mocha.it('Queen Can Move Diagonally Right The Max Of The Board', function(){
        var chessPiece = new ChessPiece(PieceColor.White, PieceTypes.Queen);
        chessPiece.setPosition(new BoardPoint('D',4));
        assert.equal(chessPiece.moveTo(new BoardPoint('H', 8)), true);
    });

    mocha.it('Queen Can Move Diagonally Backward One Step', function(){
        var chessPiece = new ChessPiece(PieceColor.White, PieceTypes.Queen);
        chessPiece.setPosition(new BoardPoint('D',4));
        assert.equal(chessPiece.moveTo(new BoardPoint('C', 3)), true);
    });

    mocha.it('Queen Can Move Diagonally Backward The Length of The Board', function(){
        var chessPiece = new ChessPiece(PieceColor.White, PieceTypes.Queen);
        chessPiece.setPosition(new BoardPoint('D',4));
        assert.equal(chessPiece.moveTo(new BoardPoint('A', 1)), true);

    });

    mocha.it('Queen Can Move Left One Step', function(){
        var chessPiece = new ChessPiece(PieceColor.White, PieceTypes.Queen);
        chessPiece.setPosition(new BoardPoint('D',4));
        assert.equal(chessPiece.moveTo(new BoardPoint('C', 4)), true);
    });

    mocha.it('Queen Can Move Left The Length Of The Board', function(){
        var chessPiece = new ChessPiece(PieceColor.White, PieceTypes.Queen);
        chessPiece.setPosition(new BoardPoint('D',4));
        assert.equal(chessPiece.moveTo(new BoardPoint('A', 4)), true);
    });

    mocha.it('Queen Can Move Right One Step', function(){
        var chessPiece = new ChessPiece(PieceColor.White, PieceTypes.Queen);
        chessPiece.setPosition(new BoardPoint('D',4));
        assert.equal(chessPiece.moveTo(new BoardPoint('E', 4)), true);
    });

    mocha.it('Queen Can Move Right The Length of the board', function(){
        var chessPiece = new ChessPiece(PieceColor.White, PieceTypes.Queen);
        chessPiece.setPosition(new BoardPoint('D',4));
        assert.equal(chessPiece.moveTo(new BoardPoint('H', 4)), true);
    });

})