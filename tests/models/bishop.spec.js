const mocha = require('mocha');
const assert = require('assert');
const { ChessPiece, PieceTypes, PieceColor } = require('../../lib/models/ChessPiece'); 
const { BoardPoint } = require('../../lib/models/BoardPoint');


mocha.describe("Bishop Movement",function(){
    mocha.it("Bishop Can Move Diagonally Forward", function(){
        var chessPiece = new ChessPiece(PieceColor.White, PieceTypes.Bishop);
        chessPiece.setPosition(new BoardPoint('C', 1));
        assert.equal(chessPiece.moveTo(new BoardPoint('B', 2)), true);
    });

    mocha.it("Bishop Can Move Diagonally Backward", function(){
        var chessPiece = new ChessPiece(PieceColor.White, PieceTypes.Bishop);
        chessPiece.setPosition(new BoardPoint('C', 3));
        assert.equal(chessPiece.moveTo(new BoardPoint('B', 2)), true);
    });

    mocha.it("Bishop Can't Move Horizontally", function(){
        var chessPiece = new ChessPiece(PieceColor.White, PieceTypes.Bishop);
        chessPiece.setPosition(new BoardPoint('C', 1));
        assert.equal(chessPiece.moveTo(new BoardPoint('D', 1)), false);
    });

    mocha.it("Bishop Can't Move Vertically", function(){
        var chessPiece = new ChessPiece(PieceColor.White, PieceTypes.Bishop);
        chessPiece.setPosition(new BoardPoint('C', 1));
        assert.equal(chessPiece.moveTo(new BoardPoint('C', 2)), false);
    });

    mocha.it("Bishop Can't Move To Space Its Currently On", function(){
        var chessPiece = new ChessPiece(PieceColor.White, PieceTypes.Bishop);
        chessPiece.setPosition(new BoardPoint('C', 1));
        assert.equal(chessPiece.moveTo(new BoardPoint('C', 1)), false);
    });

    // mocha.it("Bishop Can Move Diagonally Forward", function(){
    //     var chessPiece = new ChessPiece(PieceColor.White, PieceTypes.Bishop);
    //     chessPiece.setPosition(new BoardPoint('C', 1));
    //     assert.equal(chessPiece.moveTo(new BoardPoint('B', 2)), true);
    // });

})

    
