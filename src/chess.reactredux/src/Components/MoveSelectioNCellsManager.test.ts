import MoveSelectionCellsManager from "./MoveSelectionCellsManager";
import { BoardCellBuilder } from "./BoardCellBuilder";


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


