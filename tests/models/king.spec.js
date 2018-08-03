const mocha = require('mocha');
const assert = require('assert');
const { ChessPiece, PieceTypes, PieceColor } = require('../../lib/models/ChessPiece'); 
const { BoardPoint } = require('../../lib/models/BoardPoint');

mocha.describe('King Movement', function(){
    mocha.it('King Can Move Vertically', function(){
        var chessPiece = new ChessPiece(PieceColor.White, PieceTypes.King);
        chessPiece.setPosition(new BoardPoint('E',4));
        assert.equal(chessPiece.moveTo(new BoardPoint('E', 5)), true);
        assert.equal(chessPiece.moveTo(new BoardPoint('E', 3)), true);
    });

    mocha.it('King Can Move Horizontally', function(){
        var chessPiece = new ChessPiece(PieceColor.White, PieceTypes.King);
        chessPiece.setPosition(new BoardPoint('E',4));
        assert.equal(chessPiece.moveTo(new BoardPoint('D', 4)), true);
        assert.equal(chessPiece.moveTo(new BoardPoint('F', 4)), true);
    });

    mocha.it('King Can Move Diagonally', function(){
        var chessPiece = new ChessPiece(PieceColor.White, PieceTypes.King);
        chessPiece.setPosition(new BoardPoint('E',4));
        assert.equal(chessPiece.moveTo(new BoardPoint('D', 3)), true);
        assert.equal(chessPiece.moveTo(new BoardPoint('F', 5)), true);
        assert.equal(chessPiece.moveTo(new BoardPoint('D', 5)), true);
        assert.equal(chessPiece.moveTo(new BoardPoint('F', 3)), true);
    });




})