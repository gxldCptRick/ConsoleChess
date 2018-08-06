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
                this.drawPawn(color, location.x, location.y);
                break;
            case 'Rook':
                this.drawRook(color, location.x, location.y);
                break;
            case 'Knight':
                this.drawKnight(color, location.x, location.y);
                break;
            case 'Bishop':
                this.drawBishop(color, location.x, location.y);
                break;
            case 'Queen':
                this.drawQueen(color, location.x, location.y);
                break; 
            case 'King':
                this.drawKing(color, location.x, location.y);
                break;
            default:
            throw new Error('Not A Valid Piece Type');
        }
    }

    drawRook(xPoint, yPoint, color){
        let ctx = this.canvas.getContext('2d');
        ctx.drawImage(this.piecesImage, 
            PiecePointsX.rookX, 
            color === 'white'? PiecePointsY.white.standard : PiecePointsY.black.standard, 
        imageDimensions.x, imageDimensions.y, 
        xPoint, yPoint, 
        projectedDimensions.x, projectedDimensions.y);

    }

    drawBishop(xPoint, yPoint, color){
        let ctx = this.canvas.getContext('2d');
        ctx.drawImage(this.piecesImage, 
            PiecePointsX.bishopX, 
            color === 'white'? PiecePointsY.white.standard : PiecePointsY.black.standard, 
        imageDimensions.x, imageDimensions.y, 
        xPoint, yPoint, 
        projectedDimensions.x, projectedDimensions.y);
    }

    drawKnight(xPoint, yPoint, color){
        let ctx = this.canvas.getContext('2d');
        ctx.drawImage(this.piecesImage, 
            PiecePointsX.knightRightX, 
            color === 'white'? PiecePointsY.white.standard : PiecePointsY.black.standard, 
        imageDimensions.x, imageDimensions.y, 
        xPoint, yPoint, 
        projectedDimensions.x, projectedDimensions.y);
    }

    drawKing(xPoint, yPoint, color){
        let ctx = this.canvas.getContext('2d');
        ctx.drawImage(this.piecesImage, 
            PiecePointsX.kingX, 
            color === 'white'? PiecePointsY.white.standard : PiecePointsY.black.standard, 
        imageDimensions.x, imageDimensions.y, 
        xPoint, yPoint, 
        projectedDimensions.x, projectedDimensions.y);
    }

    drawQueen(xPoint, yPoint, color){
        let ctx = this.canvas.getContext('2d');
        ctx.drawImage(this.piecesImage, 
            PiecePointsX.queenX, 
            color === 'white'? PiecePointsY.white.standard : PiecePointsY.black.standard, 
        imageDimensions.x, imageDimensions.y, 
        xPoint, yPoint, 
        projectedDimensions.x, projectedDimensions.y);
    }

    drawPawn(xPoint, yPoint, color){
        let ctx = this.canvas.getContext('2d');
        ctx.drawImage(this.piecesImage, 
            PiecePointsX.pawnX, 
            color === 'white'? PiecePointsY.white.pawn : PiecePointsY.black.pawn, 
        imageDimensions.x, imageDimensions.y, 
        xPoint, yPoint, 
        projectedDimensions.x, projectedDimensions.y);
    }
}