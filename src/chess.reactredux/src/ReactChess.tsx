import React from 'react';  

import ChessBoard from './Components/ChessBoard';
import AvailableMoveList from './Components/AvailableMoveList';

export type Props = { 
    board?: string, 
};

const initialState = {
    board: '',
    availableMoves: [],
    whiteIsHuman: true,
    blackIsHuman: false,
    whiteToPlay: false,
    blackToPlay: false
}
export type State = Readonly<typeof initialState>

export default class ReactChess extends React.Component<Props, State> {
    readonly state: State = initialState;

    private lastApiResult:any;

    constructor(props:any) {
        super(props);
        this.onMoveSelected =this.onMoveSelected.bind(this);
    }

    getBoard(board?: string, move?: string) {
        // TODO: Configurise host
        // TODO: how to resolve this dependency https://github.com/Chrislee187/chess.webapi
        // so that this project can be self-contained
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
        console.log(`Mounting with board: ${this.props.board}`)
        this.getBoard(this.props.board);
    }

    render() {
        const chessboard = (<ChessBoard board={this.state.board} 
            whiteToPlay={this.state.whiteToPlay} 
            availableMoves={this.state.availableMoves}
            onMoveSelected={this.onMoveSelected}
        ></ChessBoard>)

        return (            <div>
            <link href="chessboard.css" rel="stylesheet" />
            <div className="row">
                {chessboard}
                <AvailableMoveList
                    availableMoves={this.state.availableMoves}
                    onMoveSelected={this.onMoveSelected}
                ></AvailableMoveList>
            </div>
        </div>
        
        )
        
    }
}

