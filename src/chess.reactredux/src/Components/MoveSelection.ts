import MoveSelectionCellsManager from './MoveSelectionCellsManager'

export default class MoveSelection {
    private fromField:string = "";
    private toField:string = "";

    constructor(private cells:any) {
        
    }
    public selected(location:string, availableMoves:string[], whiteToPlay:boolean):void {
        let selectedCell = this.getCell(location);

        if(!selectedCell) return;

        if(this.fromField === "" ) {
            if(this.containsPlayerPiece(location,whiteToPlay)){
                this.fromField = location;
            }
            else
            {
                return;
            }
        }
        else{
            if (location === this.from)
            {
                this.deselect();
                return;
            }

            var destCell = selectedCell;

            if (!this.cellIsEmpty(destCell.props) 
                && this.pieceIsWhite(destCell.props) === this.pieceIsWhite(this.getCell(this.from).props))
            {
                this.fromField = location;
            }
            else if (!destCell.props.IsDestinationLocation)
            {
                return;
            }
            else
            {
                this.toField = location;
            }            
        }

        this.possibleDestinationsField= availableMoves
            .filter((e) => e.startsWith(this.from))
            .map(e => e.substr(2,2))
    }
    private possibleDestinationsField:string[] = [];
 
    public get possibleDestinations(): string[] {
        return this.possibleDestinationsField;
    }

    public get haveMove(): boolean {
        return this.fromField !== "" && this.toField !== "";
    }

    public get move(): string {
        return `${this.from}${this.to}`;
    }

    public get from(): string {
        return this.fromField;
    }
    
    public get to(): string {
        return this.toField;
    }

    public deselect(): void
    {
        this.fromField = "";
        this.toField = "";
        this.possibleDestinationsField = [];
    }

    public getCell(location:string):any  {
        return this.cells[location];
    }

    private containsPlayerPiece(location:string, playerIsWhite:boolean) {
        let cell = this.getCell(location);

        if(!cell) return false;
        if(this.cellIsEmpty(cell.props)) return false;

        return playerIsWhite === this.pieceIsWhite(cell.props);
    }


    private  cellIsEmpty(props:any) {
        return !props && props.Piece === ' ' || props.Piece === '.'
    }
    private  pieceIsWhite(props:any) {
        return !this.cellIsEmpty(props) && props.Piece.toUpperCase() === props.Piece;
    }    
}