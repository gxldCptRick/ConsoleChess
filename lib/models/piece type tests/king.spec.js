import mocha from 'mocha';
import chai from 'chai';
import { PieceTypes } from '../PieceTypes';
import BoardPoint from '../BoardPoint';
const should = chai.should();
mocha.describe('King Moves Correctly', function(){
    mocha.it('King Can Move Forward', function(){
        let originalPoint = new BoardPoint('E', 4);
        let nextPoint = new BoardPoint('E', 5);
        let result = PieceTypes.King.canMoveTo(originalPoint, nextPoint);
        should.exist(result);
        result.should.equal(true);
    });

    mocha.it('King Can Move Forward', function(){
        let originalPoint = new BoardPoint('E', 4);
        let nextPoint = new BoardPoint('E', 3);
        let result = PieceTypes.King.canMoveTo(originalPoint, nextPoint);
        should.exist(result);
        result.should.equal(true);
    });

    mocha.it('King Can Move To Left', function(){
        let originalPoint = new BoardPoint('E', 4);
        let nextPoint = new BoardPoint('D', 4);
        let result = PieceTypes.King.canMoveTo(originalPoint, nextPoint);
        should.exist(result);
        result.should.equal(true);
    });

    mocha.it('King Can Move To Right', function(){
        let originalPoint = new BoardPoint('E', 4);
        let nextPoint = new BoardPoint('F', 4);
        let result = PieceTypes.King.canMoveTo(originalPoint, nextPoint);
        should.exist(result);
        result.should.equal(true);
    });

    mocha.it('King Can Move Diagonally Forward Right', function(){
        let originalPoint = new BoardPoint('E', 4);
        let nextPoint = new BoardPoint('F', 5);
        let result = PieceTypes.King.canMoveTo(originalPoint, nextPoint);
        should.exist(result);
        result.should.equal(true);
    });

    
    mocha.it('King Can Move Diagonally Forward Left', function(){
        let originalPoint = new BoardPoint('E', 4);
        let nextPoint = new BoardPoint('D', 5);
        let result = PieceTypes.King.canMoveTo(originalPoint, nextPoint);
        should.exist(result);
        result.should.equal(true);
    });

    
    mocha.it('King Can Move Diagonally Backward Right', function(){
        let originalPoint = new BoardPoint('E', 4);
        let nextPoint = new BoardPoint('F', 3);
        let result = PieceTypes.King.canMoveTo(originalPoint, nextPoint);
        should.exist(result);
        result.should.equal(true);
    });

    
    mocha.it('King Can Move Diagonally Backward Left', function(){
        let originalPoint = new BoardPoint('E', 4);
        let nextPoint = new BoardPoint('D', 3);
        let result = PieceTypes.King.canMoveTo(originalPoint, nextPoint);
        should.exist(result);
        result.should.equal(true);
    });

})