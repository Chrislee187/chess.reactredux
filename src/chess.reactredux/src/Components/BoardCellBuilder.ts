export class BoardCellBuilder {
    private pieceIsWhite: boolean = true;
    private isEmptySquare: boolean = false;
    private isSourceLocation: boolean = true;
    private isDestinationLocation: boolean = false;
    private piece: string = "P";
    public build(): any {
        return {
            props: {
                Piece: this.pieceIsWhite ? this.piece.toUpperCase(): this.piece.toLowerCase(),
                PieceIsWhite: this.pieceIsWhite,
                IsEmptySquare: this.isEmptySquare,
                IsSourceLocation: this.isSourceLocation,
                IsDestinationLocation: this.isDestinationLocation
            }
        };
    }
    public withBlackPiece(): BoardCellBuilder {
        this.pieceIsWhite = false;
        return this;
    }
    public withWhitePiece(): BoardCellBuilder {
        this.pieceIsWhite = true;
        return this;
    }

    public withEmptyCell(): BoardCellBuilder {
        this.isEmptySquare = true;
        this.pieceIsWhite = false;
        this.piece = '.';
        return this;
    }

    public withDestinationLocation(): BoardCellBuilder {
        this.isDestinationLocation = true;
        return this;
    }
}
