const mocha = require('mocha');
const assert = require('assert');
const { ChessPiece, PieceTypes, PieceColor } = require('../../lib/models/ChessPiece'); 
const { BoardPoint } = require('../../lib/models/BoardPoint');

mocha.describe('Pawn Movement', function(){
    mocha.it('Pawn Can Move two times on first move', function(){
        var chessPiece = new ChessPiece(PieceColor.White, PieceTypes.Pawn);
        chessPiece.setPosition(new BoardPoint('E',4));
        assert.equal(chessPiece.moveTo(new BoardPoint('E', 6)), true);
    });
    
    mocha.it('Pawn Cant Move Three Times on first move', function(){
        var chessPiece = new ChessPiece(PieceColor.White, PieceTypes.Pawn);
        chessPiece.setPosition(new BoardPoint('D', 3));
        assert.equal(chessPiece.moveTo(new BoardPoint('D', 6)), false);
    });

    mocha.it("Pawn Can't Move Diagonally", function(){
        var chessPiece = new ChessPiece(PieceColor.White, PieceTypes.Pawn);
        chessPiece.setPosition(new BoardPoint('D', 3));
        assert.equal(chessPiece.moveTo(new BoardPoint('C', 4)), false);
    });

    mocha.it("Pawn Can't Move Horizontally", function(){
        var chessPiece = new ChessPiece(PieceColor.White, PieceTypes.Pawn);
        chessPiece.setPosition(new BoardPoint('F', 3));
        assert.equal(chessPiece.moveTo(new BoardPoint('G', 3)), false);
    });

    mocha.it("Pawn Can Move One Step Forward", function(){
        var chessPiece = new ChessPiece(PieceColor.White, PieceTypes.Pawn);
        chessPiece.setPosition(new BoardPoint('F', 3));
        assert.equal(chessPiece.moveTo(new BoardPoint('F', 4)), true);
    });

    mocha.it("Pawn Can't Move to Same Space that it is currently on", function(){
        var chessPiece = new ChessPiece(PieceColor.White, PieceTypes.Pawn);
        chessPiece.setPosition(new BoardPoint('E', 3));
        assert.equal(chessPiece.moveTo(new BoardPoint('E', 3)), false);
    });

    mocha.it("Black Pawn Can Move Forward (One Space)", function(){
        var chessPiece = new ChessPiece(PieceColor.Black, PieceTypes.Pawn);
        chessPiece.setPosition(new BoardPoint('E', 7));
        assert.equal(chessPiece.moveTo(new BoardPoint('E', 6)), true);
    });

    mocha.it("Black Pawn Can Move Forward (One Space)", function(){
        var chessPiece = new ChessPiece(PieceColor.Black, PieceTypes.Pawn);
        chessPiece.setPosition(new BoardPoint('E', 7));
        assert.equal(chessPiece.moveTo(new BoardPoint('E', 5)), true);
    });
});