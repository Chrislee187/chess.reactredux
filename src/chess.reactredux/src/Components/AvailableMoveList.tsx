import React from 'react'
import './movelist.css'

export type Props = { 
    availableMoves: string[],
    onMoveSelected?(move:string): void
};

const initialState = {
    availableMoves: [""]
}
export type State = Readonly<typeof initialState>

export default class AvailableMoveList extends React.Component<Props, State> {
    readonly state: State = initialState;

    onClick(move:string) {
        if(this.props.onMoveSelected) {
            this.props.onMoveSelected(move);
        }
    }
    render () {
        let buttons:any[] = [];

        this.props.availableMoves.forEach(move => {
            buttons.push(
                <button className="move" 
                    title={move} 
                    onClick={() => this.onClick(move)}
                    >{move}</button>
            );}
        );

            const moveList = (
            <div className="available-moves">
                <div className="title">Available Moves</div>
                <div className="movelist">
                    {buttons}
                </div>
            </div>);

        return moveList;
    }
}
