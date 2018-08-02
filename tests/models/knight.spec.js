const mocha = require('mocha');
const assert = require('assert');
const { ChessPiece, PieceTypes, PieceColor } = require('../../lib/models/ChessPiece'); 
const { BoardPoint } = require('../../lib/models/BoardPoint');

mocha.describe("Knight Movement",function(){

     //Up
    //D4 >> E6
    //D4 >> C6
    //Down
    //D4 >> C2
    //D4 >> E2
    //Left
    //D4 >> Up B5 or Down B3
    //Right
    //D4 >> Up F5 or Down F3
    mocha.it("Knight Can Move L-Shape Forward-Right", function(){
        var chessPiece = new ChessPiece(PieceColor.White, PieceTypes.Knight);
        chessPiece.setPosition(new BoardPoint('D', 4));
        assert.equal(chessPiece.moveTo(new BoardPoint('E', 6)), true);
    });

    mocha.it("Knight Can Move L-Shape Forward-Left", function(){
        var chessPiece = new ChessPiece(PieceColor.White, PieceTypes.Knight);
        chessPiece.setPosition(new BoardPoint('D', 4));
        assert.equal(chessPiece.moveTo(new BoardPoint('C', 6)), true);
    });

    mocha.it("Knight Can Move L-Shape Left-Up", function(){
        var chessPiece = new ChessPiece(PieceColor.White, PieceTypes.Knight);
        chessPiece.setPosition(new BoardPoint('D', 4));
        assert.equal(chessPiece.moveTo(new BoardPoint('B', 5)), true);
    });

    mocha.it("Knight Can Move L-Shape Left-Down", function(){
        var chessPiece = new ChessPiece(PieceColor.White, PieceTypes.Knight);
        chessPiece.setPosition(new BoardPoint('D', 4));
        assert.equal(chessPiece.moveTo(new BoardPoint('B', 3)), true);
    });

    mocha.it("Knight Can Move L-Shape Right-Up", function(){
        var chessPiece = new ChessPiece(PieceColor.White, PieceTypes.Knight);
        chessPiece.setPosition(new BoardPoint('D', 4));
        assert.equal(chessPiece.moveTo(new BoardPoint('F', 5)), true);
    });

    mocha.it("Knight Can Move L-Shape Right-Down", function(){
        var chessPiece = new ChessPiece(PieceColor.White, PieceTypes.Knight);
        chessPiece.setPosition(new BoardPoint('D', 4));
        assert.equal(chessPiece.moveTo(new BoardPoint('F', 3)), true);
    });

    mocha.it("Knight Can Move L-Shape Backward-Left", function(){
        var chessPiece = new ChessPiece(PieceColor.White, PieceTypes.Knight);
        chessPiece.setPosition(new BoardPoint('D', 4));
        assert.equal(chessPiece.moveTo(new BoardPoint('C', 2)), true);
    });

    mocha.it("Knight Can Move L-Shape Backward-Right", function(){
        var chessPiece = new ChessPiece(PieceColor.White, PieceTypes.Knight);
        chessPiece.setPosition(new BoardPoint('D', 4));
        assert.equal(chessPiece.moveTo(new BoardPoint('E', 2)), true);
    });

    mocha.it("Knight Can't Move Vertically Up", function(){
        var chessPiece = new ChessPiece(PieceColor.White, PieceTypes.Knight);
        chessPiece.setPosition(new BoardPoint('B', 1));
        assert.equal(chessPiece.moveTo(new BoardPoint('B', 2)), false);
    });

    mocha.it("Knight Can't Move Vertically Down", function(){
        var chessPiece = new ChessPiece(PieceColor.White, PieceTypes.Knight);
        chessPiece.setPosition(new BoardPoint('B', 2));
        assert.equal(chessPiece.moveTo(new BoardPoint('B', 1)), false);
    });

    mocha.it("Knight Can't Move Horizontally Right", function(){
        var chessPiece = new ChessPiece(PieceColor.White, PieceTypes.Knight);
        chessPiece.setPosition(new BoardPoint('B', 1));
        assert.equal(chessPiece.moveTo(new BoardPoint('C', 1)), false);
    });

    mocha.it("Knight Can't Move Horizontally Left", function(){
        var chessPiece = new ChessPiece(PieceColor.White, PieceTypes.Knight);
        chessPiece.setPosition(new BoardPoint('B', 1));
        assert.equal(chessPiece.moveTo(new BoardPoint('A', 1)), false);
    });

    mocha.it("Knight Can't Move Diagonally-Forward-Left", function(){
        var chessPiece = new ChessPiece(PieceColor.White, PieceTypes.Knight);
        chessPiece.setPosition(new BoardPoint('B', 1));
        assert.equal(chessPiece.moveTo(new BoardPoint('A', 2)), false);
    });

    mocha.it("Knight Can't Move Diagonally-Forward-Right", function(){
        var chessPiece = new ChessPiece(PieceColor.White, PieceTypes.Knight);
        chessPiece.setPosition(new BoardPoint('B', 1));
        assert.equal(chessPiece.moveTo(new BoardPoint('C', 2)), false);
    });

    
    mocha.it("Knight Can't Move Diagonally-Backward-Left", function(){
        var chessPiece = new ChessPiece(PieceColor.White, PieceTypes.Knight);
        chessPiece.setPosition(new BoardPoint('B', 1));
        assert.equal(chessPiece.moveTo(new BoardPoint('A', 2)), false);
    });

})