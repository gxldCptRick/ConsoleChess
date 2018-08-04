import mocha  from 'mocha';
import chai from 'chai';
import { PieceTypes } from '../PieceTypes' 
import  BoardPoint  from '../BoardPoint';

const should = chai.should();

mocha.describe("Bishop Moves Correctly",function(){
    mocha.it("Bishop Can Move Diagonally Forward Left", function(){
        let originalPoint = new BoardPoint('D', 4);
        let nextPoint = new BoardPoint('C', 5);
        let result = PieceTypes.Bishop.canMoveTo(originalPoint, nextPoint);
        should.exist(result);
        result.should.equal(true);
    });

    mocha.it("Bishop Can Move Diagonally Forward Right", function(){
        let originalPoint = new BoardPoint('D', 4);
        let nextPoint = new BoardPoint('E', 5);
        let result = PieceTypes.Bishop.canMoveTo(originalPoint, nextPoint);
        should.exist(result);
        result.should.equal(true);
    });

    mocha.it("Bishop Can Move Diagonally Backward Left", function(){
        let originalPoint = new BoardPoint('D', 4);
        let nextPoint = new BoardPoint('c', 3);
        let result = PieceTypes.Bishop.canMoveTo(originalPoint, nextPoint);
        should.exist(result);
        result.should.equal(true);
    });

    
    mocha.it("Bishop Can Move Diagonally Backward Right", function(){
        let originalPoint = new BoardPoint('D', 4);
        let nextPoint = new BoardPoint('E', 3);
        let result = PieceTypes.Bishop.canMoveTo(originalPoint, nextPoint);
        should.exist(result);
        result.should.equal(true);
    });

    mocha.it("Bishop Can't Move Horizontally", function(){
        let originalPoint = new BoardPoint('D', 4);
        let nextPoint = new BoardPoint('E', 4);
        let result = PieceTypes.Bishop.canMoveTo(originalPoint, nextPoint);
        should.exist(result);
        result.should.not.equal(true);
    });

    mocha.it("Bishop Can't Move Vertically", function(){
        let originalPoint = new BoardPoint('D', 4);
        let nextPoint = new BoardPoint('D', 5);
        let result = PieceTypes.Bishop.canMoveTo(originalPoint, nextPoint);
        should.exist(result);
        result.should.not.equal(true);
    });

    mocha.it("Bishop Can't Move To Space Its Currently On", function(){
        let originalPoint = new BoardPoint('D', 4);
        let nextPoint = new BoardPoint('D', 4);
        let result = PieceTypes.Bishop.canMoveTo(originalPoint, nextPoint);
        should.exist(result);
        result.should.not.equal(true);
    });

})

    
