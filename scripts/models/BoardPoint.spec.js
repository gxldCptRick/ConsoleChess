import mocha from 'mocha';
import chai from 'chai';
import BoardPoint  from './BoardPoint';
chai.should();
mocha.describe("Board Point Values", function(){
    mocha.it("should turn A into 0", function(){
        let pointA = new BoardPoint('A', 0);
        pointA.x.should.equal(0);
    });
    
    mocha.it("should turn a into 0", function(){
        let pointA = new BoardPoint('a', 0);
        pointA.x.should.equal(0);
    });

    mocha.it("should keep 1 as 1", function(){
        let pointA = new BoardPoint(1, 0);
        pointA.x.should.equal(1);
    });

    mocha.it("should return A0 given a 0", function(){
        let pointA = new BoardPoint('a', 0);
        pointA.Point.should.equal("A0");
    });
});