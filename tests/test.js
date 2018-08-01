const mocha = require('mocha'),
assert = require('assert');
const { ChessPiece, PieceTypes } = require('../lib/models/ChessPiece'); 
const { BoardPoint } = require('../lib/models/BoardPoint');

mocha.describe('Chess Piece Checkings', function(){
    mocha.it('Pawn Can Move two times on first move', function(){
        var chessPiece = new ChessPiece(null, PieceTypes.Pawn);
        
        chessPiece.setPosition(new BoardPoint('E',4));

        assert.equal(chessPiece.moveTo(new BoardPoint('E', 6)), true);

    });
});