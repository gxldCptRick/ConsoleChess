import mocha from 'mocha';
import chai from 'chai';
import { PieceTypes } from '../PieceTypes' 
import BoardPoint  from '../BoardPoint';

const should = chai.should();

mocha.describe("Knight Moves Correctly",function(){
    mocha.it("Knight Can Move L-Shape Forward-Right", function(){
        let originalPoint = new BoardPoint('D', 4);
        let nextPoint = new BoardPoint('E', 6);
        let result = PieceTypes.Knight.canMoveTo(originalPoint, nextPoint);
        should.exist(result);
        result.should.equal(true);
    });

    mocha.it("Knight Can Move L-Shape Forward-Left", function(){
        let originalPoint = new BoardPoint('D', 4);
        let nextPoint = new BoardPoint('C', 6);
        let result = PieceTypes.Knight.canMoveTo(originalPoint, nextPoint);
        should.exist(result);
        result.should.equal(true);
    });

    mocha.it("Knight Can Move L-Shape Left-Up", function(){
        let originalPoint = new BoardPoint('D', 4);
        let nextPoint = new BoardPoint('B', 5);
        let result = PieceTypes.Knight.canMoveTo(originalPoint, nextPoint);
        should.exist(result);
        result.should.equal(true);
    });

    mocha.it("Knight Can Move L-Shape Left-Down", function(){
        let originalPoint = new BoardPoint('D', 4);
        let nextPoint = new BoardPoint('B', 3);
        let result = PieceTypes.Knight.canMoveTo(originalPoint, nextPoint);
        should.exist(result);
        result.should.equal(true);
    });

    mocha.it("Knight Can Move L-Shape Right-Up", function(){
        let originalPoint = new BoardPoint('D', 4);
        let nextPoint = new BoardPoint('F', 5);
        let result = PieceTypes.Knight.canMoveTo(originalPoint, nextPoint);
        should.exist(result);
        result.should.equal(true);
    });

    mocha.it("Knight Can Move L-Shape Right-Down", function(){
        let originalPoint = new BoardPoint('D', 4);
        let nextPoint = new BoardPoint('F', 3);
        let result = PieceTypes.Knight.canMoveTo(originalPoint, nextPoint);
        should.exist(result);
        result.should.equal(true);
    });

    mocha.it("Knight Can Move L-Shape Backward-Left", function(){
        let originalPoint = new BoardPoint('D', 4);
        let nextPoint = new BoardPoint('C', 2);
        let result = PieceTypes.Knight.canMoveTo(originalPoint, nextPoint);
        should.exist(result);
        result.should.equal(true);
    });

    mocha.it("Knight Can Move L-Shape Backward-Right", function(){
        let originalPoint = new BoardPoint('D', 4);
        let nextPoint = new BoardPoint('E', 2);
        let result = PieceTypes.Knight.canMoveTo(originalPoint, nextPoint);
        should.exist(result);
        result.should.equal(true);
    });

    mocha.it("Knight Can't Move Vertically Up", function(){
        let originalPoint = new BoardPoint('D', 4);
        let nextPoint = new BoardPoint('D', 5);
        let result = PieceTypes.Knight.canMoveTo(originalPoint, nextPoint);
        should.exist(result);
        result.should.not.equal(true);
    });

    mocha.it("Knight Can't Move Vertically Down", function(){
        let originalPoint = new BoardPoint('D', 4);
        let nextPoint = new BoardPoint('D', 5);
        let result = PieceTypes.Knight.canMoveTo(originalPoint, nextPoint);
        should.exist(result);
        result.should.not.equal(true);
    });

    mocha.it("Knight Can't Move Horizontally Right", function(){
        let originalPoint = new BoardPoint('D', 4);
        let nextPoint = new BoardPoint('E', 4);
        let result = PieceTypes.Knight.canMoveTo(originalPoint, nextPoint);
        should.exist(result);
        result.should.not.equal(true);
    });

    mocha.it("Knight Can't Move Horizontally Left", function(){
        let originalPoint = new BoardPoint('D', 4);
        let nextPoint = new BoardPoint('C', 4);
        let result = PieceTypes.Knight.canMoveTo(originalPoint, nextPoint);
        should.exist(result);
        result.should.not.equal(true);
    });

    mocha.it("Knight Can't Move Diagonally-Forward-Left", function(){
        let originalPoint = new BoardPoint('D', 4);
        let nextPoint = new BoardPoint('C', 5);
        let result = PieceTypes.Knight.canMoveTo(originalPoint, nextPoint);
        should.exist(result);
        result.should.not.equal(true);
    });

    mocha.it("Knight Can't Move Diagonally-Forward-Right", function(){
        let originalPoint = new BoardPoint('D', 4);
        let nextPoint = new BoardPoint('E', 5);
        let result = PieceTypes.Knight.canMoveTo(originalPoint, nextPoint);
        should.exist(result);
        result.should.not.equal(true);
    });

    
    mocha.it("Knight Can't Move Diagonally-Backward-Left", function(){
        let originalPoint = new BoardPoint('D', 4);
        let nextPoint = new BoardPoint('C', 3);
        let result = PieceTypes.Knight.canMoveTo(originalPoint, nextPoint);
        should.exist(result);
        result.should.not.equal(true);
    });

    mocha.it("Knight Can't Move Diagonally-Backward-Right", function(){
        let originalPoint = new BoardPoint('D', 4);
        let nextPoint = new BoardPoint('E', 3);
        let result = PieceTypes.Knight.canMoveTo(originalPoint, nextPoint);
        should.exist(result);
        result.should.not.equal(true);
    });

})