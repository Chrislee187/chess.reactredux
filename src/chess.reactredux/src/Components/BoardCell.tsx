import React from 'react'
import classNames from 'classnames'

type Props = {
    WhiteToPlay: boolean,
    IsBlackSquare: boolean,
    Piece: string,
    X: number,
    Y: number,
    onCellClicked(x:number, y:number, piece:string):void,
    IsSourceLocation?:boolean,
    IsDestinationLocation?:boolean,
};

export default class BoardCell extends React.Component<Props, any> {

    constructor(props:Props) {
        super(props);
        this.onClick =this.onClick.bind(this);
    }

    private onClick(e:React.MouseEvent<HTMLElement>) {
        e.preventDefault();
        if(this.props.onCellClicked) {
            this.props.onCellClicked(this.props.X,this.props.Y,this.props.Piece);
        }
    }
    
    public render() {
        let piece: string = this.props.Piece || '.';
        let pieceIsWhite = piece.toUpperCase() === piece;

        if(piece.toLowerCase() === 'e' ) {
            piece = pieceIsWhite ? 'P' : 'p';
        }         
        let currentSquareIsEmpty = (piece === '.' || piece ===' ');


        let classes = classNames({
            'board-cell': true,
            'black-cell': this.props.IsBlackSquare,
            'white-cell': !this.props.IsBlackSquare,
            'white-piece-highlight' : !currentSquareIsEmpty && pieceIsWhite,
            'black-piece-highlight' : !currentSquareIsEmpty && !pieceIsWhite,
            'source-location' : this.props.IsSourceLocation,
            'destination-location' : this.props.IsDestinationLocation,
        });

        return(
            <td className={classes} onClick={this.onClick}>
                {piece}
            </td>
        );
    }

}
