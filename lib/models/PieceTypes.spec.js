import mocha  from 'mocha';
import chai from 'chai';
import { PieceTypes } from './PieceTypes' 
import  BoardPoint  from './BoardPoint';
const should = chai.should();

mocha.describe('Generic PieceTypes Can Capture', function(){
    mocha.it('Should Allow Capture for most pieces by using the Same Movement Rook', function(){
        let originalPoint = new BoardPoint('a', 1);
        let nextPoint = new BoardPoint('a', 5);
        let canCapture = PieceTypes.Rook.canCapture(originalPoint, nextPoint);
        let canMoveTo = PieceTypes.Rook.canMoveTo(originalPoint, nextPoint);
        should.exist(canCapture);
        should.exist(canMoveTo);
        canCapture.should.equal(canMoveTo);
    });

    mocha.it('Should Allow Capture for most pieces by using the Same Movement Queen', function(){
        let originalPoint = new BoardPoint('a', 1);
        let nextPoint = new BoardPoint('a', 5);
        let canCapture = PieceTypes.Queen.canCapture(originalPoint, nextPoint);
        let canMoveTo = PieceTypes.Queen.canMoveTo(originalPoint, nextPoint);
        should.exist(canCapture);
        should.exist(canMoveTo);
        canCapture.should.equal(canMoveTo);
    });

    mocha.it("Should not allow capture for pieces outside of movement pattern King", function(){
        let originalPoint = new BoardPoint('a', 1);
        let nextPoint = new BoardPoint('a', 5);
        let canCapture = PieceTypes.King.canCapture(originalPoint, nextPoint);
        let canMoveTo = PieceTypes.King.canMoveTo(originalPoint, nextPoint);
        should.exist(canCapture);
        should.exist(canMoveTo);
        canCapture.should.equal(canMoveTo);
    });
});