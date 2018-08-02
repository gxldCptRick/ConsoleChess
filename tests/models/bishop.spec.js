const mocha = require('mocha');
const assert = require('assert');
const { ChessPiece, PieceTypes, PieceColor } = require('../../lib/models/ChessPiece'); 
const { BoardPoint } = require('../../lib/models/BoardPoint');


mocha.describe("Bishop Movement",function(){
    mocha.it("Bishop Can Move Diagonally", function(){
        var chessPiece = new ChessPiece(PieceColor.White, PieceTypes.Bishop);
        chessPiece.setPosition(new BoardPoint('A', 1));
        assert.equal(chessPiece.moveTo(new BoardPoint('a', 7)), true);
    }); 
});