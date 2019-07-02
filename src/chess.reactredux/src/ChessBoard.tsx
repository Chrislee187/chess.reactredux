import React from 'react'
import BoardBorderRow from './BoardBorderRow'
import BoardCell from './BoardCell'

interface ChessBoardProps {
    Board: string
}

const ChessBoard: React.FC<ChessBoardProps> = (props) => {
    let black:boolean = false;

    let board:string = props.Board;

    function renderRow(rowIdx:number):any
    {
        let cells:any = [];

        for(let x = 1; x <= 8; x++) {
            cells.push(<BoardCell key={x + ',' + rowIdx} 
                IsBlackSquare={black}
                Piece = {board[((8 - rowIdx) * 8) + x - 1]}
                // @ref="BoardCell"
                // X="@x" Y="@y"
                // piece="@Piece(x,y)" 
                // OnPieceSelected="PieceSelectedAsync"
                />);
            black = !black;
        }
            


        return (
            <tr>
                <td className="board-border">{rowIdx}</td>
                {cells}
                <td className="board-border">{rowIdx}</td>
            </tr>
        );
    };

    function renderRows() {
        var rows:any = [];
        black = false;
        for (let y = 8; y >= 1; y--)
        {
            rows.push(renderRow(y));
            black = !black;
        }

        return rows;
    }
    
    return (
        <div className="chessboard">
            <table className="@(WhiteToPlay ? 'white-to-play' : 'black-to-play')">
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

            <div className="messsage"></div>
            <div className ="debug"></div>
        </div>
    );
};

export default ChessBoard;