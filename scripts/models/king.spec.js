const mocha = require('mocha');
const assert = require('assert');
const { ChessPiece, PieceTypes, PieceColor } = require('../../lib/models/ChessPiece'); 
const { BoardPoint } = require('../../lib/models/BoardPoint');

mocha.describe('King Moves Correctly', function(){
    mocha.it('King Can Move Forward', function(){
        var chessPiece = new ChessPiece(PieceColor.White, PieceTypes.King);
        chessPiece.setPosition(new BoardPoint('E',4));
        assert.equal(chessPiece.moveTo(new BoardPoint('E', 5)), true);
    });

    mocha.it('King Can Move Forward', function(){
        var chessPiece = new ChessPiece(PieceColor.White, PieceTypes.King);
        chessPiece.setPosition(new BoardPoint('E',4));
        assert.equal(chessPiece.moveTo(new BoardPoint('E', 3)), true);
    });

    mocha.it('King Can Move To Left', function(){
        var chessPiece = new ChessPiece(PieceColor.White, PieceTypes.King);
        chessPiece.setPosition(new BoardPoint('E',4));
        assert.equal(chessPiece.moveTo(new BoardPoint('D', 4)), true);
    });

    mocha.it('King Can Move To Right', function(){
        var chessPiece = new ChessPiece(PieceColor.White, PieceTypes.King);
        chessPiece.setPosition(new BoardPoint('E',4));
        assert.equal(chessPiece.moveTo(new BoardPoint('F', 4)), true);
    });

    mocha.it('King Can Move Diagonally Forward Right', function(){
        var chessPiece = new ChessPiece(PieceColor.White, PieceTypes.King);
        chessPiece.setPosition(new BoardPoint('E',4));
        assert.equal(chessPiece.moveTo(new BoardPoint('F', 5)), true);
    });

    
    mocha.it('King Can Move Diagonally Forward Left', function(){
        var chessPiece = new ChessPiece(PieceColor.White, PieceTypes.King);
        chessPiece.setPosition(new BoardPoint('E',4));
        assert.equal(chessPiece.moveTo(new BoardPoint('D', 3)), true);
    });

    
    mocha.it('King Can Move Diagonally Backward Right', function(){
        var chessPiece = new ChessPiece(PieceColor.White, PieceTypes.King);
        chessPiece.setPosition(new BoardPoint('E',4));
        assert.equal(chessPiece.moveTo(new BoardPoint('F', 3)), true);
    });

    
    mocha.it('King Can Move Diagonally Backward Left', function(){
        var chessPiece = new ChessPiece(PieceColor.White, PieceTypes.King);
        chessPiece.setPosition(new BoardPoint('E',4));
        assert.equal(chessPiece.moveTo(new BoardPoint('D', 5)), true);
    });

})