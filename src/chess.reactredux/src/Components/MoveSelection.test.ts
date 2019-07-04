import MoveSelection from './MoveSelection'
import { MoveSelectionCellsManagerMocker } from './MoveSelectionCellsManagerMocker';

describe('initial state is correct', () => {

    let moveSelection:MoveSelection;
    beforeAll(() => {
        moveSelection = new MoveSelection(null);
    });

    test('haveMove is false', () => {
        expect(moveSelection.haveMove).toBe(false);
    });
    test('to/from/move are empty', () => {
        expect(moveSelection.to).toBe("");
        expect(moveSelection.from).toBe("");
        expect(moveSelection.move).toBe("");
    });
});

describe('selections', () => {

    let moveSelection:MoveSelection;
    let cellsManagerMock: MoveSelectionCellsManagerMocker;
    let anyLocation ="d2";
    let anyDestination ="d4";
    let anyMoves = [];
    let whiteToPlay = true;
    let blackToPlay = false;

    beforeEach(() => {
        cellsManagerMock = new MoveSelectionCellsManagerMocker();
        moveSelection = new MoveSelection(cellsManagerMock.instance);
    });

    test('invalid location is ignored', () => {

        cellsManagerMock.setupCellManagerGet(undefined);
        moveSelection.selected(anyLocation, anyMoves, null);

        expect(moveSelection.from).toBe("");

        cellsManagerMock.expectNoHighlightingOfSourceCells();
        cellsManagerMock.expectNoHighlightingOfDestinationCells();        
    });

    test('valid source location highlights from and to', () => {

        let location = "d2";
        let availableMoves = [ `${location}d3`, `${location}d4`];

        cellsManagerMock.setupCellManagerContainsPlayerPiece(true);

        moveSelection.selected(anyLocation, availableMoves, whiteToPlay);

        expect(moveSelection.from).toBe(anyLocation);
        cellsManagerMock.expectHighlightingOfSourceCellAt(anyLocation);
        cellsManagerMock.expectHighlightingOfDestinationCellsAt(["d3","d4"])
    });

    test('source location that does not contain piece of right colour is ignored', () => {
        let location = "d2";
        let availableMoves = [ `${location}d3`, `${location}d4`];
        cellsManagerMock.setupCellManagerContainsPlayerPiece(false);

        moveSelection.selected(location, availableMoves, whiteToPlay);

        cellsManagerMock.expectNoHighlightingOfSourceCells();
        cellsManagerMock.expectNoHighlightingOfDestinationCells();

    });

    test('reselect same location deselects location', () => {
        let location = "d2";
        let availableMoves = [ ];

        moveSelection.selected(location, availableMoves, whiteToPlay);
        moveSelection.selected(location, availableMoves, whiteToPlay);

        expect(moveSelection.from).toBe("");
        cellsManagerMock.expectSourceHighlightingCleared();
        cellsManagerMock.expectDestinationHighlightingCleared();
    });

    test('selecting new location of correct piece colour update from', () => {
        let location = "d2";
        let location2 = "e2";
        let availableMoves = [ ];

        moveSelection.selected(location, availableMoves, whiteToPlay);
        moveSelection.selected(location2, availableMoves, whiteToPlay);

        expect(moveSelection.from).toBe(location2);
        cellsManagerMock.expectHighlightingOfSourceCellAt(location2);
        cellsManagerMock.expectHighlightingOfSomeDestinationCells();
    });

    test('selecting invalid desintation location is ignored', () => {
        let location = "d2";
        let destination = "a2";
        let availableMoves = [ ];

        moveSelection.selected(location, availableMoves, whiteToPlay);
        cellsManagerMock.setupCellManagerGet({
            IsEmptySquare: true,
            PieceIsWhite: false,
            IsDestinationLocation: false,
        });
        moveSelection.selected(destination, availableMoves, whiteToPlay);

        expect(moveSelection.from).toBe(location);
        expect(moveSelection.to).toBe("");
    });

    test('selecting a valid destination, sets To and Move', () => {

        let availableMoves = [ ];

        moveSelection.selected(anyLocation, availableMoves, whiteToPlay);
        cellsManagerMock.setupCellManagerGet({
            IsEmptySquare: true,
            PieceIsWhite: false,
            IsDestinationLocation: true,
        });
        moveSelection.selected(anyDestination, availableMoves, whiteToPlay);

        expect(moveSelection.from).toBe(anyLocation);
        expect(moveSelection.to).toBe(anyDestination);
        expect(moveSelection.move).toBe(`${anyLocation}${anyDestination}`);
    });

});


