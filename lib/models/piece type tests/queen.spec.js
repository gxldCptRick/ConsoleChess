import mocha from 'mocha';
import chai from 'chai';
import { PieceTypes } from '../PieceTypes'; 
import  BoardPoint from '../BoardPoint';

const should = chai.should();

mocha.describe('Queen Moves Correctly', function(){
    mocha.it('Queen Can Move Up One Space', function(){
        let originalPoint = new BoardPoint('D', 4);
        let nextPoint = new BoardPoint('D', 5);
        let result = PieceTypes.Queen.canMoveTo(originalPoint, nextPoint);
        should.exist(result);
        result.should.equal(true);
    });

    mocha.it('Queen Can Move Up To The Max of The Board', function(){
        let originalPoint = new BoardPoint('D', 4);
        let nextPoint = new BoardPoint('D', 8);
        let result = PieceTypes.Queen.canMoveTo(originalPoint, nextPoint);
        should.exist(result);
        result.should.equal(true);
    });

    mocha.it('Queen Can Move Down One Space', function(){
        let originalPoint = new BoardPoint('D', 4);
        let nextPoint = new BoardPoint('D', 3);
        let result = PieceTypes.Queen.canMoveTo(originalPoint, nextPoint);
        should.exist(result);
        result.should.equal(true);
    });

    mocha.it('Queen Can Move Down to the limit of the board', function(){
        let originalPoint = new BoardPoint('D', 4);
        let nextPoint = new BoardPoint('D', 0);
        let result = PieceTypes.Queen.canMoveTo(originalPoint, nextPoint);
        should.exist(result);
        result.should.equal(true);
    });

    mocha.it('Queen Can Move Diagonally Right One Step', function(){
        let originalPoint = new BoardPoint('D', 4);
        let nextPoint = new BoardPoint('E', 5);
        let result = PieceTypes.Queen.canMoveTo(originalPoint, nextPoint);
        should.exist(result);
        result.should.equal(true);
    });

    mocha.it('Queen Can Move Diagonally Right The Max Of The Board', function(){
        let originalPoint = new BoardPoint('D', 4);
        let nextPoint = new BoardPoint('H', 8);
        let result = PieceTypes.Queen.canMoveTo(originalPoint, nextPoint);
        should.exist(result);
        result.should.equal(true);
    });

    mocha.it('Queen Can Move Diagonally Backward One Step', function(){
        let originalPoint = new BoardPoint('D', 4);
        let nextPoint = new BoardPoint('C', 3);
        let result = PieceTypes.Queen.canMoveTo(originalPoint, nextPoint);
        should.exist(result);
        result.should.equal(true);
    });

    mocha.it('Queen Can Move Diagonally Backward The Length of The Board', function(){
        let originalPoint = new BoardPoint('D', 4);
        let nextPoint = new BoardPoint('A', 1);
        let result = PieceTypes.Queen.canMoveTo(originalPoint, nextPoint);
        should.exist(result);
        result.should.equal(true);
    });

    mocha.it('Queen Can Move Left One Step', function(){
        let originalPoint = new BoardPoint('D', 4);
        let nextPoint = new BoardPoint('c', 4);
        let result = PieceTypes.Queen.canMoveTo(originalPoint, nextPoint);
        should.exist(result);
        result.should.equal(true);
    });

    mocha.it('Queen Can Move Left The Length Of The Board', function(){
        let originalPoint = new BoardPoint('D', 4);
        let nextPoint = new BoardPoint('A', 4);
        let result = PieceTypes.Queen.canMoveTo(originalPoint, nextPoint);
        should.exist(result);
        result.should.equal(true);
    });

    mocha.it('Queen Can Move Right One Step', function(){
        let originalPoint = new BoardPoint('D', 4);
        let nextPoint = new BoardPoint('E', 4);
        let result = PieceTypes.Queen.canMoveTo(originalPoint, nextPoint);
        should.exist(result);
        result.should.equal(true);
    });

    mocha.it('Queen Can Move Right The Length of the board', function(){
        let originalPoint = new BoardPoint('D', 4);
        let nextPoint = new BoardPoint('H', 4);
        let result = PieceTypes.Queen.canMoveTo(originalPoint, nextPoint);
        should.exist(result);
        result.should.equal(true);
    });

})