export default class MoveSelectionCellsManager {
    constructor(
        public cells:any
        ) {
    }

    public get(location:string):any  {
        return this.cells[location];
    }

    public containsPlayerPiece(location:string, playerIsWhite:boolean) {
        let cell = this.cells[location];

        if(this.cellIsEmpty(cell.props)) return false;

        return playerIsWhite === this.pieceIsWhite(cell.props);
    }


    public cellIsEmpty(props:any) {
        return !props && props.Piece === ' ' || props.Piece === '.'
    }
    public pieceIsWhite(props:any) {
        return props && props.Piece.toUpperCase() === props.Piece;
    }
}