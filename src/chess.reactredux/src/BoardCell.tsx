import React, { useState } from 'react'
import classNames from 'classnames'

interface BoardCellProps {
    IsBlackSquare: boolean
    Piece: string,
    X: number,
    Y: number
}

const BoardCell: React.FC<BoardCellProps> = (props) => {
    let piece: string = props.Piece || '.';

    let pieceIsWhite = piece.toUpperCase() === piece;

    if(piece.toLowerCase() === 'e' ) {
        piece = pieceIsWhite ? 'P' : 'p';
    } 

    let currentSquareIsEmpty = (piece === '.' || piece ===' ');

    const [isSourceLocation, sourceLocationSelected] = useState(false);
    const [isDestinationLocation, destinationLocationSelected] = useState(false);

    let classes = classNames({
        'board-cell': true,
        'black-cell': props.IsBlackSquare,
        'white-cell': !props.IsBlackSquare,
        'white-piece-highlight' : !currentSquareIsEmpty && pieceIsWhite,
        'black-piece-highlight' : !currentSquareIsEmpty && !pieceIsWhite,
        'source-location' : isSourceLocation,
        'destination-location' : isDestinationLocation,
    });

    function onClick(e:React.MouseEvent<HTMLElement>) {
        // @(IsDestinationLocation ? "destination-location": "")  
        // @(IsSourceLocation ? "source-location": "") " 

        console.log('Board clicked at ' + props.X + ',' + props.Y);
        sourceLocationSelected(!isSourceLocation);
    }

    return (
        <td className={classes} onClick={onClick}>
            {piece}
        </td>
    );
}

export default BoardCell;