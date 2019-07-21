import React from 'react';
import './App.css';
import ReactChess from './ReactChess';

const App: React.FC = (props:any) => {
  let board:string = props.match.params.board;

  if(board) {
    board = board.replace(/_/g,'.');
  }
  return (
    <div>
    <ReactChess board={board}></ReactChess>
    </div>
  );
}

export default App;
