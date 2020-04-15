import React, {Component} from 'react';
import {connect} from "react-redux";

class Board extends Component {

    render() {

        const [xCoords, yCoords] = [this.props.xCoords, this.props.yCoords];

        const [boardWidth, boardHeight] = [400, 500];
        const grid = [];
        yCoords.forEach(yVal => {
            xCoords.forEach(xyVal => {
                grid.push({x: xyVal, y: yVal})
            });
        });

        return (
            <svg width={boardWidth} height={boardHeight} className={'board'}>
                <rect width={boardWidth} height={boardHeight} stroke='#3333cc' fill='grey'
                />
                {grid.map((obj, ind) => {
                    return (
                        <circle cx={obj.x} cy={obj.y} key={ind} r="5" fill='#00cc00' stroke=":#006600" />
                    )})
                }
                {/*<circle cx={40} cy="40" r="24" fill='#00cc00' stroke=":#006600" onClick={()=>console.log('clicd')} onMouseOver={()=>console.log('mouseover ev')}/>*/}
            </svg>
        );
    }

}

const mapStateToProps = ({auth, board}) => {
    return {
        isAuth: !!auth.user_id,
        username: auth.username,
        xCoords: board.xCoords,
        yCoords: board.yCoords,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Board)