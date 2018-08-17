import mocha  from 'mocha';
import chai from 'chai';
import { ChessPiece, PieceColor } from './ChessPiece'
import { PieceTypes } from './PieceTypes' 
import  BoardPoint  from './BoardPoint';
const should = chai.should();

mocha.describe('Chess Pieces canCapture works Correctly', function(){
    mocha.it('Should Capture Pieces of a different color', function(){
        let firstPiece = new ChessPiece(PieceColor.White, PieceTypes.Rook);
        firstPiece.setPosition(new BoardPoint('a', 1));
        let secondPiece = new ChessPiece(PieceColor.Black, PieceTypes.Knight);
        secondPiece.setPosition(new BoardPoint('a', 5));
        let result = firstPiece.canCapture(secondPiece);
        should.exist(result);
        result.should.equal(true);
    });

    mocha.it('Pawn Able To Take Point on upper left', function(){
        let firstPiece = new ChessPiece(PieceColor.White, PieceTypes.Pawn);
        firstPiece.setPosition(new BoardPoint(4, 4));
        let secondPiece = new ChessPiece(PieceColor.Black, PieceTypes.Pawn);
        secondPiece.setPosition(new BoardPoint(3, 5));
        let result = firstPiece.canCapture(secondPiece);
        should.exist(result);
        result.should.equal(true);
    });

    mocha.it('Pawn Able To Take Point on upper left of board', function(){
        let firstPiece = new ChessPiece(PieceColor.White, PieceTypes.Pawn);
        firstPiece.setPosition(new BoardPoint(6, 4));
        let secondPiece = new ChessPiece(PieceColor.Black, PieceTypes.Pawn);
        secondPiece.setPosition(new BoardPoint(5, 5));
        let result = firstPiece.canCapture(secondPiece);
        should.exist(result);
        result.should.equal(true);
    });

    mocha.it('King Able To Take Person In His Movement Path', function() {
        let firstPiece = new ChessPiece(PieceColor.White, PieceTypes.King);
        firstPiece.setPosition(new BoardPoint(4, 4));
        let secondPiece = new ChessPiece(PieceColor.Black, PieceTypes.Knight);
        secondPiece.setPosition(new BoardPoint(4, 5));
        let result = firstPiece.canCapture(secondPiece);
        should.exist(result);
        result.should.equal(true);
    });
});