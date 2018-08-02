const mocha = require('mocha');
const assert = require('assert');
const { ChessPiece, PieceTypes, PieceColor } = require('../../lib/models/ChessPiece'); 
const { BoardPoint } = require('../../lib/models/BoardPoint');


mocha.describe("Rook Movement",function(){
    mocha.it("Rook Can Move Horizontally", function(){
        var chessPiece = new ChessPiece(PieceColor.White, PieceTypes.Rook);
        chessPiece.setPosition(new BoardPoint('A', 1));
        assert.equal(chessPiece.moveTo(new BoardPoint('a', 7)), true);
    }); 
});