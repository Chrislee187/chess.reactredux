import React from 'react'
import classNames from 'classnames'

interface BoardCellProps {
    IsBlackSquare: boolean
    Piece: string
}

const BoardCell: React.FC<BoardCellProps> = (props) => {
    let classes = classNames({
        'board-cell': true,
        'black-cell': props.IsBlackSquare,
        'white-cell': !props.IsBlackSquare,
    });
    
    
        // @(IsEmptySquare ? "" : PieceIsWhite ? "white-piece-highlight": "black-piece-highlight") 
        // @(IsDestinationLocation ? "destination-location": "")  
        // @(IsSourceLocation ? "source-location": "") " 
        // onclick="@OnClick" 
        //* @Piece
    return (
        <td className={classes}>
            {props.Piece}
        </td>
    );
}

export default BoardCell;