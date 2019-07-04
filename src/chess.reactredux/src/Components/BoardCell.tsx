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

const initialState = {

};
type State = Readonly<typeof initialState>
export default class BoardCell extends React.Component<Props, State> {
    readonly state: State = initialState;

    constructor(props:Props) {
        super(props);
        this.onClick =this.onClick.bind(this);
    }

    public sourceCellHighlight(value:boolean):void{
        this.setState({IsSourceLocation: value})
    }



    onClick(e:React.MouseEvent<HTMLElement>) {
        // @(IsDestinationLocation ? "destination-location": "")  
        // @(IsSourceLocation ? "source-location": "") " 
        e.preventDefault();
        if(this.props.onCellClicked) {
            this.props.onCellClicked(this.props.X,this.props.Y,this.props.Piece);
            // this.sourceCellHighlight(true);
        }
    }
    render() {
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

// const BoardCell: React.FC<BoardCellProps> = (props) => {
//     let piece: string = props.Piece || '.';
//     let pieceIsWhite = piece.toUpperCase() === piece;

//     if(piece.toLowerCase() === 'e' ) {
//         piece = pieceIsWhite ? 'P' : 'p';
//     } 

//     let currentSquareIsEmpty = (piece === '.' || piece ===' ');


//     // props.updateSourceLocation = setAsSourceLocation;

//     let classes = classNames({
//         'board-cell': true,
//         'black-cell': props.IsBlackSquare,
//         'white-cell': !props.IsBlackSquare,
//         'white-piece-highlight' : !currentSquareIsEmpty && pieceIsWhite,
//         'black-piece-highlight' : !currentSquareIsEmpty && !pieceIsWhite,
//         'source-location' : props.IsSourceLocation,
//         'destination-location' : props.IsDestinationLocation,
//     });

//     function onClick(e:React.MouseEvent<HTMLElement>) {
//         // @(IsDestinationLocation ? "destination-location": "")  
//         // @(IsSourceLocation ? "source-location": "") " 

//         if(props.onCellClicked) {
//             props.onCellClicked(props.X, props.Y, props.Piece);

//         }
//     }

//     return (
//         <td className={classes} onClick={onClick}>
//             {piece}
//         </td>
//     );
// }

// export default BoardCell;