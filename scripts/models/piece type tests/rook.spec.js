import mocha from 'mocha';
import chai from 'chai';
import { PieceTypes } from '../PieceTypes';
import BoardPoint  from '../BoardPoint';

const should = chai.should();

mocha.describe("Rook Moves Correctly",function(){
    mocha.it("Rook Can Move To The Left By One", function(){
        let originPoint = new BoardPoint("D", 4);
        let nextPoint = new BoardPoint("C", 4);
        let canMove = PieceTypes.Rook.canMoveTo(originPoint, nextPoint);
        should.exist(canMove);
        canMove.should.equal(true);
    });

    mocha.it("Rook Can Move To The Left The Length of the board", function(){
        let originPoint = new BoardPoint("D", 4);
        let nextPoint = new BoardPoint("C", 4);
        let canMove = PieceTypes.Rook.canMoveTo(originPoint, nextPoint);
        should.exist(canMove);
        canMove.should.equal(true);
    });

    mocha.it("Rook Can Move To The Right by One", function(){
        let originPoint = new BoardPoint("D", 4);
        let nextPoint = new BoardPoint("E", 4);
        let canMove = PieceTypes.Rook.canMoveTo(originPoint, nextPoint);
        should.exist(canMove);
        canMove.should.equal(true);
    });

    mocha.it("Rook Can Move To The Right The Length of the board", function(){
        let originPoint = new BoardPoint("D", 4);
        let nextPoint = new BoardPoint("H", 4);
        let canMove = PieceTypes.Rook.canMoveTo(originPoint, nextPoint);
        should.exist(canMove);
        canMove.should.equal(true);
    });

    mocha.it("Rook Can't Move Diagonally Backward Right", function(){
        let originPoint = new BoardPoint("D", 4);
        let nextPoint = new BoardPoint("E", 3);
        let canMove = PieceTypes.Rook.canMoveTo(originPoint, nextPoint);
        should.exist(canMove);
        canMove.should.not.equal(true);
    });

    mocha.it("Rook Can't Move Diagonally Forward Right", function(){
        let originPoint = new BoardPoint("D", 4);
        let nextPoint = new BoardPoint("E", 5);
        let canMove = PieceTypes.Rook.canMoveTo(originPoint, nextPoint);
        should.exist(canMove);
        canMove.should.not.equal(true);
    });

    mocha.it("Rook Can't Move Diagonally Backward Left", function(){
        let originPoint = new BoardPoint("D", 4);
        let nextPoint = new BoardPoint("C", 3);
        let canMove = PieceTypes.Rook.canMoveTo(originPoint, nextPoint);
        should.exist(canMove);
        canMove.should.not.equal(true);
    });

    mocha.it("Rook Can't Move Diagonally Forward Left", function(){
        let originPoint = new BoardPoint("D", 4);
        let nextPoint = new BoardPoint("C", 5);
        let canMove = PieceTypes.Rook.canMoveTo(originPoint, nextPoint);
        should.exist(canMove);
        canMove.should.not.equal(true);
    });

    mocha.it("Rook Can Move Forward By One", function(){
        let originPoint = new BoardPoint("A", 4);
        let nextPoint = new BoardPoint('A', 5);
        let canMove = PieceTypes.Rook.canMoveTo(originPoint, nextPoint);
        should.exist(canMove);
        canMove.should.equal(true);
    });

    mocha.it("Rook Can Move Forward The Length Of the Board", function(){
        let originPoint = new BoardPoint("A", 4);
        let nextPoint = new BoardPoint('A', 8);
        let canMove = PieceTypes.Rook.canMoveTo(originPoint, nextPoint);
        should.exist(canMove);
        canMove.should.equal(true);
    });

    mocha.it("Rook Can Move Backward By One", function(){
        let originPoint = new BoardPoint("A", 4);
        let nextPoint = new BoardPoint('A', 3);
        let canMove = PieceTypes.Rook.canMoveTo(originPoint, nextPoint);
        should.exist(canMove);
        canMove.should.equal(true);
    });

    mocha.it("Rook Can Move Backward The Length Of the Board", function(){
        let originPoint = new BoardPoint("A", 4);
        let nextPoint = new BoardPoint('A', 1);
        let canMove = PieceTypes.Rook.canMoveTo(originPoint, nextPoint);
        should.exist(canMove);
        canMove.should.equal(true);
    });

    mocha.it("Rook Can't Move Into It's Same Spot", function(){
        let originPoint = new BoardPoint("A",1);
        let nextPoint = new BoardPoint('A',1);
        let canMove = PieceTypes.Rook.canMoveTo(originPoint, nextPoint);
        should.exist(canMove);
        canMove.should.not.equal(true);
    });

});