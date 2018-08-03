const mocha = require('mocha');
const assert = require('assert');
const { ChessPiece, PieceTypes, PieceColor } = require('../../lib/models/ChessPiece'); 
const { BoardPoint } = require('../../lib/models/BoardPoint');

mocha.describe('Queen Movement', function(){
    mocha.it('Queen Can Move Vertically', function(){
        var chessPiece = new ChessPiece(PieceColor.White, PieceTypes.Queen);
        chessPiece.setPosition(new BoardPoint('D',4));
        assert.equal(chessPiece.moveTo(new BoardPoint('D', 0)), true);
        assert.equal(chessPiece.moveTo(new BoardPoint('D', 1)), true);
        assert.equal(chessPiece.moveTo(new BoardPoint('D', 2)), true);
        assert.equal(chessPiece.moveTo(new BoardPoint('D', 3)), true);
        assert.equal(chessPiece.moveTo(new BoardPoint('D', 5)), true);
        assert.equal(chessPiece.moveTo(new BoardPoint('D', 6)), true);
        assert.equal(chessPiece.moveTo(new BoardPoint('D', 7)), true);
    });

    mocha.it('Queen Can Move Diagonally', function(){
        var chessPiece = new ChessPiece(PieceColor.White, PieceTypes.Queen);
        chessPiece.setPosition(new BoardPoint('D',4));
        assert.equal(chessPiece.moveTo(new BoardPoint('C', 5)), true);
        assert.equal(chessPiece.moveTo(new BoardPoint('B', 6)), true);
        assert.equal(chessPiece.moveTo(new BoardPoint('A', 7)), true);
        assert.equal(chessPiece.moveTo(new BoardPoint('E', 3)), true);
        assert.equal(chessPiece.moveTo(new BoardPoint('F', 2)), true);
        assert.equal(chessPiece.moveTo(new BoardPoint('G', 1)), true);
        assert.equal(chessPiece.moveTo(new BoardPoint('H', 0)), true);

        assert.equal(chessPiece.moveTo(new BoardPoint('E', 5)), true);
        assert.equal(chessPiece.moveTo(new BoardPoint('F', 6)), true);
        assert.equal(chessPiece.moveTo(new BoardPoint('G', 7)), true);
        assert.equal(chessPiece.moveTo(new BoardPoint('D', 8)), true);
        assert.equal(chessPiece.moveTo(new BoardPoint('C', 3)), true);
        assert.equal(chessPiece.moveTo(new BoardPoint('B', 2)), true);
        assert.equal(chessPiece.moveTo(new BoardPoint('A', 1)), true);

    });

    mocha.it('Queen Can Move Horizontally', function(){
        var chessPiece = new ChessPiece(PieceColor.White, PieceTypes.Queen);
        chessPiece.setPosition(new BoardPoint('D',4));
        assert.equal(chessPiece.moveTo(new BoardPoint('C', 3)), true);
        assert.equal(chessPiece.moveTo(new BoardPoint('B', 3)), true);
        assert.equal(chessPiece.moveTo(new BoardPoint('A', 3)), true);
        assert.equal(chessPiece.moveTo(new BoardPoint('E', 3)), true);
        assert.equal(chessPiece.moveTo(new BoardPoint('F', 3)), true);
        assert.equal(chessPiece.moveTo(new BoardPoint('G', 3)), true);
        assert.equal(chessPiece.moveTo(new BoardPoint('H', 3)), true);
    });

})