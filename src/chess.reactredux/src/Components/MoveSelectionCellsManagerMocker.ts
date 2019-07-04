import MoveSelectionCellsManager from './MoveSelectionCellsManager';
import { jsxAttribute } from '@babel/types';
export class MoveSelectionCellsManagerMocker {
    public instance: MoveSelectionCellsManager;
    constructor() {
        this.instance = {
            get: jest.fn(),
            containsPlayerPiece: jest.fn(),
            cells: {},
            cellIsEmpty: jest.fn(),
            pieceIsWhite: jest.fn()
        };
        this.setupCellManagerGet({
            IsEmptySquare: false,
            PieceIsWhite: true,
            IsDestinationLocation: false,
            IsSourceLocation: true,
        });
        this.setupCellManagerContainsPlayerPiece(true);
    }
    public setupCellManagerGet(boardCell: any) {
        (this.instance.get as jest.Mock).mockReturnValue(boardCell);
    }
    public setupCellManagerContainsPlayerPiece(contains: boolean) {
        this.instance.containsPlayerPiece = jest.fn().mockReturnValue(contains);
    }
    public expectNoHighlightingOfSourceCells() {
        expect(true).toBeFalsy()
        // expect((this.instance.highlightSourceCell as jest.Mock).mock.calls.length).toBe(0);
    }
    public expectNoHighlightingOfDestinationCells() {
        expect(true).toBeFalsy()
        // expect((this.instance.highlightDestinationCells as jest.Mock).mock.calls.length).toBe(0);
    }
    public expectHighlightingOfSourceCellAt(location: string) {
        expect(true).toBeFalsy()
        // const functionMock = (this.instance.highlightSourceCell as jest.Mock);
        // let calls = functionMock.mock.calls;
        // let lastCall = calls[calls.length - 1];
        // expect(lastCall[0]).toBe(location);
    }
    public expectHighlightingOfDestinationCellsAt(locations: string[]) {
        expect(true).toBeFalsy()
        // let calls = (this.instance.highlightDestinationCells as jest.Mock).mock.calls;
        // expect(calls.length).toBe(1);
        // expect(Array.isArray(calls[0][0])).toBe(true);
        // expect(calls[0][0].length).toBe(locations.length);
        // let missing = calls[0][0].filter((i: string) => locations.indexOf(i) < 0);
        // expect(missing.length).toBe(0);
    }
    public expectHighlightingOfSomeDestinationCells() {
        expect(true).toBeFalsy()
        // let calls = (this.instance.highlightDestinationCells as jest.Mock).mock.calls;
        // expect(calls.length).toBeGreaterThanOrEqual(1);
    }
    public expectSourceHighlightingCleared() {
        expect(true).toBeFalsy()
        // const functionMock = (this.instance.clearSourceHighlights as jest.Mock);
        // expect(functionMock.mock.calls.length).toBe(1);
    }
    public expectDestinationHighlightingCleared() {
        expect(true).toBeFalsy()
        // const functionMock = (this.instance.clearDestinationHighlights as jest.Mock);
        // expect(functionMock.mock.calls.length).toBe(1);
    }
}
