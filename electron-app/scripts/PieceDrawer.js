import {PiecePointsX, PiecePointsY, imageDimensions, projectedDimensions} from '../scripts/PieceLocations'; 

export default class PieceDrawer{
    constructor(piecesImage, canvas){
        this.piecesImage = piecesImage;
        this.canvas = canvas;
    }

    drawPiece(pieceToDraw, location){
        let color = pieceToDraw.color;
        let type = pieceToDraw.type.name;
        switch(type){
            case 'Pawn':
                this.drawPawn(location.x, location.y, color);
                break;
            case 'Rook':
                this.drawRook(location.x, location.y, color);
                break;
            case 'Knight':
                this.drawKnight(location.x, location.y, color);
                break;
            case 'Bishop':
                this.drawBishop(location.x, location.y, color);
                break;
            case 'Queen':
                this.drawQueen(location.x, location.y, color);
                break; 
            case 'King':
                this.drawKing(location.x, location.y, color);
                break;
            default:
            throw new Error('Not A Valid Piece Type');
        }
    }

    drawRook(xPoint, yPoint, color){
        let imageX = PiecePointsX.rookX;
        let imageY = color === 'White' ? PiecePointsY.white.standard : PiecePointsY.black.standard;
        this.drawSpecifiedPiece(xPoint, yPoint, imageX, imageY);
    }

    drawBishop(xPoint, yPoint, color){
        let imageX = PiecePointsX.bishopX;
        let imageY = color === 'White' ? PiecePointsY.white.standard : PiecePointsY.black.standard;
        this.drawSpecifiedPiece(xPoint, yPoint, imageX, imageY);
    }

    drawKnight(xPoint, yPoint, color){
        let imageX = PiecePointsX.knightLeftX;
        let imageY = color === 'White' ? PiecePointsY.white.standard : PiecePointsY.black.leftKnight;
        this.drawSpecifiedPiece(xPoint, yPoint, imageX, imageY);
    }

    drawKing(xPoint, yPoint, color){
        let imageX = PiecePointsX.kingX;
        let imageY = color === 'White' ? PiecePointsY.white.standard : PiecePointsY.black.standard;
        this.drawSpecifiedPiece(xPoint, yPoint, imageX, imageY);
    }

    drawQueen(xPoint, yPoint, color){
        let imageX = PiecePointsX.queenX;
        let imageY = color === 'White' ? PiecePointsY.white.standard : PiecePointsY.black.standard;
        this.drawSpecifiedPiece(xPoint, yPoint, imageX, imageY);
    }

    drawPawn(xPoint, yPoint, color){
        let imageX = PiecePointsX.pawnX;
        let imageY = color === "White"?  PiecePointsY.white.pawn : PiecePointsY.black.pawn;
        this.drawSpecifiedPiece(xPoint, yPoint, imageX, imageY);
    }

    drawSpecifiedPiece(xPoint, yPoint, imageX, imageY){
        let ctx = this.canvas.getContext('2d');
        ctx.drawImage(this.piecesImage, 
            imageX, 
            imageY, 
            imageDimensions.width, 
            imageDimensions.height, 
            xPoint, 
            yPoint, 
            projectedDimensions.width, 
            projectedDimensions.height);
    }
}