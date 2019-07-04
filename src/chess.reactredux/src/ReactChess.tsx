import React from 'react';
import ChessBoard from './Components/ChessBoard';
import AvailableMoveList from './Components/AvailableMoveList';
import Checkbox from './Components/Checkbox'

export default class ReactChess extends React.Component {
    state = {
        board: '',
        availableMoves: [],
        whiteIsHuman: true,
        blackIsHuman: false,
        whiteToPlay: false,
        blackToPlay: false
    };

    private lastApiResult:any;

    constructor(props:any) {
        super(props);
        this.onMoveSelected =this.onMoveSelected.bind(this);
    }

    getBoard(board?: string, move?: string) {
        // TODO: Configurise host
        let host = "https://localhost:5001/api/chessgame";
        let url:string = `${host}`;

        if(board) {
            url = `${url}\\${board}`;
        }
        if(move) {
            url = `${url}\\${move}`;
        }

        fetch(url)
        .then(response => response.json())
        .then(json2 => {
            this.lastApiResult = json2;
            this.setState({
                board: json2.board, 
                availableMoves: json2.availableMoves.map( (e:any) => e.coord),
                whiteToPlay: json2.whoseTurn.toLowerCase() === "white",
                blackToPlay: json2.whoseTurn.toLowerCase() === "black"
            })
            return json2;
        });

    }

    onMoveSelected(move: string) {
        this.getBoard(this.lastApiResult.board, move);
    }

    componentDidMount() {
        this.getBoard();
    }
    
    render() {
        const chessboard = (<ChessBoard board={this.state.board} 
            whiteToPlay={this.state.whiteToPlay} 
            availableMoves={this.state.availableMoves}
            onMoveSelected={this.onMoveSelected}
        ></ChessBoard>)
        // let handleWhiteChange = (event:any) => this.setState({ whiteIsHuman: event.target.checked })
        // let handleBlackChange = (event:any) => this.setState({ blackIsHuman: event.target.checked })
        return (
            <div>
                <link href="chessboard.css" rel="stylesheet" />
                <div className="row">
                    {/* <div className="debug-settings">
                        
                        White is human<Checkbox id="WhiteIsHuman" checked={this.state.whiteIsHuman}
                                            onChange={handleWhiteChange}
                                            />
                                             | 
                        Black is human<Checkbox id="BlackIsHuman"  checked={this.state.blackIsHuman}
                                            onChange={handleBlackChange}
                                            />
                    </div> */}
                    {chessboard}
                    <AvailableMoveList></AvailableMoveList>
                </div>
            </div>
            // <button onclick="@(async () => await ResetBoardAsync())">Reset Board</button>    // <div className="App">
        );
    
    }
}
