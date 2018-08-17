import mocha from 'mocha';
import chai from 'chai';
import { PieceTypes } from '../PieceTypes'; 
import BoardPoint from '../BoardPoint';

const should = chai.should();

mocha.describe('Pawn Moves Correctly', function(){
    mocha.it('Pawn Can Move Two Places Forward', function(){
        let originalPoint = new BoardPoint('E', 4);
        let nextPoint = new BoardPoint('E', 6);
        let result = PieceTypes.Pawn.canMoveTo(originalPoint, nextPoint, 'White');
        should.exist(result);
        result.should.equal(true);
    });
    
    mocha.it("Pawn Can't Move Three Spaces", function(){
        let originalPoint = new BoardPoint('E', 4);
        let nextPoint = new BoardPoint('E', 7);
        let result = PieceTypes.Pawn.canMoveTo(originalPoint, nextPoint);
        should.exist(result);
        result.should.not.equal(true);
    });

    mocha.it("Pawn Can't Move Diagonally Forward Right", function(){
        let originalPoint = new BoardPoint('E', 4);
        let nextPoint = new BoardPoint('F', 5);
        let result = PieceTypes.Pawn.canMoveTo(originalPoint, nextPoint);
        should.exist(result);
        result.should.not.equal(true);
    });

    mocha.it("Pawn Can't Move Diagonally Backward Right", function(){
        let originalPoint = new BoardPoint('E', 4);
        let nextPoint = new BoardPoint('F', 3);
        let result = PieceTypes.Pawn.canMoveTo(originalPoint, nextPoint);
        should.exist(result);
        result.should.not.equal(true);
    });

    mocha.it("Pawn Can't Move Diagonally Forward Left", function(){
        let originalPoint = new BoardPoint('E', 4);
        let nextPoint = new BoardPoint('D', 5);
        let result = PieceTypes.Pawn.canMoveTo(originalPoint, nextPoint);
        should.exist(result);
        result.should.not.equal(true);
    });

    mocha.it("Pawn Can't Move Diagonally Backward Left", function(){
        let originalPoint = new BoardPoint('E', 4);
        let nextPoint = new BoardPoint('D', 3);
        let result = PieceTypes.Pawn.canMoveTo(originalPoint, nextPoint);
        should.exist(result);
        result.should.not.equal(true);
    });

    mocha.it("Pawn Can't Move To The Left", function(){
        let originalPoint = new BoardPoint('E', 4);
        let nextPoint = new BoardPoint('D', 4);
        let result = PieceTypes.Pawn.canMoveTo(originalPoint, nextPoint);
        should.exist(result);
        result.should.not.equal(true);
    });

    mocha.it("Pawn Can't Move To The Right", function(){
        let originalPoint = new BoardPoint('E', 4);
        let nextPoint = new BoardPoint('F', 4);
        let result = PieceTypes.Pawn.canMoveTo(originalPoint, nextPoint);
        should.exist(result);
        result.should.not.equal(true);
    });

    mocha.it("Pawn Can Move Forward By One Step", function(){
        let originalPoint = new BoardPoint('E', 4);
        let nextPoint = new BoardPoint('E', 5);
        let result = PieceTypes.Pawn.canMoveTo(originalPoint, nextPoint, 'White');
        should.exist(result);
        result.should.equal(true);
    });

    mocha.it("Pawn Can't Move to Same Space that it is currently on", function(){
        let originalPoint = new BoardPoint('E', 4);
        let nextPoint = new BoardPoint('E', 4);
        let result = PieceTypes.Pawn.canMoveTo(originalPoint, nextPoint, 'White');
        should.exist(result);
        result.should.not.equal(true);
    });
});

mocha.describe('Pawn Capture Works As Expected', function(){
    mocha.it('Should Be able to capture A Piece at a forward left position', function(){
        let originalPoint = new BoardPoint(4, 4);
        let nextPoint = new BoardPoint(3, 5);
        let result = PieceTypes.Pawn.canCapture(originalPoint, nextPoint, 'White');
        should.exist(result);
        result.should.equal(true);
    });

    mocha.it('Should be able to capture a Piece at a forward right position', function(){
        let originalPoint = new BoardPoint(4, 4);
        let nextPoint = new BoardPoint(5, 5);
        let result = PieceTypes.Pawn.canCapture(originalPoint, nextPoint, 'White');
        should.exist(result);
        result.should.equal(true);
    });

    mocha.it('Should Not Be able to take a piece that is directly in front of it god', function(){
        let originalPoint = new BoardPoint('a', 4);
        let nextPoint = new BoardPoint('a',5);
        let result = PieceTypes.Pawn.canCapture(originalPoint, nextPoint);
        should.exist(result);
        result.should.not.equal(true);
    });
});