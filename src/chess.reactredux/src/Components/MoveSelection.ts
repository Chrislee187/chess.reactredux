import MoveSelectionCellsManager from './MoveSelectionCellsManager'

export default class MoveSelection {
    private fromField:string = "";
    private toField:string = "";

    constructor(
        private cellsManager:MoveSelectionCellsManager
        ) {

    }

    public selected(location:string, availableMoves:string[], whiteToPlay:boolean):void {
        let selectedCell = this.cellsManager.get(location);

        if(!selectedCell) return;

        if(this.fromField === "" ) {
            if(this.cellsManager.containsPlayerPiece(location,whiteToPlay)){
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

            if (!this.cellsManager.cellIsEmpty(destCell.props) 
                && this.cellsManager.pieceIsWhite(destCell.props) === this.cellsManager.pieceIsWhite(this.cellsManager.get(this.from).props))
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
}