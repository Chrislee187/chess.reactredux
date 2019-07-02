import React from 'react';
import ChessBoard from './ChessBoard';
import AvailableMoveList from './AvailableMoveList';
import './chessboard.css'
const ReactChess: React.FC = () => {
    const debug = 
        <div className="debug-settings">
            White is human<input type="checkbox" id="WhiteIsHuman" 
                                onChange={() => console.log('todo')}/> | 
            Black is human<input type="checkbox" id="BlackIsHuman" 
                                onChange={() => console.log('todo')}/> | 
        </div>;

    const chessboard =
        <ChessBoard 
                Board="rnbqkbnrpppppppp................................PPPPPPPPRNBQKBNR"
                // OnMoveSelectedAsync="@OnMoveSelectedAsync"
        ></ChessBoard>;

    const movelist =
        <AvailableMoveList 
                    // ref="MoveList" 
                    // OnMoveSelectedAsync="@OnMoveSelectedAsync"
        ></AvailableMoveList>;                
    return (
        <div>
            <link href="chessboard.css" rel="stylesheet" />
            <div className="row">
                {debug}
                {chessboard}
                {movelist}
            </div>
        </div>
    // <button onclick="@(async () => await ResetBoardAsync())">Reset Board</button>    // <div className="App">
  );
}

export default ReactChess;
