import React from 'react';
import ChessBoard from './ChessBoard';
import AvailableMoveList from './AvailableMoveList';
import Checkbox from './Checkbox'

export default class ReactChess extends React.Component {
    state = {
        board: '',
        whiteIsHuman: true,
        blackIsHuman: false,
        whiteToPlay: false,
        blackToPlay: false
    };

    componentDidMount() {
        fetch("https://chess-web-api.azurewebsites.net/api/chessgame")
        // fetch("https://chess-web-api.azurewebsites.net/api/chessgame/rnbqkbnrpppppppp................................PPPPPPPPRNBQKBNRW0000/d4")
        .then(response => response.json())
        .then(json2 => {
            console.log("UPDATING");
            this.setState({
                board: json2.board, 
                whiteToPlay: json2.whoseTurn.toLowerCase() === "white",
                blackToPlay: json2.whoseTurn.toLowerCase() === "black"
            })
            return json2;
        });
    }
    render() {
        
        const chessboard =
        <ChessBoard Board={this.state.board} WhiteToPlay={this.state.whiteToPlay}
                // OnMoveSelectedAsync="@OnMoveSelectedAsync"
        ></ChessBoard>;
        let handleWhiteChange = (event:any) => this.setState({ whiteIsHuman: event.target.checked })
        let handleBlackChange = (event:any) => this.setState({ blackIsHuman: event.target.checked })
        return (
            <div>
                <link href="chessboard.css" rel="stylesheet" />
                <div className="row">
                    <div className="debug-settings">
                        
                        White is human<Checkbox id="WhiteIsHuman" checked={this.state.whiteIsHuman}
                                            onChange={handleWhiteChange}/> | 
                        Black is human<Checkbox id="BlackIsHuman"  checked={this.state.blackIsHuman}
                                            onChange={handleBlackChange}/>
                    </div>;
                    {chessboard}
                    <AvailableMoveList></AvailableMoveList>
                </div>
            </div>
        // <button onclick="@(async () => await ResetBoardAsync())">Reset Board</button>    // <div className="App">
      );
    
    }
}
