import MoveSelectionCellsManager from "./MoveSelectionCellsManager";


describe('ContainsPlayerPiece', () => {
    let cells:any = {};
    let manager:MoveSelectionCellsManager;
    let anyLocation = "d2";
    let whiteToPlay = true;
    let blackToPlay = false;
    beforeEach(() => {
        manager = new MoveSelectionCellsManager(cells);
    });

    test('returns false when empty', () => {

        cells[anyLocation] = null;

        var contains = manager.containsPlayerPiece(anyLocation, true);
        expect(contains).toBeFalsy();
    });

    test('returns false when piece is white but player is black', () => {

        cells[anyLocation] = new BoardCellBuilder().withWhitePiece().build();

        var contains = manager.containsPlayerPiece(anyLocation, blackToPlay);
        expect(contains).toBeFalsy();
    });


    test('returns false when piece is black but player is white', () => {

        cells[anyLocation] = new BoardCellBuilder().withBlackPiece().build();

        var contains = manager.containsPlayerPiece(anyLocation, whiteToPlay);
        expect(contains).toBeFalsy();
    });

    test('returns true when piece is of correct colour', () => {
        cells[anyLocation] = new BoardCellBuilder().withWhitePiece().build();

        var contains = manager.containsPlayerPiece(anyLocation, whiteToPlay);
        expect(contains).toBeTruthy();

    });
});

class BoardCellPropsBuilder {
    private pieceIsWhite:boolean = true;
    private isEmptySquare:boolean = false;
    private isSourceLocation:boolean = true;
    private isDestinationLocation:boolean = false;
    public build(): any {
        return {
            PieceIsWhite: this.pieceIsWhite,
            IsEmptySquare: this.isEmptySquare,
            IsSourceLocation: this.isSourceLocation,
            IsDestinationLocation: this.isDestinationLocation
        }
    }

    public withBlackPiece():BoardCellPropsBuilder {
        this.pieceIsWhite = false;
        return this;
    }
    public withWhitePiece():BoardCellPropsBuilder {
        this.pieceIsWhite = true;
        return this;
    }
}
