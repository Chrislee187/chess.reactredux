import React from 'react'
import './chessboard.css'
import BoardBorderRow from './BoardBorderRow'
import BoardCell from './BoardCell'
import classNames from 'classnames'


interface ChessBoardProps {
    Board: string | undefined,
    WhiteToPlay: boolean | undefined
}

const ChessBoard: React.FC<ChessBoardProps> = (props) => {
    let board:string | undefined = props.Board;
    let blackCell:boolean = false;

    let classes = classNames({
        'white-to-play': props.WhiteToPlay,
        'black-to-play': !props.WhiteToPlay,
    })

    function renderRow(rowIdx:number):any
    {
        if(board === undefined) return null;
        let cells:any = [];

        for(let x = 1; x <= 8; x++) {
            cells.push(
            <BoardCell key={x + ',' + rowIdx} 
                IsBlackSquare={blackCell}
                Piece = {board[((8 - rowIdx) * 8) + x - 1]}
                X = {x}
                Y = {rowIdx}
                // OnPieceSelected="PieceSelectedAsync"
                />);
            blackCell = !blackCell;
        }
            
        return (
            <tr key={rowIdx}>
                <td className="board-border">{rowIdx}</td>
                {cells}
                <td className="board-border">{rowIdx}</td>
            </tr>
        );
    };

    function renderRows() {
        var rows:any = [];
        blackCell = false;
        for (let y = 8; y >= 1; y--)
        {
            rows.push(renderRow(y));
            blackCell = !blackCell;
        }

        return rows;
    }
    
    return (
        <div className="chessboard">
            <table className={classes}>
                <thead>
                    <BoardBorderRow />
                </thead>
                <tbody>
                {renderRows()}
                </tbody>
                <tfoot>
                    <BoardBorderRow />
                </tfoot>
            </table>

            <div className="message"></div>
            <div className ="debug"></div>
        </div>
    );
};

export default ChessBoard;