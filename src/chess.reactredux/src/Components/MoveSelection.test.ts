import MoveSelection from './MoveSelection'
import { BoardCellBuilder } from './BoardCellBuilder';

describe('initial state is correct', () => {

    let moveSelection:MoveSelection;
    beforeAll(() => {
        moveSelection = new MoveSelection({});
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
    let anyLocation ="d2";
    let anyDestination ="d4";
    let anyMoves:any = [];
    let whiteToPlay = true;
    let blackToPlay = false;
    let cells:any = {};
    beforeEach(() => {
        moveSelection = new MoveSelection(cells);
        cells[anyLocation] = new BoardCellBuilder().build();
    });

    test('invalid location is ignored', () => {

        moveSelection.selected(anyLocation, anyMoves, false);

        expect(moveSelection.from).toBe("");
        expect(moveSelection.possibleDestinations.length).toBe(0);
    });

    test('valid source location highlights from and to', () => {

        let location = "d2";
        let availableMoves = [ `${location}d3`, `${location}d4`];

        moveSelection.selected(anyLocation, availableMoves, whiteToPlay);

        expect(moveSelection.from).toBe(anyLocation);
        expect(moveSelection.possibleDestinations).toHaveLength(2);
    });

    test('source location that does not contain piece of right colour is ignored', () => {
        let location = "d2";
        let availableMoves = [ `${location}d3`, `${location}d4`];
        cells[location] = new BoardCellBuilder().withBlackPiece().build();
        moveSelection.selected(location, availableMoves, whiteToPlay);

        expect(moveSelection.from).toBe("");
        expect(moveSelection.possibleDestinations.length).toBe(0);

    });

    test('reselect same location deselects location', () => {
        let location = "d2";
        let availableMoves:string[] = [ ];

        moveSelection.selected(location, availableMoves, whiteToPlay);
        moveSelection.selected(location, availableMoves, whiteToPlay);

        expect(moveSelection.from).toBe("");
        expect(moveSelection.possibleDestinations.length).toBe(0);
    });

    test('selecting new location of correct piece colour update from', () => {
        let location = "d2";
        let location2 = "e2";
        let availableMoves:string[] = [ ];

        moveSelection.selected(location, availableMoves, whiteToPlay);
        cells[location2] = new BoardCellBuilder().build();
        moveSelection.selected(location2, availableMoves, whiteToPlay);

        expect(moveSelection.from).toBe(location2);
    });

    test('selecting invalid destination location is ignored', () => {
        let location = "d2";
        let destination = "a2";
        let availableMoves:string[] = [ ];

        cells[location] = new BoardCellBuilder().build();
        moveSelection.selected(location, availableMoves, whiteToPlay);
        
        cells[destination] = new BoardCellBuilder()
            .withEmptyCell()
            .build();

        moveSelection.selected(destination, availableMoves, whiteToPlay);

        expect(moveSelection.from).toBe(location);
        expect(moveSelection.to).toBe("");
    });

    test('selecting a valid destination, sets To and Move', () => {
        let availableMoves:string[] = [ ];
        moveSelection.selected(anyLocation, availableMoves, whiteToPlay);
        
        cells[anyDestination] = new BoardCellBuilder()
            .withEmptyCell()
            .withDestinationLocation(true)
            .build();
        moveSelection.selected(anyDestination, availableMoves, whiteToPlay);

        expect(moveSelection.from).toBe(anyLocation);
        expect(moveSelection.to).toBe(anyDestination);
        expect(moveSelection.move).toBe(`${anyLocation}${anyDestination}`);
    });

});


